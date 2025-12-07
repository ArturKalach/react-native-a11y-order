import React from 'react';
import A11yViewNativeComponent from '../../nativeSpecs/A11yViewNativeComponent';
import type { A11yViewProps } from '../../types/A11yView.types';

export const A11yView = React.memo<A11yViewProps>(
  ({
    onScreenReaderFocused,
    onScreenReaderSubViewFocusChange,
    onScreenReaderSubViewFocused,
    onScreenReaderSubViewBlurred,
    onScreenReaderDescendantFocusChanged,
    ...props
  }) => {
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
);
