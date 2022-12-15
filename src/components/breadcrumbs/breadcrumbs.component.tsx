import React from "react";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import StyledBreadcrumbs from "./breadcrumbs.style";

export interface BreadcrumbsProps extends TagProps {
  /** Children crumbs */
  children: React.ReactNode;
}

export const Breadcrumbs = ({ children, ...rest }: BreadcrumbsProps) => (
  <StyledBreadcrumbs role="navigation" {...tagComponent("breadcrumbs", rest)}>
    {children}
  </StyledBreadcrumbs>
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
