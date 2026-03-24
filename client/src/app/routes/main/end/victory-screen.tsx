import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, Home, TrophyIcon } from 'lucide-react';

export function VictoryScreen() {
  const { state, deleteGame } = useGame();
  const navigate = useNavigate();

  const handleNewGame = () => {
    deleteGame();
    navigate('/app/game/setup');
  };

  const handleExit = () => {
    deleteGame();
    navigate('/');
  };

  const winner = state.winner;
  const isDraw = state.winner === null && state.finalScore !== null;
  const player1Score = state.finalScore?.[0] ?? state.battle.victoryPoints[0];
  const player2Score = state.finalScore?.[1] ?? state.battle.victoryPoints[1];

  return (
    <div className="min-h-screen bg-crust flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          {isDraw ? (
            <>
              <div className="text-6xl mb-4">🤝</div>
              <h1 className="text-4xl font-bold text-text mb-2">It's a Draw!</h1>
            </>
          ) : winner ? (
            <>
              <div className="text-6xl mb-4">
                {winner === 1 ? '🏆' : '🥈'}
              </div>
              <h1 className="text-4xl font-bold text-text mb-2">
                {state.players[winner - 1].name || `Player ${winner}`} Wins!
              </h1>
              <p className="text-subtext0">Congratulations on your victory!</p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">📊</div>
              <h1 className="text-4xl font-bold text-text mb-2">Game Over</h1>
            </>
          )}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Final Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className={winner === 1 ? 'scale-110' : ''}>
                <div className="text-sm text-subtext0 mb-1">
                  {state.players[0].name || 'Player 1'}
                </div>
                <div className={`text-5xl font-bold font-mono ${
                  player1Score > player2Score ? 'text-green' : player1Score < player2Score ? 'text-subtext0' : 'text-yellow'
                }`}>
                  {player1Score}
                </div>
                {winner === 1 && (
                  <div className="mt-2">
                    <TrophyIcon className="w-6 h-6 text-yellow mx-auto" />
                  </div>
                )}
              </div>
              <div className={winner === 2 ? 'scale-110' : ''}>
                <div className="text-sm text-subtext0 mb-1">
                  {state.players[1].name || 'Player 2'}
                </div>
                <div className={`text-5xl font-bold font-mono ${
                  player2Score > player1Score ? 'text-green' : player2Score < player1Score ? 'text-subtext0' : 'text-yellow'
                }`}>
                  {player2Score}
                </div>
                {winner === 2 && (
                  <div className="mt-2">
                    <TrophyIcon className="w-6 h-6 text-yellow mx-auto" />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Game Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-subtext0">Game Size</span>
                <span className="text-text capitalize">{state.settings.gameSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtext0">Rounds Played</span>
                <span className="text-text">{state.turn.round}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-subtext0">Actions Logged</span>
                <span className="text-text">{state.actionLog.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {state.actionLog.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
            </CardHeader>
            <CardContent className="max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {state.actionLog.slice(-10).reverse().map((action) => (
                  <div
                    key={action.id}
                    className="text-sm p-2 bg-surface0/50 rounded flex justify-between"
                  >
                    <span className="text-text">{action.description}</span>
                    <span className="text-subtext0 text-xs">
                      R{action.round} P{action.player}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleExit}
          >
            <Home className="w-4 h-4 mr-2" />
            Exit
          </Button>
          <Button
            className="flex-1"
            onClick={handleNewGame}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
}
