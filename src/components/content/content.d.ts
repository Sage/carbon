import * as React from "react";

export interface ContentProps {
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
