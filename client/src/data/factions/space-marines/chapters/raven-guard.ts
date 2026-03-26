import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const RAVEN_GUARD_UNIQUE_UNITS: Unit[] = [
  {
    id: 'kayvaan-shrike',
    name: 'Kayvaan Shrike',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'RAVEN GUARD', 'INFANTRY', 'CHARACTER', 'JUMP PACK', 'FLY', 'REIVER', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 12, toughness: 4, save: 3, wounds: 5, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 100,
    }],
    weapons: [
      { weaponId: 'blackout', isDefault: true, cost: 0 },
      { weaponId: 'ravensTalons', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'shadowmaster',
        name: 'Shadowmaster',
        description: 'Enemy units cannot use Command Reports within 12" of the bearer. The bearer has the Stealth keyword.',
      },
      {
        id: 'throne-of-skulls',
        name: 'Throne of Skulls',
        description: 'At the end of the Fight phase, if the bearer destroyed an enemy unit this phase, add 1 to the Attacks characteristic of the bearer until the end of your next turn.',
      },
    ],
    notes: 'Raven Guard Master of Shadows',
  },
];

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
  units: [...SHARED_UNITS, ...RAVEN_GUARD_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...RAVEN_GUARD_DETACHMENTS],
  uniqueUnits: [...RAVEN_GUARD_UNIQUE_UNITS],
  uniqueDetachments: [...RAVEN_GUARD_DETACHMENTS],
};
