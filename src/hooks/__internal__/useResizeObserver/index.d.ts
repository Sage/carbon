import * as React from "react";

export default function useResizeObserver(
  /** Reference to the resizable HTML element -  */
  ref: React.RefObject<HTMLElement>,
  /** Callback meant to be executed on element resize */
  onResize: () => void,
  /** Flag to indicate whether hook should be disabled  */
  disabled?: boolean
): void;
