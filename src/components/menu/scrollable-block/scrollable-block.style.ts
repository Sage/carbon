import styled, { css } from "styled-components";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import menuConfigVariants from "../menu.config";
import { MenuType } from "../menu.context";
import { VariantType } from "../menu-item";
import Box from "../../box/box.component";
import { StyledMenuItem } from "../menu.style";
import { StyledLink } from "../../link/link.style";

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

    ${Box} {
      border-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius100);

      ${StyledMenuItem}:last-child ${StyledLink},
      ${StyledMenuItem}:last-child a,
      ${StyledMenuItem}:last-child button {
        border-bottom-left-radius: var(--borderRadius100);
        border-bottom-right-radius: var(--borderRadius000);
      }
    }
  `}
`;

export default StyledScrollableBlock;
