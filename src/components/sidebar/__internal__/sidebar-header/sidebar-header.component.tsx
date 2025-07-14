import React from "react";
import { PaddingProps } from "styled-system";
import StyledSidebarHeader from "./sidebar-header.style";

export interface SidebarHeaderProps extends PaddingProps {
  /** This component supports children. */
  children?: React.ReactNode;
  /** A custom id. */
  id: string;
  /** Close icon button to be rendered */
  closeIcon?: React.ReactNode;
  /** Header background variant for the sidebar. */
  headerVariant?: "light" | "dark";
}

const SidebarHeader = ({
  children,
  id,
  closeIcon,
  headerVariant,
  ...rest
}: SidebarHeaderProps) => (
  <StyledSidebarHeader
    hasClose={!!closeIcon}
    data-component="sidebar-header"
    data-role="sidebar-header"
    p="27px 32px 32px"
    headerVariant={headerVariant}
    {...rest}
  >
    <div data-element="sidebar-heading" id={id}>
      {children}
    </div>
    {closeIcon}
  </StyledSidebarHeader>
);

SidebarHeader.displayName = "SidebarHeader";

export default SidebarHeader;
