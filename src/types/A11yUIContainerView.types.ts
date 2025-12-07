import type { ViewProps } from 'react-native';

export enum A11yContainerTypeEnum {
  none = 0,
  table = 1,
  list = 2,
  landmark = 3,
  group = 4,
}

export type A11yUIContainerType = keyof typeof A11yContainerTypeEnum;

export interface A11yUIContainerProps extends ViewProps {
  type?: A11yUIContainerType;
}
