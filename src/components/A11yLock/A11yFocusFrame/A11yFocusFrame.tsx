import React from 'react';
import { View, type ViewProps } from 'react-native';
import { A11yFrameProvider } from '../../../context/A11yFocusFrameProviderContext';

export const A11yFocusFrame = (props: ViewProps) => (
  <A11yFrameProvider>
    <View {...props} />
  </A11yFrameProvider>
);
