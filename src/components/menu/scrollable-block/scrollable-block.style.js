import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import Box from "../../box";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";

const StyledScrollableBlock = styled(Box)`
  ${({ menuType, variant, theme }) => css`
    && ${StyledMenuItemWrapper} {
      background-color: ${variant === "default"
        ? theme.colors.white
        : theme.menu.light.background};
    }

    ${menuType === "dark" &&
    css`
      && ${StyledMenuItemWrapper} {
        background-color: ${variant === "default"
          ? theme.menu.dark.submenuBackground
          : theme.colors.slate};
      }
    `}
  `}
`;

StyledScrollableBlock.defaultProps = {
  theme: baseTheme,
};

export default StyledScrollableBlock;
