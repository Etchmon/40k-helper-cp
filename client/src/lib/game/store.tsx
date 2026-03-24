/**
 * Game State Management
 * 
 * Provides a React context with reducer-based state management for the 40k game.
 * Includes localStorage persistence and selective hooks for optimal performance.
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo, ReactNode } from 'react';
import {
  GameState,
  GameSize,
  PlayerSetup,
  TurnState,
  BattleState,
  GameAction,
  Phase,
  PHASE_ORDER,
  ArmyUnit,
  SecondarySelection,
  STARTING_CP_BY_SIZE,
} from '../../types/game';
import { getFactionById } from '../../data';
import { calculateArmyPoints, validateArmy } from '../../data/rules/validation';

const STORAGE_KEY = '40k-game-state';

/**
 * Generates a unique ID for game instances and action log entries.
 * Uses crypto API when available for better randomness.
 */
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

/**
 * Helper to get player index (0-based) from player number (1 or 2)
 */
function getPlayerIndex(player: 1 | 2): 0 | 1 {
  return (player - 1) as 0 | 1;
}

/**
 * Helper to clone players array with immutability
 */
function clonePlayers(players: [PlayerSetup, PlayerSetup]): [PlayerSetup, PlayerSetup] {
  return [...players] as [PlayerSetup, PlayerSetup];
}

/**
 * Helper to recalculate army points for a player
 */
function recalculatePoints(
  players: [PlayerSetup, PlayerSetup],
  playerIndex: 0 | 1
): [PlayerSetup, PlayerSetup] {
  const player = players[playerIndex];
  const faction = getFactionById(player.factionId || '');
  const newTotalPoints = calculateArmyPoints(
    player.army,
    faction,
    player.enhancementIds,
    player.detachmentId
  );
  
  const newPlayers = clonePlayers(players);
  newPlayers[playerIndex] = { ...player, totalPoints: newTotalPoints };
  return newPlayers;
}

const initialTurnState: TurnState = {
  round: 1,
  phase: 'command',
  activePlayer: 1,
  isPlayer1Turn: true,
};

const initialBattleState: BattleState = {
  victoryPoints: [0, 0],
  primaryScored: [0, 0],
  secondariesSelected: [null, null],
  secondariesScored: [0, 0],
  commandPoints: {
    current: [0, 0],
    starting: [0, 0],
    spentThisRound: [0, 0],
    gainedThisRound: [0, 0],
  },
  selectedUnitId: null,
};

const emptyPlayerSetup = (): PlayerSetup => ({
  name: '',
  factionId: null,
  army: [],
  detachmentId: null,
  enhancementIds: [],
  warlordId: null,
  totalPoints: 0,
});

const initialGameState: GameState = {
  id: generateId(),
  status: 'setup',
  settings: {
    gameSize: 'strike-force',
    missionId: 'only-war',
    isRandomMission: false,
    createdAt: new Date().toISOString(),
  },
  players: [emptyPlayerSetup(), emptyPlayerSetup()],
  turn: initialTurnState,
  battle: initialBattleState,
  actionLog: [],
  winner: null,
  finalScore: null,
};

// ============================================
// ACTION TYPES
// ============================================

type GameActionType =
  | { type: 'SET_GAME_SIZE'; payload: GameSize }
  | { type: 'SET_MISSION'; payload: string }
  | { type: 'SET_RANDOM_MISSION'; payload: boolean }
  | { type: 'SET_PLAYER_NAME'; payload: { player: 1 | 2; name: string } }
  | { type: 'SET_PLAYER_FACTION'; payload: { player: 1 | 2; factionId: string } }
  | { type: 'SET_PLAYER_DETACHMENT'; payload: { player: 1 | 2; detachmentId: string } }
  | { type: 'ADD_UNIT'; payload: { player: 1 | 2; unit: ArmyUnit } }
  | { type: 'REMOVE_UNIT'; payload: { player: 1 | 2; unitId: string } }
  | { type: 'UPDATE_UNIT_QUANTITY'; payload: { player: 1 | 2; unitId: string; quantity: number } }
  | { type: 'SET_WARLORD'; payload: { player: 1 | 2; warlordId: string } }
  | { type: 'ADD_ENHANCEMENT'; payload: { player: 1 | 2; enhancementId: string } }
  | { type: 'REMOVE_ENHANCEMENT'; payload: { player: 1 | 2; enhancementId: string } }
  | { type: 'SET_TEMPLAR_VOW'; payload: { player: 1 | 2; vowId: string } }
  | { type: 'START_GAME' }
  | { type: 'NEXT_PHASE' }
  | { type: 'NEXT_TURN' }
  | { type: 'NEXT_ROUND' }
  | { type: 'SET_PHASE'; payload: Phase }
  | { type: 'SET_ACTIVE_PLAYER'; payload: 1 | 2 }
  | { type: 'ADD_VP'; payload: { player: 1 | 2; points: number; reason: string } }
  | { type: 'SELECT_SECONDARY'; payload: { player: 1 | 2; secondaryId: string; name: string } }
  | { type: 'SCORE_SECONDARY'; payload: { player: 1 | 2; points: number } }
  | { type: 'ADD_ACTION_LOG'; payload: { player: 1 | 2; type: string; description: string; details?: Record<string, unknown> } }
  | { type: 'END_GAME'; payload: { winner: 1 | 2 } }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_GAME'; payload: GameState }
  | { type: 'SPEND_CP'; payload: { player: 1 | 2; amount: number; reason: string } }
  | { type: 'GAIN_CP'; payload: { player: 1 | 2; amount: number; reason: string } }
  | { type: 'AUTO_GAIN_COMMAND_PHASE_CP'; payload: { player: 1 | 2 } }
  | { type: 'SELECT_UNIT'; payload: { unitId: string | null } };

