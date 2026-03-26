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
        basePoints: 180,
      },
      {
        models: 10,
        profile: { move: 5, toughness: 5, save: 2, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 360,
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
        id: 'watcher-in-the-dark',
        name: 'Watcher in the Dark',
        description: 'Once per battle, just after a mortal wound is allocated to an ADEPTUS ASTARTES model in this unit, this unit can summon a Watcher in the Dark.',
      },
    ],
    notes: 'Elite Terminators with Deathwing keyword - can include Watcher in the Dark',
  },
  {
    id: 'ravenwing-black-knight-squad',
    name: 'Ravenwing Black Knight Squad',
    role: 'fast-attack',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'CAVALRY', 'RAVENWING'],
    profiles: [
      {
        models: 3,
        profile: { move: 12, toughness: 5, save: 3, wounds: 3, leadership: 6, oc: 2 },
        basePoints: 80,
      },
      {
        models: 6,
        profile: { move: 12, toughness: 5, save: 3, wounds: 3, leadership: 6, oc: 2 },
        basePoints: 160,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'plasmaTalon', isDefault: true, cost: 0 },
      { weaponId: 'blackKnightCombatWeapon', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'knights-of-caliban',
        name: 'Knights of Caliban',
        description: 'Each time this unit is selected to fight, if it made a Charge move this turn, until the end of the phase, melee weapons have ANTI-MONSTER 4+ and ANTI-VEHICLE 4+.',
      },
    ],
    notes: 'Fast attack cavalry with Ravenwing keyword',
  },
  {
    id: 'ravenwing-darkshroud',
    name: 'Ravenwing Darkshroud',
    role: 'fast-attack',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'VEHICLE', 'FLY', 'RAVENWING', 'DARKSHRoud'],
    profiles: [{
      models: 1,
      profile: { move: 14, toughness: 8, save: 3, wounds: 10, leadership: 6, oc: 3 },
      basePoints: 100,
    }],
    weapons: [
      { weaponId: 'heavyBolter', isDefault: true, cost: 0 },
      { weaponId: 'assaultCannon', isDefault: false, cost: 0 },
    ],
    abilities: [
      {
        id: 'icon-of-old-caliban',
        name: 'Icon of Old Caliban (Aura)',
        description: 'While a friendly ADEPTUS ASTARTES unit is within 6" of this model, models in that unit have the Stealth ability and Benefit of Cover against ranged attacks.',
      },
    ],
    notes: 'Ravenwing support vehicle with aura abilities',
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
      profile: { move: 6, toughness: 4, save: 2, wounds: 4, leadership: 6, oc: 1 },
      basePoints: 75,
    }],
    weapons: [
      { weaponId: 'deliverer', isDefault: true, cost: 0 },
      { weaponId: 'mindWipe', isDefault: true, cost: 0 },
      { weaponId: 'traitorsBane', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'psychic-hood',
        name: 'Psychic Hood',
        description: 'While this model is leading a unit, models in that unit have Feel No Pain 4+ against Psychic Attacks.',
      },
      {
        id: 'engulfing-fear',
        name: 'Engulfing Fear',
        description: 'In your Shooting phase, you can select one enemy unit within 18" of this model. That enemy unit must take a Battle-shock test.',
      },
      {
        id: 'book-of-salvation',
        name: 'Book of Salvation',
        description: 'While this model is leading a unit, add 1 to the Attacks characteristic of melee weapons equipped by models in that unit. When this model is destroyed, each friendly Adeptus Astartes unit within 6" must take a Battle-shock test.',
      },
    ],
    notes: 'Chief Librarian of the Dark Angels',
  },
  {
    id: 'belial',
    name: 'Belial',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'DARK ANGELS', 'INFANTRY', 'CHARACTER', 'TERMINATOR', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 5, toughness: 5, save: 2, wounds: 6, leadership: 6, oc: 1 },
      basePoints: 85,
    }],
    weapons: [
      { weaponId: 'masterCraftedStormBolter', isDefault: true, cost: 0 },
      { weaponId: 'swordOfSilence', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'grand-master-of-the-deathwing',
        name: 'Grand Master of the Deathwing',
        description: 'While this model is leading a unit, each time a model in that unit makes an attack, if a Critical Hit is scored, that attack has the PRECISION ability.',
      },
      {
        id: 'strikes-of-retribution',
        name: 'Strikes of Retribution',
        description: 'Each time a melee attack is allocated to this model, after the attacking model\'s unit has finished making its attacks, roll one D6: for each 4+, the attacking unit suffers 1 mortal wound.',
      },
    ],
    notes: 'Grand Master of the Deathwing',
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
      name: "Hunter's Assault",
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
        id: 'pursuit-of-vengeance',
        name: 'Pursuit of Vengeance',
        cost: 1,
        description: 'Add 2" to the Move characteristic of the bearer\'s unit until the end of the turn.',
      },
    ],
  },
  {
    id: 'ravens-wing',
    name: 'Raven\'s Wing',
    description: 'The elite Ravenwing and Deathwing companies strike from the shadows.',
    rule: {
      id: 'ravens-wing',
      name: 'Raven\'s Wing',
      description: 'Enemy units within 12" of ADEPTUS ASTARTES units from your army have -1 to Hit.',
    },
    enhancements: [
      {
        id: 'standard-of-devastation',
        name: 'Standard of Devastation',
        points: 30,
        description: 'Ranged weapons equipped by models in the bearer\'s unit have the SUSTAINED HITS 1 keyword.',
      },
      {
        id: 'shroud-of-darkness',
        name: 'Shroud of Darkness',
        points: 20,
        description: 'Enemy units cannot use Command Reports or aura abilities within 12" of the bearer.',
      },
    ],
    stratagems: [
      {
        id: 'strike-from-shadow',
        name: 'Strike from Shadow',
        cost: 1,
        description: 'Deep Strike unit gains +1 to Hit in the first turn it arrives.',
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
    oathOfMoment: { rerollHits: true, bonusToWound: false }
  },
  units: [...SHARED_UNITS, ...DARK_ANGELS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...DARK_ANGELS_DETACHMENTS],
  uniqueUnits: [...DARK_ANGELS_UNIQUE_UNITS],
  uniqueDetachments: [...DARK_ANGELS_DETACHMENTS],
};
