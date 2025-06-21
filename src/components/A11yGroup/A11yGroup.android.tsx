import React from 'react';
import { View } from 'react-native';

import { A11yGroupProps } from '../../types/A11yGroup.types';

export const A11yGroup = (props: A11yGroupProps) => {
  return <View collapsable={false} {...props} />;
};
