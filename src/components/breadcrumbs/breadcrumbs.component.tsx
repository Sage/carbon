import React from "react";
import { StyledBreadcrumbs, StyledBreadcrumbsWrapper, StyledDivider } from "./breadcrumbs.style";
import Link from "../link";


export const Breadcrumbs = () => (
      <StyledBreadcrumbsWrapper>
        <StyledBreadcrumbs><Link>Breadcrumb 1</Link></StyledBreadcrumbs><StyledDivider tint={70} px={2} h={10}></StyledDivider>
        <StyledBreadcrumbs><Link>Breadcrumb 2</Link></StyledBreadcrumbs><StyledDivider tint={70} px={2} h={10}></StyledDivider>
        <StyledBreadcrumbs><Link>Breadcrumb 3</Link></StyledBreadcrumbs><StyledDivider tint={70} px={2} h={10}></StyledDivider>
        <StyledBreadcrumbs>Current Page</StyledBreadcrumbs>
      </StyledBreadcrumbsWrapper>
);

export default Breadcrumbs;