// ============================================
// REDUCER
// ============================================

function gameReducer(state: GameState, action: GameActionType): GameState {
  switch (action.type) {
    case 'SET_GAME_SIZE':
      return {
        ...state,
        settings: { ...state.settings, gameSize: action.payload },
      };

    case 'SET_MISSION':
      return {
        ...state,
        settings: { ...state.settings, missionId: action.payload },
      };

    case 'SET_RANDOM_MISSION':
      return {
        ...state,
        settings: { ...state.settings, isRandomMission: action.payload },
      };

    case 'SET_PLAYER_NAME': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], name: action.payload.name };
      return { ...state, players: newPlayers };
    }

    case 'SET_PLAYER_FACTION': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        factionId: action.payload.factionId,
        army: [],
        detachmentId: null,
        enhancementIds: [],
        warlordId: null,
        totalPoints: 0,
      };
      return { ...state, players: newPlayers };
    }

    case 'SET_PLAYER_DETACHMENT': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        detachmentId: action.payload.detachmentId,
        enhancementIds: [],
      };
      return { ...state, players: newPlayers };
    }

    case 'ADD_UNIT': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      const player = newPlayers[playerIndex];
      const existingUnitIndex = player.army.findIndex(
        u => u.unitId === action.payload.unit.unitId
      );

      let newArmy: ArmyUnit[];
      if (existingUnitIndex >= 0) {
        newArmy = player.army.map((u, i) =>
          i === existingUnitIndex
            ? { ...u, quantity: u.quantity + action.payload.unit.quantity }
            : u
        );
      } else {
        newArmy = [...player.army, action.payload.unit];
      }

      newPlayers[playerIndex] = { ...player, army: newArmy };
      return { ...state, players: recalculatePoints(newPlayers, playerIndex) };
    }

    case 'REMOVE_UNIT': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      const player = newPlayers[playerIndex];
      const newArmy = player.army.filter(u => u.unitId !== action.payload.unitId);
      newPlayers[playerIndex] = { ...player, army: newArmy };
      return { ...state, players: recalculatePoints(newPlayers, playerIndex) };
    }

    case 'UPDATE_UNIT_QUANTITY': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      const player = newPlayers[playerIndex];
      const newArmy = player.army.map(u =>
        u.unitId === action.payload.unitId ? { ...u, quantity: action.payload.quantity } : u
      );
      newPlayers[playerIndex] = { ...player, army: newArmy };
      return { ...state, players: recalculatePoints(newPlayers, playerIndex) };
    }

    case 'SET_WARLORD': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], warlordId: action.payload.warlordId };
      return { ...state, players: newPlayers };
    }

    case 'ADD_ENHANCEMENT': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      const player = newPlayers[playerIndex];
      const newEnhancementIds = [...player.enhancementIds, action.payload.enhancementId];
      newPlayers[playerIndex] = { ...player, enhancementIds: newEnhancementIds };
      return { ...state, players: recalculatePoints(newPlayers, playerIndex) };
    }

    case 'REMOVE_ENHANCEMENT': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      const player = newPlayers[playerIndex];
      const newEnhancementIds = player.enhancementIds.filter(
        id => id !== action.payload.enhancementId
      );
      newPlayers[playerIndex] = { ...player, enhancementIds: newEnhancementIds };
      return { ...state, players: recalculatePoints(newPlayers, playerIndex) };
    }

    case 'SET_TEMPLAR_VOW': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newPlayers = clonePlayers(state.players);
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], templarVow: action.payload.vowId };
      return { ...state, players: newPlayers };
    }

    case 'START_GAME': {
      const startingCP = STARTING_CP_BY_SIZE[state.settings.gameSize];
      return {
        ...state,
        status: 'playing',
        turn: initialTurnState,
        battle: {
          ...initialBattleState,
          commandPoints: {
            current: [startingCP, startingCP],
            starting: [startingCP, startingCP],
            spentThisRound: [0, 0],
            gainedThisRound: [0, 0],
          },
        },
        actionLog: [],
        winner: null,
        finalScore: null,
      };
    }

    case 'NEXT_PHASE': {
      const currentPhaseIndex = PHASE_ORDER.indexOf(state.turn.phase);
      let nextPhase: Phase;
      let nextPlayer = state.turn.activePlayer;

      if (currentPhaseIndex < PHASE_ORDER.length - 1) {
        nextPhase = PHASE_ORDER[currentPhaseIndex + 1];
      } else {
        nextPhase = 'command';
        nextPlayer = state.turn.activePlayer === 1 ? 2 : 1;
      }

      return {
        ...state,
        turn: {
          ...state.turn,
          phase: nextPhase,
          activePlayer: nextPlayer,
          isPlayer1Turn: nextPlayer === 1,
        },
      };
    }

    case 'NEXT_TURN': {
      const nextPlayer = state.turn.activePlayer === 1 ? 2 : 1;
      return {
        ...state,
        turn: {
          ...state.turn,
          activePlayer: nextPlayer,
          isPlayer1Turn: nextPlayer === 1,
        },
      };
    }

    case 'NEXT_ROUND': {
      if (state.turn.round >= 5) {
        return {
          ...state,
          status: 'finished',
          finalScore: [...state.battle.victoryPoints],
          winner: state.battle.victoryPoints[0] > state.battle.victoryPoints[1] 
            ? 1 
            : state.battle.victoryPoints[1] > state.battle.victoryPoints[0] 
              ? 2 
              : null,
        };
      }
      return {
        ...state,
        turn: {
          ...state.turn,
          round: (state.turn.round + 1) as 1 | 2 | 3 | 4 | 5,
          phase: 'command',
          activePlayer: 1,
          isPlayer1Turn: true,
        },
        battle: {
          ...state.battle,
          commandPoints: {
            ...state.battle.commandPoints,
            spentThisRound: [0, 0],
            gainedThisRound: [0, 0],
          },
        },
      };
    }

    case 'SET_PHASE':
      return {
        ...state,
        turn: { ...state.turn, phase: action.payload },
      };

    case 'SET_ACTIVE_PLAYER':
      return {
        ...state,
        turn: {
          ...state.turn,
          activePlayer: action.payload,
          isPlayer1Turn: action.payload === 1,
        },
      };

    case 'ADD_VP': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newVP: [number, number] = [...state.battle.victoryPoints];
      newVP[playerIndex] += action.payload.points;
      return {
        ...state,
        battle: { ...state.battle, victoryPoints: newVP },
      };
    }

    case 'SELECT_SECONDARY': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newSecondaries: [SecondarySelection | null, SecondarySelection | null] = [
        ...state.battle.secondariesSelected,
      ];
      newSecondaries[playerIndex] = {
        id: action.payload.secondaryId,
        name: action.payload.name,
        points: 0,
      };
      return {
        ...state,
        battle: { ...state.battle, secondariesSelected: newSecondaries },
      };
    }

    case 'SCORE_SECONDARY': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newSecondariesScored: [number, number] = [...state.battle.secondariesScored];
      newSecondariesScored[playerIndex] += action.payload.points;
      return {
        ...state,
        battle: { ...state.battle, secondariesScored: newSecondariesScored },
      };
    }

    case 'ADD_ACTION_LOG': {
      const newLog: GameAction = {
        id: generateId(),
        timestamp: Date.now(),
        player: action.payload.player,
        phase: state.turn.phase,
        round: state.turn.round,
        type: action.payload.type,
        description: action.payload.description,
        details: action.payload.details,
      };
      return {
        ...state,
        actionLog: [...state.actionLog, newLog],
      };
    }

    case 'END_GAME':
      return {
        ...state,
        status: 'finished',
        winner: action.payload.winner,
        finalScore: [...state.battle.victoryPoints],
      };

    case 'RESET_GAME':
      return {
        ...initialGameState,
        id: generateId(),
        settings: {
          ...initialGameState.settings,
          createdAt: new Date().toISOString(),
        },
      };

    case 'LOAD_GAME':
      return action.payload;

    case 'SPEND_CP': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newCP: [number, number] = [...state.battle.commandPoints.current];
      newCP[playerIndex] = Math.max(0, newCP[playerIndex] - action.payload.amount);
      const newSpent: [number, number] = [...state.battle.commandPoints.spentThisRound];
      newSpent[playerIndex] += action.payload.amount;
      return {
        ...state,
        battle: {
          ...state.battle,
          commandPoints: {
            ...state.battle.commandPoints,
            current: newCP,
            spentThisRound: newSpent,
          },
        },
      };
    }

    case 'GAIN_CP': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newCP: [number, number] = [...state.battle.commandPoints.current];
      newCP[playerIndex] += action.payload.amount;
      const newGained: [number, number] = [...state.battle.commandPoints.gainedThisRound];
      newGained[playerIndex] += action.payload.amount;
      return {
        ...state,
        battle: {
          ...state.battle,
          commandPoints: {
            ...state.battle.commandPoints,
            current: newCP,
            gainedThisRound: newGained,
          },
        },
      };
    }

    case 'AUTO_GAIN_COMMAND_PHASE_CP': {
      const playerIndex = getPlayerIndex(action.payload.player);
      const newCP: [number, number] = [...state.battle.commandPoints.current];
      newCP[playerIndex] += 1;
      return {
        ...state,
        battle: {
          ...state.battle,
          commandPoints: {
            ...state.battle.commandPoints,
            current: newCP,
          },
        },
      };
    }

    case 'SELECT_UNIT':
      return {
        ...state,
        battle: {
          ...state.battle,
          selectedUnitId: action.payload.unitId,
        },
      };

    default:
      return state;
  }
}

