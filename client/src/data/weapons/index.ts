export { WEAPON_ABILITIES, getAbilityDescription } from './abilities';
export { SPACE_MARINE_WEAPONS } from './space-marines';
export { TYRANID_WEAPONS } from './tyranids';
export { ORK_WEAPONS } from './orks';

import { SPACE_MARINE_WEAPONS } from './space-marines';
import { TYRANID_WEAPONS } from './tyranids';
import { ORK_WEAPONS } from './orks';
import { Weapon } from '../../types/game';

export const ALL_WEAPONS: Record<string, Weapon> = {
  ...SPACE_MARINE_WEAPONS,
  ...TYRANID_WEAPONS,
  ...ORK_WEAPONS,
};

function normalizeWeaponId(id: string): string {
  return id.toLowerCase().replace(/[-_\s]/g, '');
}

const WEAPON_LOOKUP: Map<string, Weapon> = new Map();

export function initializeWeaponLookup(): void {
  if (WEAPON_LOOKUP.size > 0) return;
  
  for (const [key, weapon] of Object.entries(ALL_WEAPONS)) {
    WEAPON_LOOKUP.set(normalizeWeaponId(key), weapon);
    WEAPON_LOOKUP.set(normalizeWeaponId(weapon.id), weapon);
    WEAPON_LOOKUP.set(weapon.name.toLowerCase(), weapon);
  }
}

initializeWeaponLookup();

export function getWeaponById(weaponId: string): Weapon | undefined {
  if (!weaponId) return undefined;
  const normalized = normalizeWeaponId(weaponId);
  return WEAPON_LOOKUP.get(normalized);
}

export function getWeaponByName(name: string): Weapon | undefined {
  return WEAPON_LOOKUP.get(name.toLowerCase());
}
