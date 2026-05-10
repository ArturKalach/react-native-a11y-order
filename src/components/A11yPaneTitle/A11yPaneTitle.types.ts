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
  /**
   * The title announced to the screen reader when this component mounts.
   */
  title?: string;

  /**
   * A message announced to the screen reader when this component unmounts.
   * Use to signal the end of a flow, e.g. `"Modal closed"` or `"Drawer closed"`.
   */
  detachMessage?: string;

  /**
   * Controls the native announcement mechanism. Defaults to `'pane'`.
   *
   * - `'pane'`     — layout-changed notification with a title (panels, sheets)
   * - `'activity'` — screen-change notification (full-screen navigation)
   * - `'announce'` — plain announcement with no focus shift (status updates)
   */
  type?: A11yPaneType;

  /**
   * When `true`, VoiceOver / TalkBack restores focus to the previously focused
   * element when this component unmounts.
   *
   * Defaults to `true`.
   */
  withFocusRestore?: boolean;

  /**
   * When `false`, the component renders nothing and posts no announcement.
   * Use this to conditionally suppress the view without unmounting its subtree.
   *
   * Defaults to `true`.
   */
  displayed?: boolean;
}>;

/**
 * Props for {@link A11y.ScreenChange} — shorthand for `A11y.PaneTitle` with
 * `type="activity"` pre-set for full-screen navigation transitions.
 */
export type A11yScreenChangeProps = Omit<A11yPaneTitleProps, 'type'>;
