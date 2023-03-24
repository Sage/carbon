import React from "react";
import {
  StyledTabsHeaderWrapper,
  StyledTabsHeaderList,
} from "./tabs-header.style";

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

const TabsHeader = ({
  align = "left",
  children,
  position = "top",
  role,
  extendedLine,
  alternateStyling,
  noRightBorder = false,
  isInSidebar = false,
}: TabHeaderProps) => {
  return (
    <StyledTabsHeaderWrapper isInSidebar={isInSidebar} position={position}>
      <StyledTabsHeaderList
        align={align}
        position={position}
        role={role}
        extendedLine={extendedLine}
        alternateStyling={alternateStyling}
        noRightBorder={noRightBorder}
        isInSidebar={isInSidebar}
      >
        {children}
      </StyledTabsHeaderList>
    </StyledTabsHeaderWrapper>
  );
};

export default TabsHeader;
