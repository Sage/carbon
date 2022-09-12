import React from "react";

import SidebarHeaderStyle from "./sidebar-header.style";

interface SidebarHeaderProps {
  /** This component supports children. */
  children?: React.ReactNode;
  /** A custom id. */
  id: string;
}

const SidebarHeader = ({ children, id }: SidebarHeaderProps) => (
  <SidebarHeaderStyle id={id} data-component="sidebar-header">
    {children}
  </SidebarHeaderStyle>
);

export default SidebarHeader;
