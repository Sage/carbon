import { useMemo, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;

const useDebounce = <T extends Callback>(
  callback: T,
  delay: number,
): DebouncedFunc<T> => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const debouncedCallback = useMemo(
    () => debounce(callbackRef.current, delay),
    [delay],
  );

  useEffect(() => {
    return () => {
      debouncedCallback.cancel();
    };
  });

  return debouncedCallback;
};

export default useDebounce;
