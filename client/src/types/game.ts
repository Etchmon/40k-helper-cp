// ============================================
// GAME SIZES & CONSTANTS
// ============================================

export type GameSize = 'combat-patrol' | 'incursion' | 'strike-force' | 'onslaught';

export const POINTS_BY_SIZE: Record<GameSize, number> = {
  'combat-patrol': 500,
  'incursion': 1000,
  'strike-force': 2000,
  'onslaught': 3000,
};

// Command Points rules (10th Edition Matched Play)
export const STARTING_CP_BY_SIZE: Record<GameSize, number> = {
  'combat-patrol': 3,
  'incursion': 6,
  'strike-force': 12,
  'onslaught': 18,
};

export const CP_PER_COMMAND_PHASE = 1;
export const MAX_CP_GAIN_PER_ROUND = 1; // Cap on CP gained from "other sources" per round

export const GAME_SIZES: { id: GameSize; name: string; points: number; description: string }[] = [
  { id: 'combat-patrol', name: 'Combat Patrol', points: 500, description: 'Quick games using pre-set Combat Patrol forces' },
  { id: 'incursion', name: 'Incursion', points: 1000, description: 'Small skirmish, great for learning' },
  { id: 'strike-force', name: 'Strike Force', points: 2000, description: 'Standard game size for competitive play' },
  { id: 'onslaught', name: 'Onslaught', points: 3000, description: 'Large battle with full armies' },
];

// ============================================
// SUPER FACTIONS
// ============================================

export type SuperFaction = 'imperium' | 'chaos' | 'xenos';

// ============================================
// PHASES
// ============================================

export type Phase = 'command' | 'movement' | 'shooting' | 'charge' | 'fight';

export const PHASE_ORDER: Phase[] = ['command', 'movement', 'shooting', 'charge', 'fight'];

export const PHASES: Record<Phase, PhaseInfo> = {
  command: {
    id: 'command',
    name: 'Command Phase',
    shortName: 'CMD',
    description: 'Generate command points and issue orders',
    instructions: [
      { type: 'step', text: 'Roll for Battle-shock tests', action: 'battle-shock' },
      { type: 'step', text: 'Use faction abilities', action: 'ability' },
      { type: 'step', text: 'Command Points generated automatically', action: 'auto' },
      { type: 'action', text: 'Score Primary Objective', action: 'score-primary' },
    ],
  },
  movement: {
    id: 'movement',
    name: 'Movement Phase',
    shortName: 'MOV',
    description: 'Move units across the battlefield',
    instructions: [
      { type: 'action', text: 'Select unit to move', action: 'select-unit' },
      { type: 'info', text: 'Normal move: 6" | Advance: up to 12" (cannot shoot)', action: 'info' },
      { type: 'action', text: 'Declare Fall Back (if in engagement range)', action: 'fall-back' },
      { type: 'action', text: 'Embark on transport', action: 'embark' },
    ],
  },
  shooting: {
    id: 'shooting',
    name: 'Shooting Phase',
    shortName: 'SHO',
    description: 'Attack enemies with ranged weapons',
    instructions: [
      { type: 'action', text: 'Select shooting unit', action: 'select-shooter' },
      { type: 'action', text: 'Select target(s)', action: 'select-target' },
      { type: 'action', text: 'Roll to Hit (ballistic skill)', action: 'roll-hit' },
      { type: 'action', text: 'Roll to Wound (Strength vs Toughness)', action: 'roll-wound' },
      { type: 'action', text: 'Opponent rolls Saving Throw', action: 'roll-save' },
      { type: 'action', text: 'Allocate wounds to models', action: 'allocate' },
    ],
  },
  charge: {
    id: 'charge',
    name: 'Charge Phase',
    shortName: 'CHG',
    description: 'Rush toward enemy units',
    instructions: [
      { type: 'action', text: 'Select unit to charge', action: 'select-charger' },
      { type: 'action', text: 'Declare charge target', action: 'declare-target' },
      { type: 'action', text: 'Roll 2D6 for charge distance', action: 'roll-charge' },
      { type: 'info', text: 'Unit must be within 12" and visible', action: 'info' },
      { type: 'action', text: 'Move unit toward target', action: 'move-charge' },
    ],
  },
  fight: {
    id: 'fight',
    name: 'Fight Phase',
    shortName: 'FIG',
    description: 'Engage in close combat',
    instructions: [
      { type: 'action', text: 'Select fighting unit', action: 'select-fighter' },
      { type: 'action', text: 'Select target', action: 'select-target' },
      { type: 'action', text: 'Roll to Hit (WS)', action: 'roll-hit' },
      { type: 'action', text: 'Roll to Wound (Strength vs Toughness)', action: 'roll-wound' },
      { type: 'action', text: 'Opponent rolls Saving Throw', action: 'roll-save' },
      { type: 'action', text: 'Consolidate (move up to 3")', action: 'consolidate' },
    ],
  },
};

export interface PhaseInfo {
  id: Phase;
  name: string;
  shortName: string;
  description: string;
  instructions: PhaseInstruction[];
}

