'use client';

import { useMemo } from 'react';
import { useGame } from '@/lib/game/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUnitById, getFactionById } from '@/data';
import { 
  Shield, Swords, Crosshair, Zap, Star, Target, 
  Info, AlertCircle
} from 'lucide-react';

interface UnitAbilityPanelProps {
  compact?: boolean;
}

export function UnitAbilityPanel({ compact = false }: UnitAbilityPanelProps) {
  const { state } = useGame();
  const selectedUnitId = state.battle.selectedUnitId;
  const activePlayer = state.turn.activePlayer;
  const activeSetup = state.players[activePlayer - 1];
  
  const faction = activeSetup.factionId ? getFactionById(activeSetup.factionId) : null;
  
  const selectedUnit = useMemo(() => {
    if (!selectedUnitId || !faction) return null;
    return getUnitById(selectedUnitId, faction);
  }, [selectedUnitId, faction]);

  if (!selectedUnit) {
    return (
      <Card className={compact ? 'mb-3' : 'mb-4'}>
        <CardHeader className="bg-surface0/50 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Swords className="w-5 h-5 text-mauve" />
            Selected Unit
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="text-center py-6 text-subtext0">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Select a unit to view its abilities</p>
            <p className="text-xs mt-1 opacity-70">Tap a unit card during the game</p>
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
          <div className="grid grid-cols-6 gap-1 text-center text-xs">
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
    <Card className="mb-4">
      <CardHeader className="bg-surface0/50 pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Swords className="w-5 h-5 text-mauve" />
          {selectedUnit.name}
        </CardTitle>
        <p className="text-xs text-subtext0 mt-1">{selectedUnit.notes}</p>
      </CardHeader>
      
      <CardContent className="pt-3 space-y-4">
        <div className="bg-surface0/50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-text mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue" />
            Profile
          </h4>
          <div className="grid grid-cols-6 gap-2 text-center">
            <StatBlock label="Move" value={profile?.move || '-'} icon={<Target className="w-3 h-3" />} />
            <StatBlock label="Tough" value={profile?.toughness || '-'} icon={<Shield className="w-3 h-3" />} />
            <StatBlock label="Save" value={profile?.save || '-'} icon={<Shield className="w-3 h-3" />} />
            <StatBlock label="Wounds" value={profile?.wounds || '-'} icon={<Zap className="w-3 h-3" />} />
            <StatBlock label="LD" value={profile?.leadership || '-'} icon={<Star className="w-3 h-3" />} />
            <StatBlock label="OC" value={profile?.oc || '-'} icon={<Target className="w-3 h-3" />} />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-text mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-green" />
            Abilities ({selectedUnit.abilities.length})
          </h4>
          <div className="space-y-2">
            {selectedUnit.abilities.map((ability, index) => (
              <AbilityItem key={ability.id || index} ability={ability} />
            ))}
          </div>
        </div>

        {selectedUnit.keywords && selectedUnit.keywords.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-1">
              {selectedUnit.keywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 rounded text-xs bg-surface0 text-subtext0 border border-surface1"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedUnit.weapons && selectedUnit.weapons.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text mb-2 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-red" />
              Weapons
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
      <div className="flex justify-center mb-1 text-text">
        {icon}
      </div>
      <div className="text-lg font-bold text-text">{value}</div>
      <div className="text-xs text-subtext0">{label}</div>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="bg-surface0 rounded p-1.5 text-center">
      <div className="flex justify-center text-text mb-0.5">{icon}</div>
      <div className="text-sm font-bold text-text">{value}</div>
      <div className="text-[10px] text-subtext0">{label}</div>
    </div>
  );
}

function AbilityItem({ ability }: { ability: { id: string; name: string; description: string } }) {
  return (
    <div className="bg-surface1/50 rounded-lg p-2 border border-surface0">
      <h5 className="text-sm font-medium text-text mb-1">{ability.name}</h5>
      <p className="text-xs text-subtext0">{ability.description}</p>
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
  return (
    <div className="flex items-center justify-between bg-surface1/50 rounded p-2 border border-surface0">
      <span className="text-sm text-text">{weaponOption.weaponId}</span>
      {weaponOption.isDefault && (
        <span className="text-xs bg-blue/20 text-blue px-1.5 py-0.5 rounded">Default</span>
      )}
      {weaponOption.cost > 0 && (
        <span className="text-xs text-subtext0">+{weaponOption.cost}pts</span>
      )}
    </div>
  );
}

export default UnitAbilityPanel;
