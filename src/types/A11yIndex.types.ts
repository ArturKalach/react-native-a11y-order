import React from 'react';
import type { NativeSyntheticEvent, View, ViewProps } from 'react-native';
import type { ScreenReaderDescendantFocusChanged } from '../nativeSpecs/A11yIndexNativeComponent';

export type IndexCommands = Omit<React.ComponentRef<typeof View>, 'focus'> & {
  focus: () => void;
};

export enum A11yOrderTypeEnum {
  default = 0,
  child = 1,
  legacy = 2,
}

export enum A11yContainerTypeEnum {
  none = 0,
  table = 1,
  list = 2,
  landmark = 3,
  group = 4,
}

export type A11yUIContainerType = keyof typeof A11yContainerTypeEnum;

export type A11yOrderType = keyof typeof A11yOrderTypeEnum;

export type ScreenReaderDescendantFocusChangedEvent =
  NativeSyntheticEvent<ScreenReaderDescendantFocusChanged>;

export type A11yIndexProps = {
  children: React.ReactNode;
  index?: number;
  orderType?: A11yOrderType;
  a11yUIContainer?: A11yUIContainerType;

  autoFocus?: boolean;

  onScreenReaderFocused?: () => void;

  onScreenReaderSubViewFocusChange?: (isFocused: boolean) => void;
  onScreenReaderSubViewFocused?: () => void;
  onScreenReaderSubViewBlurred?: () => void;

  onScreenReaderDescendantFocusChanged?: (
    e: ScreenReaderDescendantFocusChangedEvent
  ) => void;
} & ViewProps;
