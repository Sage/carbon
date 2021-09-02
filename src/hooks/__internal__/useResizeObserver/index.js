import { useRef, useLayoutEffect } from "react";

export default function useResizeObserver(ref, onResize, disabled) {
  const observer = useRef(null);
  const onResizeRef = useRef(null);
  onResizeRef.current = onResize;

  useLayoutEffect(() => {
    const referenceRef = ref.current;

    if (!disabled) {
      observer.current = new ResizeObserver(() => {
        onResizeRef?.current();
      });
      observer.current.observe(referenceRef);
    }

    return () => {
      if (!disabled) {
        observer.current.unobserve(referenceRef);
        observer.current.disconnect();
      }
    };
  }, [ref, disabled]);
}
