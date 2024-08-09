import { createRef } from 'react';
import { View } from 'react-native';
import { A11yIndex } from './components/A11yIndex/A11yIndex.web';

/**
 * @deprecated The method should not be used
 * This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration
 */
export const useFocusOrder = () => ({
  a11yOrder: {
    ref: createRef(),
    onLayout: () => {},
  },
  refs: [],
  reset: () => {},
  setOrder: () => {},
});

/**
 * @deprecated The method should not be used
 * This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration
 */
export const useDynamicFocusOrder = () => ({
  a11yOrder: {
    ref: createRef(),
    onLayout: () => {},
  },
  registerOrder: () => createRef,
  reset: () => {},
  setOrder: () => {},
});

export const useA11yOrderManager = () => ({
  registerOrderRef: () => () => {},
  updateRefList: () => {},
  reset: () => {},
  setOrder: () => {},
});

export type { A11yOrderProps } from './types/A11yOrder.types';
export type { IndexCommands } from './types/A11yIndex.types';

/**
 * @deprecated The method should not be used
 * This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration
 */
export const A11yOrder = View;

export const A11y = {
  Order: View,
  Group: View,
  Index: A11yIndex,
};
