import React from 'react';

/**
 * Controls the native accessibility announcement mechanism.
 *
 * - `'pane'`      — layout-changed notification with a title (default, use for panels/sheets)
 * - `'activity'`  — screen-change notification (use for full-screen transitions)
 * - `'announce'`  — plain announcement with no focus shift (use for status updates)
 */
export type A11yPaneType = 'activity' | 'pane' | 'announce';

/**
 * Props for {@link A11y.PaneTitle} — announces a screen or panel transition to
 * VoiceOver / TalkBack and optionally restores focus when the view unmounts.
 */
export type A11yPaneTitleProps = React.PropsWithChildren<{
  /** The title announced to the screen reader when this component mounts. */
  title?: string;

  /** A message announced when this component unmounts, e.g. `"Drawer closed"`. */
  detachMessage?: string;

  /**
   * Controls the native announcement type. Defaults to `'pane'`.
   *
   * - `'pane'`     — layout-changed notification with a title
   * - `'activity'` — screen-change notification for full-screen transitions
   * - `'announce'` — plain announcement, no focus shift
   */
  type?: A11yPaneType;

  /**
   * When `true` (default), VoiceOver / TalkBack restores focus to the previously
   * focused element when this component unmounts.
   */
  withFocusRestore?: boolean;

  /**
   * When `false`, the component renders nothing and posts no announcement.
   * Use to conditionally suppress the view without unmounting the subtree.
   */
  displayed?: boolean;
}>;

/**
 * Props for {@link A11y.ScreenChange} — shorthand for `A11y.PaneTitle` with
 * `type="activity"` pre-set for full-screen navigation transitions.
 */
export type A11yScreenChangeProps = Omit<A11yPaneTitleProps, 'type'>;
