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
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Menu, X, ChevronLeft, ChevronRight, Home, RotateCcw } from 'lucide-react';
import { confirm } from '@/components/ui/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useGame();
  useToast();

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

  const handleNewGame = async () => {
    const confirmed = await confirm({
      title: 'Start New Game?',
      message: 'Start a new game? Current setup will be lost.',
      confirmText: 'New Game',
      cancelText: 'Keep Setup',
      variant: 'destructive',
    });
    
    if (confirmed) {
      dispatch({ type: 'RESET_GAME' });
      navigate('/app/game/setup');
    }
  };

  const handleQuit = () => {
    navigate('/');
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
    <div className="min-h-screen bg-crust pb-24 lg:pb-6">
      {/* Mobile Header with Hamburger Menu */}
      <header className="lg:hidden bg-crust/95 border-b border-surface0 sticky top-0 z-20 backdrop-blur-md safe-area-inset-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="flex flex-col">
                <span className="text-[10px] text-overlay1 uppercase tracking-wider">Setup</span>
                <span className="text-base font-semibold text-text truncate max-w-[180px]">
                  {getStepLabel(currentStep)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-xs text-overlay1 mr-2">
                {currentIndex + 1}/{STEP_ORDER.length}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {showMobileMenu && (
          <div className="absolute top-full left-0 right-0 bg-surface0 border-b border-surface1 z-30">
            <CardContent className="p-2 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-text"
                onClick={() => { handleQuit(); setShowMobileMenu(false); }}
              >
                <Home className="w-4 h-4 mr-2" />
                Exit to Menu
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-text"
                onClick={() => { handleNewGame(); setShowMobileMenu(false); }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </CardContent>
          </div>
        )}
      </header>

      {/* Desktop & Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 lg:py-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text">
              Game Setup
            </h1>
            <p className="text-sm text-overlay1">
              {getStepLabel(currentStep)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleQuit}>
              <Home className="w-4 h-4 mr-2" />
              Exit
            </Button>
            <Button variant="outline" size="sm" onClick={handleNewGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>

        {/* Desktop Progress Bar */}
        <div className="hidden lg:block mb-8">
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
                <span className="ml-2 text-sm whitespace-nowrap">
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

        {/* Mobile Progress */}
        <div className="lg:hidden mb-6">
          <div className="w-full bg-surface0 rounded-full h-2 mb-2">
            <div 
              className="bg-mauve h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / STEP_ORDER.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goBack}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-overlay1">
              Step {currentIndex + 1} of {STEP_ORDER.length}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={currentIndex === STEP_ORDER.length - 1 ? handleStartGame : goNext}
              className={currentIndex === STEP_ORDER.length - 1 ? "bg-green/20 text-green border-green" : ""}
            >
              {currentIndex === STEP_ORDER.length - 1 ? (
                <>Start</>
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
}
