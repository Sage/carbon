import styled from "styled-components";
import VerticalDivider from "../vertical-divider";

const StyledBreadcrumbsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const StyledDivider = styled(VerticalDivider)`
  transform: skewX(-25deg);
  padding: 5px 5px 0px 5px;
`;

const StyledBreadcrumbs = styled.div`
  color: var(--colorsUtilityYin90);
  font-size: var(--fontSizes100);
`;

export { StyledBreadcrumbsWrapper, StyledBreadcrumbs, StyledDivider };
