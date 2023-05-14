import type { RefObject } from 'react';
import type { View } from 'react-native';
import { findNodeHandle } from 'react-native';

import { setA11yOrder } from './module';

export type A11yOrderInfo<T> = {
  tag?: RefObject<View>;
  views: (T | null)[];
};

export const setA11yElementsOrder = <T extends React.Component>({
  tag,
  views,
}: A11yOrderInfo<T>) => {
  if (!tag) return;

  const targetView = findNodeHandle(tag.current as React.Component);
  if (!targetView) return;

  const tags = views
    .map((view) => findNodeHandle(view as React.Component))
    .filter((view) => Boolean(view)) as number[];

  setA11yOrder?.(tags, targetView);
};