// ============================================
// CONTEXT & PROVIDER
// ============================================

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameActionType>;
  saveGame: () => void;
  loadGame: () => void;
  deleteGame: () => void;
  hasSavedGame: boolean;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [hasSavedGame, setHasSavedGame] = React.useState(false);

  // Load saved game on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        dispatch({ type: 'LOAD_GAME', payload: parsed });
        setHasSavedGame(true);
      } catch (e) {
        console.error('Failed to load saved game:', e);
      }
    }
  }, []);

  // Save game function - memoized
  const saveGame = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setHasSavedGame(true);
    } catch (e) {
      console.error('Failed to save game:', e);
    }
  }, [state]);

  // Load game function - memoized
  const loadGame = useCallback(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GameState;
        dispatch({ type: 'LOAD_GAME', payload: parsed });
      } catch (e) {
        console.error('Failed to load saved game:', e);
      }
    }
  }, []);

  // Delete game function - memoized
  const deleteGame = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasSavedGame(false);
    dispatch({ type: 'RESET_GAME' });
  }, []);

  // Auto-save when game is playing
  useEffect(() => {
    if (state.status === 'playing') {
      saveGame();
    }
  }, [state, saveGame]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<GameContextType>(
    () => ({
      state,
      dispatch,
      saveGame,
      loadGame,
      deleteGame,
      hasSavedGame,
    }),
    [state, saveGame, loadGame, deleteGame, hasSavedGame]
  );

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

// ============================================
// CUSTOM HOOKS
// ============================================

/**
 * Main hook to access game state and dispatch.
 * Use selective hooks below for better performance.
 */
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

/**
 * Hook to access only the turn state.
 * Components using this won't re-render on VP changes, etc.
 */
export function useTurn() {
  const { state } = useGame();
  return state.turn;
}

/**
 * Hook to access only the battle state.
 */
export function useBattle() {
  const { state } = useGame();
  return state.battle;
}

/**
 * Hook to access the active player's setup.
 */
export function useActivePlayerSetup() {
  const { state } = useGame();
  const activePlayer = state.turn.activePlayer;
  return state.players[activePlayer - 1];
}

/**
 * Hook to access the other player's setup (not currently active).
 */
export function useOpponentPlayerSetup() {
  const { state } = useGame();
  const opponentPlayer = state.turn.activePlayer === 1 ? 2 : 1;
  return state.players[opponentPlayer - 1];
}

/**
 * Hook to access command points for a specific player.
 */
export function useCommandPoints(player: 1 | 2) {
  const { state } = useGame();
  const playerIndex = getPlayerIndex(player);
  return {
    current: state.battle.commandPoints.current[playerIndex],
    starting: state.battle.commandPoints.starting[playerIndex],
    spentThisRound: state.battle.commandPoints.spentThisRound[playerIndex],
    gainedThisRound: state.battle.commandPoints.gainedThisRound[playerIndex],
  };
}

/**
 * Hook to access victory points for a specific player.
 */
export function useVictoryPoints(player: 1 | 2) {
  const { state } = useGame();
  const playerIndex = getPlayerIndex(player);
  return state.battle.victoryPoints[playerIndex];
}

/**
 * Hook to access player setup with validation.
 * Use this for army building screens.
 */
export function usePlayerSetup(player: 1 | 2) {
  const { state } = useGame();
  const playerSetup = state.players[player - 1];
  const faction = getFactionById(playerSetup.factionId || '');
  const validation = validateArmy(
    playerSetup.army,
    faction,
    playerSetup.warlordId,
    playerSetup.enhancementIds,
    playerSetup.detachmentId,
    state.settings.gameSize
  );

  return {
    setup: playerSetup,
    faction,
    validation,
  };
}
