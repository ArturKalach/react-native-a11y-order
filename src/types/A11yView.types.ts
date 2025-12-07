import type { NativeSyntheticEvent, ViewProps } from 'react-native';
import type { ScreenReaderDescendantFocusChanged } from '../nativeSpecs/A11yViewNativeComponent';

export type ScreenReaderDescendantFocusChangedEvent =
  NativeSyntheticEvent<ScreenReaderDescendantFocusChanged>;

export type A11yViewProps = ViewProps & {
  autoFocus?: boolean;

  onScreenReaderFocused?: () => void;

  onScreenReaderSubViewFocusChange?: (isFocused: boolean) => void;
  onScreenReaderSubViewFocused?: () => void;
  onScreenReaderSubViewBlurred?: () => void;

  onScreenReaderDescendantFocusChanged?: (
    e: ScreenReaderDescendantFocusChangedEvent
  ) => void;
};
