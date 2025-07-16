import { ViewProps } from 'react-native';

export type IndexCommands = { focus: () => void };

export enum A11yOrderTypeEnum {
  default = 0,
  group = 1,
  firstAccessible = 2,
  firstChild = 3,
}

export type A11yOrderType = keyof typeof A11yOrderTypeEnum;

export type A11yIndexProps = {
  children: React.ReactNode;
  index: number;
  orderType?: A11yOrderType;
} & ViewProps;
