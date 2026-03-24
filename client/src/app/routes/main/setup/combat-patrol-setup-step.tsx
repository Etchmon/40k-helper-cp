import { useGame } from '@/lib/game/store';
import { getCombatPatrolRoster } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CombatPatrolEnhancement, CombatPatrolUnit } from '@/types/game';

interface CombatPatrolSetupStepProps {
  currentPlayer: 1 | 2;
  onNext: () => void;
  onBack: () => void;
}

export function CombatPatrolSetupStep({ currentPlayer, onNext, onBack }: CombatPatrolSetupStepProps) {
  const { state, dispatch } = useGame();
  const playerSetup = state.players[currentPlayer - 1];
  const playerName = playerSetup.name || `Player ${currentPlayer}`;
  const factionId = playerSetup.factionId;
  
  const roster = factionId ? getCombatPatrolRoster(factionId) : undefined;

  if (!roster) {
    return (
      <div className="text-center py-8">
        <p className="text-red">No Combat Patrol roster available for this faction.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  const defaultEnhancement = roster.enhancements.find((e: CombatPatrolEnhancement) => e.isDefault);
  const optionalEnhancement = roster.enhancements.find((e: CombatPatrolEnhancement) => !e.isDefault);

  const handleSelectEnhancement = (enhancementId: string) => {
    dispatch({ type: 'ADD_ENHANCEMENT', payload: { player: currentPlayer, enhancementId } });
  };

  const selectedEnhancement = playerSetup.enhancementIds[0] || defaultEnhancement?.id;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text mb-2">
          {playerName}'s Combat Patrol
        </h2>
        <p className="text-mauve font-medium">{roster.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green/30 bg-green/5">
          <CardHeader className="bg-surface0/50">
            <CardTitle className="text-green">Pre-set Roster</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-subtext0 mb-2">COMMANDER</h3>
                <div className="bg-surface0/30 p-3 rounded-lg border border-green/20">
                  <div className="font-bold text-text">{roster.warlordName}</div>
                  <div className="text-sm text-green">Warlord (pre-selected)</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-subtext0 mb-2">UNITS</h3>
                <div className="space-y-2">
                  {roster.units.filter((u: CombatPatrolUnit) => u.id !== roster.warlordId).map((unit: CombatPatrolUnit) => (
                    <div key={unit.id} className="bg-surface0/30 p-3 rounded-lg">
                      <div className="font-medium text-text">{unit.name}</div>
                      <div className="text-sm text-subtext0">{unit.models} models</div>
                      {unit.notes && (
                        <div className="text-xs text-overlay0 mt-1">{unit.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-overlay0/20">
                <p className="text-sm text-subtext0">
                  <span className="font-semibold">Faction Rule:</span> {roster.factionRule || 'Oath of Moment'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-mauve/30 bg-mauve/5">
          <CardHeader className="bg-surface0/50">
            <CardTitle>Select Enhancement</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <p className="text-sm text-subtext0">
              Choose one enhancement for your Warlord. The default is pre-selected, but you can swap it.
            </p>

            <div className="space-y-3">
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEnhancement === defaultEnhancement?.id 
                    ? 'border-mauve bg-mauve/10' 
                    : 'border-overlay0 hover:border-overlay0/50'
                }`}
                onClick={() => {
                  if (defaultEnhancement) handleSelectEnhancement(defaultEnhancement.id);
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-text">{defaultEnhancement?.name}</div>
                    <div className="text-xs text-green mt-1">DEFAULT</div>
                  </div>
                  {selectedEnhancement === defaultEnhancement?.id && (
                    <div className="w-6 h-6 rounded-full bg-mauve flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-subtext0 mt-2">
                  {defaultEnhancement?.description}
                </p>
              </div>

              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedEnhancement === optionalEnhancement?.id 
                    ? 'border-mauve bg-maupe/10' 
                    : 'border-overlay0 hover:border-overlay0/50'
                }`}
                onClick={() => {
                  if (optionalEnhancement) handleSelectEnhancement(optionalEnhancement.id);
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-text">{optionalEnhancement?.name}</div>
                    <div className="text-xs text-yellow mt-1">OPTIONAL</div>
                  </div>
                  {selectedEnhancement === optionalEnhancement?.id && (
                    <div className="w-6 h-6 rounded-full bg-mauve flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-subtext0 mt-2">
                  {optionalEnhancement?.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
