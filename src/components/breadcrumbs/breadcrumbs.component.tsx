import React from "react";
import { StyledBreadcrumbs, StyledBreadcrumbsWrapper, StyledSlash } from "./breadcrumbs.style";
import Link from "../link";


export const Breadcrumbs = () => (
      <StyledBreadcrumbsWrapper>
        <StyledBreadcrumbs><Link>Breadcrumb 1</Link></StyledBreadcrumbs><StyledSlash></StyledSlash>
        <StyledBreadcrumbs><Link>Breadcrumb 2</Link></StyledBreadcrumbs><span>/</span>
        <StyledBreadcrumbs><Link>Breadcrumb 3</Link></StyledBreadcrumbs><span>/</span>
        <StyledBreadcrumbs>Current Page</StyledBreadcrumbs>
      </StyledBreadcrumbsWrapper>
);

export default Breadcrumbs;
