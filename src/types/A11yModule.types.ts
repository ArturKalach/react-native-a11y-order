import type { RefObject } from 'react';
import { View } from 'react-native';

export type A11yOrderInfo<T> = {
  tag?: RefObject<View>;
  views: (T | null)[];
};
