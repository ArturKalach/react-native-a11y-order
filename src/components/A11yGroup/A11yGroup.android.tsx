import React, { useId } from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

export const A11yGroup = (props: React.PropsWithChildren<ViewProps>) => {
  const id = useId();
  return <View nativeID={id} {...props} />;
};
