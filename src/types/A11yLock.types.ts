import type { ViewProps } from 'react-native';

export type A11yLockProps = ViewProps & {
  componentType?: number;
  containerKey?: string;
  lockDisabled?: boolean;
};
