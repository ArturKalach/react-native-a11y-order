import type { RefCallback } from 'react';
import type { UseDynamicFocusOrder } from '../useDynamicFocusOrder';

export type FocusOrderInfo<T extends React.Component> = Pick<
  UseDynamicFocusOrder<T>,
  'a11yOrder' | 'reset' | 'setOrder'
> & {
  refs: RefCallback<T>[];
};
