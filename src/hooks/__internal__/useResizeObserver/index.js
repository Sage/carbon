import { useRef, useLayoutEffect } from "react";

export default function useResizeObserver(ref, onResize) {
  const observer = useRef(null);
  const onResizeRef = useRef(null);
  onResizeRef.current = onResize;

  useLayoutEffect(() => {
    const referenceRef = ref.current;
    observer.current = new ResizeObserver(() => {
      onResizeRef?.current();
    });
    observer.current.observe(referenceRef);

    return () => {
      observer.current.unobserve(referenceRef);
      observer.current.disconnect();
    };
  }, [ref]);
}
