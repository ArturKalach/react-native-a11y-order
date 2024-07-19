export {
  useFocusOrder,
  useDynamicFocusOrder,
  useA11yOrderManager,
} from './hooks';

export { A11yOrder } from './components';
export type { A11yOrderProps } from './components';
export { A11yDirection } from './components/A11yDirection/A11yDirection';

import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';

export const A11ySequence = {
  Container: A11yIndexSequence,
  Index: A11yIndex,
};
