import { useEffect, useState, useCallback } from 'react';
import { useGame } from '@/lib/game/store';
import { PhasePanel } from './phase-panel';
import { VPTracker } from './vp-tracker';
import { CPTracker } from '@/features/battle/components/cp-display';
import { StratagemPanel } from '@/features/battle/components/stratagem-panel';
import { UnitAbilityPanel } from '@/features/battle/components/unit-ability-panel';
import { ArmyUnitList } from '@/features/battle/components/army-unit-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Save, RotateCcw, Menu, X, Target, Scroll, Trophy, Plus, Minus } from 'lucide-react';
import { getMissionById } from '@/data/missions/only-war';
import { useNavigate } from 'react-router-dom';
import { confirm } from '@/components/ui/confirm-dialog';
import { useToast } from '@/hooks/use-toast';

export function GameBoard() {
  const { state, dispatch, saveGame } = useGame();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const mission = getMissionById(state.settings.missionId);
  const activePlayer = state.turn.activePlayer;
  const player1CP = state.battle.commandPoints.current[0] ?? 0;
  const player2CP = state.battle.commandPoints.current[1] ?? 0;

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
    <div className="min-h-screen bg-crust lg:pb-0">
      {/* Mobile Header */}
      <header className="lg:hidden bg-crust/95 border-b border-surface0 sticky top-0 z-20 backdrop-blur-md safe-area-inset-top">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center min-w-[40px]">
                <span className="text-[10px] text-overlay1 uppercase tracking-wider">Rnd</span>
                <span className="text-2xl font-bold text-mauve leading-none">{state.turn.round}</span>
              </div>
              <div className="w-px h-8 bg-surface0" />
              <div className="flex flex-col">
                <span className="text-[10px] text-overlay1 uppercase tracking-wider">Turn</span>
                <span className="text-sm font-semibold text-text truncate max-w-[100px]">
                  {state.players[activePlayer - 1]?.name || `P${activePlayer}`}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile VP & CP Display */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-blue font-bold">{state.battle.victoryPoints[0] ?? 0}</span>
                  <span className="text-overlay1">VP</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow font-bold">{player1CP}</span>
                  <span className="text-surface1 text-xs">CP</span>
                </div>
                <span className="text-surface0">|</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow font-bold">{player2CP}</span>
                  <span className="text-surface1 text-xs">CP</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red font-bold">{state.battle.victoryPoints[1] ?? 0}</span>
                  <span className="text-overlay1">VP</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute left-0 right-0 bg-crust border-b border-surface0 px-4 py-4 space-y-2 z-30">
            <Button
              variant="ghost"
              onClick={() => { handleSave(); setShowMobileMenu(false); }}
              className="w-full justify-start text-base hover:bg-surface0"
            >
              <Save className="w-5 h-5 mr-3" />
              Save Game
            </Button>
            <Button
              variant="ghost"
              onClick={() => { handleNewGame(); setShowMobileMenu(false); }}
              className="w-full justify-start text-base hover:bg-surface0"
            >
              <RotateCcw className="w-5 h-5 mr-3" />
              New Game
            </Button>
            <Button
              variant="ghost"
              onClick={() => { handleQuit(); setShowMobileMenu(false); }}
              className="w-full justify-start text-base text-red hover:bg-surface0"
            >
              <LogOut className="w-5 h-5 mr-3" />
              End Game
            </Button>
          </div>
        )}
      </header>

      {/* Desktop Header - Full Info Bar */}
      <header className="hidden lg:block bg-crust/95 border-b border-surface0 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Left: Round, Turn, Player */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-overlay1 uppercase tracking-wider">Round</span>
                  <span className="text-xl font-bold text-mauve leading-none">{state.turn.round}</span>
                </div>
              </div>
              <div className="h-6 w-px bg-surface0" />
              <div className="flex flex-col">
                <span className="text-[9px] text-overlay1 uppercase tracking-wider">Turn</span>
                <span className="text-sm font-semibold text-text">
                  {state.players[activePlayer - 1]?.name || `Player ${activePlayer}`}
                </span>
              </div>
            </div>
            
            {/* Center: VP & CP for both players with +/- controls */}
            <div className="flex items-center gap-6">
              {/* Player 1 */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-blue w-20 truncate">{state.players[0]?.name || 'P1'}</span>
                
                {/* VP with controls */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    dispatch({ type: 'ADD_VP', payload: { player: 1, points: -1, reason: 'Manual' }});
                  }}><Minus className="w-3 h-3" /></Button>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-blue/10 rounded border border-blue/30 min-w-[36px] justify-center">
                    <span className="text-base font-bold text-blue">{state.battle.victoryPoints[0] ?? 0}</span>
                    <span className="text-[9px] text-overlay1">VP</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    dispatch({ type: 'ADD_VP', payload: { player: 1, points: 1, reason: 'Manual' }});
                  }}><Plus className="w-3 h-3" /></Button>
                </div>
                
                {/* CP with controls */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    if (player1CP > 0) dispatch({ type: 'SPEND_CP', payload: { player: 1, amount: 1, reason: 'Manual' }});
                  }}><Minus className="w-3 h-3" /></Button>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow/10 rounded border border-yellow/30 min-w-[36px] justify-center">
                    <span className="text-base font-bold text-yellow">{player1CP}</span>
                    <span className="text-[9px] text-surface1">CP</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    dispatch({ type: 'GAIN_CP', payload: { player: 1, amount: 1, reason: 'Manual' }});
                  }}><Plus className="w-3 h-3" /></Button>
                </div>
              </div>

              <span className="text-surface0 text-xs">||</span>

              {/* Player 2 */}
              <div className="flex items-center gap-3">
                {/* CP with controls */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    if (player2CP > 0) dispatch({ type: 'SPEND_CP', payload: { player: 2, amount: 1, reason: 'Manual' }});
                  }}><Minus className="w-3 h-3" /></Button>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow/10 rounded border border-yellow/30 min-w-[36px] justify-center">
                    <span className="text-base font-bold text-yellow">{player2CP}</span>
                    <span className="text-[9px] text-surface1">CP</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    dispatch({ type: 'GAIN_CP', payload: { player: 2, amount: 1, reason: 'Manual' }});
                  }}><Plus className="w-3 h-3" /></Button>
                </div>
                
                {/* VP with controls */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    dispatch({ type: 'ADD_VP', payload: { player: 2, points: -1, reason: 'Manual' }});
                  }}><Minus className="w-3 h-3" /></Button>
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-red/10 rounded border border-red/30 min-w-[36px] justify-center">
                    <span className="text-base font-bold text-red">{state.battle.victoryPoints[1] ?? 0}</span>
                    <span className="text-[9px] text-overlay1">VP</span>
                  </div>
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6" onClick={() => {
                    dispatch({ type: 'ADD_VP', payload: { player: 2, points: 1, reason: 'Manual' }});
                  }}><Plus className="w-3 h-3" /></Button>
                </div>
                
                <span className="text-sm font-medium text-red w-20 text-right truncate">{state.players[1]?.name || 'P2'}</span>
              </div>
            </div>

            {/* Right: Mission + Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface0/50 rounded-lg border border-surface1">
                <Target className="w-4 h-4 text-mauve" />
                <span className="text-sm text-subtext0">{mission?.name || 'Unknown'}</span>
              </div>
              <Button variant="outline" size="sm" className="h-8" onClick={handleNewGame}>
                <RotateCcw className="w-3 h-3 mr-1" />
                <span className="text-xs">New</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
                <Save className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleQuit}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Main Content - Single Page Layout */}
      <main className="hidden lg:flex lg:flex-col max-w-[1600px] mx-auto px-2 py-2" style={{ height: 'calc(100vh - 60px)' }}>
        {/* Top: Phase + Selected Unit + Stratagems */}
        <div className="grid grid-cols-3 gap-2" style={{ height: '56%' }}>
          {/* Left: Phase Panel */}
          <div className="overflow-hidden h-full">
            <PhasePanel />
          </div>
          
          {/* Middle: Selected Unit */}
          <div className="overflow-hidden h-full">
            <UnitAbilityPanel />
          </div>
          
          {/* Right: Stratagems */}
          <div className="overflow-hidden h-full">
            <StratagemPanel />
          </div>
        </div>

        {/* Bottom: Army Unit List - fills remaining space */}
        <div className="mt-2" style={{ height: '42%' }}>
          <ArmyUnitList horizontal />
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
            <ArmyUnitList />
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
