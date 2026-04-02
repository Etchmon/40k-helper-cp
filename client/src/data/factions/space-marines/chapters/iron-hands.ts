import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const IRON_HANDS_UNIQUE_UNITS: Unit[] = [
  {
    id: 'iron-father-feirros',
    name: 'Iron Father Feirros',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'IRON HANDS', 'INFANTRY', 'CHARACTER', 'TECHMARINE', 'EPIC HERO', 'GRAVIS'],
    profiles: [{
      models: 1,
      profile: { move: 5, toughness: 6, save: 2, wounds: 6, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 95,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'gorgonsWrath', isDefault: false, cost: 0 },
      { weaponId: 'harrowhand', isDefault: false, cost: 0 },
      { weaponId: 'medusanManipuli', isDefault: false, cost: 0 },
    ],
    abilities: [
      {
        id: 'rites-of-tempering',
        name: 'Rites of Tempering',
        description: 'While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability.',
      },
      {
        id: 'iron-father',
        name: 'Iron Father',
        description: 'While this model is within 3" of one or more friendly ADEPTUS ASTARTES VEHICLE units, it has the Lone Operative ability.',
      },
      {
        id: 'master-of-the-forge',
        name: 'Master of the Forge',
        description: 'In your Command phase, select one friendly ADEPTUS ASTARTES VEHICLE model within 3" of this model. That model regains up to 3 lost wounds and, until the start of your next Command phase, each time that VEHICLE model makes an attack, add 1 to the Hit roll.',
      },
      {
        id: 'inspiring-commander',
        name: 'Inspiring Commander',
        description: 'If you include this model in your army, until the end of the battle, non-CHARACTER models in HEAVY INTERCESSOR SQUAD units from your army have an Objective Control characteristic of 3 while they are not Battle-shocked.',
      },
    ],
    notes: 'Techmarine with mechanised aura',
  },
];

const IRON_HANDS_DETACHMENTS: Detachment[] = [
  {
    id: 'iron-hands-detachment',
    name: 'Iron Hands Claw',
    description: 'The Iron Hands\' relentless mechanized warfare doctrine.',
    rule: {
      id: 'iron-beast',
      name: 'Iron Beast',
      description: 'Each time a model in this unit makes a ranged attack, if the bearer\'s unit is a VEHICLE, add 1 to the Hit roll.',
    },
    enhancements: [
      {
        id: 'the-fist-of-iron',
        name: 'The Fist of Iron',
        points: 25,
        description: 'Add 1 to the Damage characteristic of melee weapons the bearer is equipped with.',
      },
      {
        id: 'gorgons-wrath-enhancement',
        name: "Gorgon's Wrath",
        points: 30,
        description: 'The bearer has the Feel No Pain 4+ ability.',
      },
      {
        id: 'chaplin-of-the-iron-hands',
        name: 'Claw of the Iron World',
        points: 20,
        description: 'Add 1 to the Move characteristic of the bearer\'s unit.',
      },
    ],
    stratagems: [
      {
        id: 'iron-reinforced',
        name: 'Iron Reinforced',
        cost: 1,
        description: 'The bearer\'s unit has the Feel No Pain 5+ ability until the end of the turn.',
      },
      {
        id: 'mechanised-onslaught',
        name: 'Mechanised Onslaught',
        cost: 1,
        description: 'This unit can make a Normal Move, Advance, or Fall Back.',
      },
      {
        id: 'ferrous-punishment',
        name: 'Ferrous Punishment',
        cost: 2,
        description: 'Each time a model in this unit makes a ranged attack, on an unmodified Hit roll of 5+, resolve one additional hit.',
      },
    ],
  },
];

export const ironHands: Faction = {
  id: 'iron-hands',
  name: 'Iron Hands',
  icon: 'iron-hand',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'IRON HANDS'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS, ...IRON_HANDS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...IRON_HANDS_DETACHMENTS],
  uniqueUnits: [...IRON_HANDS_UNIQUE_UNITS],
  uniqueDetachments: [...IRON_HANDS_DETACHMENTS],
};
