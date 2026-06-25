import { useRef, useCallback } from "react";

// This is a hook that returns a memoized callback that is guaranteed to be the same reference between renders.
// This is useful when a stable reference is required to prevent unnecessary re-renders.

function useStableCallback(callback?: (...args: unknown[]) => unknown) {
  const ref = useRef(callback);
  ref.current = callback;

  const stableCallback = useCallback(
    (...args: unknown[]) => ref.current?.(...args),
    [],
  );

  return callback ? stableCallback : undefined;
}

export default useStableCallback;
