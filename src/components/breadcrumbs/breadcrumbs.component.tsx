import React from "react";
import StyledBreadcrumbs from "./breadcrumbs.style";

export const Breadcrumbs = ({ ...rest }) => (
  <StyledBreadcrumbs {...rest}>HERE IS MY COMPONENT</StyledBreadcrumbs>
);

Breadcrumbs.displayName = "Breadcrumbs";

export default Breadcrumbs;
