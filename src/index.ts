import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';
import { A11yGroup } from './components/A11yGroup/A11yGroup';
import { A11yUIContainer } from './components/A11yUIContainer/A11yUIContainer';
import {
  A11yPaneTitle,
  A11yScreenChange,
} from './components/A11yPaneTitle/A11yPaneTitle';
import { A11yView } from './components/A11yView/A11yView';
import { A11yFocusFrame } from './components/A11yLock/A11yFocusFrame/A11yFocusFrame';
import { A11yFocusTrap } from './components/A11yLock/A11yFocusTrap/A11yFocusTrap';

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

export type { A11yViewProps } from './types/A11yView.types';

export const A11y = {
  Order: A11yIndexSequence,
  Index: A11yIndex,
  Group: A11yGroup,
  Container: A11yUIContainer,
  PaneTitle: A11yPaneTitle,
  ScreenChange: A11yScreenChange,
  View: A11yView,
  FocusFrame: A11yFocusFrame,
  FocusTrap: A11yFocusTrap,
};

export { A11yModule } from './modules/A11yAnnounceModule';
