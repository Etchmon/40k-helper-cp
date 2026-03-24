import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PHASES, PHASE_ORDER, Phase } from '@/types/game';
import { Crown, Footprints, Crosshair, Zap, Swords, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
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
    bg: 'bg-orange/20',
    text: 'text-orange',
    border: 'border-orange/30',
    icon: 'text-orange',
  },
  fight: {
    bg: 'bg-purple/20',
    text: 'text-purple',
    border: 'border-purple/30',
    icon: 'text-purple',
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
  const [cpGained, setCpGained] = useState(false);
  
  const phaseColors = PHASE_COLORS[turn.phase];
  const PhaseIcon = PHASE_ICONS[turn.phase];

  useEffect(() => {
    if (turn.phase === 'command' && !cpGained) {
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
      setCpGained(true);
      toast.success('+1 CP Gained', 'Command Phase CP generated');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn.phase, turn.round, turn.activePlayer]);

  useEffect(() => {
    if (turn.phase !== 'command') {
      setCpGained(false);
    }
  }, [turn.phase]);

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

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className={`bg-surface0/50 pb-3 sm:pb-4 border-b-2 ${phaseColors.border}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-14 h-14 sm:w-12 sm:h-12 rounded-2xl ${phaseColors.bg} flex items-center justify-center shrink-0`}>
              <PhaseIcon className={`w-7 h-7 sm:w-6 sm:h-6 ${phaseColors.icon}`} />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className={`text-lg sm:text-xl ${phaseColors.text}`}>{currentPhase.name}</CardTitle>
              <p className="text-xs sm:text-sm text-subtext0 hidden sm:block">{currentPhase.description}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs sm:text-sm text-subtext0">Round {turn.round}</div>
            <div className={`text-base sm:text-lg font-bold truncate max-w-[100px] sm:max-w-none ${phaseColors.text}`}>
              {state.players[turn.activePlayer - 1].name || `P${turn.activePlayer}`}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3 sm:pt-4">
        <div className="mb-4">
          <h4 className="font-semibold text-text mb-2 text-sm">What to do in this phase:</h4>
          <div className="space-y-2">
            {currentPhase.id === 'command' && cpGained && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green/10 border border-green/30">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green/20 shrink-0">
                  <Check className="w-4 h-4 text-green" />
                </div>
                <span className="text-green font-medium text-sm">
                  +1 CP automatically gained!
                </span>
              </div>
            )}
            {currentPhase.instructions.map((instruction, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                  instruction.type === 'action'
                    ? `${phaseColors.bg} border ${phaseColors.border}`
                    : instruction.type === 'step'
                      ? 'bg-surface0/50'
                      : 'bg-overlay0/20'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  instruction.type === 'action'
                    ? `${phaseColors.bg} ${phaseColors.text}`
                    : instruction.type === 'step'
                      ? 'bg-surface1 text-subtext0'
                      : 'bg-overlay0 text-overlay1'
                }`}>
                  {instruction.type === 'action' ? '▶' : instruction.type === 'step' ? '•' : 'ℹ'}
                </div>
                <span className="text-text leading-relaxed">{instruction.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-surface0 pt-4">
          <Button
            variant="outline"
            onClick={handlePrevPhase}
            disabled={currentPhaseIndex === 0}
            className="flex-1 sm:flex-none sm:min-w-[140px]"
            aria-label={`Go to previous phase: ${currentPhaseIndex > 0 ? PHASES[PHASE_ORDER[currentPhaseIndex - 1]].name : 'None'}`}
          >
            <ChevronLeft className="w-5 h-5 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Previous Phase</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <Button 
            onClick={handleNextPhase}
            className="flex-1 sm:flex-none sm:min-w-[160px]"
            aria-label={`End ${currentPhase.name} and move to next phase`}
          >
            <span className="hidden sm:inline">End {currentPhase.name}</span>
            <span className="sm:hidden">Next Phase</span>
            <ChevronRight className="w-5 h-5 sm:ml-2" aria-hidden="true" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
