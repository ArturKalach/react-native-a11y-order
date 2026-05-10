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
  subview: 2,
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
 * - `'subview'` — first accessible child via an older traversal path
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
   * Controls which element VoiceOver / TalkBack actually focuses for this slot.
   *
   * - `'default'` — the `A11y.Index` view itself receives focus
   * - `'child'`   — the first accessible descendant receives focus (useful when
   *   the index wrapper has no visual presence of its own)
   * - `'subview'` — focuses the first direct child view rather than the first accessible descendant
   *
   * Defaults to `'default'`.
   */
  orderType?: A11yOrderType;

  /**
   * iOS only — sets `UIAccessibilityContainerType` on the wrapping view.
   * Helps VoiceOver understand the semantic role of the container:
   * `'list'`, `'table'`, `'landmark'`, etc.
   *
   * @platform ios
   */
  a11yUIContainer?: A11yUIContainerType;

  /**
   * iOS only — maps to `shouldGroupAccessibilityChildren` on the native view.
   * Determines whether VoiceOver treats descendants as one grouped unit
   * or navigates them individually.
   *
   * - `true`    — VoiceOver focuses the wrapper as a single element and builds
   *   a combined label from its children.
   * - `false`   — descendants stay individually focusable even when iOS would
   *   otherwise collapse them.
   * - omitted   — defers to the platform default.
   *
   * @platform ios
   */
  shouldGroupAccessibilityChildren?: boolean;

  /**
   * When `true`, requests screen reader focus on this element immediately after mount.
   */
  autoFocus?: boolean;

  /**
   * Called when the screen reader focuses this element directly (not a descendant).
   */
  onScreenReaderFocused?: () => void;

  /**
   * Called when screen reader focus enters or leaves any descendant.
   * Receives `true` on enter and `false` on leave.
   */
  onScreenReaderSubViewFocusChange?: (isFocused: boolean) => void;

  /**
   * Called when screen reader focus enters any descendant.
   */
  onScreenReaderSubViewFocused?: () => void;

  /**
   * Called when screen reader focus leaves any descendant.
   */
  onScreenReaderSubViewBlurred?: () => void;

  /**
   * Called with the full native event when screen reader focus changes on any descendant.
   * Use this when you need the `nativeId` of the focused element.
   */
  onScreenReaderDescendantFocusChanged?: (
    e: ScreenReaderDescendantFocusChangedEvent
  ) => void;
};
