import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GAME_SIZES, GameSize, POINTS_BY_SIZE } from '@/types/game';

interface GameSettingsStepProps {
  onNext: () => void;
}

export function GameSettingsStep({ onNext }: GameSettingsStepProps) {
  const { state, dispatch } = useGame();

  const handleSizeSelect = (size: GameSize) => {
    dispatch({ type: 'SET_GAME_SIZE', payload: size });
  };

  const handlePlayer1Name = (name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: { player: 1, name } });
  };

  const handlePlayer2Name = (name: string) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: { player: 2, name } });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Game Settings</CardTitle>
          <CardDescription>Select your game size and enter player names</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Game Size
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {GAME_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSizeSelect(size.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    state.settings.gameSize === size.id
                      ? 'border-mauve bg-mauve/10'
                      : 'border-surface0 bg-surface0/50 hover:border-surface1'
                  }`}
                >
                  <div className="font-semibold text-text">{size.name}</div>
                  <div className="text-sm text-subtext0">{size.description}</div>
                  <div className="mt-2 text-sm font-mono text-mauve">
                    {POINTS_BY_SIZE[size.id]} pts
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Player 1 Name
              </label>
              <input
                type="text"
                value={state.players[0].name}
                onChange={(e) => handlePlayer1Name(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-2 rounded-lg bg-surface0 border border-surface1 text-text placeholder:text-overlay0 focus:border-mauve focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                Player 2 Name
              </label>
              <input
                type="text"
                value={state.players[1].name}
                onChange={(e) => handlePlayer2Name(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-2 rounded-lg bg-surface0 border border-surface1 text-text placeholder:text-overlay0 focus:border-mauve focus:outline-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!state.players[0].name || !state.players[1].name}>
          Next: Select Factions
        </Button>
      </div>
    </div>
  );
}
