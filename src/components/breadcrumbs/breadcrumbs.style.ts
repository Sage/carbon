import styled from "styled-components";
import Breadcrumbs from "./breadcrumbs.component";

const StyledBreadcrumbsWrapper = styled.div`
  position: relative;
  display: inline-block;
  background-color: pink;
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  padding: 0;
  color: green;
  font-size: 25px;
`;

export { StyledBreadcrumbsWrapper, StyledBreadcrumbs };
