import { Faction, Unit, Detachment } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

const BLOOD_ANGELS_UNIQUE_UNITS: Unit[] = [
  {
    id: 'death-company',
    name: 'Death Company',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS', 'INFANTRY', 'DEATH COMPANY'],
    profiles: [
      {
        models: 5,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 130,
      },
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 260,
      },
    ],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
      { weaponId: 'powerFist', isDefault: false, cost: 10 },
      { weaponId: 'thunderHammer', isDefault: false, cost: 15 },
    ],
    abilities: [
      {
        id: 'hunger-of-the-blood',
        name: 'Hunger of the Blood',
        description: 'Each time this unit finishes a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by models in this unit.',
      },
      {
        id: 'and-they-shall-know-no-fear',
        name: 'And They Shall Know No Fear',
        description: 'ADEPTUS ASTARTES units automatically pass Battle-shock tests.',
      },
    ],
    notes: ' berserker assault infantry',
  },
  {
    id: 'death-company-intercessors',
    name: 'Death Company Intercessors',
    role: 'troops',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS', 'INFANTRY', 'BATTLELINE', 'DEATH COMPANY'],
    profiles: [
      {
        models: 5,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 85,
      },
      {
        models: 10,
        profile: { move: 6, toughness: 4, save: 3, wounds: 2, leadership: 6, oc: 1 },
        basePoints: 160,
      },
    ],
    weapons: [
      { weaponId: 'boltRifle', isDefault: true, cost: 0 },
      { weaponId: 'closeCombatWeapon', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'hunger-of-the-blood',
        name: 'Hunger of the Blood',
        description: 'Each time this unit finishes a Charge move, until the end of the turn, add 1 to the Strength characteristic of melee weapons equipped by models in this unit.',
      },
    ],
    notes: 'Death Company with ranged capability',
  },
  {
    id: 'sanguinary-guard',
    name: 'Sanguinary Guard',
    role: 'elites',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS', 'INFANTRY', 'JUMP PACK', 'FLY', 'SANGUINARY GUARD'],
    profiles: [
      {
        models: 3,
        profile: { move: 12, toughness: 4, save: 2, wounds: 3, leadership: 6, oc: 1, invulnerable: 4 },
        basePoints: 110,
      },
      {
        models: 6,
        profile: { move: 12, toughness: 4, save: 2, wounds: 3, leadership: 6, oc: 1, invulnerable: 4 },
        basePoints: 220,
      },
    ],
    weapons: [
      { weaponId: 'angelusBoltgun', isDefault: true, cost: 0 },
      { weaponId: 'sanguinarySpear', isDefault: false, cost: 0 },
      { weaponId: 'encarmineSword', isDefault: false, cost: 0 },
    ],
    abilities: [
      {
        id: 'angelic-presence',
        name: 'Angelic Presence',
        description: 'While this unit contains a Sanguinary Priest, add 1 to the Attacks characteristic of models in this unit.',
      },
      {
        id: 'death-from-above',
        name: 'Death from Above',
        description: 'This unit has the Deep Strike keyword.',
      },
    ],
    notes: 'Elite jump pack assault troops',
  },
  {
    id: 'sanguinary-priest',
    name: 'Sanguinary Priest',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS', 'INFANTRY', 'CHARACTER', 'CHAPLAIN', 'SANGUINARY PRIEST'],
    profiles: [{
      models: 1,
      profile: { move: 6, toughness: 4, save: 3, wounds: 5, leadership: 7, oc: 1 },
      basePoints: 80,
    }],
    weapons: [
      { weaponId: 'boltPistol', isDefault: true, cost: 0 },
      { weaponId: 'encarmineAxe', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'healing-light',
        name: 'Healing Light',
        description: 'At the start of each of your Command phases, this model can heal up to D3 wounds for one friendly BLOOD ANGELS unit within 6".',
      },
    ],
    notes: 'Chaplain with healing abilities',
  },
  {
    id: 'mephiston',
    name: 'Mephiston',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS', 'INFANTRY', 'CHARACTER', 'PSYKER', 'LIBRARIAN', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 7, toughness: 5, save: 2, wounds: 6, leadership: 6, oc: 1, invulnerable: 5 },
      basePoints: 120,
    }],
    weapons: [
      { weaponId: 'plasmaPistol', isDefault: true, cost: 0 },
      { weaponId: 'forceWeapon', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'the-quickening',
        name: 'The Quickening',
        description: 'While this model is leading a unit, models in that unit have the Fights First ability.',
      },
      {
        id: 'transfixing-gaze',
        name: 'Transfixing Gaze',
        description: 'At the end of your Command phase, select one enemy unit within 12". Until the start of your next Command phase, subtract 1 from the Leadership characteristic of that unit.',
      },
    ],
    notes: 'Powerful Librarian with special abilities',
  },
  {
    id: 'astorath',
    name: 'Astorath',
    role: 'hq',
    keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS', 'INFANTRY', 'CHARACTER', 'CHAPLAIN', 'EPIC HERO'],
    profiles: [{
      models: 1,
      profile: { move: 12, toughness: 4, save: 2, wounds: 5, leadership: 6, oc: 1, invulnerable: 4 },
      basePoints: 95,
    }],
    weapons: [
      { weaponId: 'executionerAxe', isDefault: true, cost: 0 },
    ],
    abilities: [
      {
        id: 'redeemer-of-the-lost',
        name: 'Redeemer of the Lost',
        description: 'At the start of your Command phase, select one friendly BLOOD ANGELS unit within 12". That unit has the Fights First ability until the start of your next Command phase.',
      },
      {
        id: 'mass-of-doom',
        name: 'Mass of Doom',
        description: 'While this model is leading a unit, models in that unit have the Fights First ability.',
      },
    ],
    notes: 'Chaplain of the Death Company',
  },
];

