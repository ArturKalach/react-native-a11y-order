import React from 'react';
import A11yViewNativeComponent from '../../nativeSpecs/A11yViewNativeComponent';
import type { A11yViewProps } from '../../types/A11yView.types';

// Unknown ref type for better react-native support
type ViewRefType = {};

export const A11yView = React.memo(
  React.forwardRef<ViewRefType, A11yViewProps>(
    (
      {
        onScreenReaderFocused,
        onScreenReaderSubViewFocusChange,
        onScreenReaderSubViewFocused,
        onScreenReaderSubViewBlurred,
        onScreenReaderDescendantFocusChanged,
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

      return (
        <A11yViewNativeComponent
          {...props}
          ref={ref as React.Ref<any>}
          descendantFocusChangedEnabled={Boolean(
            onScreenReaderDescendantFocusChanged
          )}
          onScreenReaderFocused={onScreenReaderFocused}
          onScreenReaderFocusChange={onScreenReaderHandlerProp}
          onScreenReaderDescendantFocusChanged={
            onScreenReaderDescendantFocusChanged
          }
        />
      );
    }
  )
);
