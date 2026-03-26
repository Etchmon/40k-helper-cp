'use client';

import { useMemo } from 'react';
import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUnitById, getFactionById, getCombatPatrolRoster } from '@/data';
import { getWeaponById, WEAPON_ABILITIES } from '@/data/weapons';
import { 
  Shield, Swords, Crosshair, Zap, Star, Target, 
  Info
} from 'lucide-react';

interface UnitAbilityPanelProps {
  compact?: boolean;
}

interface DisplayUnit {
  id: string;
  name: string;
  role: string;
  notes?: string;
  keywords: string[];
  profiles: {
    profile: {
      move: number;
      toughness: number;
      save: number;
      wounds: number;
      leadership: number;
      oc: number;
    };
  }[];
  weapons: { weaponId: string; isDefault?: boolean; cost: number }[];
  abilities: { id: string; name: string; description: string }[];
}

export function UnitAbilityPanel({ compact = false }: UnitAbilityPanelProps) {
  const { state } = useGame();
  const selectedUnitId = state.battle.selectedUnitId;
  const activePlayer = state.turn.activePlayer;
  const activeSetup = state.players[activePlayer - 1];
  const gameSize = state.settings.gameSize;
  
  const factionId = activeSetup?.factionId;
  const faction = factionId ? getFactionById(factionId) : null;
  const isCombatPatrol = gameSize === 'combat-patrol';
  
  let combatPatrolRoster = null;
  if (isCombatPatrol && factionId) {
    combatPatrolRoster = getCombatPatrolRoster(factionId);
  }
  
  const selectedUnit: DisplayUnit | null = useMemo(() => {
    if (!selectedUnitId) return null;
    
    if (isCombatPatrol && combatPatrolRoster) {
      const cpUnit = combatPatrolRoster.units.find(u => u.id === selectedUnitId);
      if (cpUnit) {
        let profileData = {
          move: 0,
          toughness: 0,
          save: 0,
          wounds: cpUnit.models,
          leadership: 0,
          oc: 0,
        };
        
        if (faction) {
          const matchingUnit = faction.units?.find(u => 
            u.name.toLowerCase() === cpUnit.name.toLowerCase() ||
            u.name.toLowerCase().includes(cpUnit.name.toLowerCase().split("'")[0].trim()) ||
            cpUnit.name.toLowerCase().includes(u.name.toLowerCase().split("'")[0].trim())
          );
          if (matchingUnit?.profiles?.[0]?.profile) {
            profileData = {
              move: matchingUnit.profiles[0].profile.move,
              toughness: matchingUnit.profiles[0].profile.toughness,
              save: matchingUnit.profiles[0].profile.save,
              wounds: matchingUnit.profiles[0].profile.wounds,
              leadership: matchingUnit.profiles[0].profile.leadership,
              oc: matchingUnit.profiles[0].profile.oc,
            };
          }
        }
        
        return {
          id: cpUnit.id,
          name: cpUnit.name,
          role: cpUnit.role,
          notes: cpUnit.notes,
          keywords: cpUnit.keywords,
          profiles: [{ profile: profileData }],
          weapons: cpUnit.weapons.map(w => ({ 
            weaponId: w.name, 
            isDefault: true, 
            cost: 0 
          })),
          abilities: cpUnit.abilities.map((a, i) => ({ 
            id: `ability-${i}`, 
            name: a, 
            description: a 
          })),
        };
      }
    }
    
    if (faction) {
      return getUnitById(selectedUnitId, faction) as DisplayUnit | null;
    }
    
    return null;
  }, [selectedUnitId, faction, isCombatPatrol, combatPatrolRoster]);

  if (!selectedUnit) {
    return (
      <Card className={`${compact ? 'mb-3' : ''} h-full flex flex-col border-2 border-surface1`}>
        <CardHeader className="bg-surface0/60 py-2 px-3 border-b border-surface1">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Swords className="w-4 h-4 text-mauve" />
            Selected Unit
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 flex-1 flex items-center justify-center">
          <div className="text-center text-subtext0">
            <Swords className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-medium">Select a unit from your army</p>
            <p className="text-[10px] text-overlay1 mt-1">Tap a unit card below</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const profile = selectedUnit.profiles[0]?.profile;

  if (compact) {
    return (
      <Card className="mb-3">
        <CardHeader className="bg-surface0/50 pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Swords className="w-4 h-4 text-mauve" />
            {selectedUnit.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-1 text-xs">
            <StatBadge icon={<Target className="w-3 h-3" />} value={profile?.move || '-'} label="M" />
            <StatBadge icon={<Shield className="w-3 h-3" />} value={profile?.toughness || '-'} label="T" />
            <StatBadge icon={<Shield className="w-3 h-3" />} value={profile?.save || '-'} label="SV" />
            <StatBadge icon={<Zap className="w-3 h-3" />} value={profile?.wounds || '-'} label="W" />
            <StatBadge icon={<Star className="w-3 h-3" />} value={profile?.leadership || '-'} label="LD" />
            <StatBadge icon={<Target className="w-3 h-3" />} value={profile?.oc || '-'} label="OC" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col border-2 border-surface1">
      <CardHeader className="bg-surface0/60 py-2 px-3 shrink-0 border-b border-surface1">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-mauve/30 flex items-center justify-center border border-mauve/50">
            <Swords className="w-4 h-4 text-mauve" />
          </div>
          <div className="truncate">
            <div className="text-sm font-bold truncate">{selectedUnit.name}</div>
            {selectedUnit.notes && (
              <p className="text-[10px] text-overlay1 font-normal truncate">{selectedUnit.notes}</p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-2 pb-2 flex-1 overflow-auto space-y-2">
        {profile && (
          <div className="bg-surface0/40 rounded-lg p-2 border border-surface1">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5 text-center">
              <StatBlock label="M" value={profile.move || '-'} icon={<Target className="w-3 h-3" />} />
              <StatBlock label="T" value={profile.toughness || '-'} icon={<Shield className="w-3 h-3" />} />
              <StatBlock label="SV" value={profile.save || '-'} icon={<Shield className="w-3 h-3" />} />
              <StatBlock label="W" value={profile.wounds || '-'} icon={<Zap className="w-3 h-3" />} />
              <StatBlock label="LD" value={profile.leadership || '-'} icon={<Star className="w-3 h-3" />} />
              <StatBlock label="OC" value={profile.oc || '-'} icon={<Target className="w-3 h-3" />} />
            </div>
          </div>
        )}

          <div>
            <h4 className="text-xs font-bold text-text mb-1 flex items-center gap-1">
              <Info className="w-3 h-3 text-green" />
              Abilities ({selectedUnit.abilities.length})
            </h4>
            <div className="space-y-1.5">
              {selectedUnit.abilities.map((ability, index) => (
                <AbilityItem key={ability.id || index} ability={ability} />
              ))}
            </div>
          </div>

        {selectedUnit.keywords && selectedUnit.keywords.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1">
              {selectedUnit.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-1.5 py-0.5 rounded text-[10px] bg-surface1 text-subtext0"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedUnit.weapons && selectedUnit.weapons.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-text mb-1 flex items-center gap-1">
              <Crosshair className="w-3 h-3 text-red" />
              Weapons ({selectedUnit.weapons.length})
            </h4>
            <div className="space-y-1">
              {selectedUnit.weapons.map((weaponOpt, index) => (
                <WeaponItem key={index} weaponOption={weaponOpt} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatBlock({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="text-center">
      <div className="flex justify-center text-text">
        {icon}
      </div>
      <div className="text-sm font-bold text-text">{value}</div>
      <div className="text-[10px] text-overlay1">{label}</div>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="bg-surface0 rounded-lg p-2 md:p-2.5 text-center">
      <div className="flex justify-center text-text mb-1">{icon}</div>
      <div className="text-base md:text-lg font-bold text-text">{value}</div>
      <div className="text-[10px] md:text-xs text-subtext0">{label}</div>
    </div>
  );
}

function AbilityItem({ ability }: { ability: { id: string; name: string; description: string } }) {
  return (
    <div className="bg-surface1/30 rounded p-1.5 border-l-2 border-l-mauve/30">
      <h5 className="text-xs font-medium text-text">{ability.name}</h5>
      <p className="text-[10px] text-overlay1 truncate">{ability.description}</p>
    </div>
  );
}

function WeaponItem({ weaponOption }: { 
  weaponOption: { 
    weaponId: string; 
    isDefault?: boolean; 
    cost: number;
  } 
}) {
  const weapon = getWeaponById(weaponOption.weaponId);
  
  if (!weapon) {
    return (
      <div className="flex items-center justify-between bg-surface1/30 rounded p-1">
        <span className="text-xs text-text capitalize">{weaponOption.weaponId.replace(/([A-Z])/g, ' $1').trim().slice(0, 15)}</span>
        {weaponOption.cost > 0 && (
          <span className="text-[10px] text-overlay1">+{weaponOption.cost}</span>
        )}
      </div>
    );
  }

  const isRanged = weapon.type === 'ranged';
  
  return (
    <div className="bg-surface1/30 rounded border border-surface1 p-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-text">{weapon.name}</span>
          {weaponOption.isDefault && (
            <span className="px-1 py-0.5 rounded text-[8px] bg-green/20 text-green">Default</span>
          )}
        </div>
        {weaponOption.cost > 0 && (
          <span className="text-[10px] text-overlay1">+{weaponOption.cost}</span>
        )}
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-0.5 text-center">
        {isRanged && (
          <WeaponStat label="RNG" value={weapon.range || '-'} />
        )}
        <WeaponStat label="A" value={weapon.attacks} />
        <WeaponStat label={isRanged ? "BS" : "WS"} value={weapon.skill} isSkill={isRanged} />
        <WeaponStat label="S" value={weapon.strength} />
        <WeaponStat label="AP" value={weapon.armorPenetration} />
        <WeaponStat label="D" value={weapon.damage} />
      </div>
      
      {weapon.keywords && weapon.keywords.length > 0 && (
        <div className="mt-2 pt-2 border-t border-surface1">
          <div className="flex flex-wrap gap-1">
            {weapon.keywords.map((kw, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded text-[9px] bg-surface0 text-subtext0">
                {kw}
              </span>
            ))}
          </div>
          <div className="mt-2 space-y-1">
            {weapon.keywords.map((kw, i) => {
              const abilityKey = kw.toLowerCase().replace(/\s+/g, '');
              const ability = WEAPON_ABILITIES[abilityKey];
              if (ability) {
                return (
                  <div key={i} className="text-[8px] text-overlay1 bg-surface0/30 p-1 rounded">
                    <span className="font-medium text-subtext0">{kw}:</span> {ability.description}
                  </div>
                );
              }
              return null;
            }).filter(Boolean)}
          </div>
        </div>
      )}
    </div>
  );
}

function WeaponStat({ label, value, isSkill }: { label: string; value: string; isSkill?: boolean }) {
  return (
    <div className="text-center">
      <div className={`text-[10px] font-bold ${isSkill ? 'text-blue' : 'text-text'}`}>{value}</div>
      <div className="text-[8px] text-overlay1">{label}</div>
    </div>
  );
}

export default UnitAbilityPanel;
