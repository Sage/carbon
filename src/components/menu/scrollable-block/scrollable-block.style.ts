import styled, { css } from "styled-components";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import menuConfigVariants from "../menu.config";
import { MenuType } from "../menu.context";
import { VariantType } from "../menu-item";
import StyledBox from "../../box/box.style";

interface StyledScrollableBlockProps {
  menuType: MenuType;
  variant: VariantType;
}

const StyledScrollableBlock = styled.li<StyledScrollableBlockProps>`
  ${({ menuType, variant }) => css`
    && ${StyledMenuItemWrapper} {
      background-color: ${variant === "default"
        ? menuConfigVariants[menuType].submenuItemBackground
        : menuConfigVariants[menuType].alternate};
    }

    ${StyledBox} {
      border-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius100);
    }
  `}
`;

export default StyledScrollableBlock;
