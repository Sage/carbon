import styled from "styled-components";

import { baseTheme } from "../../style/themes";

const StyledAnchorNavigation = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const StyledNavigation = styled.ul`
  position: sticky;
  top: 32px;
  box-shadow: inset 3px 0px 0px 0px ${({ theme }) => theme.disabled.background};
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 240px;
`;

const StyledContent = styled.div`
  flex: 1;
  margin-left: 32px;
`;

StyledAnchorNavigation.defaultProps = {
  theme: baseTheme,
};
StyledNavigation.defaultProps = {
  theme: baseTheme,
};
StyledContent.defaultProps = {
  theme: baseTheme,
};

export { StyledAnchorNavigation, StyledNavigation, StyledContent };
