import * as React from "react";

export interface ScrollableBlockProps {
  /** Children elements */
  children: React.ReactNode;
  /** A custom height to be applied to the component. */
  height?: string | number;
  /** set the colour variant for a menuType */
  variant?: "default" | "alternate";
}

declare function ScrollableBlock(props: ScrollableBlockProps): JSX.Element;

export default ScrollableBlock;
