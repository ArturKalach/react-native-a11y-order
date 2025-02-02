import React from 'react';
import A11yDirectionView from '../../nativeSpecs/A11yGroupNativeComponent';
import { A11yGroupProps } from '../../types/A11yGroup.types';

export const A11yGroup = (props: A11yGroupProps) => (
  <A11yDirectionView {...props} />
);