export interface PhaseInstruction {
  type: 'action' | 'step' | 'info';
  text: string;
  action: string;
}

// ============================================
// WEAPONS
// ============================================

export interface Weapon {
  id: string;
  name: string;
  type: 'ranged' | 'melee';
  range?: string;
  attacks: string;
  skill: string;
  strength: string;
  armorPenetration: string;
  damage: string;
  abilities?: string[];
  keywords?: string[];
}

export interface WeaponOption {
  weaponId: string;
  isDefault: boolean;
  cost: number;
}

// ============================================
// UNIT ABILITIES
// ============================================

export interface Ability {
  id: string;
  name: string;
  description: string;
  rule?: string;
}

// ============================================
// UNITS
// ============================================

export type UnitRole = 'hq' | 'troops' | 'elites' | 'fast-attack' | 'heavy-support' | 'flyer' | 'dedicated-transport';

export const ROLE_ORDER: UnitRole[] = ['hq', 'troops', 'elites', 'fast-attack', 'heavy-support', 'flyer', 'dedicated-transport'];

export const ROLE_LABELS: Record<UnitRole, string> = {
  'hq': 'HQ',
  'troops': 'Troops',
  'elites': 'Elites',
  'fast-attack': 'Fast Attack',
  'heavy-support': 'Heavy Support',
  'flyer': 'Flyer',
  'dedicated-transport': 'Dedicated Transport',
};

export interface UnitProfile {
  models: number;
  profile: {
    move: number;
    toughness: number;
    save: number;
    wounds: number;
    leadership: number;
    oc: number;
  };
  basePoints: number;
}

export interface Unit {
  id: string;
  name: string;
  role: UnitRole;
  keywords: string[];
  profiles: UnitProfile[];
  weapons: WeaponOption[];
  abilities: Ability[];
  transportCapacity?: number;
  notes?: string;
}

export interface ArmyUnit {
  unitId: string;
  quantity: number;
  weapons: string[];
  enhancementIds: string[];
}

// ============================================
// DETACHMENTS
// ============================================

export interface Enhancement {
  id: string;
  name: string;
  points: number;
  description: string;
  restriction?: string;
  keywords?: string[];
}

export type StratagemType = 'Battle Tactic' | 'Epic Deed' | 'Strategic Ploy' | 'Wargear';

export type StratagemPhase = 
  | 'command' 
  | 'movement' 
  | 'shooting' 
  | 'charge' 
  | 'fight'
  | 'psychic'
  | 'opponent-movement'
  | 'opponent-charge'
  | 'opponent-shooting'
  | 'opponent-fight'
  | 'end-opponent-movement'
  | 'any';

export interface Stratagem {
  id: string;
  name: string;
  cost: number;
  type?: StratagemType;
  phases?: StratagemPhase[];
  description: string;
  whenUsed?: string;
  target?: string;
  restriction?: string;
  restrictions?: string[];
}

export interface UniversalStratagem extends Omit<Stratagem, 'type' | 'phases'> {
  type: StratagemType;
  phases: StratagemPhase[];
}

export interface Detachment {
  id: string;
  name: string;
  description: string;
  rule: Ability;
  enhancements: Enhancement[];
  stratagems: Stratagem[];
}

// ============================================
// SUBFACTIONS / CHAPTERS
// ============================================

export interface Subfaction {
  id: string;
  name: string;
  description: string;
  rule: Ability;
}

// ============================================
// ARMY RULES
// ============================================

export type ArmyRuleType = 'oath-of-moment' | 'templar-vows';

export interface TemplarVow {
  id: string;
  name: string;
  description: string;
}

export interface ArmyRule {
  type: ArmyRuleType;
  oathOfMoment?: {
    rerollHits: boolean;
    bonusToWound?: boolean;
  };
  templarVows?: {
    vows: TemplarVow[];
  };
}

export const TEMPLAR_VOWS: TemplarVow[] = [
  {
    id: 'uphold-honour',
    name: 'Uphold the Honour of the Emperor',
    description: 'INFANTRY units have Sticky Objectives. You can perform Actions after Advancing.',
  },
  {
    id: 'suffer-not-unclean',
    name: 'Suffer Not the Unclean to Live',
    description: 'Your units can Fall Back and Charge in the same turn. Pile-in/consolidate moves can be toward any enemy.',
  },
  {
    id: 'accept-challenge',
    name: 'Accept Any Challenge, No Matter the Odds',
    description: 'Melee weapons gain +1 to Wound if Strength ≤ Toughness of target.',
  },
  {
    id: 'abhor-witch',
    name: 'Abhor the Witch, Destroy the Witch',
    description: 'Re-roll Charge rolls against PSYKER units. Melee weapons gain PRECISION against PSYKERS.',
  },
];

// ============================================
// COMBAT PATROL
// ============================================

export interface CombatPatrolUnit {
  id: string;
  name: string;
  models: number;
  role: UnitRole;
  keywords: string[];
  weapons: { name: string; profile: string }[];
  abilities: string[];
  notes?: string;
}

