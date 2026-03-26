import { Faction, Unit } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const ULTRAMARINES_UNIQUE_UNITS: Unit[] = [
  {
    id: 'marneus-calgar',
    name: 'Marneus Calgar',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'ULTRAMARINES', 'INFANTRY', 'CHARACTER', 'CHAPTER MASTER', 'EPIC HERO', 'GRAVIS'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 6, save: 2, wounds: 6, leadership: 6, oc: 1 },
      basePoints: 200,
    }],
    weapons: [
      { weaponId: 'gauntletsOfUltramar', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'inspiring-leader',
        name: 'Inspiring Leader',
        description: 'While this unit is leading a unit, that unit is eligible to shoot and declare a charge in a turn in which it Advanced or Fell Back.',
      },
      {
        id: 'master-tactician',
        name: 'Master Tactician',
        description: 'At the start of your Command phase, if this model is your Warlord and is on the battlefield, you gain 1CP.',
      },
      {
        id: 'honour-guard-of-macragge',
        name: 'Honour Guard of Macragge',
        description: 'While this unit contains Victrix Honour Guard, Marneus Calgar has Feel No Pain 4+.',
      },
    ],
    notes: 'Chapter Master of Ultramarines - comes with 2 Victrix Honour Guard',
  },
  {
    id: 'cato-sicarius',
    name: 'Cato Sicarius',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'ULTRAMARINES', 'INFANTRY', 'CHARACTER', 'CAPTAIN', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 2, wounds: 5, leadership: 6, oc: 1 },
      basePoints: 85,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'terror-weapon', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'tactical-excellence',
        name: 'Tactical Excellence',
        description: 'While this model is leading a unit, add 1 to the Attacks characteristic of models in that unit.',
      },
    ],
    notes: 'Captain of the Victrix Guard',
  },
  {
    id: 'uriel-ventris',
    name: 'Uriel Ventris',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'ULTRAMARINES', 'INFANTRY', 'CHARACTER', 'LIEUTENANT', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 3, wounds: 5, leadership: 6, oc: 1 },
      basePoints: 75,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'blade-of-triumph', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'spear-of-ultramar',
        name: 'Spear of Ultramar',
        description: 'While this model is leading a unit, ranged weapons equipped by models in that unit have the ASSAULT keyword.',
      },
    ],
    notes: 'Captain of the 4th Company',
  },
];

export const ultramarines: Faction = {
  id: 'ultramarines',
  name: 'Ultramarines',
  icon: 'shield',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'ULTRAMARINES'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS, ...ULTRAMARINES_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS],
  uniqueUnits: [...ULTRAMARINES_UNIQUE_UNITS],
  uniqueDetachments: [],
};
