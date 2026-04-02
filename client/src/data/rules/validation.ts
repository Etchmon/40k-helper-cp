/**
 * Simple validation utilities for army building
 * This module provides basic validation functions for army composition
 */

import type { ArmyUnit, Faction, Enhancement, GameSize } from '../../types/game';

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
    if (unit) {
      // Find the profile that matches the quantity
      const profile = unit.profiles.find(p => p.models === armyUnit.quantity) 
        || unit.profiles[0];
      if (profile) {
        total += profile.basePoints;
        
        // Add weapon costs
        for (const weaponId of armyUnit.weapons) {
          const weaponOption = unit.weapons.find(w => w.weaponId === weaponId);
          if (weaponOption) {
            total += weaponOption.cost;
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
  
  // Check for required units (Battle Line)
  const hasBattleLine = army.some(armyUnit => {
    const unit = faction.units.find(u => u.id === armyUnit.unitId);
    return unit?.keywords.includes('BATTLELINE');
  });
  
  if (!hasBattleLine && maxPoints >= 1000) {
    warnings.push('No Battle Line units selected');
  }
  
  // Check for HQ units
  const hasHQ = army.some(armyUnit => {
    const unit = faction.units.find(u => u.id === armyUnit.unitId);
    return unit?.role === 'hq';
  });
  
  if (!hasHQ && maxPoints >= 1000) {
    warnings.push('No HQ units selected');
  }
  
  // Check for warlord if we have HQ units
  if (hasHQ && !warlordId) {
    warnings.push('No warlord selected');
  }
  
  return {
    valid: errors.length === 0,
    isValid: errors.length === 0,
    totalPoints,
    errors,
    warnings,
  };
}
