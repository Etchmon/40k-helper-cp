import { useEffect, useState, useCallback } from 'react';
import { useGame } from '@/lib/game/store';
import { PhasePanel } from './phase-panel';
import { VPTracker } from './vp-tracker';
import { CPTracker } from '@/features/battle/components/cp-display';
import { StratagemPanel } from '@/features/battle/components/stratagem-panel';
import { UnitAbilityPanel } from '@/features/battle/components/unit-ability-panel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, LogOut, Save, RotateCcw, Menu, X, Target, Scroll, Trophy } from 'lucide-react';
import { getMissionById } from '@/data/missions/only-war';
import { useNavigate } from 'react-router-dom';
import { confirm } from '@/components/ui/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

export function GameBoard() {
  const { state, saveGame } = useGame();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const mission = getMissionById(state.settings.missionId);

  useEffect(() => {
    if (state.status === 'finished') {
      navigate('/app/game/end');
    }
  }, [state.status, navigate]);

  const handleQuit = useCallback(async () => {
    const confirmed = await confirm({
      title: 'End Game?',
      message: 'Are you sure you want to quit? Your game will be saved.',
      confirmText: 'End Game',
      cancelText: 'Cancel',
      variant: 'destructive',
    });
    
    if (confirmed) {
      saveGame();
      toast.success('Game Saved', 'Your game has been saved');
      navigate('/app/game/end');
    }
  }, [saveGame, navigate, toast]);

  const handleNewGame = useCallback(async () => {
    const confirmed = await confirm({
      title: 'Start New Game?',
      message: 'Start a new game? Current game progress will be lost.',
      confirmText: 'New Game',
      cancelText: 'Keep Playing',
      variant: 'destructive',
    });
    
    if (confirmed) {
      navigate('/app/game/setup');
    }
  }, [navigate]);

  const handleSave = useCallback(() => {
    saveGame();
    toast.success('Game Saved', 'Your game has been saved successfully');
  }, [saveGame, toast]);

  return (
    <div className="min-h-screen bg-crust pb-24 lg:pb-6">
      {/* Mobile Header */}
      <header className="lg:hidden bg-surface0/95 border-b border-surface1 sticky top-0 z-20 backdrop-blur-md safe-area-inset-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center min-w-[50px]">
                <span className="text-[10px] text-subtext0 uppercase tracking-wider">Round</span>
                <span className="text-3xl font-bold text-mauve leading-none">{state.turn.round}</span>
              </div>
              <div className="w-px h-10 bg-surface1" />
              <div className="flex flex-col">
                <span className="text-[10px] text-subtext0 uppercase tracking-wider">Turn</span>
                <span className="text-base font-semibold text-text truncate max-w-[140px]">
                  {state.players[state.turn.activePlayer - 1].name || `P${state.turn.activePlayer}`}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile VP Bar */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface1">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-text font-medium truncate max-w-[100px]">
                {state.players[0]?.name || 'P1'}
              </span>
              <span className="font-bold text-blue">{state.battle.victoryPoints[0]}</span>
              <span className="text-subtext0">VP</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-red">{state.battle.victoryPoints[1]}</span>
              <span className="text-subtext0">VP</span>
              <span className="text-text font-medium truncate max-w-[100px]">
                {state.players[1]?.name || 'P2'}
              </span>
            </div>
          </div>
        </div>

          {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute left-0 right-0 bg-surface0/98 border-b border-surface1 px-4 py-4 space-y-2 z-30">
            <Button
              variant="ghost"
              onClick={() => { handleSave(); setShowMobileMenu(false); }}
              className="w-full justify-start text-base"
            >
              <Save className="w-5 h-5 mr-3" />
              Save Game
            </Button>
            <Button
              variant="ghost"
              onClick={() => { handleNewGame(); setShowMobileMenu(false); }}
              className="w-full justify-start text-base"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              New Game
            </Button>
            <Button
              variant="ghost"
              onClick={() => { handleQuit(); setShowMobileMenu(false); }}
              className="w-full justify-start text-base text-red"
            >
              <LogOut className="w-5 h-5 mr-3" />
              End Game
            </Button>
          </div>
        )}
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-surface0/80 border-b border-surface1 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-xs text-subtext0 uppercase tracking-wide">Round</span>
                  <span className="text-3xl font-bold text-mauve">{state.turn.round}</span>
                </div>
                <div className="h-12 w-px bg-surface1" />
                <div className="flex flex-col">
                  <span className="text-xs text-subtext0 uppercase tracking-wide">Turn</span>
                  <span className="text-xl font-semibold text-text">
                    {state.players[state.turn.activePlayer - 1].name || `Player ${state.turn.activePlayer}`}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleNewGame}
                title="New Game"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Game
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                title="Save Game"
              >
                <Save className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleQuit}
                title="End Game"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-3 text-sm text-subtext0">
            <span>
              <span className="text-text font-medium">{state.players[0]?.name || 'Player 1'}</span>: <span className="text-blue font-bold">{state.battle.victoryPoints[0]}</span> VP
            </span>
            <span className="text-surface1">|</span>
            <span>
              <span className="text-text font-medium">{state.players[1]?.name || 'Player 2'}</span>: <span className="text-red font-bold">{state.battle.victoryPoints[1]}</span> VP
            </span>
            <span className="text-surface1">|</span>
            <span className="font-medium">{mission?.name || 'Unknown Mission'}</span>
          </div>
        </div>
      </header>

      {/* Desktop Main Content */}
      <main className="hidden lg:block max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 space-y-4">
            <PhasePanel />
            <UnitAbilityPanel />
          </div>
          <div className="xl:col-span-1 space-y-4">
            <MissionCard mission={mission} />
            <WarlordCard />
          </div>
          <div className="xl:col-span-1 space-y-4">
            <StratagemPanel />
            <div className="grid grid-cols-2 gap-4">
              <CPTracker />
              <VPTracker />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Main Content - Tab-based Layout */}
      <main className="lg:hidden px-4 py-4">
        <MobileGameInterface />
      </main>
    </div>
  );
}

