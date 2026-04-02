# Warhammer 40k 10th Edition - Data Schema Documentation

## Overview

This document describes the comprehensive, modular, and type-safe data schema for storing all Warhammer 40k 10th edition game data. The schema is designed to be:

- **Modular** - Easy to add new factions and units
- **Validatable** - Comprehensive validation functions catch errors at build time
- **Type-safe** - Full TypeScript support with strict typing
- **Consistent** - Uniform naming conventions throughout

---

## Table of Contents

1. [Core Design Principles](#core-design-principles)
2. [Entity Identifiers](#entity-identifiers)
3. [Weapon System](#weapon-system)
4. [Unit System](#unit-system)
5. [Faction System](#faction-system)
6. [Detachments & Stratagems](#detachments--stratagems)
7. [Combat Patrol](#combat-patrol)
8. [Missions](#missions)
9. [Validation System](#validation-system)
10. [Naming Conventions](#naming-conventions)
11. [Migration Guide](#migration-guide)

---

## Core Design Principles

### 1. Entity IDs (kebab-case)

All entity IDs must use **kebab-case** format:

```
Good: bolt-rifle, power-fist, space-marines
Bad:  boltRifle, power_fist, SpaceMarines
```

Use the `createEntityId()` function to validate and create IDs:

```typescript
import { createEntityId } from '../types/game';

const weaponId = createEntityId('Bolt Rifle'); // Returns 'bolt-rifle'
```

### 2. Leadership Format

Leadership values use the "7+" format to properly represent abilities like "Leadership 7+":

```typescript
// Old format (deprecated)
leadership: 7

// New format
leadership: { base: 7, plus: 0 }  // 7
leadership: { base: 7, plus: 1 }  // 7+
```

Helper functions are provided:
- `createLeadership(base, plus?)` - Creates a LeadershipValue
- `formatLeadership(ld)` - Formats for display

### 3. Weapon Abilities

Weapon abilities use typed IDs instead of raw strings:

```typescript
// Old format (deprecated)
keywords: ['LETHAL HITS', 'ASSAULT']

// New format
abilities: ['lethal-hits', 'assault']
```

Valid ability IDs are defined in the `WeaponAbilityId` type and include:
- `assault`, `heavy`, `rapid-fire`, `pistol`, `torrent`, `blast`
- `ignores-cover`, `sustained-hits`, `lethal-hits`, `devastating-wounds`
- `melta`, `hazardous`, `anti-vehicle`, `anti-monster`, `anti-fortification`
- `indirect`, `twin-linked`, `extra-attacks`, `auto-hit`, `precision`, etc.

### 4. Dice Notation

Weapon stats use string dice notation:

```typescript
attacks: '1'      // Single attack
attacks: 'D6'     // 1D6 attacks
attacks: 'D6+1'   // 1D6 + 1
attacks: 'D3+D3'  // 2D3
attacks: 'N/A'    // Not applicable (for auto-hit weapons)
```

---

## Entity Identifiers

### EntityId Type

All entities use the `EntityId` type for type safety:

```typescript
type EntityId = string & { readonly __brand: 'EntityId' };
```

### ID Validation

```typescript
import { isValidEntityId, createEntityId } from '../types/game';

// Check if valid
isValidEntityId('bolt-rifle');  // true
isValidEntityId('boltRifle');   // false

// Create valid ID (normalizes input)
createEntityId('Bolt Rifle');   // 'bolt-rifle'
```

---

## Weapon System

### Weapon Definition

```typescript
interface Weapon {
  id: EntityId;           // 'bolt-rifle'
  name: string;           // 'Bolt Rifle'
  type: 'ranged' | 'melee';
  range?: string;         // '24"' or 'Melee'
  attacks: RollCharacteristic;  // '2', 'D6', 'D6+1'
  skill: RollCharacteristic;   // '3+', 'N/A'
  strength: string;       // '4', 'S+1', 'S-1'
  armorPenetration: string;    // '0', '-1', '-3'
  damage: RollCharacteristic;  // '1', 'D6', 'D3+1'
  abilities: readonly WeaponAbilityId[];
  keywords?: readonly string[];  // Legacy support
  description?: string;
}
```

### Weapon Option

Units define weapon options:

```typescript
interface WeaponOption {
  weaponId: EntityId;
  isDefault: boolean;
  cost: number;
  modelsEquipped?: number;
  restriction?: string;
}
```

### Example

```typescript
const boltRifle: Weapon = {
  id: createEntityId('bolt-rifle'),
  name: 'Bolt Rifle',
  type: 'ranged',
  range: '24"',
  attacks: '2',
  skill: '3+',
  strength: '4',
  armorPenetration: '-1',
  damage: '1',
  abilities: ['assault', 'heavy'],
};
```

---

## Unit System

### Unit Definition

```typescript
interface Unit {
  id: EntityId;
  name: string;
  role: UnitRole;
  keywords: readonly string[];
  profiles: readonly UnitProfile[];
  weapons: readonly WeaponOption[];
  abilities: readonly Ability[];
  transportCapacity?: number;
  notes?: string;
  unitComposition?: string;
  factionKeyword: string;
}
```

### Unit Profile

```typescript
interface UnitProfile {
  models: number;
  profile: {
    move: number;
    toughness: number;
    save: number;
    wounds: number;
    leadership: LeadershipValue;  // { base: 7, plus: 0 }
    oc: number;
    invulnerableSave?: number;   // 4 for 4+
    feelNoPain?: number;         // 5 for 5+
  };
  basePoints: number;
}
```

### Unit Roles

```typescript
type UnitRole = 
  | 'hq' 
  | 'troops' 
  | 'elites' 
  | 'fast-attack' 
  | 'heavy-support' 
  | 'flyer' 
  | 'dedicated-transport'
  | 'fortification'
  | 'auxiliary';
```

### Example

```typescript
const tacticalSquad: Unit = {
  id: createEntityId('tactical-squad'),
  name: 'Tactical Squad',
  role: 'troops',
  keywords: ['SPACE_MARINES', 'INFANTRY', 'BATTLELINE', 'TACTICAL'],
  profiles: [
    {
      models: 5,
      profile: {
        move: 6,
        toughness: 4,
        save: 3,
        wounds: 2,
        leadership: createLeadership(7),
        oc: 1,
      },
      basePoints: 100,
    },
    {
      models: 10,
      profile: {
        move: 6,
        toughness: 4,
        save: 3,
        wounds: 2,
        leadership: createLeadership(7),
        oc: 2,
      },
      basePoints: 200,
    },
  ],
  weapons: [
    { weaponId: createEntityId('boltgun'), isDefault: true, cost: 0 },
    { weaponId: createEntityId('flamer'), isDefault: false, cost: 5 },
  ],
  abilities: [],
  factionKeyword: 'SPACE_MARINES',
};
```

---

## Faction System

### Faction Definition

```typescript
interface Faction {
  id: EntityId;
  name: string;
  icon: string;
  superFaction: SuperFaction;
  keywords: readonly string[];
  armyRule: ArmyRule;
  subfactions?: readonly Subfaction[];
  units: readonly Unit[];
  detachments: readonly Detachment[];
  combatPatrolUnits?: readonly Unit[];
  uniqueUnits?: readonly Unit[];
  uniqueDetachments?: readonly Detachment[];
  restrictions?: FactionRestrictions;
}
```

### Army Rule

```typescript
interface ArmyRule {
  type: ArmyRuleType;
  name: string;
  description: string;
  oathOfMoment?: { rerollHits: boolean; bonusToWound?: boolean };
  vows?: readonly Vow[];
  customRules?: readonly Ability[];
}
```

### Example

```typescript
const spaceMarines: Faction = {
  id: createEntityId('space-marines'),
  name: 'Space Marines',
  icon: '🦅',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'SPACE_MARINES'],
  armyRule: {
    type: 'oath-of-moment',
    name: 'Oath of Moment',
    description: 'Once per battle, select one enemy unit...',
    oathOfMoment: { rerollHits: true },
  },
  units: [...],
  detachments: [...],
};
```

---

## Detachments & Stratagems

### Detachment

```typescript
interface Detachment {
  id: EntityId;
  name: string;
  factionId: EntityId;
  description: string;
  rule: Ability;
  enhancements: readonly Enhancement[];
  stratagems: readonly Stratagem[];
  restrictions?: {
    cannotInclude?: readonly string[];
    mandatoryKeywords?: readonly string[];
    noExternalAllies?: boolean;
  };
}
```

### Stratagem

```typescript
interface Stratagem {
  id: EntityId;
  name: string;
  cost: number;
  type: 'Battle Tactic' | 'Epic Deed' | 'Strategic Ploy' | 'Wargear';
  phases: readonly StratagemPhase[];
  description: string;
  whenUsed?: string;
  target?: string;
  restriction?: string;
}
```

### Enhancement

```typescript
interface Enhancement {
  id: EntityId;
  name: string;
  points: number;
  description: string;
  restriction?: string;
}
```

---

## Combat Patrol

### Combat Patrol Roster

```typescript
interface CombatPatrolRoster {
  name: string;
  description: string;
  warlordId: string;
  warlordName: string;
  units: readonly CombatPatrolUnit[];
  enhancements: readonly CombatPatrolEnhancement[];
  secondaryObjectives: readonly CombatPatrolSecondaryObjective[];
  stratagems: readonly CombatPatrolStratagem[];
  factionRule?: string;
}
```

---

## Missions

### Mission

```typescript
interface Mission {
  id: EntityId;
  name: string;
  missionPack: string;
  briefing: string;
  deploymentType: DeploymentType;
  deploymentInstructions: string;
  missionRule?: string;
  primaryObjective: Objective;
  secondaryOptions: readonly SecondaryObjective[];
  noFirstTurn?: boolean;
}
```

---

## Validation System

### Running Validation

Import and run validation functions:

```typescript
import { 
  validateWeapon, 
  validateUnit, 
  validateFaction,
  validateAllData,
  runValidation 
} from '../data/rules/validation';

// Validate individual items
const weaponResult = validateWeapon(boltRifle, weaponMap);

// Validate entire data set
const allResult = validateAllData(
  allWeapons,
  allFactions,
  allMissions
);

// Run full validation and get formatted output
const { valid, output } = runValidation({
  weapons: allWeapons,
  factions: allFactions,
  missions: allMissions,
});

console.log(output);
```

### Validation Results

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: readonly ValidationError[];
  warnings: readonly ValidationWarning[];
  stats: ValidationStats;
}
```

---

## Naming Conventions

### Entity IDs

| Type | Format | Example |
|------|--------|---------|
| Weapons | kebab-case | `bolt-rifle`, `power-fist` |
| Units | kebab-case | `tactical-squad`, `captain` |
| Factions | kebab-case | `space-marines`, `black-templars` |
| Detachments | kebab-case | `gladius-task-force` |
| Stratagems | kebab-case | `combat-formation` |
| Enhancements | kebab-case | `chapter-relic` |
| Abilities | kebab-case | `oath-of-moment` |

### Keywords

Use ALL_CAPS with underscores:

```
IMPERIUM, SPACE_MARINES, INFANTRY, CHARACTER, BATTLELINE
VEHICLE, MONSTER, FLY, PSYKER, DEEP_STRIKE
```

### File Organization

```
/client/src/
├── data/
│   ├── weapons/
│   │   ├── index.ts          # Weapon exports
│   │   ├── abilities.ts       # Weapon ability definitions
│   │   ├── space-marines.ts   # Space Marine weapons
│   │   ├── orks.ts           # OrK weapons
│   │   └── tyranids.ts       # Tyranid weapons
│   ├── factions/
│   │   ├── index.ts          # Faction exports
│   │   ├── space-marines/
│   │   │   ├── index.ts      # Space Marine faction
│   │   │   ├── chapters/     # Chapter-specific data
│   │   │   ├── detachments/ # Detachment rules
│   │   │   └── units.ts     # Shared units
│   │   └── orks/
│   │       ├── index.ts      # OrK faction
│   │       └── ...
│   ├── missions/
│   │   └── ...
│   └── rules/
│       └── validation.ts     # Validation functions
├── types/
│   └── game.ts              # Type definitions
└── schema.ts                # Utility functions
```

---

## Migration Guide

### From Old Weapon IDs

Old weapon IDs used inconsistent casing:

```typescript
// Old (inconsistent)
{ weaponId: 'boltPistol' }
{ weaponId: 'bolt-rifle' }
{ weaponId: 'power-fist' }

// New (consistent kebab-case)
{ weaponId: 'bolt-pistol' }
{ weaponId: 'bolt-rifle' }
{ weaponId: 'power-fist' }
```

### From Number Leadership

```typescript
// Old
profile: { leadership: 7, ... }

// New
profile: { leadership: createLeadership(7), ... }
// or
profile: { leadership: { base: 7 }, ... }
```

### From String Abilities

```typescript
// Old
keywords: ['LETHAL HITS', 'ASSAULT']

// New
abilities: ['lethal-hits', 'assault']
```

---

## Utility Functions

### Data Organization

Import utilities from `../data/schema`:

```typescript
import {
  createEntityId,
  createLeadershipValue,
  formatLeadershipValue,
  findFaction,
  findUnit,
  findWeapon,
  getUnitsByRole,
  getCharacterUnits,
  getBattleLineUnits,
  calculateArmyPoints,
  getPointsLimit,
  validatePoints,
} from '../data/schema';
```

---

## Best Practices

1. **Always use helper functions** for creating IDs and leadership values
2. **Run validation** during CI/CD to catch errors early
3. **Use consistent naming** - follow the kebab-case convention
4. **Define abilities once** and reference by ID
5. **Group related data** in separate files by faction
6. **Use TypeScript strict mode** for maximum type safety
7. **Document custom rules** in ability descriptions

---

## License

This schema is provided as part of the Warhammer 40k Helper project.
