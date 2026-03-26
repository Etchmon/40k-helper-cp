export interface WeaponAbility {
  id: string;
  name: string;
  description: string;
}

export const WEAPON_ABILITIES: Record<string, WeaponAbility> = {
  assault: {
    id: 'assault',
    name: 'Assault',
    description: 'Weapons with [ASSAULT] in their profile are known as Assault weapons. If a unit that Advanced this turn contains any models equipped with Assault weapons, it is still eligible to shoot in this turn\'s Shooting phase. When such a unit is selected to shoot, you can only resolve attacks using Assault weapons its models are equipped with.',
  },
  heavy: {
    id: 'heavy',
    name: 'Heavy',
    description: 'Weapons with [HEAVY] in their profile are known as Heavy weapons. Each time an attack is made with such a weapon, if the attacking model\'s unit Remained Stationary this turn, add 1 to that attack\'s Hit roll.',
  },
  rapidFire: {
    id: 'rapid-fire',
    name: 'Rapid Fire',
    description: 'Weapons with [RAPID FIRE X] in their profile are known as Rapid Fire weapons. Each time such a weapon targets a unit within half that weapon\'s range, the Attacks characteristic of that weapon is increased by the amount denoted by \'x\'.',
  },
  pistol: {
    id: 'pistol',
    name: 'Pistol',
    description: 'Weapons with [PISTOL] in their profile are known as Pistol weapons. Each time a unit is selected to shoot, you can only resolve attacks with Pistol weapons if that unit has not Advanced this turn.',
  },
  torrent: {
    id: 'torrent',
    name: 'Torrent',
    description: 'Weapons with [TORRENT] in their profile are known as Torrent weapons. Each time an attack is made with a Torrent weapon, that attack automatically hits the target.',
  },
  blast: {
    id: 'blast',
    name: 'Blast',
    description: 'Weapons with [BLAST] in their profile are known as Blast weapons, and they make a random number of attacks. Each time you determine how many attacks are made with a Blast weapon, add 1 to the result for every five models that were in the target unit when you selected it as a target (rounding down). Blast weapons can never be used to make attacks against a unit that is within Engagement Range of one or more units from the attacking model\'s army (including its own unit).',
  },
  ignoreCover: {
    id: 'ignores-cover',
    name: 'Ignores Cover',
    description: 'Each time an attack is made with this weapon, the target does not receive the benefit of Cover to its saving throw.',
  },
  sustainedHits: {
    id: 'sustained-hits',
    name: 'Sustained Hits',
    description: 'Weapons with [SUSTAINED HITS X] in their profile are known as Sustained Hits weapons. Each time a model in the attacking unit makes an attack with such a weapon, a successful Hit roll of 6+ (before applying any modifiers) results in X additional hits.',
  },
  lethalHits: {
    id: 'lethal-hits',
    name: 'Lethal Hits',
    description: 'Weapons with [LETHAL HITS] in their profile are known as Lethal Hits weapons. Each time an attack is made with such a weapon, a successful Hit roll of 6+ (before applying any modifiers) automatically wounds the target.',
  },
  devastatingWounds: {
    id: 'devastating-wounds',
    name: 'Devastating Wounds',
    description: 'Weapons with [DEVASTATING WOUNDS] in their profile are known as Devastating Wounds weapons. Each time an attack is made with such a weapon, a successful Wound roll of 6+ (before applying any modifiers) results in the target unit suffering 1 mortal wound in addition to any normal damage.',
  },
  melta: {
    id: 'melta',
    name: 'Melta',
    description: 'Weapons with [MELTA X] in their profile are known as Melta weapons. Each time an attack is made with a Melta weapon, if the distance between the attacking model\'s unit and the target is less than half the weapon\'s Range characteristic, improve the Armour Penetration and Damage characteristics of that attack by 1 (e.g., AP-2 becomes AP-3, D2 becomes D3).',
  },
  hazardous: {
    id: 'hazardous',
    name: 'Hazardous',
    description: 'Weapons with [HAZARDOUS] in their profile are known as Hazardous weapons. Each time a unit shoots or fights with Hazardous weapons, after resolving all attacks, you must take a Hazardous test for each Hazardous weapon used (roll one D6: on a 1, the attacking model\'s unit suffers 1 mortal wound).',
  },
  antiVehicle: {
    id: 'anti-vehicle',
    name: 'Anti-Vehicle',
    description: 'Weapons with [ANTI-VEHICLE X+] in their profile are known as Anti-Vehicle weapons. Each time an attack is made with such a weapon that targets a unit with the Vehicle keyword, a successful Wound roll of X+ (before applying any modifiers) automatically wounds the target, inflicting normal damage.',
  },
  antiMonster: {
    id: 'anti-monster',
    name: 'Anti-Monster',
    description: 'Weapons with [ANTI-MONSTER X+] in their profile are known as Anti-Monster weapons. Each time an attack is made with such a weapon that targets a unit with the Monster keyword, a successful Wound roll of X+ (before applying any modifiers) automatically wounds the target, inflicting normal damage.',
  },
  antiFortification: {
    id: 'anti-fortification',
    name: 'Anti-Fortification',
    description: 'Weapons with [ANTI-FORTIFICATION X+] in their profile are known as Anti-Fortification weapons. Each time an attack is made with such a weapon that targets a unit with the Fortification keyword, a successful Wound roll of X+ (before applying any modifiers) automatically wounds the target, inflicting normal damage.',
  },
  indirect: {
    id: 'indirect',
    name: 'Indirect Fire',
    description: 'Weapons with [INDIRECT FIRE] in their profile are known as Indirect Fire weapons. Enemy units can be targeted with an Indirect Fire weapon even if they are not in Line of Sight of the attacking model\'s unit. If the target unit is receiving the benefit of Cover to its saving throw, it does so against attacks made with Indirect Fire weapons.',
  },
  twinLinked: {
    id: 'twin-linked',
    name: 'Twin-Linked',
    description: 'Weapons with [TWIN-LINKED] in their profile are known as Twin-Linked weapons. Each time a model makes an attack with a Twin-Linked weapon, you can re-roll the Hit roll.',
  },
  extraAttacks: {
    id: 'extra-attacks',
    name: 'Extra Attacks',
    description: 'Weapons with [EXTRA ATTACKS] in their profile are known as Extra Attacks weapons. These weapons can be used to make additional attacks beyond a model\'s normal attacks.',
  },
  autoHit: {
    id: 'autohit',
    name: 'Auto-Hit',
    description: 'Weapons with [AUTOHIT] in their profile are known as Auto-Hit weapons. Each time an attack is made with an Auto-Hit weapon, it automatically hits the target.',
  },
  fly: {
    id: 'fly',
    name: 'Fly',
    description: 'Weapons with [FLY] in their profile can be used to make attacks against units that can Fly.',
  },
  antiPsyker: {
    id: 'anti-psyker',
    name: 'Anti-Psyker',
    description: 'Weapons with [ANTI-PSYKER X+] in their profile are known as Anti-Psyker weapons. Each time an attack is made with such a weapon that targets a unit with the Psyker keyword, a successful Wound roll of X+ (before applying any modifiers) automatically wounds the target.',
  },
  probes: {
    id: 'probes',
    name: 'Probes',
    description: 'Weapons with [PROBES] in their profile are known as Probes weapons. While an enemy unit is within Range of this weapon, it is affected by the Probes keyword rules.',
  },
  skilled: {
    id: 'skilled',
    name: 'Skilled',
    description: 'Weapons with [SKILLED] in their profile are known as Skilled weapons. Each time a model makes an attack with a Skilled weapon, add 1 to the Hit roll.',
  },
  brutal: {
    id: 'brutal',
    name: 'Brutal',
    description: 'Weapons with [BRUTAL] in their profile are known as Brutal weapons. Each time a model makes an attack with a Brutal weapon, a successful Hit roll of 5+ (before applying any modifiers) results in 1 additional hit.',
  },
  push: {
    id: 'push',
    name: 'Push',
    description: 'Weapons with [PUSH] in their profile are known as Push weapons. Each time a model in the attacking unit makes a melee attack with a Push weapon, if the attack is allocated to a model in the target unit, after the attacking model\'s unit fights, the target unit must take a Battle-shock test.',
  },
  reRollHits: {
    id: 're-roll-hits',
    name: 'Re-roll Hits',
    description: 'Weapons with [RE-ROLL HITS] in their profile allow the attacker to re-roll Hit rolls of 1.',
  },
  reRollWounds: {
    id: 're-roll-wounds',
    name: 'Re-roll Wounds',
    description: 'Weapons with [RE-ROLL WOUNDS] in their profile allow the attacker to re-roll Wound rolls of 1.',
  },
};

export function getAbilityDescription(abilityId: string): string {
  return WEAPON_ABILITIES[abilityId]?.description || '';
}
