import styled, { css } from "styled-components";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import menuConfigVariants from "../menu.config";

const StyledScrollableBlock = styled.li`
  ${({ menuType, variant }) => css`
    && ${StyledMenuItemWrapper} {
      background-color: ${variant === "default"
        ? menuConfigVariants[menuType].submenuItemBackground
        : menuConfigVariants[menuType].alternate};
    }
  `}
`;

export default StyledScrollableBlock;
