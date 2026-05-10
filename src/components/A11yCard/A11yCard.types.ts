import type {
  ViewStyle,
  StyleProp,
  ViewProps,
  PressableProps,
} from 'react-native';

/** Accessibility props forwarded to the focusable overlay (iOS) or the Pressable (Android). */
export type A11yCardAccessibilityProps = ViewProps;

export interface A11yCardProps {
  /**
   * Props applied to the container View wrapping the card.
   * Use this for layout-level concerns: position, margins, flex, etc.
   */
  containerProps?: ViewProps;

  /**
   * Style for the card surface (the inner Pressable).
   * Use this for visual appearance: background color, border radius, padding, etc.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;

  /**
   * Called when the user taps the card.
   */
  onPress?: () => void;

  /**
   * View/Accessibility props for the card action — `accessibilityLabel`, `accessibilityHint`,
   * `accessibilityRole`, `accessibilityState`, etc.
   *
   * On iOS these are forwarded to a full-cover overlay that VoiceOver focuses.
   * On Android they are applied directly to the Pressable.
   */
  accessibility?: A11yCardAccessibilityProps;

  /**
   * Props passed directly to the underlying `Pressable`.
   * Use this for `hitSlop`, `android_ripple`, `onLongPress`, etc.
   */
  pressableProps?: PressableProps;

  children?: React.ReactNode;
}
