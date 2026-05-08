import { MutableRefObject, RefCallback } from "react";

export default <T = unknown>(
  ...refs: (MutableRefObject<T | null> | RefCallback<T> | null | undefined)[]
): RefCallback<T> => {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(node);
        return;
      }
      /* istanbul ignore else */
      if ("current" in ref) {
        ref.current = node;
        return;
      }
    });
  };
};
