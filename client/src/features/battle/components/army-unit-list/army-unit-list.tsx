'use client';

import { useMemo } from 'react';
import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUnitById, getFactionById, getCombatPatrolRoster } from '@/data';
import { 
  Users, Shield, Swords,
  Zap, Footprints, Skull, Target, AlertCircle
} from 'lucide-react';

interface ArmyUnitListProps {
  compact?: boolean;
  horizontal?: boolean;
}

const ROLE_ICONS: Record<string, React.ReactNode> = {
  hq: <Skull className="w-3 h-3" />,
  troops: <Users className="w-3 h-3" />,
  elites: <Shield className="w-3 h-3" />,
  fastAttack: <Zap className="w-3 h-3" />,
  heavySupport: <Target className="w-3 h-3" />,
  flyer: <Zap className="w-3 h-3" />,
  dedicatedTransport: <Footprints className="w-3 h-3" />,
  fortification: <Shield className="w-3 h-3" />,
};

const ROLE_COLORS: Record<string, string> = {
  hq: 'bg-yellow/20 text-yellow border-yellow/30',
  troops: 'bg-blue/20 text-blue border-blue/30',
  elites: 'bg-red/20 text-red border-red/30',
  fastAttack: 'bg-green/20 text-green border-green/30',
  heavySupport: 'bg-orange/20 text-orange border-orange/30',
  flyer: 'bg-purple/20 text-purple border-purple/30',
  dedicatedTransport: 'bg-surface1 text-subtext0 border-surface0',
  fortification: 'bg-surface1 text-subtext0 border-surface0',
};

interface DisplayUnit {
  id: string;
  name: string;
  role: string;
  models: number;
  keywords: string[];
  weapons: { name: string; profile: string }[];
  abilities: string[];
  notes?: string;
  points: number;
}

