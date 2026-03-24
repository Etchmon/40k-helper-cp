import { Faction, Unit } from '../types/game';
import { SPACE_MARINE_CHAPTERS, ultramarines, darkAngels, bloodAngels, spaceWolves, blackTemplars, whiteScars, imperialFists, ravenGuard, ironHands, salamanders } from './factions/space-marines';
import { orks } from './factions/orks';
import { tyranids } from './factions/tyranids';
import { COMBAT_PATROL_ROSTERS } from './combat-patrol';

export const FACTIONS: Faction[] = [
  ...SPACE_MARINE_CHAPTERS,
  orks,
  tyranids,
];

export const FACTIONS_BY_ID: Record<string, Faction> = Object.fromEntries(
  FACTIONS.map(f => [f.id, f])
);

export function getFactionById(id: string): Faction | undefined {
  return FACTIONS_BY_ID[id];
}

export function getFactionsBySuperFaction(superFaction: 'imperium' | 'chaos' | 'xenos'): Faction[] {
  return FACTIONS.filter(f => f.superFaction === superFaction);
}

export function getUnitById(unitId: string, faction: Faction): Unit | undefined {
  return faction.units?.find(u => u.id === unitId);
}

export function getCombatPatrolRoster(factionId: string): typeof COMBAT_PATROL_ROSTERS[string] | undefined {
  const rosterMap: Record<string, string> = {
    'ultramarines': 'strike-force-octavius',
    'dark-angels': 'mordekais-judgement',
    'blood-angels': 'strike-force-marcellos',
    'space-wolves': 'thoryks-void-hunters',
    'black-templars': 'siguards-crusaders',
    'white-scars': 'kors-challenge',
    'imperial-fists': 'siege-of-helios',
    'raven-guard': 'shadow-of-delvec',
    'iron-hands': 'iron-calculus',
    'salamanders': 'promethean-blight',
    'orks': 'gordrangs-gitstompas',
    'tyranids': 'insidious-infiltrators',
  };
  const rosterId = rosterMap[factionId];
  return rosterId ? COMBAT_PATROL_ROSTERS[rosterId] : undefined;
}

export {
  ultramarines,
  darkAngels,
  bloodAngels,
  spaceWolves,
  blackTemplars,
  whiteScars,
  imperialFists,
  ravenGuard,
  ironHands,
  salamanders,
  orks,
  tyranids,
  SPACE_MARINE_CHAPTERS,
  COMBAT_PATROL_ROSTERS,
};
