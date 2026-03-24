import { Faction, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const WHITE_SCAR_DETACHMENTS: Detachment[] = [
  {
    id: 'white-scar-detachment',
    name: 'Storm of the White Scars',
    description: 'The lightning-fast assault doctrine of the White Scars Chapter.',
    rule: {
      id: 'hunters-unleashed',
      name: 'Hunters Unleashed',
      description: 'Units with the White Scars keyword can Charge in a turn in which they Advanced. Each time a model in this unit makes a melee attack, if the bearer\'s unit made a Charge move this turn, add 1 to the Hit roll.',
    },
    enhancements: [
      {
        id: 'plume-of-the-plain',
        name: 'Plume of the Plains',
        points: 25,
        description: 'Add 1 to the Move characteristic of the bearer\'s unit.',
      },
      {
        id: 'steed-of-the-great-company',
        name: 'Steed of the Great Company',
        points: 30,
        description: 'The bearer has the FLY keyword.',
      },
      {
        id: 'shroud-of-the-hills',
        name: 'Shroud of the Hills',
        points: 20,
        description: 'The bearer has the Stealth keyword.',
      },
    ],
    stratagems: [
      {
        id: 'lightning-assault',
        name: 'Lightning Assault',
        cost: 1,
        description: 'Add 2 to Charge rolls for this unit until the end of the turn.',
      },
      {
        id: 'swift-strike',
        name: 'Swift Strike',
        cost: 1,
        description: 'This unit can make a Heroic Intervention up to 6" away.',
      },
      {
        id: 'kinetic-hardsuit',
        name: 'Kinetic Hardsuit',
        cost: 1,
        description: 'The bearer has a 4+ invulnerable save until the end of the turn.',
      },
    ],
  },
];

export const whiteScars: Faction = {
  id: 'white-scars',
  name: 'White Scars',
  icon: 'lightning-bolt',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'WHITE SCARS'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...WHITE_SCAR_DETACHMENTS],
  uniqueUnits: [],
  uniqueDetachments: [...WHITE_SCAR_DETACHMENTS],
};