const BLOOD_ANGELS_DETACHMENTS: Detachment[] = [
  {
    id: 'blood-angels-detachment',
    name: 'Sons of Sanguinius',
    description: 'The Blood Angels\' glorious assault doctrine, focusing on overwhelming close combat power.',
    rule: {
      id: 'red-thirst',
      name: 'The Red Thirst',
      description: 'Each time a model in this unit makes a melee attack, if that model\'s unit made a Charge move this turn, add 1 to the Hit roll.',
    },
    enhancements: [
      {
        id: 'icon-of-the-angel',
        name: 'Icon of the Angel',
        points: 30,
        description: 'Add 1 to the Attacks characteristic of the bearer\'s unit\'s melee weapons.',
      },
      {
        id: 'artificer-armour',
        name: 'Artificer Armour',
        points: 25,
        description: 'The bearer has a 2+ save.',
      },
      {
        id: 'the-sanguinor',
        name: 'The Sanguinor',
        points: 50,
        description: 'The bearer has a 4+ invulnerable save. Add 1 to Charge rolls for the bearer\'s unit.',
      },
    ],
    stratagems: [
      {
        id: 'berserker-fury',
        name: 'Berserker Fury',
        cost: 1,
        description: 'Add 1 to the Strength characteristic of melee weapons equipped by models in this unit until the end of the turn.',
      },
      {
        id: 'blood-surge',
        name: 'Blood Surge',
        cost: 1,
        description: 'This unit can fight as if it had the Fights First ability.',
      },
      {
        id: 'death-from-above',
        name: 'Death from Above',
        cost: 2,
        description: 'This unit has the Deep Strike keyword.',
      },
    ],
  },
  {
    id: 'angels-of-death',
    name: 'Angels of Death',
    description: 'The sacred rite of combat followed by the Blood Angels.',
    rule: {
      id: 'descent-of-angels',
      name: 'Descent of Angels',
      description: 'Units with the Jump Pack keyword can Charge in a turn in which they Advanced.',
    },
    enhancements: [
      {
        id: 'winged-daemonhood',
        name: 'Winged Daemonhood',
        points: 25,
        description: 'The bearer has a 4+ invulnerable save.',
      },
      {
        id: 'razor-ed-wings',
        name: 'Razor-edged Wings',
        points: 20,
        description: 'Add 1 to the Damage characteristic of the bearer\'s melee weapons.',
      },
    ],
    stratagems: [
      {
        id: 'honour-the-blood',
        name: 'Honour the Blood',
        cost: 1,
        description: 'This unit can make a Heroic Intervention up to 6" away.',
      },
    ],
  },
];

export const bloodAngels: Faction = {
  id: 'blood-angels',
  name: 'Blood Angels',
  icon: 'chalice',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'BLOOD ANGELS'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: false }
  },
  units: [...SHARED_UNITS, ...BLOOD_ANGELS_UNIQUE_UNITS],
  detachments: [...GENERIC_DETACHMENTS, ...BLOOD_ANGELS_DETACHMENTS],
  uniqueUnits: [...BLOOD_ANGELS_UNIQUE_UNITS],
  uniqueDetachments: [...BLOOD_ANGELS_DETACHMENTS],
};
