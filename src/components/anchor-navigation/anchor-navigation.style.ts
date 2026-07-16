import styled from "styled-components";

const StyledAnchorNavigation = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const StyledNavigationWrapper = styled.nav`
  position: sticky;
  top: var(--global-space-layout-s);
  max-width: 240px;
`;

const StyledNavigation = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledContent = styled.div`
  flex: 1;
  margin-left: var(--global-space-layout-s);

  [data-carbon-anchornav-ref="true"]:focus {
    outline: none;
  }
`;

export {
  StyledAnchorNavigation,
  StyledNavigationWrapper,
  StyledNavigation,
  StyledContent,
};
