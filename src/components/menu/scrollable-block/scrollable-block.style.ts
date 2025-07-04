import styled, { css } from "styled-components";

import menuConfigVariants from "../menu.config";
import { VariantType } from "../menu-item";
import StyledBox from "../../box/box.style";
import { StyledMenuItem } from "../menu.style";
import StyledLink from "../../link/__internal__/base-link/base-link.style";

import type { MenuType } from "../menu.types";

interface StyledScrollableBlockProps {
  menuType: MenuType;
  variant: VariantType;
}

const StyledScrollableBlock = styled.li<StyledScrollableBlockProps>`
  ${({ menuType, variant }) => css`
    ${StyledMenuItem} ${StyledLink} {
      a,
      button {
        background-color: ${variant === "default"
          ? menuConfigVariants[menuType].submenuItemBackground
          : menuConfigVariants[menuType].alternate};
      }
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
