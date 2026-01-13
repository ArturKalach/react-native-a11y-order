import React from 'react';
import { A11yUIContainer } from '../A11yUIContainer/A11yUIContainer';
import type { A11yGroupProps } from '../../types/A11yGroup.types';
import A11yDirectionView from '../../nativeSpecs/A11yGroupNativeComponent';

export const A11yGroup = (props: A11yGroupProps) => {
  if (props.type === 'legacy') {
    return <A11yDirectionView {...props} />;
  }
  return <A11yUIContainer {...props} type={props.type ?? 'none'} />;
};
