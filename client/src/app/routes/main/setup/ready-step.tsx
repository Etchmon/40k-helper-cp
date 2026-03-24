import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFactionById, getCombatPatrolRoster } from '@/data';
import { getMissionById } from '@/data/missions/only-war';
import { POINTS_BY_SIZE, CombatPatrolUnit, CombatPatrolEnhancement } from '@/types/game';

interface ReadyStepProps {
  onStart: () => void;
  onBack: () => void;
}

export function ReadyStep({ onStart, onBack }: ReadyStepProps) {
  const { state } = useGame();
  const isCombatPatrol = state.settings.gameSize === 'combat-patrol';
  const maxPoints = POINTS_BY_SIZE[state.settings.gameSize];
  const mission = getMissionById(state.settings.missionId);

  const player1Faction = getFactionById(state.players[0].factionId || '');
  const player2Faction = getFactionById(state.players[1].factionId || '');
  const player1Detachment = player1Faction?.detachments.find(d => d.id === state.players[0].detachmentId);
  const player2Detachment = player2Faction?.detachments.find(d => d.id === state.players[1].detachmentId);
  const player1Roster = state.players[0].factionId ? getCombatPatrolRoster(state.players[0].factionId) : undefined;
  const player2Roster = state.players[1].factionId ? getCombatPatrolRoster(state.players[1].factionId) : undefined;

  const renderPlayerCard = (playerIndex: 0 | 1, isPlayer1: boolean) => {
    const faction = isPlayer1 ? player1Faction : player2Faction;
    const roster = isPlayer1 ? player1Roster : player2Roster;
    const player = state.players[playerIndex];
    const enhancement = roster?.enhancements.find((e: CombatPatrolEnhancement) => e.id === player.enhancementIds[0]);

    if (isCombatPatrol && roster) {
      return (
        <Card className={isPlayer1 ? "border-green/50" : "border-red/50"}>
          <CardHeader className={isPlayer1 ? "bg-green/10" : "bg-red/10"}>
            <CardTitle className={isPlayer1 ? "text-green" : "text-red"}>
              {player.name || `Player ${playerIndex + 1}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-subtext0">Faction:</span>
              <span className="text-text font-medium">{faction?.name || 'None'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-subtext0">Combat Patrol:</span>
              <span className="text-text font-medium text-mauve">{roster.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-subtext0">Warlord:</span>
              <span className="text-text font-medium">{roster.warlordName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-subtext0">Units:</span>
              <span className="text-text font-medium">{roster.units.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-subtext0">Enhancement:</span>
              <span className="text-text font-medium">{enhancement?.name || 'Default'}</span>
            </div>
          </CardContent>
        </Card>
      );
    }

    const detachment = isPlayer1 ? player1Detachment : player2Detachment;
    return (
      <Card className={isPlayer1 ? "border-blue/50" : "border-red/50"}>
        <CardHeader className={isPlayer1 ? "bg-blue/10" : "bg-red/10"}>
          <CardTitle className={isPlayer1 ? "text-blue" : "text-red"}>
            {player.name || `Player ${playerIndex + 1}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-subtext0">Faction:</span>
            <span className="text-text font-medium">{faction?.name || 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtext0">Detachment:</span>
            <span className="text-text font-medium">{detachment?.name || 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtext0">Army Points:</span>
            <span className="text-text font-medium font-mono">
              {player.totalPoints} / {maxPoints}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtext0">Units:</span>
            <span className="text-text font-medium">{player.army.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-subtext0">Enhancements:</span>
            <span className="text-text font-medium">{player.enhancementIds.length}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text mb-2">Ready for Battle</h2>
        <p className="text-subtext0">
          {isCombatPatrol 
            ? "Review your Combat Patrol forces and begin the game" 
            : "Review your armies and begin the game"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderPlayerCard(0, true)}
        {renderPlayerCard(1, false)}
      </div>

      {isCombatPatrol && player1Roster && (
        <Card className="border-mauve/30">
          <CardHeader className="bg-mauve/10">
            <CardTitle>Combat Patrol Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {player1Roster.units.map((unit: CombatPatrolUnit) => (
                <div key={unit.id} className="flex justify-between bg-surface0/30 p-2 rounded">
                  <span className="text-text">{unit.name}</span>
                  <span className="text-subtext0">x{unit.models}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Mission: {mission?.name || 'Unknown'}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-subtext0">{mission?.briefing}</p>
          <div className="mt-4 p-4 bg-surface0/50 rounded-lg">
            <h4 className="font-semibold text-text mb-2">Deployment</h4>
            <p className="text-sm text-subtext0">{mission?.deploymentInstructions}</p>
          </div>
        </CardContent>
      </Card>

      <div className="bg-mauve/10 border border-mauve/50 rounded-lg p-4 text-center">
        <p className="text-text">
          <strong>Game Size:</strong> {isCombatPatrol ? 'Combat Patrol' : state.settings.gameSize} ({maxPoints} points)
        </p>
        {isCombatPatrol && (
          <p className="text-sm text-subtext0 mt-1">
            Pre-set rosters with predetermined warlords
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button size="lg" onClick={onStart}>
          Begin Battle! ⚔️
        </Button>
      </div>
    </div>
  );
}
