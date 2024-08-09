import { useMemo, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { DebouncedFunc } from "lodash";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;

const useThrottle = <T extends Callback>(
  callback: T,
  delay: number,
): DebouncedFunc<T> => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const throttledCallback = useMemo(
    () => throttle(callbackRef.current, delay),
    [delay],
  );

  useEffect(() => {
    return () => {
      throttledCallback.cancel();
    };
  });

  return throttledCallback;
};

export default useThrottle;
