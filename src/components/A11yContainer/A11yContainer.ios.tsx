import React from 'react';

import { default as A11yContainerViewNative } from '../../nativeSpecs/A11yContainerNativeComponent';
import {
  A11yContainerProps,
  A11yContainerTypeEnum,
} from '../../types/A11yContainerView.types';

export const A11yContainer = React.memo<A11yContainerProps>(
  ({ type = 'group', ...props }) => {
    const containerTypeValue = A11yContainerTypeEnum[type];

    return (
      <A11yContainerViewNative containerType={containerTypeValue} {...props} />
    );
  }
);
