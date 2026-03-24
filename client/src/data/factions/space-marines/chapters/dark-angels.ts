import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const DARK_ANGELS_UNIQUE_UNITS: Unit[] = [
  {
    id: 'deathwing-terminator-squad',
    name: 'Deathwing Terminator Squad',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'INFANTRY', 'TERMINATOR', 'DEATHWING'],
    profiles: [
      {
        models: 5,
        profile: { move: 5, toughness: 5, save: 2, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 210,
      },
      {
        models: 10,
        profile: { move: 5, toughness: 5, save: 2, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 420,
      },
    ],
    weapons: [
      { weaponId: 'stormBolter', isDefault: true, cost: 0 },
      { weaponId: 'powerFist', isDefault: true, cost: 0 },
      { weaponId: 'thunderHammer', isDefault: false, cost: 10 },
      { weaponId: 'assaultCannon', isDefault: false, cost: 15 },
    ],
    abilities: [
      {
        id: 'deathwing-assault',
        name: 'Deathwing Assault',
        description: 'Each time this unit finishes a Charge move, until the end of the turn, melee weapons equipped by models in this unit have the [LETHAL HITS] ability.',
      },
      {
        id: 'and-they-shall-know-no-fear',
        name: 'And They Shall Know No Fear',
        description: 'ADEPTUS ASTARTES units automatically pass Battle-shock tests.',
      },
    ],
    notes: 'Elite Terminators with Deathwing keyword',
  },
  {
    id: 'ravenwing-black-knight-squad',
    name: 'Ravenwing Black Knight Squad',
    role: 'fast-attack',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'CAVALRY', 'RAVENWING'],
    profiles: [
      {
        models: 3,
        profile: { move: 14, toughness: 4, save: 3, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 135,
      },
      {
        models: 6,
        profile: { move: 14, toughness: 4, save: 3, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 270,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'plasmaPistol', isDefault: false, cost: 5 },
    ],
    abilities: [
      {
        id: 'ravenwing-assault',
        name: 'Ravenwing Assault',
        description: 'This unit can Charge in a turn in which it Advanced.',
      },
      {
        id: 'and-they-shall-know-no-fear',
        name: 'And They Shall Know No Fear',
        description: 'ADEPTUS ASTARTES units automatically pass Battle-shock tests.',
      },
    ],
    notes: 'Fast attack cavalry with Ravenwing keyword',
  },
  {
    id: 'ravenwing-darkshroud',
    name: 'Ravenwing Darkshroud',
    role: 'fast-attack',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'VEHICLE', 'RAVENWING', 'DARKSHRoud'],
    profiles: [{
      models: 1,
      profile: { move: 14, toughness: 8, save: 3, wounds: 8, leadership: 6, oc: 3 },
      basePoints: 130,
    }],
    weapons: [
      { weaponId: 'enfilade-autocannon', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'shroud-of-Death',
        name: 'Shroud of Death',
        description: 'While this model is on the battlefield, enemy units within 12" of it cannot useCommand Reports or aura abilities.',
      },
    ],
    notes: 'Ravenwing support vehicle',
  },
  {
    id: 'ravenwing-land-speeder-vengeance',
    name: 'Ravenwing Land Speeder Vengeance',
    role: 'fast-attack',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'VEHICLE', 'FLY', 'RAVENWING'],
    profiles: [{
      models: 1,
      profile: { move: 16, toughness: 7, save: 3, wounds: 8, leadership: 6, oc: 3 },
      basePoints: 145,
    }],
    weapons: [
      { weaponId: 'vengeance-accumulator', isDefault: true, cost: 0 },
      { weaponId: 'assaultCannon', isDefault: false, cost: 0 },
    ],
    abilities: [
      {
        id: 'ground-breaking-shot',
        name: 'Ground-breaking Shot',
        description: 'Each time this model makes a ranged attack that targets a unit below its Starting Strength, add 1 to the Hit roll.',
      },
    ],
    notes: 'Ravenwing anti-tank flyer',
  },
  {
    id: 'ezekiel',
    name: 'Ezekiel',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'INFANTRY', 'CHARACTER', 'PSYKER', 'LIBRARIAN', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 3, wounds: 5, leadership: 7, oc: 1 },
      basePoints: 95,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'forceWeapon', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'mind-wipe',
        name: 'Mind Wipe',
        description: 'At the end of the Fight phase, select one enemy unit within 6" of this model that had models destroyed this phase. Subtract 1 from Leadership for the rest of the battle.',
      },
    ],
    notes: 'Librarian with unique abilities',
  },
];

