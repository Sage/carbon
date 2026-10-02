import styled from "styled-components";

const StyledAnchorNavigation = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const StyledNavigationMenuWrapper = styled.nav`
  position: sticky;
  top: var(--global-space-layout-2-xs);
  max-width: 240px;

  @media screen and (min-width: 600px) {
    top: var(--global-space-layout-xs);
  }
`;

const StyledNavigationMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledNavigationContent = styled.div`
  flex: 1;
  margin-left: var(--global-space-layout-s);

  [data-carbon-anchornav-ref="true"]:focus {
    outline: none;
  }
`;

export {
  StyledAnchorNavigation,
  StyledNavigationMenuWrapper,
  StyledNavigationMenu,
  StyledNavigationContent,
};
