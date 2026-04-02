import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const IMPERIAL_FISTS_UNIQUE_UNITS: Unit[] = [
  {
    id: 'tor-garadon',
    name: 'Tor Garadon',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'IMPERIAL FISTS', 'INFANTRY', 'CHARACTER', 'CAPTAIN', 'GRAVIS', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 5, toughness: 6, save: 3, wounds: 6, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 90,
    }],
    weapons: [
      { weaponId: 'artificerGravGun', isDefault: true, cost: 0 },
      { weaponId: 'handOfDefiance', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'artificer-of-the-fist',
        name: 'Artificer of the Fist',
        description: 'At the start of your Command phase, select one friendly IMPERIAL FISTS VEHICLE or MONSTER unit within 6". That unit regains 1 lost wound.',
      },
    ],
    notes: 'Artificer Armoured Character',
  },
  {
    id: 'darnath-lysander',
    name: 'Darnath Lysander',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'IMPERIAL FISTS', 'INFANTRY', 'CHARACTER', 'CAPTAIN', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 5, toughness: 5, save: 2, wounds: 7, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 100,
    }],
    weapons: [
      { weaponId: 'fistOfDorn', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'shield-of Honour',
        name: 'Shield of Honour',
        description: 'While the bearer is leading a unit, models in that unit have a 4+ invulnerable save.',
      },
    ],
    notes: 'Defender of the Phalanx',
  },
];

const IMPERIAL_FISTS_DETACHMENTS: Detachment[] = [
  {
    id: 'imperial-fists-detachment',
    name: 'Siege Brothers',
    description: 'The Imperial Fists\' mastery of siege warfare and defensive combat.',
    rule: {
      id: 'bolter-drill',
      name: 'Bolter Drill',
      description: 'Each time a model in this unit makes a ranged attack with a Bolt weapon, an unmodified Hit roll of 5+ scores 1 additional hit.',
    },
    enhancements: [
      {
        id: 'standard-of-the-emperor-defiant',
        name: 'Standard of the Emperor Defiant',
        points: 30,
        description: 'Add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer\'s unit.',
      },
      {
        id: 'sentinel-plating',
        name: 'Sentinel Plating',
        points: 20,
        description: 'The bearer has a 4+ invulnerable save.',
      },
      {
        id: 'thunder-hammer',
        name: 'The Wall',
        points: 25,
        description: 'The bearer has the Feel No Pain 5+ ability.',
      },
    ],
    stratagems: [
      {
        id: 'shattered-fragment',
        name: 'Shattered Fragment',
        cost: 1,
        description: 'Each time a model in this unit makes a ranged attack, add 1 to the Hit roll.',
      },
      {
        id: 'stone-guardian',
        name: 'Stone Guardian',
        cost: 1,
        description: 'Add 1 to the Save characteristic of models in this unit until the end of the turn.',
      },
      {
        id: 'final-verdict',
        name: 'Final Verdict',
        cost: 2,
        description: 'Each time a model in this unit makes a ranged attack with a Bolt weapon, on an unmodified Hit roll of 5+, resolve one additional hit.',
      },
    ],
  },
];

export const imperialFists: Faction = {
  id: 'imperial-fists',
  name: 'Imperial Fists',
  icon: 'fortress',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'IMPERIAL FISTS'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS, ...IMPERIAL_FISTS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...IMPERIAL_FISTS_DETACHMENTS],
  uniqueUnits: [...IMPERIAL_FISTS_UNIQUE_UNITS],
  uniqueDetachments: [...IMPERIAL_FISTS_DETACHMENTS],
};
