import { ViewProps } from 'react-native';

export type IndexCommands = { focus: () => void };

export enum A11yFocusType {
  default = 0,
  group = 1,
  firstAccessible = 2,
  firstChild = 3,
}

export type A11yIndexProps = {
  children: React.ReactNode;
  index: number;
  orderType?: keyof typeof A11yFocusType;
} & ViewProps;
