import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FACTIONS } from '@/data';
import { Faction, ArmyRule } from '@/types/game';
import { Shield, Users, Skull, Bug, Swords, Crosshair, Target, Castle, Eye, Flame } from 'lucide-react';

interface FactionSelectStepProps {
  currentPlayer: 1 | 2;
  onNext: () => void;
  onBack: () => void;
}

export function FactionSelectStep({ currentPlayer, onNext, onBack }: FactionSelectStepProps) {
  const { state, dispatch } = useGame();
  const currentSetup = state.players[currentPlayer - 1];
  const otherPlayerSetup = state.players[currentPlayer === 1 ? 1 : 0];

  const handleSelectFaction = (factionId: string) => {
    dispatch({ type: 'SET_PLAYER_FACTION', payload: { player: currentPlayer, factionId } });
  };

  const handleContinue = () => {
    if (currentPlayer === 2 || currentSetup.factionId) {
      onNext();
    }
  };

  const canProceed = currentSetup.factionId !== null;

  const spaceMarineChapters = FACTIONS.filter(f => 
    f.id === 'ultramarines' || 
    f.id === 'dark-angels' || 
    f.id === 'blood-angels' || 
    f.id === 'space-wolves' || 
    f.id === 'black-templars' ||
    f.id === 'white-scars' ||
    f.id === 'imperial-fists' ||
    f.id === 'raven-guard' ||
    f.id === 'iron-hands' ||
    f.id === 'salamanders'
  );
  const otherFactions = FACTIONS.filter(f => !spaceMarineChapters.includes(f));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-text mb-2">
          {currentPlayer === 1 ? 'Player 1' : 'Player 2'} - Select Faction
        </h2>
        <p className="text-subtext0">
          {currentPlayer === 1 
            ? `${state.players[0].name || 'Player 1'}, choose your army`
            : `${state.players[1].name || 'Player 2'}, choose your army`
          }
        </p>
      </div>

      {currentPlayer === 2 && otherPlayerSetup.factionId && (
        <div className="bg-surface0/50 rounded-lg p-3 text-center">
          <span className="text-subtext0">
            {state.players[0].name || 'Player 1'} has selected{' '}
            <span className="text-text font-semibold">
              {FACTIONS.find(f => f.id === otherPlayerSetup.factionId)?.name}
            </span>
          </span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Space Marines</CardTitle>
          <CardDescription>
            Choose your Chapter. Each has unique units, abilities, and chapter-specific detachments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {spaceMarineChapters.map((faction) => (
              <FactionCard
                key={faction.id}
                faction={faction}
                isSelected={currentSetup.factionId === faction.id}
                onSelect={() => handleSelectFaction(faction.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {otherFactions.map((faction) => (
          <FactionCard
            key={faction.id}
            faction={faction}
            isSelected={currentSetup.factionId === faction.id}
            onSelect={() => handleSelectFaction(faction.id)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!canProceed}>
          {currentPlayer === 1 ? 'Next: Player 2' : 'Next: Build Armies'}
        </Button>
      </div>
    </div>
  );
}

interface FactionCardProps {
  faction: Faction;
  isSelected: boolean;
  onSelect: () => void;
}

function getArmyRuleDescription(rule: ArmyRule): string {
  if (rule.type === 'oath-of-moment') {
    return 'Oath of Moment - Select enemy unit, reroll hits';
  }
  if (rule.type === 'templar-vows') {
    return 'Templar Vows - Choose 1 of 4 sacred vows';
  }
  return 'Army Rule';
}

function getFactionIcon(factionId: string) {
  const icons: Record<string, React.ReactNode> = {
    'ultramarines': <Shield className="w-6 h-6 text-blue" />,
    'dark-angels': <Users className="w-6 h-6 text-green" />,
    'blood-angels': <Skull className="w-6 h-6 text-red" />,
    'space-wolves': <Skull className="w-6 h-6 text-cyan" />,
    'black-templars': <Crosshair className="w-6 h-6 text-yellow" />,
    'white-scars': <Swords className="w-6 h-6 text-orange" />,
    'imperial-fists': <Castle className="w-6 h-6 text-yellow" />,
    'raven-guard': <Eye className="w-6 h-6 text-teal" />,
    'iron-hands': <Target className="w-6 h-6 text-gray" />,
    'salamanders': <Flame className="w-6 h-6 text-green" />,
    'orks': <Skull className="w-6 h-6 text-green" />,
    'tyranids': <Bug className="w-6 h-6 text-purple" />,
  };
  return icons[factionId] || <Shield className="w-6 h-6" />;
}

function getFactionColor(factionId: string): string {
  const colors: Record<string, string> = {
    'ultramarines': 'from-blue/20 to-blue/5 border-blue',
    'dark-angels': 'from-green/20 to-green/5 border-green',
    'blood-angels': 'from-red/20 to-red/5 border-red',
    'space-wolves': 'from-cyan/20 to-cyan/5 border-cyan',
    'black-templars': 'from-yellow/20 to-yellow/5 border-yellow',
    'white-scars': 'from-orange/20 to-orange/5 border-orange',
    'imperial-fists': 'from-yellow/20 to-yellow/5 border-yellow',
    'raven-guard': 'from-teal/20 to-teal/5 border-teal',
    'iron-hands': 'from-gray/20 to-gray/5 border-overlay1',
    'salamanders': 'from-green/20 to-green/5 border-green',
    'orks': 'from-green/20 to-green/5 border-green',
    'tyranids': 'from-purple/20 to-purple/5 border-mauve',
  };
  return colors[factionId] || 'from-surface/20 to-surface/5 border-surface0';
}

function FactionCard({ faction, isSelected, onSelect }: FactionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 text-center transition-all bg-gradient-to-b ${
        isSelected
          ? `${getFactionColor(faction.id)} shadow-lg`
          : 'border-surface0 bg-surface0/50 hover:border-surface1 hover:bg-surface0'
      }`}
    >
      <div className="flex justify-center mb-2">{getFactionIcon(faction.id)}</div>
      <div className="font-semibold text-text text-sm">{faction.name}</div>
      <div className="text-xs text-subtext0 mt-1 line-clamp-2">
        {getArmyRuleDescription(faction.armyRule)}
      </div>
      <div className="text-xs text-overlay0 mt-2">
        {faction.units.length} units
      </div>
    </button>
  );
}