const DARK_ANGELS_DETACHMENTS: Detachment[] = [
  {
    id: 'deathwing-companion',
    name: 'Deathwing Companion',
    description: 'The elite 1st Company Terminators who fight as an unstoppable wall of ceramite.',
    rule: {
      id: 'deathwing-stubborn-assault',
      name: 'Stubborn Assault',
      description: 'Each time a model in this unit makes a melee attack, re-roll a Hit roll of 1.',
    },
    enhancements: [
      {
        id: 'banner-of-macari',
        name: 'Banner of Macaroth',
        points: 30,
        description: 'Add 1 to the Attacks characteristic of melee weapons equipped by models in the bearer\'s unit.',
      },
      {
        id: 'paragon-of-the-white-wings',
        name: 'Paragon of the White Wings',
        points: 25,
        description: 'The bearer has a 4+ invulnerable save.',
      },
      {
        id: 'mortis-template',
        name: 'Mortis Template',
        points: 20,
        description: 'Add 1 to Advance and Charge rolls for the bearer\'s unit.',
      },
    ],
    stratagems: [
      {
        id: 'uncompromising-fury',
        name: 'Uncompromising Fury',
        cost: 1,
        description: 'Each time a model in this unit makes a melee attack, you can re-roll a Wound roll of 1.',
      },
      {
        id: 'fury-of-the-first',
        name: 'Fury of the First',
        cost: 2,
        description: 'This unit can fight as if it had the Fights First ability.',
      },
      {
        id: 'unwavering-indomitable',
        name: 'Unwavering Indomitable',
        cost: 1,
        description: 'This unit has the Objective Secured keyword until the end of the turn.',
      },
    ],
  },
  {
    id: 'ravenwing-companion',
    name: 'Ravenwing Companion',
    description: 'The 2nd Company elite who strike with lightning speed on their bikes.',
    rule: {
      id: 'ravenwing-hunter-assault',
      name: 'Hunter\'s岱堂之击',
      description: 'Ravenwing units from this detachment can charge in a turn in which they Advanced.',
    },
    enhancements: [
      {
        id: 'standard-of-the-raven',
        name: 'Standard of the Raven',
        points: 25,
        description: 'Add 1 to Advance and Charge rolls for the bearer\'s unit.',
      },
      {
        id: 'black-knight-flight',
        name: 'Black Knight\'s Flight',
        points: 20,
        description: 'The bearer\'s unit has the FLY keyword.',
      },
      {
        id: 'ravenous-pursuit',
        name: 'Ravenous Pursuit',
        points: 15,
        description: 'Add 1 to the Damage characteristic of melee weapons the bearer is equipped with.',
      },
    ],
    stratagems: [
      {
        id: 'targeting-augury',
        name: 'Targeting Augury',
        cost: 1,
        description: 'Add 1 to Hit rolls for the bearer\'s unit\'s ranged attacks until the end of the turn.',
      },
      {
        id: 'whirlwind-of-death',
        name: 'Whirlwind of Death',
        cost: 2,
        description: 'Each model in this unit makes one additional melee attack.',
      },
      {
        id: 'pursuit-of-vengeance',
        name: 'Pursuit of Vengeance',
        cost: 1,
        description: 'Add 2" to the Move characteristic of the bearer\'s unit until the end of the turn.',
      },
    ],
  },
];

export const darkAngels: Faction = {
  id: 'dark-angels',
  name: 'Dark Angels',
  icon: 'winged-sword',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS, ...DARK_ANGELS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...DARK_ANGELS_DETACHMENTS],
  uniqueUnits: [...DARK_ANGELS_UNIQUE_UNITS],
  uniqueDetachments: [...DARK_ANGELS_DETACHMENTS],
};
