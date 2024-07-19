import React from 'react';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yIndexView from '../../nativeSpecs/A11yIndexNativeComponent';

export const A11yIndex = React.memo<{
  children: React.ReactElement;
  index: number;
}>(({ children, index }) => {
  const orderKey = React.useContext(A11ySequenceOrderContext);
  if (!orderKey) {
    throw new Error(
      'A11ySequence.Index should be used inside of A11ySequence.Container'
    );
  }
  return (
    <A11yIndexView orderIndex={index} orderKey={orderKey}>
      {React.Children.only(children)}
    </A11yIndexView>
  );
});
