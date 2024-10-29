import { useRef, useLayoutEffect, RefObject } from "react";

export default function useResizeObserver(
  /** Reference to the resizable HTML element */
  ref: RefObject<Element>,
  /** Callback meant to be executed on element resize */
  onResize: () => void,
  /** Flag to indicate whether hook should be disabled  */
  disabled?: boolean,
): void {
  const observer = useRef<ResizeObserver>();
  const onResizeRef = useRef<() => void>(onResize);
  onResizeRef.current = onResize;

  useLayoutEffect(() => {
    const referenceRef = ref.current;

    if (!disabled && referenceRef) {
      observer.current = new ResizeObserver(() => {
        onResizeRef?.current();
      });
      observer.current.observe(referenceRef);
    }

    return () => {
      if (!disabled && referenceRef && observer.current) {
        observer.current.unobserve(referenceRef);
        observer.current.disconnect();
      }
    };
  }, [ref, disabled]);
}
