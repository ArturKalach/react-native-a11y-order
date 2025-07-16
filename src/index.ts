import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';
import { A11yGroup } from './components/A11yGroup/A11yGroup';

export type {
  IndexCommands,
  A11yOrderType,
  A11yOrderTypeEnum,
} from './types/A11yIndex.types';

export const A11y = {
  Order: A11yIndexSequence,
  Index: A11yIndex,
  Group: A11yGroup,
};
