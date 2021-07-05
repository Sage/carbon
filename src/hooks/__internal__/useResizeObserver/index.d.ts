import * as React from "react";

export default function useResizeObserver(
  ref: React.RefObject<HTMLElement>,
  onResize: () => void
): void;