function MobileGameInterface() {
  const [activeTab, setActiveTab] = useState<'phase' | 'stratagems' | 'vp'>('phase');
  
  const tabs = [
    { id: 'phase' as const, label: 'Phase', icon: Target },
    { id: 'stratagems' as const, label: 'Stratagems', icon: Scroll },
    { id: 'vp' as const, label: 'VP & CP', icon: Trophy },
  ];

  return (
    <div className="space-y-4" role="tabpanel" aria-label="Game controls">
      {/* Tab Bar */}
      <div 
        className="flex gap-2 p-1 bg-surface0/50 rounded-xl"
        role="tablist"
        aria-label="Game navigation tabs"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-blue text-crust shadow-md'
                : 'text-subtext0 hover:text-text'
            }`}
          >
            <tab.icon className="w-4 h-4" aria-hidden="true" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div id={`${activeTab}-panel`} role="tabpanel" aria-label={`${activeTab} tab content`}>
        {activeTab === 'phase' && (
          <div className="space-y-4">
            <PhasePanel />
            <UnitAbilityPanel />
          </div>
        )}
        
        {activeTab === 'stratagems' && (
          <StratagemPanel />
        )}
        
        {activeTab === 'vp' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <VPTracker />
              <CPTracker />
            </div>
            <MissionCardSummary />
            <WarlordCard />
          </div>
        )}
      </div>
    </div>
  );
}

function MissionCardSummary() {
  const { state } = useGame();
  const mission = getMissionById(state.settings.missionId);
  if (!mission) return null;

  return (
    <Card>
      <CardHeader className="bg-surface0/50 pb-2">
        <CardTitle className="text-base">{mission.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-xs text-subtext0 line-clamp-2">{mission.primaryObjective.scoring}</p>
      </CardContent>
    </Card>
  );
}

function MissionCard({ mission }: { mission?: ReturnType<typeof getMissionById> }) {
  if (!mission) return null;

  return (
    <Card>
      <CardHeader className="bg-surface0/50 pb-2">
        <CardTitle className="text-lg">{mission.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-subtext0 mb-3">{mission.primaryObjective.scoring}</p>
        <div className="bg-surface0/50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-text mb-1">Secondary Objectives</h4>
          <div className="space-y-1">
            {mission.secondaryOptions.map((sec) => (
              <div key={sec.id} className="text-xs text-subtext0">
                • {sec.name} (max {sec.maxPoints})
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WarlordCard() {
  const { state } = useGame();
  const activePlayer = state.turn.activePlayer;
  const activeSetup = state.players[activePlayer - 1];

  return (
    <Card>
      <CardHeader className="bg-surface0/50 pb-2">
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-yellow" />
          <CardTitle className="text-lg">Warlord</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="text-center">
          <div className="text-lg font-bold text-text mb-1">
            {activeSetup.name || `Player ${activePlayer}`}
          </div>
          <div className="text-sm text-subtext0">
            Active this turn
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
