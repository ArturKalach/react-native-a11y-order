import type { ViewProps } from 'react-native';

/**
 * Props for {@link A11y.FocusTrap} — confines VoiceOver / TalkBack focus to this subtree.
 * Useful for modals, bottom sheets, and overlays where focus must not leak out.
 */
export type A11yFocusTrapProps = ViewProps & {
  /**
   * When `true`, the focus trap is inactive — the screen reader can navigate freely
   * outside this container. Defaults to `false`.
   */
  lockDisabled?: boolean;

  /**
   * When `true`, focus is trapped immediately on mount rather than waiting for
   * the next accessibility navigation gesture. Use for programmatically-opened modals.
   * Defaults to `false`.
   */
  forceLock?: boolean;
};

/**
 * Props for {@link A11y.FocusFrame} — detects when screen reader focus escapes
 * this subtree, enabling focus-leak detection in complex UIs.
 */
export type A11yFocusFrameProps = ViewProps;

/** @internal Full props accepted by the native lock component. Not part of the public API. */
export type A11yLockProps = ViewProps & {
  componentType?: number;
  containerKey?: string;
  lockDisabled?: boolean;
  forceLock?: boolean;
};
