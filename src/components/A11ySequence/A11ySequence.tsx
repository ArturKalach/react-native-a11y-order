import React from 'react';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yOrderNativeComponent from '../../nativeSpecs/A11yOrderNativeComponent';

export const A11yIndexSequence = React.memo(({ children }) => {
  const orderKey = React.useId();
  return (
    <A11ySequenceOrderContext.Provider value={orderKey}>
      <A11yOrderNativeComponent orderKey={orderKey}>
        {children}
      </A11yOrderNativeComponent>
    </A11ySequenceOrderContext.Provider>
  );
});
