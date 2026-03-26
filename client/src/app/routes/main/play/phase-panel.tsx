import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PHASES, PHASE_ORDER, Phase } from '@/types/game';
import { Crown, Footprints, Crosshair, Zap, Swords, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useEffect, useCallback, useState, useMemo, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

// Phase-specific colors
const PHASE_COLORS: Record<Phase, { bg: string; text: string; border: string; icon: string }> = {
  command: {
    bg: 'bg-yellow/20',
    text: 'text-yellow',
    border: 'border-yellow/30',
    icon: 'text-yellow',
  },
  movement: {
    bg: 'bg-blue/20',
    text: 'text-blue',
    border: 'border-blue/30',
    icon: 'text-blue',
  },
  shooting: {
    bg: 'bg-red/20',
    text: 'text-red',
    border: 'border-red/30',
    icon: 'text-red',
  },
  charge: {
    bg: 'bg-mauve/20',
    text: 'text-mauve',
    border: 'border-mauve/30',
    icon: 'text-mauve',
  },
  fight: {
    bg: 'bg-pink/20',
    text: 'text-pink',
    border: 'border-pink/30',
    icon: 'text-pink',
  },
};

const PHASE_ICONS = {
  command: Crown,
  movement: Footprints,
  shooting: Crosshair,
  charge: Zap,
  fight: Swords,
};

export function PhasePanel() {
  const { state, dispatch } = useGame();
  const { turn } = state;
  const { toast } = useToast();
  const currentPhase = PHASES[turn.phase];
  const currentPhaseIndex = PHASE_ORDER.indexOf(turn.phase);
  
  const phaseColors = PHASE_COLORS[turn.phase];
  const PhaseIcon = PHASE_ICONS[turn.phase];

  // Track checked items - key is `${phase}-${index}`
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Track if we've processed CP gain for current phase/player to prevent double-processing
  const cpGainProcessedRef = useRef<string>('');

  // Reset checkboxes when phase or turn changes
  const currentKey = useMemo(() => `${turn.phase}-${turn.round}`, [turn.phase, turn.round]);
  
  const toggleChecked = useCallback((index: number) => {
    const key = `${currentKey}-${index}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, [currentKey]);

  const isChecked = useCallback((index: number) => {
    const key = `${currentKey}-${index}`;
    return checkedItems[key] || false;
  }, [checkedItems, currentKey]);
  
  const hasGainedCPThisPhase = useCallback(() => {
    if (turn.phase !== 'command') return false;
    const cpGainedKey = `${turn.round}-${turn.activePlayer}`;
    const lastGainedKey = state.battle.lastCpGainKey;
    return lastGainedKey === cpGainedKey;
  }, [turn.phase, turn.round, turn.activePlayer, state.battle.lastCpGainKey]);

  useEffect(() => {
    const cpGainKey = `${turn.round}-${turn.activePlayer}`;
    const alreadyGained = state.battle.lastCpGainKey === cpGainKey;
    if (turn.phase === 'command' && !alreadyGained && cpGainProcessedRef.current !== cpGainKey) {
      cpGainProcessedRef.current = cpGainKey;
      const key = cpGainKey;
      dispatch({
        type: 'SET_LAST_CP_GAIN_KEY',
        payload: { key },
      });
      dispatch({
        type: 'AUTO_GAIN_COMMAND_PHASE_CP',
        payload: { player: turn.activePlayer },
      });
      dispatch({
        type: 'ADD_ACTION_LOG',
        payload: {
          player: turn.activePlayer,
          type: 'cp-gained',
          description: `${state.players[turn.activePlayer - 1].name || `Player ${turn.activePlayer}`} gained 1 CP`,
          details: { amount: 1, source: 'Command Phase' }
        },
      });
      toast.success('+1 CP Gained', 'Command Phase CP generated');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn.phase, turn.round, turn.activePlayer]);

  const handleNextPhase = useCallback(() => {
    const nextPhaseIndex = currentPhaseIndex < PHASE_ORDER.length - 1 
      ? PHASE_ORDER[currentPhaseIndex + 1] 
      : 'command';
    const nextPhaseName = PHASES[nextPhaseIndex].name;
    
    dispatch({ type: 'ADD_ACTION_LOG', payload: {
      player: turn.activePlayer,
      type: 'phase-end',
      description: `Ended ${currentPhase.name}`
    }});
    dispatch({ type: 'NEXT_PHASE' });
    toast.info('Phase Changed', `Now in ${nextPhaseName}`);
  }, [dispatch, currentPhase, currentPhaseIndex, turn.activePlayer, toast]);

  const handlePrevPhase = useCallback(() => {
    if (currentPhaseIndex > 0) {
      const prevPhase = PHASE_ORDER[currentPhaseIndex - 1];
      dispatch({ type: 'SET_PHASE', payload: prevPhase });
      toast.info('Phase Changed', `Back to ${PHASES[prevPhase].name}`);
    }
  }, [dispatch, currentPhaseIndex, toast]);

  // Get all items to display (CP gain + instructions)
  const allItems = useMemo(() => {
    const items: { type: 'cp' | 'instruction'; instruction?: { type: string; text: string }; index: number }[] = [];
    
    if (currentPhase.id === 'command' && hasGainedCPThisPhase()) {
      items.push({ type: 'cp', index: -1 });
    }
    
    currentPhase.instructions.forEach((instruction, index) => {
      items.push({ type: 'instruction', instruction, index });
    });
    
    return items;
  }, [currentPhase, hasGainedCPThisPhase]);

  return (
    <Card className="h-full flex flex-col border-2 border-surface1">
      <CardHeader className={`bg-surface0/60 py-2 px-3 border-b-2 ${phaseColors.border} shrink-0`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-10 h-10 rounded-lg ${phaseColors.bg} flex items-center justify-center shrink-0 border-2 ${phaseColors.border}`}>
              <PhaseIcon className={`w-5 h-5 ${phaseColors.icon}`} />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className={`text-base font-bold ${phaseColors.text}`}>{currentPhase.name}</CardTitle>
              <p className="text-[10px] text-overlay1 leading-tight">{currentPhase.description}</p>
            </div>
          </div>
          <div className="text-right shrink-0 flex flex-col items-end">
            <span className="text-[10px] text-overlay1 font-medium">ROUND</span>
            <span className="text-sm font-bold text-mauve">{turn.round}</span>
            <span className="text-[9px] text-overlay1 mt-0.5">{state.players[turn.activePlayer - 1]?.name || `P${turn.activePlayer}`}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-2 flex-1 overflow-auto">
        <div className="mb-2">
          <div className="space-y-1.5">
            {allItems.map((item) => {
              if (item.type === 'cp') {
                return (
                  <div
                    key="cp-gained"
                    className="flex items-start gap-2 p-2 rounded-lg bg-green/10 border border-green/30"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green/20 shrink-0">
                      <Check className="w-3 h-3 text-green" />
                    </div>
                    <span className="text-green font-medium text-sm">
                      +1 CP automatically gained!
                    </span>
                  </div>
                );
              }
              
              const instruction = item.instruction!;
              const checked = isChecked(item.index);
              
              return (
                <button
                  key={item.index}
                  onClick={() => toggleChecked(item.index)}
                  className={`w-full flex items-start gap-2 p-2 rounded-lg text-left transition-all ${
                    checked
                      ? 'bg-green/5 border border-green/20'
                      : instruction.type === 'action'
                        ? `${phaseColors.bg} border ${phaseColors.border}`
                        : instruction.type === 'step'
                          ? 'bg-surface1/50 border border-surface1'
                          : 'bg-surface0/50 border border-surface0'
                  }`}
                >
                  <div className={`w-5 h-5 md:w-6 md:h-6 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    checked
                      ? 'bg-green border-green'
                      : 'border-surface2'
                  }`}>
                    {checked && <Check className="w-3 h-3 text-crust" />}
                  </div>
                  <div className={`flex-1 ${checked ? 'line-through text-overlay1' : 'text-text'}`}>
                    <span className="text-sm">{instruction.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-surface0 pt-2 mt-auto shrink-0">
          <Button
            variant="outline"
            onClick={handlePrevPhase}
            disabled={currentPhaseIndex === 0}
            className="flex-1 h-8 text-xs"
          >
            <ChevronLeft className="w-3 h-3 mr-1" />
            <span>Back</span>
          </Button>
          <Button 
            onClick={handleNextPhase}
            className="flex-1 h-8 text-xs font-semibold"
          >
            <span>Next</span>
            <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
