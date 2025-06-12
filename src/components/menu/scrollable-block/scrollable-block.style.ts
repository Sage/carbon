import styled, { css } from "styled-components";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import menuConfigVariants from "../menu.config";
import { VariantType } from "../menu-item";
import StyledBox from "../../box/box.style";
import { StyledMenuItem } from "../menu.style";
import Link from "../../link";

import type { MenuType } from "../menu.types";

const StyledLink = styled(Link)``;

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
      padding-right: var(--spacing150);
    }

    ${StyledBox} {
      border-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius100);

      ${StyledMenuItem}:last-child ${StyledLink},
      ${StyledMenuItem}:last-child a,
      ${StyledMenuItem}:last-child button {
        border-bottom-left-radius: var(--borderRadius100);
        border-bottom-right-radius: var(--borderRadius000);
      }

      scrollbar-color: ${menuConfigVariants[menuType].scrollbarColor};

      &::-webkit-scrollbar {
        width: var(--sizing150);
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${menuConfigVariants[menuType].scrollbarThumb};
      }
      &::-webkit-scrollbar-track {
        background-color: ${menuConfigVariants[menuType].scrollbarTrack};
      }
    }
  `}
`;

export default StyledScrollableBlock;
