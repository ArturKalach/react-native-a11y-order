import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { View } from 'react-native';

export type {
  IndexCommands,
  A11yOrderType,
  A11yIndexProps,
} from './components/A11yIndex/A11yIndex.types';
export { A11yOrderTypeEnum } from './components/A11yIndex/A11yIndex.types';

export type { ScreenReaderDescendantFocusChangedEvent } from './components/A11yView/A11yView.types';

export type { A11yViewProps } from './components/A11yView/A11yView.types';

export const A11y = {
  Order: View,
  Index: A11yIndex,
  View: View,
  PaneTitle: View,
  ScreenChange: View,
  FocusFrame: View,
  FocusTrap: View,
  Card: View,
};

export { A11yModule } from './modules/A11yAnnounceModule';
