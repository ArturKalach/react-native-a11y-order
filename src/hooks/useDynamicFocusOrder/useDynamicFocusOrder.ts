import { useRef, useLayoutEffect } from 'react';
import type { View, Platform } from 'react-native';

import { useA11yOrderManager } from '../useA11yOrderManager';
import type { UseDynamicFocusOrder } from './useDynamicFocusOrder.types';

/**
 * @deprecated The method should not be used
 * This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration
 */
export const useDynamicFocusOrder = <T extends React.Component>(
  onlyFor?: Platform['OS'],
  ignoreWarn?: Boolean
): UseDynamicFocusOrder<T> => {
  if (!ignoreWarn) {
    console.warn(
      'useDynamicFocusOrder: This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration'
    );
  }

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
