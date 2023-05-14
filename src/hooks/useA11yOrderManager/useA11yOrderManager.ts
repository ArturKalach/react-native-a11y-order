import { useRef, useCallback, RefObject, useMemo } from 'react';
import { Platform } from 'react-native';
import type { View } from 'react-native';
import { setA11yElementsOrder } from '../../A11yModule';

export const debounce = <T extends Function>(callback: T, timeout = 100) => {
  let timer: NodeJS.Timeout | null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => callback(args), timeout);
  };
};

const SECONDS_PER_FRAME = 16;
const COUNT_OF_FRAMES = 1;

const DEBOUNCE_DELAY = SECONDS_PER_FRAME * COUNT_OF_FRAMES;

export const useA11yOrderManager = <T extends React.Component>(
  orderRef: RefObject<View>,
  onlyFor?: Platform['OS']
) => {
  const currentRef = useRef<(T | null)[]>([]);
  const registeredRefs = useRef<(T | null)[]>([]);

  const refWasUpdated = useRef<boolean>(false);

  const setOrder = useCallback(() => {
    if (!onlyFor || onlyFor === Platform.OS) {
      setA11yElementsOrder({
        tag: orderRef,
        views: registeredRefs.current,
      });
    }
  }, [onlyFor, orderRef]);

  const debounceOrder = useMemo(
    () => debounce(setOrder, DEBOUNCE_DELAY),
    [setOrder]
  );

  const registerOrderRef = useCallback(
    (order: number) =>
      (ref: T | null): void => {
        refWasUpdated.current = true;
        registeredRefs.current[order] = ref;
      },
    []
  );

  const updateRefList = useCallback(() => {
    if (!refWasUpdated.current) {
      return;
    }

    refWasUpdated.current = false;
    currentRef.current = registeredRefs.current.filter((v) => v);

    debounceOrder();
  }, [debounceOrder]);

  const reset = useCallback(() => {
    currentRef.current = [];
    registeredRefs.current = [];
    refWasUpdated.current = false;
  }, []);

  return {
    registerOrderRef,
    updateRefList,
    reset,
    setOrder,
  };
};
