import React from "react";
import { PaddingProps } from "styled-system";
import StyledSidebarHeader, {
  StyledSidebarSubHeader,
} from "./sidebar-header.style";

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

export interface SidebarSubHeaderProps extends PaddingProps {
  /** This component supports children. */
  children?: React.ReactNode;
  /** A custom id. */
  id: string;
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

const SidebarSubHeader = ({ children, id, ...rest }: SidebarSubHeaderProps) => (
  <StyledSidebarSubHeader
    data-component="sidebar-subheader"
    p="var(--sizing100) var(--sizing400)"
    id={id}
    {...rest}
  >
    {children}
  </StyledSidebarSubHeader>
);

SidebarHeader.displayName = "SidebarHeader";
SidebarSubHeader.displayName = "SidebarSubHeader";

export default SidebarHeader;
export { SidebarSubHeader };
