import React from 'react';
import type { A11yLockProps } from '../../../types/A11yLock.types';
import { A11yBaseLock } from '../A11yBaseLock/A11yBaseLock';
import { A11yFrameProvider } from '../../../context/A11yFocusFrameProviderContext';

export const A11yFocusFrame = React.memo<A11yLockProps>(
  ({ lockDisabled = false, ...props }) => {
    return (
      <A11yFrameProvider>
        <A11yBaseLock
          {...props}
          componentType={1}
          lockDisabled={lockDisabled}
        />
      </A11yFrameProvider>
    );
  }
);
