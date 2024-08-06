import { useRef } from 'react';
import type { Platform } from 'react-native';
import { useDynamicFocusOrder } from '../useDynamicFocusOrder';
import type { FocusOrderInfo } from './useFocusOrder.types';

/**
 * @deprecated The method should not be used
 * This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration
 */
export const useFocusOrder = <T extends React.Component>(
  size: number,
  onlyFor?: Platform['OS'],
  ignoreWarn?: boolean
): FocusOrderInfo<T> => {
  if (!ignoreWarn) {
    console.warn(
      'useFocusOrder: This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration'
    );
  }

  const { a11yOrder, registerOrder, reset, setOrder } =
    useDynamicFocusOrder(onlyFor);

  const refs = useRef(
    Array(size)
      .fill(null)
      .map((_, i) => registerOrder(i))
  ).current;

  return {
    a11yOrder,
    refs,
    reset,
    setOrder,
  };
};
