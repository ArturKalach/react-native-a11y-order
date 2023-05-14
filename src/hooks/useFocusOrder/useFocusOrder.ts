import { useRef } from 'react';
import type { Platform } from 'react-native';
import { useDynamicFocusOrder } from '../useDynamicFocusOrder';
import type { FocusOrderInfo } from './useFocusOrder.types';

export const useFocusOrder = <T extends React.Component>(
  size: number,
  onlyFor?: Platform['OS']
): FocusOrderInfo<T> => {
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
