import { Faction, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

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
        id: ' Gorgon\'s-J-Plain',
        name: 'Gorgon\'s Wrath',
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
  units: [...SHARED_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...IRON_HANDS_DETACHMENTS],
  uniqueUnits: [],
  uniqueDetachments: [...IRON_HANDS_DETACHMENTS],
};
