import styled from "styled-components";

const StyledBreadcrumbsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const BreadcrumbsContainer = styled.div`
display: flex;
flex-wrap: wrap;
`

const BreadcrumbDivider = styled.div`
  margin-left: 8px;
  margin-right: 8px;;
`;

const StyledBreadcrumbs = styled.div`
  color: var(--colorsUtilityYin90);
  font-size: var(--fontSizes100);
`;

export { StyledBreadcrumbsWrapper, StyledBreadcrumbs, BreadcrumbDivider, BreadcrumbsContainer };
