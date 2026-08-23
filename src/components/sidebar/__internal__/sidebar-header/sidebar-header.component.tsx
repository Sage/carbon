import React from "react";
import { PaddingProps } from "styled-system";
import Typography from "../../../typography";
import StyledSidebarHeader, {
  StyledSidebarHeaderDivider,
  StyledSidebarSubHeader,
} from "./sidebar-header.style";

export interface SidebarHeaderProps extends PaddingProps {
  /** This component supports children. */
  children?: React.ReactNode;
  /** A custom id. */
  id: string;
  /** Close button to be rendered. */
  closeButton?: React.ReactNode;
  /** Header background variant for the sidebar. */
  headerVariant?: "typical" | "inverse" | "light" | "dark";
  /** Adds the Carbon AI gradient keyline to the header. */
  gradientKeyLine?: boolean;
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
  closeButton,
  headerVariant,
  gradientKeyLine,
  ...rest
}: SidebarHeaderProps) => (
  <StyledSidebarHeader
    $hasCloseButton={!!closeButton}
    data-component="sidebar-header"
    data-role="sidebar-header"
    p="var(--global-space-comp-xl)"
    $headerVariant={headerVariant}
    $gradientKeyLine={gradientKeyLine}
    {...rest}
  >
    <div data-element="sidebar-heading" id={id}>
      {typeof children === "string" ? (
        <Typography
          as="h1"
          data-element="sidebar-title"
          variant="h2"
          wordBreak="normal"
          wordWrap="break-word"
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </div>
    {closeButton}
    <StyledSidebarHeaderDivider
      aria-hidden="true"
      data-element="sidebar-header-divider"
      $gradientKeyLine={gradientKeyLine}
    />
  </StyledSidebarHeader>
);

const SidebarSubHeader = ({ children, id, ...rest }: SidebarSubHeaderProps) => (
  <StyledSidebarSubHeader
    data-component="sidebar-subheader"
    p="var(--global-space-comp-s) var(--global-space-comp-2-xl)"
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
