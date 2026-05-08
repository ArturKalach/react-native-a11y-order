import React from 'react';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yOrderNativeComponent from '../../nativeSpecs/A11yOrderNativeComponent';
import type { A11yOrderProps } from './A11yOrder.types';

export type { A11yOrderProps };

export const A11yOrder = React.memo<A11yOrderProps>((props) => {
  const orderKey = React.useId();
  return (
    <A11ySequenceOrderContext.Provider value={orderKey}>
      <A11yOrderNativeComponent {...props} orderKey={orderKey} />
    </A11ySequenceOrderContext.Provider>
  );
});
