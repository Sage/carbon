import styled, { css } from "styled-components";
import {
  StyledVerticalWrapper,
  StyledDivider,
} from "../vertical-divider/vertical-divider.style";
import { baseTheme } from "../../style/themes";
import Box from "../box";

const StyledMenuWrapper = styled(Box).attrs({ as: "ul" })`
  line-height: 40px;
  list-style: none;
  margin: 0;
  padding: 0;

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

const StyledMenuItem = styled(Box).attrs({ as: "li" })`
  ${({ inSubmenu }) => css`
    ${inSubmenu &&
    css`
      display: list-item;
    `}
  `}
`;

StyledMenuWrapper.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuWrapper, StyledMenuItem };
