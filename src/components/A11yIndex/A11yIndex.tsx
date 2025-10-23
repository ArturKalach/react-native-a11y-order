import React, { useImperativeHandle, useRef } from 'react';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yIndexView, {
  Commands,
} from '../../nativeSpecs/A11yIndexNativeComponent';
import {
  type A11yIndexProps,
  A11yOrderTypeEnum,
  type IndexCommands,
} from '../../types/A11yIndex.types';

export const A11yIndex = React.memo(
  React.forwardRef<IndexCommands, A11yIndexProps>(
    (
      {
        children,
        index,
        orderType = 'default',
        onScreenReaderFocusChange,
        onScreenReaderBlur,
        onScreenReaderFocus,
        ...props
      },
      ref
    ) => {
      const hasHandler = Boolean(
        onScreenReaderFocusChange || onScreenReaderBlur || onScreenReaderFocus
      );

      const onScreenReaderChangeHandler = React.useCallback(
        (event: { nativeEvent: { isFocused: boolean } }) => {
          onScreenReaderFocusChange?.(event.nativeEvent.isFocused);
          if (event.nativeEvent.isFocused) {
            onScreenReaderFocus?.();
          } else {
            onScreenReaderBlur?.();
          }
        },
        [onScreenReaderFocusChange, onScreenReaderBlur, onScreenReaderFocus]
      );

      const onScreenReaderHandlerProp = hasHandler
        ? onScreenReaderChangeHandler
        : undefined;

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

      const importantForAccessibility =
        orderType === 'default' ? 'yes' : undefined;

      return (
        <A11yIndexView
          importantForAccessibility={
            props.importantForAccessibility ?? importantForAccessibility
          }
          orderFocusType={A11yOrderTypeEnum[orderType]}
          ref={indexRef}
          orderIndex={index}
          orderKey={orderKey}
          onScreenReaderFocusChange={onScreenReaderHandlerProp}
          {...props}
        >
          {children}
        </A11yIndexView>
      );
    }
  )
);
