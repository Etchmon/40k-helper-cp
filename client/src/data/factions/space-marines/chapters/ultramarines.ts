import { Faction } from '../../../../types/game';
import { SHARED_UNITS } from '../shared/units';
import { GENERIC_DETACHMENTS } from '../detachments/generic';

export const ultramarines: Faction = {
  id: 'ultramarines',
  name: 'Ultramarines',
  icon: 'shield',
  superFaction: 'imperium',
  keywords: ['IMPERIUM', 'ADEPTUS ASTARTES', 'ULTRAMARINES'],
  armyRule: {
    type: 'oath-of-moment',
    oathOfMoment: { rerollHits: true, bonusToWound: true }
  },
  units: [...SHARED_UNITS],
  detachments: [...GENERIC_DETACHMENTS],
  uniqueUnits: [],
  uniqueDetachments: [],
};
