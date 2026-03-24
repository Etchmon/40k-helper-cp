import { useState } from 'react';
import { useGame, usePlayerSetup } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROLE_ORDER, ROLE_LABELS, POINTS_BY_SIZE, Unit, ArmyUnit } from '@/types/game';
import { Plus, Minus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface ArmyBuilderStepProps {
  currentPlayer: 1 | 2;
  onNext: () => void;
  onBack: () => void;
}

export function ArmyBuilderStep({ currentPlayer, onNext, onBack }: ArmyBuilderStepProps) {
  const { state, dispatch } = useGame();
  const { setup, faction, validation } = usePlayerSetup(currentPlayer);
  const maxPoints = POINTS_BY_SIZE[state.settings.gameSize];
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set(['hq', 'troops']));

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
    const armyUnit: ArmyUnit = {
      unitId: unit.id,
      quantity: 1,
      weapons: unit.weapons.filter(w => w.isDefault).map(w => w.weaponId),
      enhancementIds: [],
    };
    dispatch({ type: 'ADD_UNIT', payload: { player: currentPlayer, unit: armyUnit } });
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

  const unitsByRole = ROLE_ORDER.reduce((acc, role) => {
    acc[role] = faction?.units.filter(u => u.role === role) || [];
    return acc;
  }, {} as Record<string, Unit[]>);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="max-h-[600px] overflow-hidden flex flex-col">
          <CardHeader className="bg-surface0/50">
            <CardTitle>Unit Roster</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            {setup.army.length === 0 ? (
              <div className="text-center text-subtext0 py-8">
                No units added yet. Select units from the right.
              </div>
            ) : (
              <div className="space-y-2">
                {setup.army.map((armyUnit) => {
                  const unit = faction?.units.find(u => u.id === armyUnit.unitId);
                  if (!unit) return null;
                  const unitPoints = unit.profiles[0].basePoints * armyUnit.quantity;
                  return (
                    <div
                      key={armyUnit.unitId}
                      className="flex items-center justify-between p-3 bg-surface0/50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-text">{unit.name}</div>
                        <div className="text-sm text-subtext0">
                          {armyUnit.quantity} x {unitPoints} pts
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(armyUnit.unitId, armyUnit.quantity - 1)}
                          className="p-1 rounded hover:bg-surface1"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-mono">{armyUnit.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(armyUnit.unitId, armyUnit.quantity + 1)}
                          className="p-1 rounded hover:bg-surface1"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveUnit(armyUnit.unitId)}
                          className="p-1 rounded hover:bg-red/20 text-red"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="max-h-[600px] overflow-hidden flex flex-col">
          <CardHeader className="bg-surface0/50">
            <CardTitle>Available Units</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {ROLE_ORDER.map((role) => {
                const units = unitsByRole[role];
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
                                <div className="text-xs text-subtext0 font-mono">
                                  {unit.profiles[0].basePoints} pts
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
