import { Faction, Unit, Detachment, TEMPLAR_VOWS } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const BLACK_TEMPLARS_UNIQUE_UNITS: Unit[] = [
  {
    id: 'crusader-squad',
    name: 'Crusader Squad',
    role: 'troops',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLACK TEMPLARS', 'INFANTRY', 'BATTLELINE'],
    profiles: [
      {
        models: 5,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 150,
      },
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 310,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'boltgun', isDefault: false, cost: 0 },
      { weaponId: 'flamer', isDefault: false, cost: 10 },
      { weaponId: 'powerWeapon', isDefault: false, cost: 10 },
    ],
    abilities: [
      {
        id: 'sword-of-judgment',
        name: 'Sword of Judgment',
        description: 'Each time this unit finishes a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by Initiates in this unit.',
      },
    ],
    notes: 'Flexible assault troops with mixed loadouts',
  },
  {
    id: 'sword-brethren',
    name: 'Sword Brethren',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLACK TEMPLARS', 'INFANTRY'],
    profiles: [
      {
        models: 4,
        profile: { move: 6, toughness: 4, save: 2, wounds: 3, leadership: 7, oc: 1 },
        basePoints: 105,
      },
      {
        models: 5,
        profile: { move: 6, toughness: 4, save: 2, wounds: 3, leadership: 7, oc: 1 },
        basePoints: 130,
      },
      {
        models: 9,
        profile: { move: 6, toughness: 4, save: 2, wounds: 3, leadership: 7, oc: 1 },
        basePoints: 235,
      },
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 2, wounds: 3, leadership: 7, oc: 1 },
        basePoints: 260,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'powerSword', isDefault: true, cost: 0 },
      { weaponId: 'thunderHammer', isDefault: false, cost: 15 },
      { weaponId: 'stormShield', isDefault: false, cost: 10 },
    ],
    abilities: [
      {
        id: 'champions-of-the-crusade',
        name: 'Champions of the Crusade',
        description: 'Add 1 to the Attacks characteristic of models in this unit.',
      },
    ],
    notes: 'Elite veteran assault troops',
  },
  {
    id: 'high-marshal-helbrecht',
    name: 'High Marshal Helbrecht',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLACK TEMPLARS', 'INFANTRY', 'CHARACTER', 'CHAPTER MASTER', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 2, wounds: 6, leadership: 6, oc: 2, invulnerable: 4 },
      basePoints: 120,
    }],
    weapons: [
      { weaponId: 'swordOfTheHighMarshals', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'crusaders-hymn',
        name: 'Crusader\'s Hymn',
        description: 'While this model is on the battlefield, add 1 to the Attacks characteristic of melee weapons equipped by friendly BLACK TEMPLARS units within 6".',
      },
    ],
    notes: 'Chapter Master with powerful aura',
  },
  {
    id: 'chaplain-grimaldus',
    name: 'Chaplain Grimaldus',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLACK TEMPLARS', 'INFANTRY', 'CHARACTER', 'CHAPLAIN', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 3, wounds: 4, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 90,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'croziusArcanum', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'cenobyte-servitors',
        name: 'Cenobyte Servitors',
        description: 'While this model is leading a unit, models in that unit have the Feel No Pain 5+ ability.',
      },
      {
        id: 'litany-of-devotion',
        name: 'Litany of Devotion',
        description: 'At the start of your Command phase, select one enemy unit within 12". That unit has the Fights First ability until the start of your next Command phase.',
      },
    ],
    notes: 'Powerful Chaplin with debuff abilities',
  },
  {
    id: 'emperor-s-champion',
    name: 'Emperor\'s Champion',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLACK TEMPLARS', 'INFANTRY', 'CHARACTER', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 8, toughness: 4, save: 2, wounds: 5, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 75,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'blackSword', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'bastion-of-the-emperor',
        name: 'Bastion of the Emperor',
        description: 'Melee weapons the bearer is equipped with have the Lethal Hits keyword.',
      },
    ],
    notes: 'Duelist character hunter',
  },
];

const BLACK_TEMPLARS_DETACHMENTS: Detachment[] = [
  {
    id: 'black-templars-detachment',
    name: 'Crusader Squad',
    description: 'The Black Templars\' holy crusade against the enemies of the Emperor.',
    rule: {
      id: 'templar-vows',
      name: 'Templar Vows',
      description: 'Before the battle, select three different Templar Vows from the following: Uphold the Honour of the Emperor, Suffer Not the Unclean to Live, Accept Any Challenge No Matter the Odds, Abhor the Witch, Destroy the Witch.',
    },
    enhancements: [
      {
        id: 'templar-blade',
        name: 'Templar Blade',
        points: 30,
        description: 'Add 1 to the Damage characteristic of the bearer\'s melee weapons.',
      },
      {
        id: 'paragon-sword',
        name: 'Paragon Sword',
        points: 25,
        description: 'The bearer has a 4+ invulnerable save. Add 1 to the Attacks characteristic of the bearer\'s melee weapons.',
      },
      {
        id: 'holy-chaplet',
        name: 'Holy Chaplet',
        points: 15,
        description: 'Add 1 to the Leadership characteristic of the bearer and the bearer\'s unit.',
      },
    ],
    stratagems: [
      {
        id: 'throw-wide-the-gates',
        name: 'Throw Wide the Gates',
        cost: 1,
        description: 'This unit can Charge in a turn in which it Advanced.',
      },
      {
        id: 'righteous-zeal',
        name: 'Righteous Zeal',
        cost: 1,
        description: 'Add 1 to the Strength characteristic of melee weapons equipped by models in this unit until the end of the turn.',
      },
      {
        id: 'oath-of-emperor',
        name: 'Oath of the Emperor',
        cost: 2,
        description: 'Each time a model in this unit makes a melee attack, you can re-roll a Hit roll of 1.',
      },
    ],
  },
  {
    id: 'penitent-host',
    name: 'Penitent Host',
    description: 'The righteous fury of the Black Templars in battle.',
    rule: {
      id: 'holy-crusade',
      name: 'Holy Crusade',
      description: 'Each time a model in this unit makes a melee attack, if the target has the CHAOS or XENOS keyword, add 1 to the Hit roll.',
    },
    enhancements: [
      {
        id: 'unstoppable-crusade',
        name: 'Unstoppable Crusade',
        points: 20,
        description: 'Add 1 to the Move characteristic of the bearer\'s unit.',
      },
    ],
    stratagems: [],
  },
];

export const blackTemplars: Faction = {
  id: 'black-templars',
  name: 'Black Templars',
  icon: 'cross',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLACK TEMPLARS'],
  armyRule: {
    type: 'templar-vows',
    templarVows: { vows: TEMPLAR_VOWS }
  },
  units: [...SHARED_UNITS, ...BLACK_TEMPLARS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...BLACK_TEMPLARS_DETACHMENTS],
  uniqueUnits: [...BLACK_TEMPLARS_UNIQUE_UNITS],
  uniqueDetachments: [...BLACK_TEMPLARS_DETACHMENTS],
};
