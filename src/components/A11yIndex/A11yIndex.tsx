import React, { useImperativeHandle, useRef } from 'react';
import type { ViewProps } from 'react-native';
import { A11ySequenceOrderContext } from '../../context/A11ySequenceOrderContext';
import A11yIndexView, {
  Commands,
} from '../../nativeSpecs/A11yIndexNativeComponent';
import {
  type A11yIndexProps,
  A11yOrderTypeEnum,
  type A11yOrderType,
  type IndexCommands,
  A11yContainerTypeEnum,
} from './A11yIndex.types';

type ScreenReaderCallbacks = Pick<
  A11yIndexProps,
  | 'onScreenReaderFocused'
  | 'onScreenReaderSubViewFocusChange'
  | 'onScreenReaderSubViewFocused'
  | 'onScreenReaderSubViewBlurred'
  | 'onScreenReaderDescendantFocusChanged'
>;

function useScreenReaderProps({
  onScreenReaderFocused,
  onScreenReaderSubViewFocusChange,
  onScreenReaderSubViewFocused,
  onScreenReaderSubViewBlurred,
  onScreenReaderDescendantFocusChanged,
}: ScreenReaderCallbacks) {
  const hasHandler = Boolean(
    onScreenReaderSubViewBlurred ||
      onScreenReaderSubViewFocused ||
      onScreenReaderSubViewFocusChange
  );

  const onScreenReaderFocusChange = React.useCallback(
    (event: { nativeEvent: { isFocused: boolean } }) => {
      const { isFocused } = event.nativeEvent;
      onScreenReaderSubViewFocusChange?.(isFocused);
      if (isFocused) {
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

  return {
    onScreenReaderFocused,
    onScreenReaderFocusChange: hasHandler
      ? onScreenReaderFocusChange
      : undefined,
    descendantFocusChangedEnabled: Boolean(
      onScreenReaderDescendantFocusChanged
    ),
    onScreenReaderDescendantFocusChanged,
  };
}

function useFocusRef(ref: React.ForwardedRef<IndexCommands>) {
  const localRef = useRef<React.ComponentRef<typeof A11yIndexView>>(null);

  useImperativeHandle(ref, () => {
    const native = localRef.current as unknown as Record<string, unknown>;

    return new Proxy({} as IndexCommands, {
      get(_target, prop: string) {
        if (prop === 'focus') {
          return () => {
            if (localRef.current) {
              Commands.focus(
                localRef.current as unknown as React.Component<{}, any, any>
              );
            }
          };
        }
        return native?.[prop];
      },
    });
  });

  return localRef;
}

function useOrderProps(
  index: number | undefined,
  orderType: A11yOrderType | undefined,
  importantForAccessibilityProp: ViewProps['importantForAccessibility']
) {
  const orderKey = React.useContext(A11ySequenceOrderContext);
  const hasOrderInfo = typeof index === 'number' || !!orderKey;

  if (hasOrderInfo && !orderKey) {
    throw new Error(
      '<A11y.Index> element should be used inside of <A11y.Order> container'
    );
  }

  const resolvedOrderType = orderType ?? 'default';
  const importantForAccessibilityFallback =
    resolvedOrderType === 'default' ? ('yes' as const) : undefined;

  return {
    orderKey,
    orderFocusType: hasOrderInfo
      ? A11yOrderTypeEnum[resolvedOrderType]
      : undefined,
    importantForAccessibility:
      importantForAccessibilityProp ?? importantForAccessibilityFallback,
  };
}

export const A11yIndex = React.memo(
  React.forwardRef<IndexCommands, A11yIndexProps>(
    ({ children, index, orderType, a11yUIContainer, ...props }, ref) => {
      const {
        onScreenReaderFocused,
        onScreenReaderSubViewFocusChange,
        onScreenReaderSubViewFocused,
        onScreenReaderSubViewBlurred,
        onScreenReaderDescendantFocusChanged,
        importantForAccessibility: importantForAccessibilityProp,
        ...viewProps
      } = props;

      const containerTypeValue = a11yUIContainer
        ? A11yContainerTypeEnum[a11yUIContainer]
        : undefined;

      const screenReaderNativeProps = useScreenReaderProps({
        onScreenReaderFocused,
        onScreenReaderSubViewFocusChange,
        onScreenReaderSubViewFocused,
        onScreenReaderSubViewBlurred,
        onScreenReaderDescendantFocusChanged,
      });

      const { orderKey, orderFocusType, importantForAccessibility } =
        useOrderProps(index, orderType, importantForAccessibilityProp);

      const localRef = useFocusRef(ref);

      return (
        <A11yIndexView
          ref={localRef as React.Ref<any>}
          {...viewProps}
          containerType={containerTypeValue}
          importantForAccessibility={importantForAccessibility}
          orderFocusType={orderFocusType}
          orderIndex={index}
          orderKey={orderKey}
          {...screenReaderNativeProps}
        >
          {children}
        </A11yIndexView>
      );
    }
  )
);
