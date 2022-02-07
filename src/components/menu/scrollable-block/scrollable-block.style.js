import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";

const StyledScrollableBlock = styled.div`
  ${({ menuType, variant, theme }) => css`
    && ${StyledMenuItemWrapper} {
      background-color: ${variant === "default"
        ? theme.menu[menuType].submenuBackground
        : theme.menu[menuType].background};
    }
  `}
`;

StyledScrollableBlock.defaultProps = {
  theme: baseTheme,
};

export default StyledScrollableBlock;
