import { useState, useMemo } from 'react';
import { useGame, usePlayerSetup } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROLE_ORDER, ROLE_LABELS, POINTS_BY_SIZE, Unit, ArmyUnit } from '@/types/game';
import { Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ArmyBuilderStepProps {
  currentPlayer: 1 | 2;
  onNext: () => void;
  onBack: () => void;
}

export function ArmyBuilderStep({ currentPlayer, onNext, onBack }: ArmyBuilderStepProps) {
  const { state, dispatch } = useGame();
  const { setup, faction, validation } = usePlayerSetup(currentPlayer);
  const { toast } = useToast();
  const maxPoints = POINTS_BY_SIZE[state.settings.gameSize];
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set(['characters', 'hq', 'troops']));

  const playerName = state.players[currentPlayer - 1].name || `Player ${currentPlayer}`;

  const toggleRole = (role: string) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(role)) {
      newExpanded.delete(role);
    } else {
      newExpanded.add(role);
    }
    setExpandedRoles(newExpanded);
  };

  const handleAddUnit = (unit: Unit) => {
    // In 10th edition, clicking Add should always add a FULL squad (minimum squad size)
    // not increase by 1. Users can adjust quantity in the roster if needed.
    const minSquadSize = unit.profiles?.[0]?.models || 1;
    const squadPoints = unit.profiles?.[0]?.basePoints || 0;
    
    const armyUnit: ArmyUnit = {
      unitId: unit.id,
      quantity: minSquadSize,
      weapons: unit.weapons.filter(w => w.isDefault).map(w => w.weaponId),
      enhancementIds: [],
    };
    dispatch({ type: 'ADD_UNIT', payload: { player: currentPlayer, unit: armyUnit } });
    toast.success('Unit Added', `Added ${unit.name} (${minSquadSize} models, ${squadPoints} pts)`);
  };
  
  const handleAddAnotherUnit = (unit: Unit) => {
    // When clicking "+" on an existing unit in the roster, add another FULL squad
    // not just +1 model
    const minSquadSize = unit.profiles?.[0]?.models || 1;
    const squadPoints = unit.profiles?.[0]?.basePoints || 0;
    
    const armyUnit: ArmyUnit = {
      unitId: unit.id,
      quantity: minSquadSize,
      weapons: unit.weapons.filter(w => w.isDefault).map(w => w.weaponId),
      enhancementIds: [],
    };
    dispatch({ type: 'ADD_UNIT', payload: { player: currentPlayer, unit: armyUnit } });
    toast.success('Unit Added', `Added another ${unit.name} squad (${squadPoints} pts)`);
  };

  const handleRemoveUnit = (unitId: string) => {
    dispatch({ type: 'REMOVE_UNIT', payload: { player: currentPlayer, unitId } });
  };

  const handleUpdateQuantity = (unitId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveUnit(unitId);
    } else {
      dispatch({ type: 'UPDATE_UNIT_QUANTITY', payload: { player: currentPlayer, unitId, quantity } });
    }
  };

  const allUnitsInFaction = useMemo(() => {
    if (!faction) return [];
    const unitMap = new Map();
    for (const unit of faction.units || []) {
      if (!unitMap.has(unit.id)) {
        unitMap.set(unit.id, unit);
      }
    }
    for (const unit of faction.uniqueUnits || []) {
      if (!unitMap.has(unit.id)) {
        unitMap.set(unit.id, unit);
      }
    }
    return Array.from(unitMap.values());
  }, [faction]);

  const unitsByRole = ROLE_ORDER.reduce((acc, role) => {
    acc[role] = allUnitsInFaction.filter(u => u.role === role);
    return acc;
  }, {} as Record<string, Unit[]>);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        {/* Faction Indicator */}
        {faction && (
          <div className="mb-3 inline-flex items-center gap-2 px-4 py-2 bg-surface0/50 rounded-full border border-surface1">
            <span className="text-sm font-medium text-mauve">
              {faction.name}
            </span>
            {faction.subfactions && faction.subfactions.length > 0 && (
              <span className="text-xs text-subtext0">
                ({faction.subfactions[0].name})
              </span>
            )}
          </div>
        )}
        <h2 className="text-2xl font-bold text-text mb-2">
          {playerName}'s Army
        </h2>
        <div className="flex justify-center gap-4 items-center">
          <span className={`text-lg font-mono ${validation.totalPoints > maxPoints ? 'text-red' : 'text-text'}`}>
            {validation.totalPoints} / {maxPoints} pts
          </span>
          {validation.totalPoints > maxPoints && (
            <span className="text-red text-sm">Over points limit!</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        <Card className="max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-hidden flex flex-col">
          <CardHeader className="bg-surface0/50 py-3 md:py-4 px-3 md:px-4">
            <CardTitle className="text-base md:text-lg">Unit Roster</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-2 md:p-4">
            {setup.army.length === 0 ? (
              <div className="text-center text-subtext0 py-8">
                No units added yet. Select units from the right.
              </div>
            ) : (
              <div className="space-y-2">
                {setup.army.map((armyUnit) => {
                  const unit = allUnitsInFaction.find(u => u.id === armyUnit.unitId);
                  if (!unit || !unit.profiles || unit.profiles.length === 0) return null;
                  
                  // Calculate points using the same logic as validation
                  const exactProfile = unit.profiles.find((p: { models: number }) => p.models === armyUnit.quantity);
                  let unitPoints = 0;
                  if (exactProfile) {
                    unitPoints = exactProfile.basePoints;
                  } else {
                    // Fallback calculation for variable quantities
                    const baseProfile = unit.profiles[0];
                    const minModels = baseProfile.models;
                    const pointsPerModel = baseProfile.basePoints / minModels;
                    unitPoints = Math.round(pointsPerModel * armyUnit.quantity);
                  }
                  
                  return (
                    <div
                      key={armyUnit.unitId}
                      className="flex items-center justify-between p-2 md:p-3 bg-surface0/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-text text-sm truncate">{unit.name}</div>
                        <div className="text-xs md:text-sm text-subtext0">
                          {armyUnit.quantity} × {unitPoints} pts
                        </div>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(armyUnit.unitId, armyUnit.quantity - 1)}
                          className="p-1.5 rounded hover:bg-surface1 touch-manipulation"
                        >
                          <Minus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <span className="w-6 md:w-8 text-center font-mono text-sm">{armyUnit.quantity}</span>
                        <button
                          onClick={() => {
                            const unit = allUnitsInFaction.find(u => u.id === armyUnit.unitId);
                            if (unit) {
                              handleAddAnotherUnit(unit);
                            }
                          }}
                          className="p-1.5 rounded hover:bg-surface1 touch-manipulation"
                          title="Add another full squad"
                        >
                          <Plus className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveUnit(armyUnit.unitId)}
                          className="p-1.5 rounded hover:bg-red/20 text-red touch-manipulation"
                        >
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-hidden flex flex-col">
          <CardHeader className="bg-surface0/50 py-3 md:py-4 px-3 md:px-4">
            <CardTitle className="text-base md:text-lg">Available Units</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {/* Characters Section - Only named characters (EPIC HERO), not generic HQ */}
              {(() => {
                const characterUnits = allUnitsInFaction.filter(u => 
                  u.keywords?.includes('CHARACTER') && u.keywords?.includes('EPIC HERO')
                );
                if (characterUnits.length === 0) return null;
                const isExpanded = expandedRoles.has('characters');
                
                return (
                  <div className="border border-mauve/30 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRole('characters')}
                      className="w-full flex items-center justify-between p-3 bg-mauve/10 hover:bg-mauve/20 transition-colors"
                    >
                      <span className="font-medium text-mauve">⚡ Characters</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-mauve/80">{characterUnits.length} units</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="p-2 space-y-1">
                        {characterUnits.map((unit) => {
                          const isAdded = setup.army.some(u => u.unitId === unit.id);
                          const profile = unit.profiles?.[0]?.profile;
                          return (
                            <div
                              key={unit.id}
                              className={`flex items-center justify-between p-2 rounded ${
                                isAdded ? 'bg-mauve/20' : 'bg-surface1/50 hover:bg-surface1'
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-text truncate">
                                  {unit.name}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="text-xs text-subtext0 font-mono">
                                    {unit.profiles[0].basePoints} pts
                                  </div>
                                  {profile && (
                                    <div className="text-[10px] text-overlay1 flex gap-1" title={`M:${profile.move}" T:${profile.toughness} Sv:${profile.save}+ W:${profile.wounds}`}>
                                      <span className="px-1 bg-surface0 rounded">M{profile.move}</span>
                                      <span className="px-1 bg-surface0 rounded">T{profile.toughness}</span>
                                      <span className="px-1 bg-surface0 rounded">Sv{profile.save}</span>
                                      <span className="px-1 bg-surface0 rounded">W{profile.wounds}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={isAdded ? 'ghost' : 'default'}
                                onClick={() => handleAddUnit(unit)}
                                disabled={isAdded}
                              >
                                {isAdded ? 'Added' : 'Add'}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}
              
              {/* HQ Units - non-Epic Hero HQ units (generic CHARACTERs only) */}
              {(() => {
                const hqUnits = allUnitsInFaction.filter(u => u.role === 'hq' && !u.keywords?.includes('EPIC HERO'));
                if (hqUnits.length === 0) return null;
                const isExpanded = expandedRoles.has('hq');
                
                return (
                  <div className="border border-surface0 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRole('hq')}
                      className="w-full flex items-center justify-between p-3 bg-surface0/50 hover:bg-surface0 transition-colors"
                    >
                      <span className="font-medium text-text">HQ Units</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-subtext0">{hqUnits.length} units</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                      {isExpanded && (
                        <div className="p-2 space-y-1">
                          {hqUnits.map((unit) => {
                            const isAdded = setup.army.some(u => u.unitId === unit.id);
                            const profile = unit.profiles?.[0]?.profile;
                            return (
                              <div
                                key={unit.id}
                                className={`flex items-center justify-between p-2 rounded ${
                                  isAdded ? 'bg-mauve/20' : 'bg-surface1/50 hover:bg-surface1'
                                }`}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm text-text truncate">
                                    {unit.name}
                                  </div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <div className="text-xs text-subtext0 font-mono">
                                      {unit.profiles[0].basePoints} pts
                                    </div>
                                    {profile && (
                                      <div className="text-[10px] text-overlay1 flex gap-1" title={`M:${profile.move}" T:${profile.toughness} Sv:${profile.save}+ W:${profile.wounds}`}>
                                        <span className="px-1 bg-surface0 rounded">M{profile.move}</span>
                                        <span className="px-1 bg-surface0 rounded">T{profile.toughness}</span>
                                        <span className="px-1 bg-surface0 rounded">Sv{profile.save}</span>
                                        <span className="px-1 bg-surface0 rounded">W{profile.wounds}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant={isAdded ? 'ghost' : 'default'}
                                  onClick={() => handleAddUnit(unit)}
                                  disabled={isAdded}
                                >
                                  {isAdded ? 'Added' : 'Add'}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                );
              })()}
              
              {ROLE_ORDER.filter(role => role !== 'hq').map((role) => {
                const units = unitsByRole[role].filter(u => !u.keywords?.includes('CHARACTER'));
                if (units.length === 0) return null;
                const isExpanded = expandedRoles.has(role);

                return (
                  <div key={role} className="border border-surface0 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleRole(role)}
                      className="w-full flex items-center justify-between p-3 bg-surface0/50 hover:bg-surface0 transition-colors"
                    >
                      <span className="font-medium text-text">{ROLE_LABELS[role]}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-subtext0">{units.length} units</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="p-2 space-y-1">
                        {units.map((unit) => {
                          const isAdded = setup.army.some(u => u.unitId === unit.id);
                          const profile = unit.profiles?.[0]?.profile;
                          return (
                            <div
                              key={unit.id}
                              className={`flex items-center justify-between p-2 rounded ${
                                isAdded ? 'bg-mauve/20' : 'bg-surface1/50 hover:bg-surface1'
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm text-text truncate">
                                  {unit.name}
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="text-xs text-subtext0 font-mono">
                                    {unit.profiles[0].basePoints} pts
                                  </div>
                                  {profile && (
                                    <div className="text-[10px] text-overlay1 flex gap-1" title={`M:${profile.move}" T:${profile.toughness} Sv:${profile.save}+ W:${profile.wounds}`}>
                                      <span className="px-1 bg-surface0 rounded">M{profile.move}</span>
                                      <span className="px-1 bg-surface0 rounded">T{profile.toughness}</span>
                                      <span className="px-1 bg-surface0 rounded">Sv{profile.save}</span>
                                      <span className="px-1 bg-surface0 rounded">W{profile.wounds}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant={isAdded ? 'ghost' : 'default'}
                                onClick={() => handleAddUnit(unit)}
                                disabled={isAdded}
                              >
                                {isAdded ? 'Added' : 'Add'}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!validation.isValid || validation.totalPoints === 0}
        >
          Next: Select Detachment
        </Button>
      </div>

      {validation.errors.length > 0 && (
        <div className="bg-red/10 border border-red/50 rounded-lg p-4">
          <h4 className="font-medium text-red mb-2">Validation Errors:</h4>
          <ul className="text-sm text-red/80 space-y-1">
            {validation.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {validation.warnings.length > 0 && (
        <div className="bg-yellow/10 border border-yellow/50 rounded-lg p-4">
          <h4 className="font-medium text-yellow mb-2">Warnings:</h4>
          <ul className="text-sm text-yellow/80 space-y-1">
            {validation.warnings.map((warning, i) => (
              <li key={i}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
