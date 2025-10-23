import type { ViewProps } from 'react-native';

export type A11yViewProps = ViewProps & {
  autoFocus?: boolean;
  onScreenReaderFocusChange?: (isFocused: boolean) => void;
  onScreenReaderFocus?: () => void;
  onScreenReaderBlur?: () => void;
};
