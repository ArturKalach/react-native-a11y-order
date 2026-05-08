import type { A11yIndexProps } from './A11yIndex.types';

export type { ScreenReaderDescendantFocusChangedEvent } from './A11yIndex.types';

/** Props for {@link A11yView} — focus tracking without ordering. */
export type A11yViewProps = Omit<A11yIndexProps, 'index' | 'orderType'>;
