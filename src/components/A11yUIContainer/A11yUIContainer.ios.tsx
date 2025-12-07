import React from 'react';

import { default as A11yUIContainerViewNative } from '../../nativeSpecs/A11yUIContainerNativeComponent';
import {
  type A11yUIContainerProps,
  A11yContainerTypeEnum,
} from '../../types/A11yUIContainerView.types';

export const A11yUIContainer = React.memo<A11yUIContainerProps>(
  ({ type = 'group', ...props }) => {
    const containerTypeValue = A11yContainerTypeEnum[type];

    return (
      <A11yUIContainerViewNative
        containerType={containerTypeValue}
        {...props}
      />
    );
  }
);
