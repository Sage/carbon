import { useLayoutEffect } from "react";

export default (
  id: string,
  registerChild?: (childId: string, props?: Record<string, unknown>) => void,
  unregisterChild?: (childId: string) => void,
  additionalProps?: Record<string, unknown>
) => {
  useLayoutEffect(() => {
    if (registerChild) registerChild(id, additionalProps);

    return () => {
      if (unregisterChild) unregisterChild(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
