import { Stratagem, StratagemPhase, Phase } from '../types/game';
import { UNIVERSAL_STRATAGEMS } from '../data/stratagems';
import { getFactionById } from '../data';

export interface StratagemWithSource extends Stratagem {
  source: 'universal' | 'detachment' | 'enhancement';
  detachmentId?: string;
  detachmentName?: string;
  isUniversal?: boolean;
  isAvailableNow?: boolean;
}

export function isStratagemAvailableNow(
  stratagem: StratagemWithSource,
  currentPhase: Phase
): boolean {
  const phases = stratagem.phases || ['any'];
  return (
    phases.includes('any') ||
    phases.includes(currentPhase as StratagemPhase) ||
    (currentPhase === 'command' && phases.includes('end-opponent-movement'))
  );
}

export function getAllStratagems(
  factionId: string | null,
  detachmentId: string | null
): StratagemWithSource[] {
  const stratagems: StratagemWithSource[] = [];

  if (!factionId) return stratagems;

  const faction = getFactionById(factionId);
  if (!faction) return stratagems;

  stratagems.push(
    ...UNIVERSAL_STRATAGEMS.map(s => ({
      ...s,
      source: 'universal' as const,
      isUniversal: true,
    }))
  );

  if (detachmentId) {
    const detachment = faction.detachments?.find(d => d.id === detachmentId);
    if (detachment) {
      stratagems.push(
        ...detachment.stratagems.map(s => ({
          ...s,
          source: 'detachment' as const,
          detachmentId: detachment.id,
          detachmentName: detachment.name,
        }))
      );
    }
  }

  return stratagems;
}

export function getStratagemsByPhase(
  stratagems: StratagemWithSource[],
  currentPhase: Phase,
  isOpponentPhase: boolean = false
): StratagemWithSource[] {
  const phaseMap: Record<Phase, StratagemPhase> = {
    command: 'command',
    movement: isOpponentPhase ? 'opponent-movement' : 'movement',
    shooting: isOpponentPhase ? 'opponent-shooting' : 'shooting',
    charge: isOpponentPhase ? 'opponent-charge' : 'charge',
    fight: isOpponentPhase ? 'opponent-fight' : 'fight',
  };

  const targetPhase = phaseMap[currentPhase];

  return stratagems.filter(s => {
    if (!s.phases) return true;
    if (s.phases.includes('any')) return true;
    if (s.phases.includes(targetPhase)) return true;
    if (currentPhase === 'command' && s.phases.includes('end-opponent-movement')) return false;
    return false;
  });
}

export function getStratagemsByType(
  stratagems: StratagemWithSource[]
): Record<string, StratagemWithSource[]> {
  const grouped: Record<string, StratagemWithSource[]> = {
    'Battle Tactic': [],
    'Epic Deed': [],
    'Strategic Ploy': [],
    'Wargear': [],
    'Other': [],
  };

  stratagems.forEach(s => {
    const type = s.type || 'Other';
    if (grouped[type]) {
      grouped[type].push(s);
    } else {
      grouped['Other'].push(s);
    }
  });

  return grouped;
}

export function filterStratagemsByCost(
  stratagems: StratagemWithSource[],
  currentCP: number
): StratagemWithSource[] {
  return stratagems.filter(s => s.cost <= currentCP);
}

export function sortStratagemsByCost(
  stratagems: StratagemWithSource[]
): StratagemWithSource[] {
  return [...stratagems].sort((a, b) => a.cost - b.cost);
}

export function canUseStratagem(
  stratagem: StratagemWithSource,
  currentCP: number
): { canUse: boolean; reason?: string } {
  if (stratagem.cost > currentCP) {
    return { canUse: false, reason: `Not enough CP (need ${stratagem.cost}, have ${currentCP})` };
  }
  return { canUse: true };
}
