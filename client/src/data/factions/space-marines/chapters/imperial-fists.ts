import { Faction, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

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
  units: [...SHARED_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...IMPERIAL_FISTS_DETACHMENTS],
  uniqueUnits: [],
  uniqueDetachments: [...IMPERIAL_FISTS_DETACHMENTS],
};
