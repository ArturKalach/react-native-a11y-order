import React from 'react';
import type { ViewProps } from 'react-native';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yOrderNativeComponent from '../../nativeSpecs/A11yOrderNativeComponent';

export const A11yIndexSequence = React.memo<ViewProps>((props) => {
  const orderKey = React.useId();
  return (
    <A11ySequenceOrderContext.Provider value={orderKey}>
      <A11yOrderNativeComponent {...props} orderKey={orderKey} />
    </A11ySequenceOrderContext.Provider>
  );
});