export function ArmyUnitList({ compact = false, horizontal = false }: ArmyUnitListProps) {
  const { state, dispatch } = useGame();
  const activePlayer = state.turn.activePlayer;
  const playerIndex = activePlayer - 1;
  const activeSetup = state.players[playerIndex] ?? { factionId: null, army: [] };
  const selectedUnitId = state.battle.selectedUnitId;
  const gameSize = state.settings.gameSize;
  
  const factionId = activeSetup?.factionId;
  const faction = factionId ? getFactionById(factionId) : null;
  const isCombatPatrol = gameSize === 'combat-patrol';
  
  let combatPatrolRoster = null;
  if (isCombatPatrol && factionId) {
    combatPatrolRoster = getCombatPatrolRoster(factionId);
  }
  
  const army = activeSetup?.army || [];

  const displayUnits: DisplayUnit[] = useMemo(() => {
    const units: DisplayUnit[] = [];
    
    if (isCombatPatrol && combatPatrolRoster) {
      for (const cpUnit of combatPatrolRoster.units) {
        units.push({
          id: cpUnit.id,
          name: cpUnit.name,
          role: cpUnit.role,
          models: cpUnit.models,
          keywords: cpUnit.keywords,
          weapons: cpUnit.weapons,
          abilities: cpUnit.abilities,
          notes: cpUnit.notes,
          points: 0,
        });
      }
    } else if (!isCombatPatrol && faction) {
      for (const armyUnit of army) {
        const unitData = getUnitById(armyUnit.unitId, faction);
        if (!unitData || !unitData.profiles || unitData.profiles.length === 0) continue;
        
        // Use the same logic as validation: try to find exact profile match
        const exactProfile = unitData.profiles.find((p: { models: number }) => p.models === armyUnit.quantity);
        let unitPoints = 0;
        if (exactProfile) {
          unitPoints = exactProfile.basePoints;
        } else {
          // Fallback calculation for variable quantities
          const baseProfile = unitData.profiles[0];
          const minModels = baseProfile.models;
          const pointsPerModel = baseProfile.basePoints / minModels;
          unitPoints = Math.round(pointsPerModel * armyUnit.quantity);
        }
        
        units.push({
          id: unitData.id,
          name: unitData.name,
          role: unitData.role,
          models: armyUnit.quantity,
          keywords: unitData.keywords || [],
          weapons: unitData.weapons?.map((w: { weaponId: string }) => ({ name: w.weaponId, profile: '' })) || [],
          abilities: unitData.abilities?.map((a: { name: string }) => a.name) || [],
          notes: unitData.notes,
          points: unitPoints,
        });
      }
    }
    
    return units;
  }, [army, faction, isCombatPatrol, combatPatrolRoster]);

  const handleSelectUnit = (unitId: string) => {
    dispatch({ type: 'SELECT_UNIT', payload: { unitId } });
  };

  const getTitle = () => {
    if (isCombatPatrol && combatPatrolRoster) {
      return combatPatrolRoster.name;
    }
    return 'Your Units';
  };

  if (!faction && !isCombatPatrol) {
    return (
      <Card className={compact ? 'mb-3' : ''}>
        <CardHeader className="bg-surface0/50 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-blue" />
            Your Units
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="text-center py-4 text-subtext0">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No faction selected</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (displayUnits.length === 0) {
    const errorMessage = isCombatPatrol && !combatPatrolRoster 
      ? "No combat patrol roster for this faction"
      : !isCombatPatrol && army.length === 0
        ? "No units added to army"
        : "No units to display";
          
    return (
      <Card className={compact ? 'mb-3' : ''}>
        <CardHeader className="bg-surface0/50 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-blue" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="text-center py-4 text-subtext0">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Horizontal scroll version (for tablet+)
  if (horizontal) {
    return (
      <div className="h-full w-full flex flex-col bg-crust border-2 border-surface1 rounded-lg overflow-hidden">
        <div className="bg-surface0/60 py-2 px-4 border-b border-surface1 shrink-0">
          <h3 className="text-sm font-bold flex items-center gap-2 text-text">
            <Users className="w-4 h-4 text-blue" />
            <span>{getTitle()}</span>
            <span className="text-xs text-overlay1 font-normal ml-1">({displayUnits.length})</span>
          </h3>
        </div>
        <div className="flex-1 w-full p-2 overflow-hidden">
          <div className="h-full w-full flex gap-2 overflow-x-auto scrollbar-thin">
            {displayUnits.map((unit) => (
              <UnitCardHorizontal
                key={unit.id}
                unit={unit}
                isSelected={selectedUnitId === unit.id}
                onClick={() => handleSelectUnit(unit.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Compact vertical version (for mobile)
  if (compact) {
    return (
      <Card className="mb-3 border-2 border-surface1">
        <CardHeader className="bg-surface0/60 py-2 px-3 border-b border-surface1">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Users className="w-4 h-4 text-blue" />
            {getTitle()}
            <span className="text-xs text-overlay1 font-normal ml-1">({displayUnits.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2 px-3 max-h-[200px] overflow-y-auto">
          <div className="space-y-1">
            {displayUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => handleSelectUnit(unit.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-all ${
                  selectedUnitId === unit.id
                    ? 'bg-mauve/15 border border-mauve/50'
                    : 'bg-surface0/40 hover:bg-surface1 border border-transparent'
                }`}
              >
                <span className="truncate text-text font-medium">{unit.name}</span>
                <span className="text-xs text-green font-bold">{unit.points}pts</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full vertical version (for mobile tab)
  return (
    <Card className="border-2 border-surface1">
      <CardHeader className="bg-surface0/60 py-3 px-4 border-b border-surface1">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Users className="w-5 h-5 text-blue" />
          {getTitle()}
          <span className="text-xs text-overlay1 font-normal ml-1">({displayUnits.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3 px-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {displayUnits.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              isSelected={selectedUnitId === unit.id}
              onClick={() => handleSelectUnit(unit.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UnitCardHorizontal({ unit, isSelected, onClick }: { unit: DisplayUnit; isSelected: boolean; onClick: () => void }) {
  const roleColor = ROLE_COLORS[unit.role] || 'bg-surface1 text-subtext0 border-surface0';
  const roleIcon = ROLE_ICONS[unit.role] || <Users className="w-3.5 h-3.5" />;
  const hasKeywords = unit.keywords && unit.keywords.length > 0;
  
  return (
    <button
      onClick={onClick}
      className={`shrink-0 h-full text-left rounded-lg p-3 transition-all border snap-start flex flex-col ${
        isSelected
          ? 'bg-mauve/15 border-mauve/50 shadow-md'
          : 'bg-surface0/40 border-surface1 hover:bg-surface1 hover:border-surface0'
      }`}
      style={{ minWidth: '140px', width: '140px' }}
    >
      {/* Top: Role badge */}
      <div className="flex items-center gap-1 mb-1.5">
        <span className={`text-[9px] px-1.5 py-0.5 rounded flex items-center gap-0.5 border ${roleColor}`}>
          {roleIcon}
          <span className="text-[8px] font-medium">{unit.role.replace(/([A-Z])/g, ' $1').trim().toUpperCase().slice(0, 5)}</span>
        </span>
      </div>
      
      {/* Middle: Unit name */}
      <h4 className="text-xs font-bold text-text truncate mb-1">{unit.name}</h4>
      
      {/* Bottom section */}
      <div className="mt-auto space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-overlay1">{unit.models} models</span>
          {unit.points > 0 && (
            <span className="text-xs font-bold text-green">{unit.points}</span>
          )}
        </div>
        {hasKeywords && (
          <div className="flex flex-wrap gap-0.5">
            {unit.keywords.slice(0, 3).map((kw, i) => (
              <span key={i} className="text-[8px] px-1 py-0.5 rounded bg-surface1 text-overlay1">
                {kw.slice(0, 6)}
              </span>
            ))}
            {unit.keywords.length > 3 && (
              <span className="text-[8px] text-overlay1">+{unit.keywords.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

interface UnitCardProps {
  unit: DisplayUnit;
  isSelected: boolean;
  onClick: () => void;
}

function UnitCard({ unit, isSelected, onClick }: UnitCardProps) {
  const roleColor = ROLE_COLORS[unit.role] || 'bg-surface1 text-subtext0 border-surface0';
  const roleIcon = ROLE_ICONS[unit.role] || <Users className="w-3 h-3" />;
  
  const hasKeywords = unit.keywords && unit.keywords.length > 0;
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-lg p-3 transition-all border ${
        isSelected
          ? 'bg-mauve/10 border-mauve/50 shadow-sm'
          : 'bg-surface0/50 border-surface1 hover:bg-surface1 hover:border-surface0'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 border ${roleColor}`}>
              {roleIcon}
              {unit.role.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
            </span>
          </div>
          <h4 className="text-sm font-medium text-text truncate">{unit.name}</h4>
          <div className="flex items-center gap-3 mt-1 text-xs text-subtext0">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {unit.models} models
            </span>
            {hasKeywords && (
              <span className="flex items-center gap-1">
                <Swords className="w-3 h-3" />
                {unit.keywords.slice(0, 3).join(', ')}
                {unit.keywords.length > 3 && ` +${unit.keywords.length - 3}`}
              </span>
            )}
          </div>
        </div>
        {unit.points > 0 && (
          <div className="text-right">
            <span className="text-sm font-bold text-green">{unit.points}</span>
            <span className="text-xs text-subtext0 ml-1">pts</span>
          </div>
        )}
      </div>
    </button>
  );
}

export default ArmyUnitList;
