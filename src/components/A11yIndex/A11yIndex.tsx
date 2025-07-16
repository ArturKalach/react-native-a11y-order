import React, { useImperativeHandle, useRef } from 'react';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yIndexView, {
  Commands,
} from '../../nativeSpecs/A11yIndexNativeComponent';
import {
  A11yIndexProps,
  A11yOrderTypeEnum,
  IndexCommands,
} from '../../types/A11yIndex.types';

export const A11yIndex = React.memo(
  React.forwardRef<IndexCommands, A11yIndexProps>(
    ({ children, index, orderType = 'default', ...props }, ref) => {
      const orderKey = React.useContext(A11ySequenceOrderContext);
      if (!orderKey) {
        throw new Error(
          '<A11y.Index> element should be used inside of <A11y.Order> container'
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

      return (
        <A11yIndexView
          orderFocusType={A11yOrderTypeEnum[orderType]}
          ref={indexRef}
          orderIndex={index}
          orderKey={orderKey}
          {...props}
        >
          {children}
        </A11yIndexView>
      );
    }
  )
);
