import { MutableRefObject, RefCallback } from "react";

export type CombinedRef<T> =
  | MutableRefObject<T | null>
  | RefCallback<T>
  | null
  | undefined;

export default function combineRefs<T = unknown>(
  ...refs: CombinedRef<T>[]
): (node: T | null) => void {
  let cleanups: (() => void)[] = [];

  // Returning void keeps React 18 compatible. React 19 also calls this
  // callback with null when no cleanup function is returned to React itself.
  return (node: T | null) => {
    const previousCleanups = cleanups;
    cleanups = [];
    previousCleanups.forEach((cleanup) => cleanup());

    if (node === null) return;

    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        // React 18 types declare a void return, but consumers may supply
        // React 19 cleanup callbacks to a Carbon component on either runtime.
        const cleanup: unknown = ref(node);
        cleanups.push(
          typeof cleanup === "function"
            ? () => {
                cleanup();
              }
            : () => {
                ref(null);
              },
        );
        return;
      }

      ref.current = node;
      cleanups.push(() => {
        ref.current = null;
      });
    });
  };
}
