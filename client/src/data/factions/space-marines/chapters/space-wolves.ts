import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const SPACE_WOLVES_UNIQUE_UNITS: Unit[] = [
  // Characters (for Warlord selection)
  {
    id: 'bjorn-the-fell-handed',
    name: 'Bjorn the Fell-Handed',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'CHARACTER', 'DREADNOUGHT', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 9, toughness: 9, save: 2, wounds: 8, leadership: 7, oc: 2, invulnerable: 5 },
      basePoints: 160,
    }],
    weapons: [
      { weaponId: 'assaultCannon', isDefault: true, cost: 0 },
      { weaponId: 'heavyFlamer', isDefault: true, cost: 0 },
      { weaponId: 'trueclaw', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'runic-aura',
        name: 'Runic Aura',
        description: 'While this model is within 6" of friendly SPACE WOLVES units, each of those units has the Feel No Pain 4+ ability.',
      },
    ],
    notes: 'Legendary Dreadnought - Warlord in Reserve',
  },
  {
    id: 'ragnar-blackmane',
    name: 'Ragnar Blackmane',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'CHARACTER', 'JUMP PACK', 'FLY', 'WOLF GUARD', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 7, toughness: 4, save: 3, wounds: 5, leadership: 7, oc: 1, invulnerable: 4 },
      basePoints: 100,
    }],
    weapons: [
      { weaponId: 'frostfang', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'fang-of-morkai',
        name: 'Fang of Morkai',
        description: 'Each time the bearer makes a melee attack, on an unmodified Hit roll of 6, the attack has the Sustained Hits 1 keyword.',
      },
    ],
    notes: 'Famous Wolf Guard Jump Pack leader',
  },
  {
    id: 'logan-grimnar',
    name: 'Logan Grimnar',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'CHARACTER', 'CHAPTER MASTER', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 5, save: 2, wounds: 8, leadership: 6, oc: 2, invulnerable: 4 },
      basePoints: 110,
    }],
    weapons: [
      { weaponId: 'stormBolter', isDefault: true, cost: 0 },
      { weaponId: 'axeMorkai', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'great-wolf',
        name: 'Great Wolf',
        description: 'While the bearer is leading a unit, add 1 to the Attacks characteristic of models in that unit.',
      },
    ],
    notes: 'Great Wolf - Chapter Master of Space Wolves',
  },
  // Troops
  {
    id: 'blood-claws',
    name: 'Blood Claws',
    role: 'troops',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'BATTLELINE'],
    profiles: [
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 135,
      },
      {
        models: 20,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 285,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'chainsword', isDefault: false, cost: 0 },
    ],
    abilities: [
      {
        id: 'pack-leader',
        name: 'Pack Leader',
        description: 'Add 1 to the Attacks characteristic of models in this unit while it contains 10 or more models.',
      },
      {
        id: 'and-they-shall-know-no-fear',
        name: 'And They Shall Know No Fear',
        description: 'ADEPTUS ASTARTES units automatically pass Battle-shock tests.',
      },
    ],
    notes: 'Youthful warriors who fight in a frenzy',
  },
  {
    id: 'grey-hunters',
    name: 'Grey Hunters',
    role: 'troops',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'BATTLELINE'],
    profiles: [
      {
        models: 5,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 90,
      },
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 180,
      },
    ],
    weapons: [
      { weaponId: 'boltgun', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'chainsword', isDefault: false, cost: 0 },
      { weaponId: 'flamer', isDefault: false, cost: 10 },
      { weaponId: 'plasmaGun', isDefault: false, cost: 10 },
    ],
    abilities: [
      {
        id: 'counter-attack',
        name: 'Counter-attack',
        description: 'Each time this unit finishes a Charge move, until the end of the turn, add 1 to the Attacks characteristic of melee weapons equipped by models in this unit.',
      },
    ],
    notes: 'Flexible veteran warriors',
  },
  {
    id: 'wolf-guard',
    name: 'Wolf Guard',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'WOLF GUARD'],
    profiles: [
      {
        models: 5,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 7, oc: 1 },
        basePoints: 85,
      },
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 7, oc: 1 },
        basePoints: 170,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'chainsword', isDefault: false, cost: 0 },
      { weaponId: 'powerFist', isDefault: false, cost: 10 },
      { weaponId: 'thunderHammer', isDefault: false, cost: 15 },
    ],
    abilities: [
      {
        id: 'wolf-guard-battle-leader',
        name: 'Wolf Guard Battle Leader',
        description: 'While this unit contains a model with the CHARACTER keyword, models in this unit have the Fights First ability.',
      },
    ],
    notes: 'Elite veteran warriors',
  },
  {
    id: 'wulfen',
    name: 'Wulfen',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'WULFEN'],
    profiles: [
      {
        models: 5,
        profile: { move: 8, toughness: 4, save: 4, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 140,
      },
      {
        models: 10,
        profile: { move: 8, toughness: 4, save: 4, wounds: 3, leadership: 6, oc: 1 },
        basePoints: 280,
      },
    ],
    weapons: [
      { weaponId: 'thunderHammer', isDefault: true, cost: 0 },
      { weaponId: 'stormShield', isDefault: false, cost: 10 },
      { weaponId: 'wulfenClaw', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'thousand-claws',
        name: 'Thousand Claws',
        description: 'Each time this unit finishes a Charge move, until the end of the turn, each time a model in this unit makes a melee attack, you can re-roll a Hit roll of 1.',
      },
      {
        id: 'deep-strike',
        name: 'Deep Strike',
        description: 'This unit can be set up in your Reinforcements step.',
      },
    ],
    notes: 'Twisted berserkers of the Chapter',
  },
  {
    id: 'wulfen-dreadnought',
    name: 'Wulfen Dreadnought',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'VEHICLE', 'MONSTER', 'DREADNOUGHT', 'WULFEN'],
    profiles: [{
      models: 1,
      profile: { move: 8, toughness: 8, save: 2, wounds: 8, leadership: 6, oc: 3 },
      basePoints: 155,
    }],
    weapons: [
      { weaponId: 'stormBolter', isDefault: true, cost: 0 },
      { weaponId: 'wulfenClaw', isDefault: true, cost: 0 },
      { weaponId: 'helfrostPistol', isDefault: false, cost: 0 },
    ],
    abilities: [
      {
        id: 'thousand-claws',
        name: 'Thousand Claws',
        description: 'Each time this unit makes a melee attack, you can re-roll a Hit roll of 1.',
      },
    ],
    notes: 'Wulfen inside a Dreadnought chassis',
  },
  {
    id: 'rune-priest',
    name: 'Rune Priest',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'CHARACTER', 'PSYKER', 'LIBRARIAN'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 3, wounds: 5, leadership: 6, oc: 1 },
      basePoints: 85,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'runicSword', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'frost-weapon',
        name: 'Frost Weapon',
        description: 'Each time the bearer makes a melee attack, if a Hit roll of 6 is made, the target suffers 1 mortal wound in addition to any other damage.',
      },
    ],
    notes: 'Runic psyker with frost abilities',
  },
  {
    id: 'wolf-lord',
    name: 'Wolf Lord',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'CHARACTER'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 3, wounds: 6, leadership: 7, oc: 1 },
      basePoints: 85,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'thunderHammer', isDefault: false, cost: 10 },
      { weaponId: 'powerFist', isDefault: false, cost: 10 },
    ],
    abilities: [
      {
        id: 'wolf-s-prey',
        name: 'Wolf\'s Prey',
        description: 'Add 1 to the Attacks characteristic of friendly SPACE WOLVES units within 6".',
      },
    ],
    notes: 'Chapter leader with aura abilities',
  },
  {
    id: 'ulric-the-tempest',
    name: 'Ulric the Tempest',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES', 'INFANTRY', 'CHARACTER', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 5, save: 2, wounds: 7, leadership: 7, oc: 2 },
      basePoints: 140,
    }],
    weapons: [
      { weaponId: 'bolter', isDefault: true, cost: 0 },
      { weaponId: 'tempest-hammer', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'wolf-king',
        name: 'Wolf King',
        description: 'Add 1 to the Leadership characteristic of the bearer. While the bearer is leading a unit, add 1 to the Attacks characteristic of models in that unit.',
      },
    ],
    notes: 'Legendary Wolf Lord',
  },
];

