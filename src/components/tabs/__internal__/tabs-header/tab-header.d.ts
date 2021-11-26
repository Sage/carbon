import * as React from "react";

export interface TabHeaderProps {
  role?: string;
  position?: "top" | "left";
  extendedLine?: boolean;
  noRightBorder?: boolean;
  alternateStyling?: boolean;
  isInSidebar?: boolean;
  children: React.ReactNode;
  align?: "left" | "right";
}

declare function TabHeader(props: TabHeaderProps): JSX.Element;

export default TabHeader;
