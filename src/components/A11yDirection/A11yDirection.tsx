import React, { memo, useMemo } from 'react';
import A11yDirectionView from '../../nativeSpecs/A11yDirectionNativeComponent';
import type { ViewProps, ViewStyle, StyleProp } from 'react-native';

export const A11yDirection = memo<
  React.PropsWithChildren<{ horizontal?: boolean } & ViewProps>
>(({ horizontal = false, children, style, ...props }) => {
  const viewStyle: StyleProp<ViewStyle>[] = useMemo(
    () => [style, { flexDirection: horizontal ? 'row' : 'column' }],
    [horizontal, style]
  );

  return (
    <A11yDirectionView {...props} style={viewStyle} horizontal={horizontal}>
      {children}
    </A11yDirectionView>
  );
});
