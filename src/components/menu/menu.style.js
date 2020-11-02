import styled, { css } from "styled-components";
import {
  StyledVerticalWrapper,
  StyledDivider,
} from "../vertical-divider/vertical-divider.style";
import { baseTheme } from "../../style/themes";

const StyledMenuWrapper = styled.nav`
  line-height: 40px;
`;

const StyledMenuItemsWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledMenuItem = styled.li`
  display: inline-block;

  ${StyledVerticalWrapper} {
    ${({ menuType, theme }) => css`
      background-color: ${theme.menu.light.background};
      display: inline-block;
      vertical-align: bottom;

      ${menuType === "dark" &&
      css`
        background-color: ${theme.colors.slate};
        color: ${theme.colors.white};
      `}
    `}

    ${StyledDivider} {
      position: relative;
      top: -1px;
    }
  }
`;

StyledMenuItem.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuWrapper, StyledMenuItemsWrapper, StyledMenuItem };
