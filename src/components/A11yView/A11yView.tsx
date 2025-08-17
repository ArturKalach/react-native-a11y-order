import React from 'react';
import type { ViewProps } from 'react-native';
import A11yViewNativeComponent from '../../nativeSpecs/A11yViewNativeComponent';

export const A11yView = React.memo<ViewProps & { autoFocus?: boolean }>(
  (props) => {
    return <A11yViewNativeComponent {...props} />;
  }
);
