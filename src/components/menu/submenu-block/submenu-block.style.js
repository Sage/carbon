import styled, { css } from "styled-components";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import menuConfigVariants from "../menu.config";

const StyledSubmenuBlock = styled.div`
  ${({ menuType, variant }) => css`
    background-color: ${menuConfigVariants[menuType].submenuItemBackground};

    ${StyledMenuItemWrapper} {
      background-color: ${variant === "default"
        ? "transparent"
        : menuConfigVariants[menuType].alternate};
    }
  `}
`;

export default StyledSubmenuBlock;