export interface CombatPatrolEnhancement {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
}

export interface CombatPatrolSecondaryObjective {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  isDefault: boolean;
}

export interface CombatPatrolStratagem {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export interface CombatPatrolRoster {
  name: string;
  description: string;
  warlordId: string;
  warlordName: string;
  units: CombatPatrolUnit[];
  enhancements: CombatPatrolEnhancement[];
  secondaryObjectives: CombatPatrolSecondaryObjective[];
  stratagems: CombatPatrolStratagem[];
  factionRule?: string;
}

// ============================================
// FACTIONS
// ============================================

export interface Faction {
  id: string;
  name: string;
  icon: string;
  superFaction: SuperFaction;
  keywords: string[];
  armyRule: ArmyRule;
  subfactions?: Subfaction[];
  units: Unit[];
  detachments: Detachment[];
  combatPatrolUnits?: Unit[];
  uniqueUnits?: Unit[];
  uniqueDetachments?: Detachment[];
  restrictions?: {
    cannotInclude?: string[];
    mandatoryKeywords?: string[];
  };
  combatPatrolRoster?: CombatPatrolRoster;
}

// ============================================
// MISSIONS
// ============================================

export type DeploymentType = 
  | 'dawn-of-war'
  | 'hammer-and-anvil'
  | 'search-and-destroy'
  | 'vanguard-strike'
  | 'infiltration'
  | 'crucible';

export interface Objective {
  id: string;
  name: string;
  description: string;
  scoring: string;
}

export interface SecondaryObjective {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
}

export interface Mission {
  id: string;
  name: string;
  missionPack: string;
  briefing: string;
  deploymentType: DeploymentType;
  deploymentInstructions: string;
  missionRule?: string;
  primaryObjective: Objective;
  secondaryOptions: SecondaryObjective[];
  noFirstTurn?: boolean;
}

export interface MissionPack {
  id: string;
  name: string;
  description: string;
  missions: Mission[];
}

// ============================================
// GAME STATE
// ============================================

export type GameStatus = 'setup' | 'playing' | 'finished';

export interface PlayerSetup {
  name: string;
  factionId: string | null;
  army: ArmyUnit[];
  detachmentId: string | null;
  enhancementIds: string[];
  warlordId: string | null;
  totalPoints: number;
  templarVow?: string;
}

export interface TurnState {
  round: number;
  phase: Phase;
  activePlayer: 1 | 2;
  isPlayer1Turn: boolean;
}

export interface SecondarySelection {
  id: string;
  name: string;
  points: number;
}

export interface CommandPointsState {
  current: [number, number]; // Current CP for each player
  starting: [number, number]; // Starting CP for reference
  spentThisRound: [number, number]; // Track CP spent this round (for cap tracking)
  gainedThisRound: [number, number]; // Track CP gained from other sources this round
}

export interface BattleState {
  victoryPoints: [number, number];
  primaryScored: [number, number];
  secondariesSelected: [SecondarySelection | null, SecondarySelection | null];
  secondariesScored: [number, number];
  commandPoints: CommandPointsState;
  selectedUnitId: string | null;
}

export interface GameAction {
  id: string;
  timestamp: number;
  player: 1 | 2;
  phase: Phase;
  round: number;
  type: string;
  description: string;
  details?: Record<string, unknown>;
}

export interface GameState {
  id: string;
  status: GameStatus;
  settings: {
    gameSize: GameSize;
    missionId: string;
    isRandomMission: boolean;
    createdAt: string;
  };
  players: [PlayerSetup, PlayerSetup];
  turn: TurnState;
  battle: BattleState;
  actionLog: GameAction[];
  winner: 1 | 2 | null;
  finalScore: [number, number] | null;
}

// ============================================
// SETUP WIZARD STEPS
// ============================================

export type SetupStep = 
  | 'settings'
  | 'player1-faction'
  | 'player2-faction'
  | 'player1-army'
  | 'player2-army'
  | 'player1-detachment'
  | 'player2-detachment'
  | 'mission'
  | 'ready';

export const SETUP_STEPS: { id: SetupStep; name: string; description: string }[] = [
  { id: 'settings', name: 'Game Settings', description: 'Select game size and player names' },
  { id: 'player1-faction', name: 'Player 1 Faction', description: 'Choose your army' },
  { id: 'player2-faction', name: 'Player 2 Faction', description: 'Choose your army' },
  { id: 'player1-army', name: 'Player 1 Army', description: 'Build your army roster' },
  { id: 'player2-army', name: 'Player 2 Army', description: 'Build your army roster' },
  { id: 'player1-detachment', name: 'Player 1 Setup', description: 'Select detachment and warlord' },
  { id: 'player2-detachment', name: 'Player 2 Setup', description: 'Select detachment and warlord' },
  { id: 'mission', name: 'Mission', description: 'Review mission briefing' },
  { id: 'ready', name: 'Ready', description: 'Confirm and begin battle' },
];
