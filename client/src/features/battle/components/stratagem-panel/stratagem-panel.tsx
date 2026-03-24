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
  ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PHASE_COLORS: Record<Phase, string> = {
  command: 'text-yellow',
  movement: 'text-blue',
  shooting: 'text-red',
  charge: 'text-orange',
  fight: 'text-purple',
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
  charge: 'bg-orange/10 border-orange/30',
  fight: 'bg-purple/10 border-purple/30',
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
  const activeSetup = players[activePlayer - 1];
  
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>({
    'Available Now': true,
    'Battle Tactic': true,
    'Epic Deed': false,
    'Strategic Ploy': true,
    'Wargear': false,
  });

  const currentCP = battle.commandPoints.current[activePlayer - 1];
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
      <div
        key={stratagem.id}
        className={`p-4 rounded-xl border-2 transition-all touch-manipulation ${
          isReady
            ? 'bg-surface1 border-blue/50 active:border-blue'
            : stratagem.isAvailableNow
              ? 'bg-surface1 border-yellow/50 opacity-90'
              : 'bg-surface0/50 border-surface1 opacity-60'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-base text-text">
                {stratagem.name}
              </span>
              <span className={`px-2 py-1 rounded-lg text-sm font-bold shrink-0 ${
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
                  <CheckCircle2 className="w-3 h-3" />
                  Ready
                </span>
              )}
            </div>
            <p className="text-sm text-subtext0 mt-2 line-clamp-2 leading-relaxed">
              {stratagem.description}
            </p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-surface0 text-text">
                {PHASE_ICONS[currentPhase]}
                {phaseName}
              </span>
              {stratagem.target && (
                <span className="text-xs text-subtext0 truncate max-w-[150px]" title={stratagem.target}>
                  → {stratagem.target}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant={isReady ? 'default' : 'ghost'}
            disabled={!canAfford}
            onClick={() => handleUseStratagem(stratagem)}
            className="shrink-0 min-w-[70px] h-10"
          >
            {canAfford ? 'Use' : 'Need CP'}
          </Button>
        </div>
      </div>
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
    
    return (
      <div className="border-2 border-surface0 rounded-xl overflow-hidden">
        <button
          onClick={() => toggleExpanded(title)}
          className={`w-full px-4 py-4 flex items-center justify-between touch-manipulation ${color}`}
        >
          <span className="flex items-center gap-3 font-semibold text-base">
            {icon}
            {title}
            <span className="px-2 py-1 bg-black/20 rounded-lg text-xs">({stratagems.length})</span>
          </span>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </button>
        
        {isExpanded && (
          <div className="p-4 space-y-3 bg-crust/50">
            {stratagems.map(stratagem => renderStratagem(stratagem, title === 'Available Now'))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-surface0/50 pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow" />
            Stratagems
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green/10 rounded-lg border border-green/30">
              <span className="font-bold text-green text-lg">{currentCP}</span>
              <span className="text-sm text-subtext0">CP</span>
            </div>
            <Button
              variant={showOnlyAvailable ? 'default' : 'outline'}
              onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
              className="h-10 px-4"
            >
              {showOnlyAvailable ? 'Show All' : 'Show Available'}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${PHASE_BG[currentPhase]} ${PHASE_COLORS[currentPhase]}`}>
            {PHASE_ICONS[currentPhase]}
            {phaseName}
          </span>
          {activeSetup.factionId && (
            <span className="text-xs text-subtext0">
              {availableCount} ready • {affordableCount} affordable
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-3">
        {!activeSetup.factionId ? (
          <div className="text-center py-8 text-subtext0">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-base">Select a faction to view stratagems</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[450px] lg:max-h-[500px] overflow-y-auto pr-1 pb-4 touch-pan-y">
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
  );
}

export default StratagemPanel;
