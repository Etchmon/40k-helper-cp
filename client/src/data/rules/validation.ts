/**
 * Simple validation utilities for army building
 * This module provides basic validation functions for army composition
 */

import type { ArmyUnit, Faction, GameSize } from '../../types/game';

/**
 * Extended validation result with all required fields
 */
export interface ValidationResult {
  valid: boolean;
  isValid: boolean;
  totalPoints: number;
  errors: string[];
  warnings: string[];
}

/**
 * Calculates total army points
 */
export function calculateArmyPoints(
  army: ArmyUnit[],
  faction: Faction | null,
  enhancementIds: string[],
  detachmentId: string | null
): number {
  if (!faction) return 0;
  
  let total = 0;
  
  // Add unit costs
  for (const armyUnit of army) {
    const unit = faction.units.find(u => u.id === armyUnit.unitId);
    if (unit && unit.profiles && unit.profiles.length > 0) {
      // First, try to find a profile that exactly matches the quantity
      // This handles squad-based units like Intercessors (5 or 10 models)
      const exactProfile = unit.profiles.find(p => p.models === armyUnit.quantity);
      
      if (exactProfile) {
        // Use the exact profile - points already represent total for that squad size
        total += exactProfile.basePoints;
        
        // Add weapon costs (per squad, not per model for default weapons)
        for (const weaponId of armyUnit.weapons) {
          const weaponOption = unit.weapons.find(w => w.weaponId === weaponId);
          if (weaponOption && !weaponOption.isDefault) {
            total += weaponOption.cost;
          }
        }
      } else {
        // No exact match - calculate based on minimum squad size
        // This handles units that can have variable quantities
        const baseProfile = unit.profiles[0];
        const minModels = baseProfile.models;
        const pointsPerModel = baseProfile.basePoints / minModels;
        
        total += pointsPerModel * armyUnit.quantity;
        
        // Add weapon costs per model
        for (const weaponId of armyUnit.weapons) {
          const weaponOption = unit.weapons.find(w => w.weaponId === weaponId);
          if (weaponOption && !weaponOption.isDefault) {
            total += weaponOption.cost * armyUnit.quantity;
          }
        }
      }
    }
  }
  
  // Add enhancement costs if detachment is selected
  if (detachmentId) {
    const detachment = faction.detachments.find(d => d.id === detachmentId);
    if (detachment) {
      for (const enhancementId of enhancementIds) {
        const enhancement = detachment.enhancements.find(e => e.id === enhancementId);
        if (enhancement) {
          total += enhancement.points;
        }
      }
    }
  }
  
  return total;
}

/**
 * Validates an entity ID format
 */
export function validateEntityId(id: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id);
}

/**
 * Validates army composition
 */
export function validateArmy(
  army: ArmyUnit[],
  faction: Faction | null | undefined,
  warlordId: string | null,
  enhancementIds: string[],
  detachmentId: string | null,
  gameSize: GameSize
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Get max points for game size
  const POINTS: Record<GameSize, number> = {
    'combat-patrol': 500,
    'incursion': 1000,
    'strike-force': 2000,
    'onslaught': 3000,
  };
  const maxPoints = POINTS[gameSize] || 2000;
  
  if (!faction) {
    errors.push('No faction selected');
    return { 
      valid: false, 
      isValid: false, 
      totalPoints: 0, 
      errors, 
      warnings 
    };
  }
  
  const totalPoints = calculateArmyPoints(army, faction, enhancementIds, detachmentId);
  
  if (totalPoints > maxPoints) {
    errors.push(`Army exceeds point limit: ${totalPoints}/${maxPoints}`);
  }
  
  if (totalPoints < maxPoints * 0.75) {
    warnings.push(`Army is under point limit: ${totalPoints}/${maxPoints}`);
  }
  
  // 10th edition matched play does NOT require specific unit types (HQ, Battle Line)
  // These were removed in the 10th edition rules - no warnings needed
  
  // Check enhancement limit (max 3 per army)
  if (enhancementIds.length > 3) {
    errors.push(`Too many enhancements: ${enhancementIds.length}/3`);
  }

  // Warlord selection is done in the Detachment step, not during army building
  // So we don't show a warning here - it will be handled in the detachment validation

  return {
    valid: errors.length === 0,
    isValid: errors.length === 0,
    totalPoints,
    errors,
    warnings,
  };
}
