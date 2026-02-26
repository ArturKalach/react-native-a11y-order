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
        onScreenReaderSubViewFocusChange,
        onScreenReaderSubViewFocused,
        onScreenReaderSubViewBlurred,
        ...props
      },
      ref
    ) => {
      const hasHandler = Boolean(
        onScreenReaderSubViewBlurred ||
          onScreenReaderSubViewFocused ||
          onScreenReaderSubViewFocusChange
      );

      const onScreenReaderChangeHandler = React.useCallback(
        (event: { nativeEvent: { isFocused: boolean } }) => {
          onScreenReaderSubViewFocusChange?.(event.nativeEvent.isFocused);
          if (event.nativeEvent.isFocused) {
            onScreenReaderSubViewFocused?.();
          } else {
            onScreenReaderSubViewBlurred?.();
          }
        },
        [
          onScreenReaderSubViewFocusChange,
          onScreenReaderSubViewBlurred,
          onScreenReaderSubViewFocused,
        ]
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

      // @ts-ignore
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
          ref={indexRef as React.Ref<any>}
          orderIndex={index}
          orderKey={orderKey}
          {...props}
          onScreenReaderFocusChange={onScreenReaderHandlerProp}
        >
          {children}
        </A11yIndexView>
      );
    }
  )
);
