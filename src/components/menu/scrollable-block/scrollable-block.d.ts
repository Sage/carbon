import * as React from "react";

export interface ScrollableBlockProps {
  /** Children elements */
  children: React.ReactNode;
  /** A custom height to be applied to the component. */
  height?: string | number;
  /** set the colour variant for a menuType */
  variant?: "default" | "alternate";
  /** the element, if any, displayed at the top of the block to be its semantic "parent",
   * but not part of the scrollable section
   */
  parent: React.ReactElement;
  /** the colour variant for the parent element, if different from the variant of the block */
  parentVariant: "default" | "alternate";
}

declare function ScrollableBlock(props: ScrollableBlockProps): JSX.Element;

export default ScrollableBlock;
