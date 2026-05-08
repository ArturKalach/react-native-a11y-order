import type { A11yIndexProps } from '../A11yIndex/A11yIndex.types';

export type { ScreenReaderDescendantFocusChangedEvent } from '../A11yIndex/A11yIndex.types';

/**
 * Props for {@link A11y.View} — a standalone focus-tracking view with no ordering context.
 *
 * All screen reader focus events from {@link A11yIndexProps} are available.
 * `index` and `orderType` are omitted because they only apply inside an `A11y.Order` sequence.
 */
export type A11yViewProps = Omit<A11yIndexProps, 'index' | 'orderType'>;
