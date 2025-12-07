import type { ViewProps } from 'react-native';

export type IndexCommands = { focus: () => void };

export enum A11yOrderTypeEnum {
  default = 0,
  child = 1,
  legacy = 2,
}

export type A11yOrderType = keyof typeof A11yOrderTypeEnum;

export type A11yIndexProps = {
  children: React.ReactNode;
  index: number;
  orderType?: A11yOrderType;

  onScreenReaderSubViewFocusChange?: (isFocused: boolean) => void;
  onScreenReaderSubViewFocused?: () => void;
  onScreenReaderSubViewBlurred?: () => void;
} & ViewProps;
