import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";

const StyledSubmenuBlock = styled.div`
  ${({ menuType, theme, variant }) => css`
    ${menuType === "dark" &&
    css`
      background-color: ${theme.menu.dark.submenuBackground};

      ${StyledMenuItemWrapper} {
        background-color: ${variant === "default"
          ? "transparent"
          : theme.menu.dark.alternate};
      }
    `}
  `}
`;

StyledSubmenuBlock.defaultProps = {
  theme: baseTheme,
};

export default StyledSubmenuBlock;
