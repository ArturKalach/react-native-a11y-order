import { ViewProps } from 'react-native';

export enum A11yContainerTypeEnum {
  none = 0,
  table = 1,
  list = 2,
  landmark = 3,
  group = 4,
}

export type A11yContainerType = keyof typeof A11yContainerTypeEnum;

export interface A11yContainerProps extends ViewProps {
  type?: A11yContainerType;
}
