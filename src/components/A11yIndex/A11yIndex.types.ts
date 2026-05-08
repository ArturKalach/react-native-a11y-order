import React from 'react';
import type { NativeSyntheticEvent, View, ViewProps } from 'react-native';
import type { ScreenReaderDescendantFocusChanged } from '../../nativeSpecs/A11yIndexNativeComponent';

/** Ref handle for {@link A11y.Index} — exposes `focus()` to move screen reader focus programmatically. */
export type IndexCommands = Omit<React.ComponentRef<typeof View>, 'focus'> & {
  /** Moves screen reader focus to this element. */
  focus: () => void;
};

/** Numeric backing values for {@link A11yOrderType}. Kept for consumers who need the raw number. */
export const A11yOrderTypeEnum = {
  default: 0,
  child: 1,
  legacy: 2,
} as const;

/** @internal Numeric backing values for {@link A11yUIContainerType}. */
export const A11yContainerTypeEnum = {
  none: 0,
  table: 1,
  list: 2,
  landmark: 3,
  group: 4,
} as const;

/**
 * iOS only — sets `UIAccessibilityContainerType` on the wrapping view.
 * Tells VoiceOver what kind of container this is: `'list'`, `'table'`, `'landmark'`, etc.
 */
export type A11yUIContainerType = keyof typeof A11yContainerTypeEnum;

/**
 * Controls which element receives screen reader focus for this index slot.
 *
 * - `'default'` — the `A11y.Index` view itself
 * - `'child'`   — the first accessible child (useful when the index wrapper has no visual presence)
 * - `'legacy'`  — first accessible child via an older traversal path
 */
export type A11yOrderType = keyof typeof A11yOrderTypeEnum;

/** The native event payload emitted by `onScreenReaderDescendantFocusChanged`. */
export type ScreenReaderDescendantFocusChangedEvent =
  NativeSyntheticEvent<ScreenReaderDescendantFocusChanged>;

export type A11yIndexProps = ViewProps & {
  children: React.ReactNode;

  /**
   * Numeric position of this element in the parent `A11y.Order` sequence.
   * Lower numbers are focused first; ties are resolved by render order.
   */
  index?: number;

  /**
   * Controls which element VoiceOver / TalkBack actually focuses.
   * Defaults to `'default'` (the index view itself).
   */
  orderType?: A11yOrderType;

  /**
   * iOS only — sets `UIAccessibilityContainerType`.
   * Helps VoiceOver understand the semantic container type (list, table, landmark…).
   */
  a11yUIContainer?: A11yUIContainerType;

  /** When `true`, requests screen reader focus on this element immediately after mount. */
  autoFocus?: boolean;

  /** Called when the screen reader focuses this element directly. */
  onScreenReaderFocused?: () => void;

  /**
   * Called whenever screen reader focus enters or leaves any descendant.
   * `isFocused` is `true` on enter, `false` on leave.
   */
  onScreenReaderSubViewFocusChange?: (isFocused: boolean) => void;

  /** Called when screen reader focus enters any descendant. */
  onScreenReaderSubViewFocused?: () => void;

  /** Called when screen reader focus leaves any descendant. */
  onScreenReaderSubViewBlurred?: () => void;

  /** Called with the native event when screen reader focus changes on any descendant. */
  onScreenReaderDescendantFocusChanged?: (
    e: ScreenReaderDescendantFocusChangedEvent
  ) => void;
};
