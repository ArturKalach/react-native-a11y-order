import React from 'react';
import { View } from 'react-native';
import { A11yFrameProvider } from '../../../context/A11yFocusFrameProviderContext';
import type { A11yFocusFrameProps } from '../A11yLock.types';

export const A11yFocusFrame = (props: A11yFocusFrameProps) => (
  <A11yFrameProvider>
    <View {...props} />
  </A11yFrameProvider>
);
