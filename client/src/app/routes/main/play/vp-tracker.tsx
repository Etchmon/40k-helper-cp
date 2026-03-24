import { useState, useCallback } from 'react';
import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ChevronRight, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function VPTracker() {
  const { state, dispatch } = useGame();
  const { toast } = useToast();
  const { battle, players } = state;
  const [showScoring, setShowScoring] = useState(false);

  const handleAddVP = useCallback((player: 1 | 2, points: number, reason: string) => {
    const playerName = players[player - 1].name || `Player ${player}`;
    dispatch({ type: 'ADD_VP', payload: { player, points, reason } });
    dispatch({ type: 'ADD_ACTION_LOG', payload: {
      player,
      type: 'vp-scored',
      description: `Scored ${points} VP: ${reason}`,
      details: { points, reason }
    }});
    toast.success(`${playerName} scored ${points} VP`, reason);
    setShowScoring(false);
  }, [dispatch, players, toast]);

  const handleScorePrimary = useCallback(() => {
    const player = state.turn.activePlayer;
    const playerName = players[player - 1].name || `Player ${player}`;
    dispatch({ type: 'ADD_VP', payload: { player, points: 1, reason: 'Primary Objective' } });
    dispatch({ type: 'ADD_ACTION_LOG', payload: {
      player,
      type: 'vp-scored',
      description: 'Scored 1 VP: Primary Objective',
    }});
    toast.success(`${playerName} scored +1 VP`, 'Primary Objective');
  }, [dispatch, state.turn.activePlayer, players, toast]);

  const handleSwitchTurn = useCallback(() => {
    const currentPlayer = state.turn.activePlayer;
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    const nextPlayerName = players[nextPlayer - 1].name || `Player ${nextPlayer}`;
    dispatch({ type: 'ADD_ACTION_LOG', payload: {
      player: currentPlayer,
      type: 'turn-end',
      description: 'Ended turn'
    }});
    dispatch({ type: 'NEXT_TURN' });
    toast.info('Turn Changed', `${nextPlayerName}'s turn`);
  }, [dispatch, state.turn.activePlayer, players, toast]);

  const handleNextRound = useCallback(() => {
    const nextRound = state.turn.round + 1;
    dispatch({ type: 'ADD_ACTION_LOG', payload: {
      player: state.turn.activePlayer,
      type: 'round-end',
      description: `Ended Round ${state.turn.round}`
    }});
    dispatch({ type: 'NEXT_ROUND' });
    if (nextRound <= 5) {
      toast.warning('New Round', `Round ${nextRound} begins`);
    }
  }, [dispatch, state.turn.round, state.turn.activePlayer, toast]);

  const canEndGame = state.turn.round === 5 && state.turn.phase === 'fight';

  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="bg-surface0/50 pb-2">
        <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5 text-yellow" />
          Victory Points
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className={`text-center p-4 rounded-xl ${
            battle.victoryPoints[0] > battle.victoryPoints[1]
              ? 'bg-blue/20 border-2 border-blue/50'
              : 'bg-surface0/50'
          }`}>
            <div className="text-xs text-subtext0 mb-1 truncate">
              {players[0].name || 'Player 1'}
            </div>
            <div className="text-4xl font-bold font-mono text-blue">
              {battle.victoryPoints[0]}
            </div>
          </div>
          <div className={`text-center p-4 rounded-xl ${
            battle.victoryPoints[1] > battle.victoryPoints[0]
              ? 'bg-red/20 border-2 border-red/50'
              : 'bg-surface0/50'
          }`}>
            <div className="text-xs text-subtext0 mb-1 truncate">
              {players[1].name || 'Player 2'}
            </div>
            <div className="text-4xl font-bold font-mono text-red">
              {battle.victoryPoints[1]}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            variant="default"
            onClick={handleScorePrimary}
            className="flex-1 h-14 text-lg font-semibold"
          >
            <Plus className="w-6 h-6 mr-2" />
            +1 Primary
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowScoring(!showScoring)}
            className="flex-1 h-14 text-base"
          >
            Score
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {showScoring && (
          <div className="border-2 border-surface0 rounded-xl p-4 mb-4 bg-surface0/30">
            <h4 className="text-sm font-semibold text-text mb-3">Quick Score</h4>
            <div className="space-y-3">
              {[1, 2].map((player) => (
                <div key={player} className="space-y-2">
                  <div className="text-xs text-subtext0 font-medium">
                    {players[player - 1].name || `Player ${player}`}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddVP(player as 1 | 2, 1, 'Secondary')}
                      className="h-12 text-base font-semibold"
                    >
                      +1
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddVP(player as 1 | 2, 2, 'Secondary')}
                      className="h-12 text-base font-semibold"
                    >
                      +2
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleAddVP(player as 1 | 2, 5, 'Slay the Warlord')}
                      className="h-12 text-base font-semibold"
                    >
                      +5
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleSwitchTurn}
            className="h-14 text-base font-medium"
          >
            End Turn
          </Button>
          <Button
            variant="outline"
            onClick={handleNextRound}
            className="h-14 text-base font-medium"
          >
            Next Round
          </Button>
        </div>

        {canEndGame && (
          <div className="mt-4 p-4 bg-mauve/20 border-2 border-mauve/50 rounded-xl text-center">
            <p className="text-sm text-mauve font-medium">
              Final round! After this turn, the battle ends.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
