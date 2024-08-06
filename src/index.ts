import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';
import { A11yGroup } from './components/A11yGroup/A11yGroup';

export {
  useFocusOrder,
  useDynamicFocusOrder,
  useA11yOrderManager,
} from './hooks';

export { A11yOrder } from './components';
export type { A11yOrderProps } from './components';
export type { IndexCommands } from './components/A11yIndex/A11yIndex';

export const A11y = {
  Order: A11yIndexSequence,
  Index: A11yIndex,
  Group: A11yGroup,
};
