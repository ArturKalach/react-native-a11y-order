import React from 'react';
import { A11yContainer } from '../A11yContainer/A11yContainer';
import { A11yGroupProps } from '../../types/A11yGroup.types';
import A11yDirectionView from '../../nativeSpecs/A11yGroupNativeComponent';

export const A11yGroup = (props: A11yGroupProps) => {
  if (props.type === 'legacy') {
    return <A11yDirectionView {...props} />;
  }
  return <A11yContainer {...props} type={props.type ?? 'none'} />;
};
