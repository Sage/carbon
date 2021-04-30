import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper";

export interface ContentProps extends MarginSpacingProps {
  align?: "left" | "center" | "right";
  variant?: "primary" | "secondary";
  bodyFullWidth?: boolean;
  children?: React.ReactNode;
  inline?: boolean;
  title?: string;
  titleWidth?: string;
}

declare const Content: React.ComponentType<ContentProps>;
export default Content;
