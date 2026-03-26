'use client';

import { useGame } from '@/lib/game/store';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CPTrackerProps {
  className?: string;
}

export function CPTracker({ className = '' }: CPTrackerProps) {
  const { state, dispatch } = useGame();
  const { commandPoints } = state.battle;
  const { turn, players } = state;

  const player1CP = commandPoints.current[0];
  const player2CP = commandPoints.current[1];
  const player1Name = players[0].name || 'Player 1';
  const player2Name = players[1].name || 'Player 2';
  const isPlayer1Turn = turn.isPlayer1Turn;

  const handleQuickSpend = (cost: number, name: string) => {
    const currentPlayer = isPlayer1Turn ? 1 : 2;
    const currentCP = isPlayer1Turn ? player1CP : player2CP;
    
    if (currentCP >= cost) {
      dispatch({
        type: 'SPEND_CP',
        payload: {
          player: currentPlayer,
          amount: cost,
          reason: name,
        },
      });
      dispatch({
        type: 'ADD_ACTION_LOG',
        payload: {
          player: currentPlayer,
          type: 'spend-cp',
          description: `Spent ${cost} CP on ${name}`,
        },
      });
    }
  };

  return (
    <div className={className}>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Player 1 CP */}
            <div className={`p-4 rounded-lg border-2 transition-colors ${
              isPlayer1Turn && turn.phase === 'command' 
                ? 'bg-blue/10 border-blue' 
                : 'bg-surface0/50 border-surface2'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">{player1Name}</span>
                {isPlayer1Turn && turn.phase === 'command' && (
                  <span className="text-xs text-blue">Active</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-surface0 border border-surface2 flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow">{player1CP}</span>
                </div>
                <span className="text-xs text-subtext0">CP</span>
              </div>
            </div>

            {/* Player 2 CP */}
            <div className={`p-4 rounded-lg border-2 transition-colors ${
              !isPlayer1Turn && turn.phase === 'command' 
                ? 'bg-red/10 border-red' 
                : 'bg-surface0/50 border-surface2'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text">{player2Name}</span>
                {!isPlayer1Turn && turn.phase === 'command' && (
                  <span className="text-xs text-red">Active</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-lg bg-surface0 border border-surface2 flex items-center justify-center">
                  <span className="text-2xl font-bold text-yellow">{player2CP}</span>
                </div>
                <span className="text-xs text-subtext0">CP</span>
              </div>
            </div>
          </div>

          {/* Quick Spend Buttons */}
          <div className="mt-4">
            <p className="text-xs text-subtext0 mb-2">Quick Spend (Active Player)</p>
            <div className="flex gap-2">
              {[1, 2, 3].map((cost) => {
                const currentCP = isPlayer1Turn ? player1CP : player2CP;
                const canSpend = currentCP >= cost;
                return (
                  <Button
                    key={cost}
                    variant={canSpend ? 'default' : 'ghost'}
                    size="sm"
                    disabled={!canSpend}
                    onClick={() => handleQuickSpend(cost, `Stratagem (${cost} CP)`)}
                  >
                    -{cost} CP
                  </Button>
                );
              })}
            </div>
          </div>

          {/* CP Info */}
          <div className="mt-4 p-3 bg-surface0/50 rounded-lg">
            <p className="text-xs text-subtext0">
              <span className="font-medium text-text">CP Rules (10th Ed):</span><br />
              • Both players gain 1 CP at start of their Command phase<br />
              • Each player can gain max 1 additional CP/round from other sources
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CPTracker;
