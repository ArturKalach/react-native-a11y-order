import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';
import { A11yGroup } from './components/A11yGroup/A11yGroup';
import { A11yContainer } from './components/A11yContainer/A11yContainer';

export type {
  IndexCommands,
  A11yOrderType,
  A11yOrderTypeEnum,
  A11yIndexProps,
} from './types/A11yIndex.types';

export type {
  A11yContainerTypeEnum,
  A11yContainerType,
  A11yContainerProps,
} from './types/A11yContainerView.types';

export const A11y = {
  Order: A11yIndexSequence,
  Index: A11yIndex,
  Group: A11yGroup,
  Container: A11yContainer,
};
