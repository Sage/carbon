import styled from "styled-components";
import VerticalDivider from "../vertical-divider";

const StyledBreadcrumbsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const StyledDivider = styled(VerticalDivider)`
  transform: skewX(-25deg);
`;

const StyledBreadcrumbs = styled.div`
  color: black;
  font-size: 16px;
`;

export { StyledBreadcrumbsWrapper, StyledBreadcrumbs, StyledDivider };
