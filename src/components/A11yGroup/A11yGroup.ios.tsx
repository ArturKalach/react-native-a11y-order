import React from 'react';
import A11yDirectionView from '../../nativeSpecs/A11yGroupNativeComponent';
import type { ViewProps } from 'react-native';

export const A11yGroup = (props: React.PropsWithChildren<ViewProps>) => (
  <A11yDirectionView {...props} />
);
