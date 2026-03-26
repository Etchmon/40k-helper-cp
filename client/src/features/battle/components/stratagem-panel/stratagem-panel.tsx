'use client';

import { useState, useMemo, useCallback } from 'react';
import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  getAllStratagems, 
  filterStratagemsByCost,
  sortStratagemsByCost,
  StratagemWithSource,
  isStratagemAvailableNow
} from '@/lib/stratagems';
import { Phase, PHASES } from '@/types/game';
import { 
  Zap, Shield, Target, Crosshair, Clock, CheckCircle2, AlertCircle,
  ChevronDown, ChevronUp, Sparkles, X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PHASE_COLORS: Record<Phase, string> = {
  command: 'text-yellow',
  movement: 'text-blue',
  shooting: 'text-red',
  charge: 'text-mauve',
  fight: 'text-pink',
};

const PHASE_ICONS: Record<Phase, React.ReactNode> = {
  command: <Zap className="w-4 h-4" />,
  movement: <Target className="w-4 h-4" />,
  shooting: <Crosshair className="w-4 h-4" />,
  charge: <Shield className="w-4 h-4" />,
  fight: <Zap className="w-4 h-4" />,
};

const PHASE_BG: Record<Phase, string> = {
  command: 'bg-yellow/10 border-yellow/30',
  movement: 'bg-blue/10 border-blue/30',
  shooting: 'bg-red/10 border-red/30',
  charge: 'bg-mauve/10 border-mauve/30',
  fight: 'bg-pink/10 border-pink/30',
};

const STRATAGEM_TYPE_COLORS: Record<string, string> = {
  'Battle Tactic': 'bg-blue/20 border-blue/50 text-blue',
  'Epic Deed': 'bg-yellow/20 border-yellow/50 text-yellow',
  'Strategic Ploy': 'bg-green/20 border-green/50 text-green',
  'Wargear': 'bg-purple/20 border-purple/50 text-purple',
  'Other': 'bg-surface0 border-surface2 text-subtext0',
};

export function StratagemPanel() {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const { battle, turn, players } = state;
  const currentPhase = turn.phase;
  const activePlayer = turn.activePlayer;
  const activeSetup = players[activePlayer - 1] ?? { factionId: null, detachmentId: null };
  
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [selectedStratagem, setSelectedStratagem] = useState<StratagemWithSource | null>(null);
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({
    'Available Now': true,
    'Battle Tactic': true,
    'Epic Deed': false,
    'Strategic Ploy': true,
    'Wargear': false,
  });

  const currentCP = battle.commandPoints.current[activePlayer - 1] ?? 0;
  const phaseName = PHASES[currentPhase].name;

  const allStratagems = useMemo(() => {
    return getAllStratagems(activeSetup.factionId, activeSetup.detachmentId);
  }, [activeSetup.factionId, activeSetup.detachmentId]);

  const { stratagemsNow, stratagemsLater } = useMemo(() => {
    const now: StratagemWithSource[] = [];
    const later: StratagemWithSource[] = [];

    allStratagems.forEach(stratagem => {
      const isAvailableNow = isStratagemAvailableNow(stratagem, currentPhase);
      const stratagemWithMeta: StratagemWithSource = {
        ...stratagem,
        isAvailableNow,
      };

      if (isAvailableNow) {
        now.push(stratagemWithMeta);
      } else {
        later.push(stratagemWithMeta);
      }
    });

    return {
      stratagemsNow: sortStratagemsByCost(filterStratagemsByCost(now, currentCP)),
      stratagemsLater: sortStratagemsByCost(filterStratagemsByCost(later, currentCP)),
    };
  }, [allStratagems, currentPhase, currentCP]);

  const availableCount = stratagemsNow.length;
  const affordableCount = stratagemsNow.filter(s => currentCP >= s.cost).length;

  const handleUseStratagem = useCallback((stratagem: StratagemWithSource) => {
    if (currentCP >= stratagem.cost) {
      dispatch({
        type: 'SPEND_CP',
        payload: {
          player: activePlayer,
          amount: stratagem.cost,
          reason: stratagem.name,
        },
      });
      dispatch({
        type: 'ADD_ACTION_LOG',
        payload: {
          player: activePlayer,
          type: 'stratagem',
          description: `Used ${stratagem.name} (${stratagem.cost} CP)`,
          details: { stratagemId: stratagem.id, cost: stratagem.cost },
        },
      });
      toast.info('Stratagem Used', `${stratagem.name} (${stratagem.cost} CP)`);
    }
  }, [currentCP, activePlayer, dispatch, toast]);

  const toggleExpanded = useCallback((type: string) => {
    setExpandedTypes(prev => ({ ...prev, [type]: !prev[type] }));
  }, []);

  const renderStratagem = (stratagem: StratagemWithSource, showNowBadge: boolean = false) => {
    const canAfford = currentCP >= stratagem.cost;
    const isReady = stratagem.isAvailableNow && canAfford;
    
    return (
      <button
        key={stratagem.id}
        onClick={() => setSelectedStratagem(stratagem)}
        className={`w-full p-3 rounded-lg border text-left transition-all touch-manipulation cursor-pointer hover:border-mauve/50 ${
          isReady
            ? 'bg-surface1 border-blue/50 active:border-blue'
            : stratagem.isAvailableNow
              ? 'bg-surface1 border-yellow/50 opacity-90'
              : 'bg-surface0/50 border-surface1 opacity-60'
        }`}
        aria-label={`View details for ${stratagem.name}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm text-text">
                {stratagem.name}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-xs font-bold shrink-0 ${
                stratagem.cost === 1 ? 'bg-green/20 text-green' :
                stratagem.cost === 2 ? 'bg-yellow/20 text-yellow' :
                'bg-red/20 text-red'
              }`}>
                {stratagem.cost} CP
              </span>
              {stratagem.isUniversal && (
                <span className="px-2 py-1 rounded-lg text-xs bg-surface0 text-subtext0 shrink-0">
                  Universal
                </span>
              )}
              {showNowBadge && isReady && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-green/20 text-green shrink-0">
                  <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  Ready
                </span>
              )}
            </div>
            <p className="text-xs text-subtext0 mt-1 line-clamp-2">
              {stratagem.description}
            </p>
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-surface0 text-text">
                {PHASE_ICONS[currentPhase]}
                <span aria-hidden="true">{phaseName}</span>
              </span>
              {stratagem.target && (
                <span className="text-xs text-subtext0 truncate max-w-[100px]" title={stratagem.target}>
                  → {stratagem.target}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant={isReady ? 'default' : 'ghost'}
            disabled={!canAfford}
            onClick={(e) => {
              e.stopPropagation();
              handleUseStratagem(stratagem);
            }}
            className="shrink-0 min-w-[60px] h-8 text-xs"
          >
            {canAfford ? 'Use' : 'Need CP'}
          </Button>
        </div>
      </button>
    );
  };

  const renderCategory = (
    title: string,
    stratagems: StratagemWithSource[],
    icon: React.ReactNode,
    color: string,
    defaultExpanded: boolean
  ) => {
    if (stratagems.length === 0) return null;
    
    const isExpanded = expandedTypes[title] ?? defaultExpanded;
    const categoryId = `stratagem-category-${title.toLowerCase().replace(/\s+/g, '-')}`;
    
    return (
      <div className="border border-surface0 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleExpanded(title)}
          className={`w-full px-3 py-2 flex items-center justify-between touch-manipulation ${color}`}
          aria-expanded={isExpanded}
          aria-controls={categoryId}
        >
          <span className="flex items-center gap-2 font-semibold text-sm">
            <span aria-hidden="true">{icon}</span>
            {title}
            <span className="px-1.5 py-0.5 bg-black/20 rounded text-xs">({stratagems.length})</span>
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          )}
        </button>
        
        {isExpanded && (
          <div id={categoryId} className="p-2 space-y-2 bg-crust/50">
            {stratagems.map(stratagem => renderStratagem(stratagem, title === 'Available Now'))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
    <Card className="flex-1 flex flex-col overflow-hidden border-2 border-surface1">
      <CardHeader className="bg-surface0/60 py-2 px-3 border-b border-surface1">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow" />
            Stratagems
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green/20 rounded border border-green/40">
              <span className="font-bold text-green text-sm">{currentCP}</span>
              <span className="text-[10px] text-overlay1">CP</span>
            </div>
            <Button
              variant={showOnlyAvailable ? 'default' : 'outline'}
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className="h-7 px-2 text-xs"
            >
              {showOnlyAvailable ? 'All' : 'Avail'}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1.5">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${PHASE_BG[currentPhase]} ${PHASE_COLORS[currentPhase]}`}>
            {PHASE_ICONS[currentPhase]}
            {phaseName}
          </span>
          {activeSetup.factionId && (
            <span className="text-[10px] text-overlay1 ml-1">
              {availableCount} ready • {affordableCount} avail
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-1 pb-1 flex-1 overflow-auto">
        {!activeSetup.factionId ? (
          <div className="text-center py-2 text-subtext0">
            <AlertCircle className="w-6 h-6 mx-auto mb-1 opacity-50" />
            <p className="text-xs">Select faction</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[calc(100vh-280px)] lg:max-h-[350px] overflow-y-auto pr-1 pb-2 touch-pan-y">
            {showOnlyAvailable && renderCategory(
              'Available Now',
              stratagemsNow,
              <Sparkles className="w-5 h-5" />,
              'bg-green/10 text-green',
              true
            )}
            
            {showOnlyAvailable && stratagemsLater.length > 0 && renderCategory(
              'Available Later',
              stratagemsLater,
              <Clock className="w-4 h-4" />,
              'bg-surface0/50 text-subtext0 border-b border-surface0',
              false
            )}
            
            {!showOnlyAvailable && (
              <>
                {renderCategory(
                  'Battle Tactic',
                  sortStratagemsByCost(filterStratagemsByCost(
                    allStratagems.filter(s => s.type === 'Battle Tactic'),
                    currentCP
                  )),
                  <Zap className="w-4 h-4" />,
                  STRATAGEM_TYPE_COLORS['Battle Tactic'],
                  true
                )}
                {renderCategory(
                  'Epic Deed',
                  sortStratagemsByCost(filterStratagemsByCost(
                    allStratagems.filter(s => s.type === 'Epic Deed'),
                    currentCP
                  )),
                  <Sparkles className="w-4 h-4" />,
                  STRATAGEM_TYPE_COLORS['Epic Deed'],
                  false
                )}
                {renderCategory(
                  'Strategic Ploy',
                  sortStratagemsByCost(filterStratagemsByCost(
                    allStratagems.filter(s => s.type === 'Strategic Ploy'),
                    currentCP
                  )),
                  <Target className="w-4 h-4" />,
                  STRATAGEM_TYPE_COLORS['Strategic Ploy'],
                  true
                )}
                {renderCategory(
                  'Wargear',
                  sortStratagemsByCost(filterStratagemsByCost(
                    allStratagems.filter(s => s.type === 'Wargear'),
                    currentCP
                  )),
                  <Crosshair className="w-4 h-4" />,
                  STRATAGEM_TYPE_COLORS['Wargear'],
                  false
                )}
              </>
            )}
            
            {(showOnlyAvailable 
              ? stratagemsNow.length + stratagemsLater.length 
              : allStratagems.length) === 0 && (
              <div className="text-center py-6 text-subtext0">
                <p>No stratagems match your criteria</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>

    {/* Stratagem Detail Modal */}
    {selectedStratagem && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedStratagem(null)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <div 
          className="relative bg-crust border-2 border-surface1 rounded-xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-surface0/80 px-4 py-3 border-b border-surface1 flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-text">{selectedStratagem.name}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`px-2 py-0.5 rounded text-sm font-bold ${
                  selectedStratagem.cost === 1 ? 'bg-green/20 text-green' :
                  selectedStratagem.cost === 2 ? 'bg-yellow/20 text-yellow' :
                  'bg-red/20 text-red'
                }`}>
                  {selectedStratagem.cost} CP
                </span>
                {selectedStratagem.type && (
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    STRATAGEM_TYPE_COLORS[selectedStratagem.type] || STRATAGEM_TYPE_COLORS['Other']
                  }`}>
                    {selectedStratagem.type}
                  </span>
                )}
                {selectedStratagem.isUniversal && (
                  <span className="px-2 py-0.5 rounded text-xs bg-surface1 text-subtext0">
                    Universal
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={() => setSelectedStratagem(null)}
              className="p-2 rounded-lg hover:bg-surface1 transition-colors touch-manipulation"
            >
              <X className="w-5 h-5 text-subtext0" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {/* Phase */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-overlay1 uppercase tracking-wider mb-2">Phase</h4>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedStratagem.phases?.map(phase => (
                  <span key={phase} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${PHASE_BG[phase as Phase] || 'bg-surface0'} ${PHASE_COLORS[phase as Phase] || 'text-text'}`}>
                    {PHASES[phase as Phase]?.name || phase}
                  </span>
                ))}
                {(!selectedStratagem.phases || selectedStratagem.phases.length === 0) && (
                  <span className="px-3 py-1.5 rounded-lg text-sm bg-surface0 text-text">Any Phase</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-overlay1 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-sm text-text leading-relaxed">{selectedStratagem.description}</p>
            </div>

            {/* When Used */}
            {selectedStratagem.whenUsed && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-overlay1 uppercase tracking-wider mb-2">When Used</h4>
                <p className="text-sm text-text leading-relaxed">{selectedStratagem.whenUsed}</p>
              </div>
            )}

            {/* Target */}
            {selectedStratagem.target && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-overlay1 uppercase tracking-wider mb-2">Target</h4>
                <p className="text-sm text-text">{selectedStratagem.target}</p>
              </div>
            )}

            {/* Restrictions */}
            {(selectedStratagem.restriction || selectedStratagem.restrictions) && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-overlay1 uppercase tracking-wider mb-2">Restrictions</h4>
                {selectedStratagem.restriction && (
                  <p className="text-sm text-red leading-relaxed">{selectedStratagem.restriction}</p>
                )}
                {selectedStratagem.restrictions?.map((rest, i) => (
                  <p key={i} className="text-sm text-red leading-relaxed">• {rest}</p>
                ))}
              </div>
            )}

            {/* Source */}
            {selectedStratagem.detachmentName && (
              <div className="pt-3 border-t border-surface1">
                <h4 className="text-xs font-semibold text-overlay1 uppercase tracking-wider mb-1">Source</h4>
                <p className="text-sm text-mauve">{selectedStratagem.detachmentName}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-surface0/50 px-4 py-3 border-t border-surface1">
            <button 
              onClick={() => setSelectedStratagem(null)}
              className="w-full py-3 px-4 bg-surface1 hover:bg-surface2 rounded-lg text-sm font-medium text-text transition-colors touch-manipulation"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default StratagemPanel;
