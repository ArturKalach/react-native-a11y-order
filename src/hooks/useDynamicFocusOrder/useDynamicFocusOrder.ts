import { useRef, useLayoutEffect } from 'react';
import type { View, Platform } from 'react-native';

import { useA11yOrderManager } from '../useA11yOrderManager';
import type { UseDynamicFocusOrder } from './useDynamicFocusOrder.types';

export const useDynamicFocusOrder = <T extends React.Component>(
  onlyFor?: Platform['OS']
): UseDynamicFocusOrder<T> => {
  const a11yOrderRef = useRef<View>(null);

  const {
    registerOrderRef: registerOrder,
    updateRefList,
    reset,
    setOrder,
  } = useA11yOrderManager(a11yOrderRef, onlyFor);

  useLayoutEffect(updateRefList);

  return {
    a11yOrder: {
      ref: a11yOrderRef,
      onLayout: updateRefList,
    },
    registerOrder,
    reset,
    setOrder,
  };
};
