import { Faction, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const RAVEN_GUARD_DETACHMENTS: Detachment[] = [
  {
    id: 'raven-guard-detachment',
    name: 'Raven Guard Scourge',
    description: 'The shadow strike doctrine of the Raven Guard Chapter.',
    rule: {
      id: 'shadowmasters',
      name: 'Shadow Masters',
      description: 'Enemy units cannot use Command Reports or aura abilities within 12" of ADEPTUS ASTARTES units from this detachment. ADEPTUS ASTARTES units from this detachment have the Stealth keyword.',
    },
    enhancements: [
      {
        id: 'shadows-of-the-mountain',
        name: 'Shadows of the Mountain',
        points: 20,
        description: 'The bearer has the Stealth keyword.',
      },
      {
        id: 'claw-of-the-raptor',
        name: 'Claw of the Raptor',
        points: 25,
        description: 'Add 1 to Advance and Charge rolls for the bearer\'s unit.',
      },
      {
        id: 'morkai-s-tearing-claws',
        name: 'Morkai\'s Tearing Claws',
        points: 30,
        description: 'Add 1 to the Damage characteristic of the bearer\'s melee weapons.',
      },
    ],
    stratagems: [
      {
        id: 'strike-from-the-shadows',
        name: 'Strike from the Shadows',
        cost: 1,
        description: 'This unit can make a Normal Move as if it were the Movement phase.',
      },
      {
        id: 'whisper-quiet-death',
        name: 'Whisper Quiet Death',
        cost: 1,
        description: 'Add 1 to the Attacks characteristic of melee weapons equipped by models in this unit until the end of the turn.',
      },
      {
        id: 'murderous-praetors',
        name: 'Murderous Praetors',
        cost: 2,
        description: 'Each time a model in this unit makes a melee attack, you can re-roll a Hit roll of 1.',
      },
    ],
  },
];

export const ravenGuard: Faction = {
  id: 'raven-guard',
  name: 'Raven Guard',
  icon: 'raven',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'RAVEN GUARD'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...RAVEN_GUARD_DETACHMENTS],
  uniqueUnits: [],
  uniqueDetachments: [...RAVEN_GUARD_DETACHMENTS],
};
