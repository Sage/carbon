import * as React from "react";

export interface ScrollableBlockProps {
  children: React.ReactNode;
  height?: string | number;
  variant?: "default" | "alternate";
}

declare const ScrollableBlock: React.ComponentType<ScrollableBlockProps>;
export default ScrollableBlock;
