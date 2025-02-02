import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';
import { A11yGroup } from './components/A11yGroup/A11yGroup';

export { A11yOrder } from './components/A11yOrder/A11yOrder';
export type { A11yOrderProps } from './types/A11yOrder.types';
export type { IndexCommands } from './types/A11yIndex.types';

export const A11y = {
  Order: A11yIndexSequence,
  Index: A11yIndex,
  Group: A11yGroup,
};
