import type {
  ViewStyle,
  StyleProp,
  ViewProps,
  PressableProps,
} from 'react-native';

// All screen-reader-facing props, typed directly from ViewProps so they
// stay in sync with RN without a separate custom interface.
export type A11yCardAccessibilityProps = ViewProps;

export interface A11yCardProps {
  // Props for the outer container (<Card> on iOS, <View> on Android).
  // Use for margins, flex, and layout positioning in the parent.
  containerProps?: ViewProps;

  // Visual style of the inner Pressable (background, border, shadow, etc.).
  style?: StyleProp<ViewStyle>;
  testID?: string;
  disabled?: boolean;
  onPress?: () => void;
  // Note: onLongPress fires for sighted users. For VoiceOver users add a
  // custom action via accessibility.accessibilityActions — VoiceOver activates
  // via double-tap (onPress), not long-press.
  onLongPress?: () => void;

  // What the screen reader announces and interacts with.
  // On iOS applied to the overlay (first in accessibilityElements).
  // On Android applied to the Pressable directly.
  // disabled auto-merges into accessibility.accessibilityState.disabled so
  // you only need to set disabled once.
  accessibility?: A11yCardAccessibilityProps;

  // Escape hatch for Pressable props not covered above (hitSlop, android_ripple, etc.).
  // Conflicting keys are stripped to prevent accidental overrides.
  pressableProps?: PressableProps;

  children?: React.ReactNode;
}
