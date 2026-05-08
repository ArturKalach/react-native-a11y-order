import React from 'react';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yOrderNativeComponent from '../../nativeSpecs/A11yOrderNativeComponent';
import type { A11ySequenceProps } from './A11ySequence.types';

export type { A11ySequenceProps };

export const A11yIndexSequence = React.memo<A11ySequenceProps>((props) => {
  const orderKey = React.useId();
  return (
    <A11ySequenceOrderContext.Provider value={orderKey}>
      <A11yOrderNativeComponent {...props} orderKey={orderKey} />
    </A11ySequenceOrderContext.Provider>
  );
});
