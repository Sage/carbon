import React from "react";

import StyledSidebarFooter from "./sidebar-footer.style";

interface SidebarFooterProps {
  children: React.ReactNode;
  disableStickyOnSmallScreen: boolean;
  sticky: boolean;
}

const SidebarFooter = ({
  children,
  disableStickyOnSmallScreen,
  sticky,
}: SidebarFooterProps) => (
  <StyledSidebarFooter
    $disableStickyOnSmallScreen={disableStickyOnSmallScreen}
    $sticky={sticky}
    data-element="sidebar-footer"
    data-role="sidebar-footer"
  >
    {children}
  </StyledSidebarFooter>
);

export default SidebarFooter;
