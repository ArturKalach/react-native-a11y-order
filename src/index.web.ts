import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { View } from 'react-native';

export type {
  IndexCommands,
  A11yOrderType,
  A11yOrderTypeEnum,
  A11yIndexProps,
} from './types/A11yIndex.types';

export type {
  A11yContainerTypeEnum,
  A11yUIContainerType,
  A11yUIContainerProps,
} from './types/A11yUIContainerView.types';

export type { ScreenReaderDescendantFocusChangedEvent } from './types/A11yView.types';

export type { A11yViewProps } from './types/A11yView.types';

export const A11y = {
  Order: View,
  Group: View,
  Index: A11yIndex,
  Container: View,
  PaneTitle: View,
  ScreenChange: View,
  View: View,
  FocusFrame: View,
  FocusTrap: View,
};

export { A11yModule } from './modules/A11yAnnounceModule';
