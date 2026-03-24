import { useState, useEffect } from 'react';
import { useGame } from '@/lib/game/store';
import { GameSettingsStep } from './game-settings-step';
import { FactionSelectStep } from './faction-select-step';
import { ArmyBuilderStep } from './army-builder-step';
import { DetachmentStep } from './detachment-step';
import { MissionStep } from './mission-step';
import { ReadyStep } from './ready-step';
import { CombatPatrolSetupStep } from './combat-patrol-setup-step';
import { useNavigate } from 'react-router-dom';
import { getCombatPatrolRoster } from '@/data';

type SetupStep = 
  | 'settings'
  | 'player1-faction'
  | 'player2-faction'
  | 'player1-army'
  | 'player2-army'
  | 'player1-detachment'
  | 'player2-detachment'
  | 'player1-cp-setup'
  | 'player2-cp-setup'
  | 'mission'
  | 'ready';

const REGULAR_STEP_ORDER: SetupStep[] = [
  'settings',
  'player1-faction',
  'player2-faction',
  'player1-army',
  'player2-army',
  'player1-detachment',
  'player2-detachment',
  'mission',
  'ready',
];

const COMBAT_PATROL_STEP_ORDER: SetupStep[] = [
  'settings',
  'player1-faction',
  'player2-faction',
  'player1-cp-setup',
  'player2-cp-setup',
  'mission',
  'ready',
];

export function SetupIndex() {
  const [currentStep, setCurrentStep] = useState<SetupStep>('settings');
  const navigate = useNavigate();
  const { state, dispatch } = useGame();

  const isCombatPatrol = state.settings.gameSize === 'combat-patrol';
  const STEP_ORDER = isCombatPatrol ? COMBAT_PATROL_STEP_ORDER : REGULAR_STEP_ORDER;
  
  const currentIndex = STEP_ORDER.indexOf(currentStep);

  useEffect(() => {
    if (currentStep === 'player1-cp-setup' || currentStep === 'player2-cp-setup') {
      const playerIndex = currentStep === 'player1-cp-setup' ? 0 : 1;
      const factionId = state.players[playerIndex].factionId;
      if (factionId) {
        const roster = getCombatPatrolRoster(factionId);
        if (roster) {
          dispatch({ 
            type: 'SET_WARLORD', 
            payload: { player: playerIndex + 1 as 1 | 2, warlordId: roster.warlordId } 
          });
        }
      }
    }
  }, [currentStep, state.players, dispatch]);

  const goNext = () => {
    if (currentIndex < STEP_ORDER.length - 1) {
      setCurrentStep(STEP_ORDER[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentStep(STEP_ORDER[currentIndex - 1]);
    }
  };

  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
    navigate('/app/game/play');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'settings':
        return <GameSettingsStep onNext={goNext} />;
      case 'player1-faction':
        return (
          <FactionSelectStep
            currentPlayer={1}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player2-faction':
        return (
          <FactionSelectStep
            currentPlayer={2}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player1-army':
        return (
          <ArmyBuilderStep
            currentPlayer={1}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player2-army':
        return (
          <ArmyBuilderStep
            currentPlayer={2}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player1-detachment':
        return (
          <DetachmentStep
            currentPlayer={1}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player2-detachment':
        return (
          <DetachmentStep
            currentPlayer={2}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player1-cp-setup':
        return (
          <CombatPatrolSetupStep
            currentPlayer={1}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'player2-cp-setup':
        return (
          <CombatPatrolSetupStep
            currentPlayer={2}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 'mission':
        return <MissionStep onNext={goNext} onBack={goBack} />;
      case 'ready':
        return <ReadyStep onStart={handleStartGame} onBack={goBack} />;
      default:
        return null;
    }
  };

  const getStepLabel = (step: SetupStep): string => {
    const labels: Record<SetupStep, string> = {
      'settings': 'Game Settings',
      'player1-faction': `${state.players[0].name || 'Player 1'} Faction`,
      'player2-faction': `${state.players[1].name || 'Player 2'} Faction`,
      'player1-army': `${state.players[0].name || 'Player 1'} Army`,
      'player2-army': `${state.players[1].name || 'Player 2'} Army`,
      'player1-detachment': `${state.players[0].name || 'Player 1'} Detachment`,
      'player2-detachment': `${state.players[1].name || 'Player 2'} Detachment`,
      'player1-cp-setup': `${state.players[0].name || 'Player 1'} Enhancement`,
      'player2-cp-setup': `${state.players[1].name || 'Player 2'} Enhancement`,
      'mission': 'Mission',
      'ready': 'Ready',
    };
    return labels[step];
  };

  return (
    <div className="min-h-screen bg-crust p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text text-center mb-4">
            Warhammer 40k Game Setup
          </h1>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
            {STEP_ORDER.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${
                  index < currentIndex
                    ? 'text-green'
                    : index === currentIndex
                      ? 'text-mauve'
                      : 'text-overlay0'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    index < currentIndex
                      ? 'bg-green/20 border-green'
                      : index === currentIndex
                        ? 'bg-mauve/20 border-mauve'
                        : 'bg-surface0 border-overlay0'
                  }`}
                >
                  {index < currentIndex ? '✓' : index + 1}
                </div>
                <span className="ml-2 text-sm whitespace-nowrap hidden md:inline">
                  {getStepLabel(step)}
                </span>
                {index < STEP_ORDER.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1 ${
                      index < currentIndex ? 'bg-green' : 'bg-overlay0'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}
