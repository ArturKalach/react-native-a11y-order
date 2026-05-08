import { A11yIndex } from './components/A11yIndex/A11yIndex';
import { A11yIndexSequence } from './components/A11ySequence/A11ySequence';
import {
  A11yPaneTitle,
  A11yScreenChange,
} from './components/A11yPaneTitle/A11yPaneTitle';
import { A11yView } from './components/A11yView/A11yView';
import { A11yFocusFrame } from './components/A11yLock/A11yFocusFrame/A11yFocusFrame';
import { A11yFocusTrap } from './components/A11yLock/A11yFocusTrap/A11yFocusTrap';
import { A11yCard } from './components/A11yCard/A11yCard';

// ─── Component props ──────────────────────────────────────────────────────────

export type { A11yCardProps } from './components/A11yCard/A11yCard.types';
export type { A11ySequenceProps } from './components/A11ySequence/A11ySequence.types';
export type {
  A11yIndexProps,
  A11yOrderType,
  IndexCommands,
} from './components/A11yIndex/A11yIndex.types';
export { A11yOrderTypeEnum } from './components/A11yIndex/A11yIndex.types';
export type {
  A11yViewProps,
  ScreenReaderDescendantFocusChangedEvent,
} from './components/A11yView/A11yView.types';
export type {
  A11yFocusTrapProps,
  A11yFocusFrameProps,
} from './components/A11yLock/A11yLock.types';
export type {
  A11yPaneTitleProps,
  A11yScreenChangeProps,
  A11yPaneType,
} from './components/A11yPaneTitle/A11yPaneTitle.types';

// ─── Namespace ────────────────────────────────────────────────────────────────

export const A11y = {
  Order: A11yIndexSequence,
  Index: A11yIndex,
  View: A11yView,
  PaneTitle: A11yPaneTitle,
  ScreenChange: A11yScreenChange,
  FocusFrame: A11yFocusFrame,
  FocusTrap: A11yFocusTrap,
  Card: A11yCard,
};

export { A11yModule } from './modules/A11yAnnounceModule';
