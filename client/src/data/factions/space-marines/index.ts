import { Faction } from '../../../types/game';

export { SHARED_UNITS, SHARED_WEAPONS, SHARED_ABILITIES } from './shared/units';
export { GENERIC_DETACHMENTS } from './detachments/generic';

import { ultramarines } from './chapters/ultramarines';
import { darkAngels } from './chapters/dark-angels';
import { bloodAngels } from './chapters/blood-angels';
import { spaceWolves } from './chapters/space-wolves';
import { blackTemplars } from './chapters/black-templars';
import { whiteScars } from './chapters/white-scars';
import { imperialFists } from './chapters/imperial-fists';
import { ravenGuard } from './chapters/raven-guard';
import { ironHands } from './chapters/iron-hands';
import { salamanders } from './chapters/salamanders';

export {
  ultramarines,
  darkAngels,
  bloodAngels,
  spaceWolves,
  blackTemplars,
  whiteScars,
  imperialFists,
  ravenGuard,
  ironHands,
  salamanders,
};

export const SPACE_MARINE_CHAPTERS: Faction[] = [
  ultramarines,
  darkAngels,
  bloodAngels,
  spaceWolves,
  blackTemplars,
  whiteScars,
  imperialFists,
  ravenGuard,
  ironHands,
  salamanders,
];
