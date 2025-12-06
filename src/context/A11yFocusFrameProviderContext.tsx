import React, { useMemo } from 'react';
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react';

type A11yFocusFrameContextType = {
  hasFocusLock: boolean;
  setHasFocusLock: (v: boolean) => void;
  focusLockId: symbol | null;
  setFocusLockId: (v: symbol | null) => void;
};

const A11yFocusFrameProviderContext = createContext<
  A11yFocusFrameContextType | undefined
>(undefined);

export const useFocusFrameContext = () =>
  useContext(A11yFocusFrameProviderContext);

export const A11yFrameProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [hasFocusLock, setHasFocusLock] = useState(false);
  const [focusLockId, setFocusLockId] = useState<symbol | null>(null);

  const state = useMemo(
    () => ({ hasFocusLock, focusLockId, setHasFocusLock, setFocusLockId }),
    [hasFocusLock, focusLockId, setHasFocusLock, setFocusLockId]
  );

  return (
    <A11yFocusFrameProviderContext.Provider value={state}>
      {children}
    </A11yFocusFrameProviderContext.Provider>
  );
};