const SPACE_WOLVES_DETACHMENTS: Detachment[] = [
  {
    id: 'space-wolves-detachment',
    name: 'Space Wolves Assault',
    description: 'The brutal close assault doctrine of the Space Wolves.',
    rule: {
      id: 'bladed-teeth',
      name: 'Bladed Teeth and Claws',
      description: 'Each time a model in this unit makes a melee attack, if that model\'s unit made a Charge move this turn, add 1 to the Strength characteristic of that attack.',
    },
    enhancements: [
      {
        id: 'the-wolf-tooth',
        name: 'The Wolf\'s Tooth',
        points: 30,
        description: 'Add 1 to the Damage characteristic of melee weapons the bearer is equipped with.',
      },
      {
        id: 'armour-of-contempt',
        name: 'Armour of Contempt',
        points: 15,
        description: 'The bearer has a 2+ save.',
      },
      {
        id: 'stone-grey-mare',
        name: 'Stone-grey Mare',
        points: 25,
        description: 'The bearer has the Feel No Pain 4+ ability.',
      },
    ],
    stratagems: [
      {
        id: 'wolf-kin-ferocity',
        name: 'Wolf-kin Ferocity',
        cost: 1,
        description: 'Add 1 to the Attacks characteristic of models in this unit until the end of the turn.',
      },
      {
        id: 'hunters-unleashed',
        name: 'Hunters Unleashed',
        cost: 1,
        description: 'This unit can Charge in a turn in which it Advanced.',
      },
      {
        id: 'tactical-maneuver',
        name: 'Tactical Maneuver',
        cost: 1,
        description: 'Add 1 to the Move characteristic of this unit until the end of the turn.',
      },
    ],
  },
  {
    id: 'champion-of-the-wolf',
    name: 'Champion of the Wolf',
    description: 'Elite champions who lead from the front.',
    rule: {
      id: 'runebladed-fury',
      name: 'Runic Fury',
      description: 'Each time the bearer of a Runic Weapon makes a melee attack, you can re-roll a Hit roll of 1.',
    },
    enhancements: [
      {
        id: 'black-mane',
        name: 'Black Mane',
        points: 35,
        description: 'Add 2 to the Attacks characteristic of the bearer\'s melee weapons.',
      },
    ],
    stratagems: [],
  },
  {
    id: 'champions-of-russ',
    name: 'Champions of Russ',
    description: 'The legendary warriors of the Space Wolves, bound by ancient Sagas.',
    rule: {
      id: 'sagas',
      name: 'Sagas',
      description: 'At the start of your Command phase, select one Saga from the following: Saga of the Wolf (enemy units within 6" of your Warlord have -1 Leadership), Saga of the Beast (friendly SPACE WOLVES units have Fights First), Saga of the Ice (friendly SPACE WOLVES units have +2" Move), Saga of the Warrior (friendly SPACE WOLVES units have +1 Attack in melee). The selected Saga lasts until the start of your next Command phase.',
    },
    enhancements: [
      {
        id: '芬里尔的祝福',
        name: "Wolf Lord's BJ",
        points: 25,
        description: 'The bearer has the Fights First ability.',
      },
      {
        id: '狼之长矛',
        name: 'Spear of Russ',
        points: 30,
        description: 'Melee weapons the bearer is equipped with have the LETHAL HITS and SUSTAINED HITS 1 keywords.',
      },
    ],
    stratagems: [
      {
        id: 'tactical-swiftness',
        name: 'Tactical Swiftness',
        cost: 1,
        description: 'Add 2" to the Move characteristic of units in this detachment until the end of the turn.',
      },
    ],
  },
];

export const spaceWolves: Faction = {
  id: 'space-wolves',
  name: 'Space Wolves',
  icon: 'wolf-head',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'SPACE WOLVES'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: false }
  },
  units: [...SHARED_UNITS, ...SPACE_WOLVES_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...SPACE_WOLVES_DETACHMENTS],
  uniqueUnits: [...SPACE_WOLVES_UNIQUE_UNITS],
  uniqueDetachments: [...SPACE_WOLVES_DETACHMENTS],
};
