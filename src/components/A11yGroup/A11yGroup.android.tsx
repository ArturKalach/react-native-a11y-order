import React, { useId } from 'react';
import { View } from 'react-native';

import { A11yGroupProps } from '../../types/A11yGroup.types';

export const A11yGroup = (props: A11yGroupProps) => {
  const id = useId();
  return <View nativeID={id} {...props} />;
};
