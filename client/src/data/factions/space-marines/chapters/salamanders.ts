import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const SALAMANDERS_UNIQUE_UNITS: Unit[] = [
  // Characters
  {
    id: 'vulkan-he-tan',
    name: "Vulkan He'stan",
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SALAMANDERS', 'INFANTRY', 'CHARACTER', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 2, wounds: 5, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 100,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'hammerOfVulkan', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'forgefather',
        name: 'Forgefather',
        description: 'At the start of your Command phase, select one friendly SALAMANDERS unit within 6". That unit has the Feel No Pain 5+ ability until the start of your next Command phase.',
      },
      {
        id: 'seeker-of-the-unfound',
        name: 'Seeker of the Unfound',
        description: 'Once per battle, at the start of your Command phase, this model can target one friendly SALAMANDERS unit within 6". That unit can shoot and charge in a turn in which it Advanced until the end of the turn.',
      },
    ],
    notes: "Forge Master of Salamanders",
  },
  // Elites
  {
    id: 'infernus-squad',
    name: 'Infernus Squad',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SALAMANDERS', 'INFANTRY', 'GRAVIS', 'INFERNI'],
    profiles: [
      {
        models: 5,
        profile: { move: 5, toughness: 5, save: 3, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 130,
      },
      {
        models: 10,
        profile: { move: 5, toughness: 5, save: 3, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 260,
      },
    ],
    weapons: [
      { weaponId: 'pyreBlaster', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'promethean-worship',
        name: 'Promethean Worship',
        description: 'Each time a model in this unit makes a ranged attack with a Pyre weapon, on an unmodified Hit roll of 5+, resolve one additional hit.',
      },
    ],
    notes: 'Flamer specialists with improved shooting',
  },
  {
    id: 'pyre-blaster',
    name: 'Pyre Blaster',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SALAMANDERS', 'INFANTRY', 'GRAVIS'],
    profiles: [{
      models: 3,
      profile: { move: 5, toughness: 5, save: 3, wounds: 3, leadership: 6, oc: 1 },
      basePoints: 110,
    }],
    weapons: [
      { weaponId: 'pyreBlaster', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'promethean-adept',
        name: 'Promethean Adept',
        description: 'Each time a model in this unit makes a ranged attack with a Pyre weapon, on an unmodified Hit roll of 5+, resolve one additional hit.',
      },
    ],
    notes: 'Elite flamer specialists',
  },
];

const SALAMANDERS_DETACHMENTS: Detachment[] = [
  {
    id: 'salamanders-detachment',
    name: 'Salamanders Pyre',
    description: 'The Salamanders\' mastery of flame and forge.',
    rule: {
      id: 'promethean-worship',
      name: 'Promethean Worship',
      description: 'Each time a model in this unit makes a ranged attack with a Pyre weapon, on an unmodified Hit roll of 5+, resolve one additional hit. Add 1 to the Strength characteristic of Pyre weapons while the target is within 12".',
    },
    enhancements: [
      {
        id: 'forge-born',
        name: 'Forge-born',
        points: 25,
        description: 'The bearer has the Feel No Pain 5+ ability.',
      },
      {
        id: 'tempered-holy-water',
        name: 'Tempered Holy Water',
        points: 20,
        description: 'Add 1 to the Damage characteristic of Pyre weapons the bearer is equipped with.',
      },
      {
        id: 'dawn-of-wrath',
        name: 'Dawn of Wrath',
        points: 30,
        description: 'Once per battle, in your Shooting phase, the bearer can fire their weapons twice.',
      },
    ],
    stratagems: [
      {
        id: 'flamecraft',
        name: 'Flamecraft',
        cost: 1,
        description: 'Each time a model in this unit makes a ranged attack with a Pyre weapon, add 1 to the Hit roll.',
      },
      {
        id: 'blazing-fury',
        name: 'Blazing Fury',
        cost: 1,
        description: 'Add 1 to the Strength characteristic of Pyre weapons equipped by models in this unit until the end of the turn.',
      },
      {
        id: 'warmest-light',
        name: 'Warmest Light',
        cost: 2,
        description: 'This unit can shoot and charge in a turn in which it Advanced.',
      },
    ],
  },
];

export const salamanders: Faction = {
  id: 'salamanders',
  name: 'Salamanders',
  icon: 'flame',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SALAMANDERS'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS, ...SALAMANDERS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...SALAMANDERS_DETACHMENTS],
  uniqueUnits: [...SALAMANDERS_UNIQUE_UNITS],
  uniqueDetachments: [...SALAMANDERS_DETACHMENTS],
};
