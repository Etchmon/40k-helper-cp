import { useGame, usePlayerSetup } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TEMPLAR_VOWS } from '@/types/game';

interface DetachmentStepProps {
  currentPlayer: 1 | 2;
  onNext: () => void;
  onBack: () => void;
}

export function DetachmentStep({ currentPlayer, onNext, onBack }: DetachmentStepProps) {
  const { state, dispatch } = useGame();
  const { setup, faction } = usePlayerSetup(currentPlayer);

  const playerName = state.players[currentPlayer - 1].name || `Player ${currentPlayer}`;
  const isBlackTemplars = faction?.id === 'black-templars';

  const handleSelectDetachment = (detachmentId: string) => {
    dispatch({ type: 'SET_PLAYER_DETACHMENT', payload: { player: currentPlayer, detachmentId } });
  };

  const handleSetWarlord = (warlordId: string) => {
    dispatch({ type: 'SET_WARLORD', payload: { player: currentPlayer, warlordId } });
  };

  const handleToggleEnhancement = (enhancementId: string) => {
    if (setup.enhancementIds.includes(enhancementId)) {
      dispatch({ type: 'REMOVE_ENHANCEMENT', payload: { player: currentPlayer, enhancementId } });
    } else if (setup.enhancementIds.length < 3) {
      dispatch({ type: 'ADD_ENHANCEMENT', payload: { player: currentPlayer, enhancementId } });
    }
  };

  const handleSelectTemplarVow = (vowId: string) => {
    dispatch({ type: 'SET_TEMPLAR_VOW', payload: { player: currentPlayer, vowId } });
  };

  const warlordOptions = faction?.units.filter(
    u => u.keywords.includes('CHARACTER') && setup.army.some(au => au.unitId === u.id)
  ) || [];

  const selectedDetachment = faction?.detachments.find(d => d.id === setup.detachmentId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text mb-2">
          {playerName}'s Detachment
        </h2>
        <p className="text-subtext0">Select your detachment and designate your Warlord</p>
      </div>

      {isBlackTemplars && (
        <Card className="border-orange-500/50">
          <CardHeader>
            <CardTitle className="text-orange-400">Templar Vow</CardTitle>
            <CardDescription>
              Select ONE vow for the entire battle. This vow cannot be changed once the battle begins.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TEMPLAR_VOWS.map((vow) => {
                const isSelected = setup.templarVow === vow.id;
                return (
                  <button
                    key={vow.id}
                    onClick={() => handleSelectTemplarVow(vow.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-surface0 bg-surface0/50 hover:border-surface1'
                    }`}
                  >
                    <div className="font-semibold text-text mb-1">{vow.name}</div>
                    <p className="text-sm text-subtext0">{vow.description}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Select Detachment</CardTitle>
          <CardDescription>
            Each detachment provides unique abilities and stratagems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faction?.detachments.map((detachment) => (
              <button
                key={detachment.id}
                onClick={() => handleSelectDetachment(detachment.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  setup.detachmentId === detachment.id
                    ? 'border-mauve bg-mauve/10'
                    : 'border-surface0 bg-surface0/50 hover:border-surface1'
                }`}
              >
                <div className="font-semibold text-text mb-1">{detachment.name}</div>
                <div className="text-sm text-subtext0 line-clamp-2">
                  {detachment.description}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedDetachment && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Detachment Rule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-surface0/50 rounded-lg p-4">
                <h4 className="font-semibold text-text mb-2">{selectedDetachment.rule.name}</h4>
                <p className="text-sm text-subtext0">{selectedDetachment.rule.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Enhancements ({setup.enhancementIds.length}/3)</CardTitle>
              <CardDescription>Select up to 3 enhancements for your army</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDetachment.enhancements.map((enhancement) => {
                  const isSelected = setup.enhancementIds.includes(enhancement.id);
                  return (
                    <button
                      key={enhancement.id}
                      onClick={() => handleToggleEnhancement(enhancement.id)}
                      disabled={
                        !isSelected && setup.enhancementIds.length >= 3
                      }
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        isSelected
                          ? 'border-mauve bg-mauve/10'
                          : 'border-surface0 bg-surface0/50 hover:border-surface1 disabled:opacity-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-text">{enhancement.name}</span>
                        <span className="text-sm font-mono text-mauve">
                          +{enhancement.points}
                        </span>
                      </div>
                      {enhancement.restriction && (
                        <div className="text-xs text-subtext0 mt-1">
                          {enhancement.restriction}
                        </div>
                      )}
                      <p className="text-sm text-subtext0 mt-1 line-clamp-2">
                        {enhancement.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Designate Warlord</CardTitle>
          <CardDescription>Select a Character unit as your Warlord</CardDescription>
        </CardHeader>
        <CardContent>
          {warlordOptions.length === 0 ? (
            <div className="text-center text-subtext0 py-4">
              Add Character units to your army first
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {warlordOptions.map((unit) => {
                const isSelected = setup.warlordId === unit.id;
                return (
                  <button
                    key={unit.id}
                    onClick={() => handleSetWarlord(unit.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-mauve bg-mauve/10'
                        : 'border-surface0 bg-surface0/50 hover:border-surface1'
                    }`}
                  >
                    <div className="font-medium text-text">{unit.name}</div>
                    <div className="text-sm text-subtext0 font-mono">
                      {unit.profiles[0].basePoints} pts
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!setup.detachmentId || !setup.warlordId || (isBlackTemplars && !setup.templarVow)}
        >
          {currentPlayer === 1 ? 'Next: Player 2' : 'Next: Mission'}
        </Button>
      </div>
    </div>
  );
}
