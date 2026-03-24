import { 
  GameSize, 
  POINTS_BY_SIZE, 
  Unit, 
  ArmyUnit, 
  Faction, 
  UnitRole 
} from '../../types/game';
import { getCombatPatrolRoster } from '../../data';

export interface ArmyValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  totalPoints: number;
  unitCount: number;
  isCombatPatrol?: boolean;
  combatPatrolRosterName?: string;
}

export interface ArmyBuildingRules {
  minUnits: number;
  maxUnits: number;
  requiresWarlord: boolean;
  requiresBattleLine?: boolean;
  maxEnhancements: number;
  skipArmyBuilding?: boolean;
}

export const DEFAULT_RULES: ArmyBuildingRules = {
  minUnits: 1,
  maxUnits: 100,
  requiresWarlord: true,
  requiresBattleLine: false,
  maxEnhancements: 3,
};

export const COMBAT_PATROL_RULES: ArmyBuildingRules = {
  minUnits: 0,
  maxUnits: 0,
  requiresWarlord: true,
  requiresBattleLine: false,
  maxEnhancements: 1,
  skipArmyBuilding: true,
};

export function getRulesForGameSize(size: GameSize): ArmyBuildingRules {
  if (size === 'combat-patrol') {
    return COMBAT_PATROL_RULES;
  }
  return DEFAULT_RULES;
}

export function getMaxPoints(size: GameSize): number {
  return POINTS_BY_SIZE[size];
}

export function calculateArmyPoints(
  units: ArmyUnit[],
  faction: Faction | undefined | null,
  enhancementIds: string[],
  detachmentId: string | null
): number {
  if (!faction) return 0;

  let total = 0;

  for (const armyUnit of units) {
    const unit = faction.units.find((u: Unit) => u.id === armyUnit.unitId);
    if (unit) {
      const profile = unit.profiles[0];
      total += profile.basePoints * armyUnit.quantity;
    }
  }

  if (detachmentId) {
    const detachment = faction.detachments.find((d: { id: string }) => d.id === detachmentId);
    if (detachment) {
      for (const enhancementId of enhancementIds) {
        const enhancement = detachment.enhancements.find((e: { id: string }) => e.id === enhancementId);
        if (enhancement) {
          total += enhancement.points;
        }
      }
    }
  }

  return total;
}

export function getWarlordOptions(
  faction: Faction | undefined | null,
  gameSize?: GameSize
): Unit[] {
  if (!faction) return [];

  if (gameSize === 'combat-patrol') {
    const roster = getCombatPatrolRoster(faction.id);
    if (roster) {
      return [{
        id: roster.warlordId,
        name: roster.warlordName,
        role: 'hq',
        keywords: ['CHARACTER'],
        profiles: [{ models: 1, profile: { move: 6, toughness: 4, save: 3, wounds: 5, leadership: 6, oc: 1 }, basePoints: 0 }],
        weapons: [],
        abilities: [],
      }];
    }
  }
  
  return faction.units.filter((unit: Unit) => {
    const isCharacter = unit.keywords.includes('CHARACTER');
    return isCharacter;
  });
}

export function getUnitsByRole(
  faction: Faction | undefined | null,
  role: UnitRole
): Unit[] {
  if (!faction) return [];
  return faction.units.filter((unit: Unit) => unit.role === role);
}

export function validateArmy(
  units: ArmyUnit[],
  faction: Faction | undefined | null,
  warlordId: string | null,
  enhancementIds: string[],
  detachmentId: string | null,
  gameSize: GameSize
): ArmyValidationResult {
  const rules = getRulesForGameSize(gameSize);
  const maxPoints = getMaxPoints(gameSize);
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!faction) {
    errors.push('No faction selected');
    return { isValid: false, errors, warnings, totalPoints: 0, unitCount: 0 };
  }

  if (gameSize === 'combat-patrol') {
    const roster = getCombatPatrolRoster(faction.id);
    if (roster) {
      return {
        isValid: true,
        errors: [],
        warnings: [],
        totalPoints: 0,
        unitCount: roster.units.reduce((sum: number, u: { models: number }) => sum + u.models, 0),
        isCombatPatrol: true,
        combatPatrolRosterName: roster.name,
      };
    } else {
      errors.push('No Combat Patrol roster available for this faction');
      return { isValid: false, errors, warnings, totalPoints: 0, unitCount: 0, isCombatPatrol: true };
    }
  }

  if (units.length === 0) {
    errors.push('Army must contain at least one unit');
  }

  for (const armyUnit of units) {
    const unit = faction.units.find((u: Unit) => u.id === armyUnit.unitId);
    if (!unit) continue;

    if (faction.id === 'black-templars') {
      if (unit.keywords.includes('PSYKER')) {
        errors.push(`${unit.name} cannot be taken by Black Templars (Psykers not allowed)`);
      }
      if (['gladiator-lancer', 'gladiator-reaper', 'gladiator-valiant'].includes(unit.id)) {
        errors.push(`${unit.name} cannot be taken by Black Templars`);
      }
      if (unit.id === 'impulsor') {
        errors.push(`${unit.name} cannot be taken by Black Templars`);
      }
      if (unit.id === 'repulsor') {
        errors.push(`${unit.name} cannot be taken by Black Templars`);
      }
    }

    if (faction.id === 'space-wolves') {
      if (unit.id === 'apothecary' || unit.id === 'apothecary-biologis') {
        errors.push(`${unit.name} cannot be taken by Space Wolves`);
      }
      if (unit.id === 'devastator-squad') {
        errors.push(`${unit.name} cannot be taken by Space Wolves`);
      }
      if (unit.id === 'tactical-squad') {
        errors.push(`${unit.name} cannot be taken by Space Wolves`);
      }
    }
  }

  const unitCounts: Record<string, number> = {};
  for (const armyUnit of units) {
    unitCounts[armyUnit.unitId] = (unitCounts[armyUnit.unitId] || 0) + armyUnit.quantity;
  }

  for (const [unitId, count] of Object.entries(unitCounts)) {
    if (count > 3) {
      const unit = faction.units.find((u: Unit) => u.id === unitId);
      warnings.push(`${unit?.name || unitId}: Limited to 3 units of each datasheet (currently ${count})`);
    }
  }

  const hasBattleLine = units.some((armyUnit: ArmyUnit) => {
    const unit = faction.units.find((u: Unit) => u.id === armyUnit.unitId);
    return unit?.keywords.includes('BATTLELINE');
  });

  if (rules.requiresBattleLine && !hasBattleLine && units.length > 0) {
    warnings.push('Army contains no Battle Line units');
  }

  if (rules.requiresWarlord && !warlordId) {
    errors.push('Army must have a Warlord');
  }

  if (enhancementIds.length > rules.maxEnhancements) {
    errors.push(`Maximum ${rules.maxEnhancements} enhancements allowed`);
  }

  const totalPoints = calculateArmyPoints(units, faction, enhancementIds, detachmentId);
  
  if (totalPoints > maxPoints) {
    errors.push(`Army exceeds maximum points (${totalPoints}/${maxPoints})`);
  }

  if (totalPoints < maxPoints - 50) {
    warnings.push(`Army is ${maxPoints - totalPoints} points under the limit`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    totalPoints,
    unitCount: units.reduce((sum: number, u: ArmyUnit) => sum + u.quantity, 0),
  };
}

export function createEmptyArmyUnit(unitId: string): ArmyUnit {
  return {
    unitId,
    quantity: 1,
    weapons: [],
    enhancementIds: [],
  };
}
