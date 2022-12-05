import styled from "styled-components";

const StyledBreadcrumbsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const StyledSlash = styled.div`
  content: '\002F';
`;

const StyledBreadcrumbs = styled.div`
  padding: 0;
  color: green;
  font-size: 25px;
`;

export { StyledBreadcrumbsWrapper, StyledBreadcrumbs, StyledSlash };
