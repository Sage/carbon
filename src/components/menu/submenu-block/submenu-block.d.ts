import * as React from "react";

export interface SubmenuBlockProps {
  /** Children elements */
  children: React.ReactNode;
  /** set the colour variant for a menuType */
  variant?: "default" | "alternate";
}

declare function SubmenuBlock(props: SubmenuBlockProps): JSX.Element;

export default SubmenuBlock;
