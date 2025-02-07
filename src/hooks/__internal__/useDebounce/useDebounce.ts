import { useMemo, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";

type Callback = (...args: any[]) => void;

const useDebounce = <T extends Callback>(
  callback: T,
  delay: number,
): DebouncedFunc<T> => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(
    () =>
      debounce((...args: Parameters<T>) => {
        callbackRef.current(...args);
      }, delay),
    [delay]
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  }, [debouncedCallback]);

  return debouncedCallback;
};

export default useDebounce;