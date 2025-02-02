import React, { useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yIndexView, {
  Commands,
} from '../../nativeSpecs/A11yIndexNativeComponent';
import { A11yIndexProps, IndexCommands } from '../../types/A11yIndex.types';

export const A11yIndex = React.memo(
  React.forwardRef<IndexCommands, A11yIndexProps>(
    ({ children, index, ...props }, ref) => {
      const orderKey = React.useContext(A11ySequenceOrderContext);
      if (!orderKey) {
        throw new Error(
          'A11ySequence.Index should be used inside of A11ySequence.Container'
        );
      }

      const indexRef = useRef<React.ElementRef<React.ComponentType>>(null);

      useImperativeHandle(ref, () => ({
        focus: () => {
          if (indexRef.current) {
            Commands.focus(indexRef.current);
          }
        },
      }));

      const isSingleChild = React.Children.count(children) === 1;

      return (
        <A11yIndexView
          ref={indexRef}
          orderIndex={index}
          orderKey={orderKey}
          {...props}
        >
          {isSingleChild && children}
          {!isSingleChild && <View nativeID={orderKey}>{children}</View>}
        </A11yIndexView>
      );
    }
  )
);
