import React, { useCallback, useId } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import type { A11yOrderProps } from './A11yOrder.types';

/**
 * @deprecated The method should not be used
 * This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration
 */
export const A11yOrder: React.FC<A11yOrderProps> = ({
  a11yOrder,
  onLayout,
  ignoreWarn,
  ...props
}) => {
  if (!ignoreWarn) {
    console.warn(
      'A11yOrder: This API is going to be removed in future releases, you can find migration instruction here: https://github.com/ArturKalach/react-native-a11y-order?tab=readme-ov-file#migration'
    );
  }
  const onLayoutHandler = useCallback(
    (e: LayoutChangeEvent) => {
      onLayout?.(e);
      a11yOrder.onLayout();
    },
    [a11yOrder, onLayout]
  );

  const id = useId?.() || 'mock_id'; // ToDo: use native component with tag to nativeTag

  return (
    <View
      nativeID={id}
      {...props}
      onLayout={onLayoutHandler}
      ref={a11yOrder.ref}
    />
  );
};
