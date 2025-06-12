import styled, { css } from "styled-components";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import StyledIconButton from "../../icon-button/icon-button.style";
import StyledBox from "../../box/box.style";
import StyledSearch from "../../search/search.style";
import StyledIcon from "../../icon/icon.style";
import StyledButton from "../../button/button.style";
import menuConfigVariants from "../menu.config";
import addFocusStyling from "../../../style/utils/add-focus-styling";

import type { MenuType } from "../menu.types";

import Link from "../../link";

const StyledLink = styled(Link)``;

const StyledMenuFullscreen = styled.div.attrs(applyBaseTheme)<{
  transitionDuration: number;
  startPosition: "left" | "right";
}>`
  position: fixed;
  top: 0;
  bottom: 0;

  ${({ theme }) => css`
    z-index: ${theme.zIndex.fullScreenModal};
  `}

  ${({ startPosition, transitionDuration }) => css`
    &.enter {
      visibility: hidden;
      ${startPosition}: -100%;
    }

    &.enter-active {
      visibility: visible;
      ${startPosition}: 0;
      transition: all ${transitionDuration}ms ease;
    }

    &.exit {
      visibility: visible;
      ${startPosition}: 0;
    }

    &.exit-active {
      visibility: hidden;
      ${startPosition}: -100%;
      transition: all ${transitionDuration}ms ease;
    }
  `}
`;

const StyledMenuModal = styled.div.attrs(applyBaseTheme)<{
  menuType: MenuType;
}>`
  height: 100vh;
  width: 100vw;
  outline: none;

  && {
    ${StyledLink} {
      max-width: 100vw;
    }

    ${StyledLink} > a,
    ${StyledLink} > button,
    > div {
      font-size: var(--fontSizes200);
    }
  }

  ${({ menuType }) => css`
    background-color: ${menuConfigVariants[menuType].background};

    && {
      ${StyledSearch} {
        ${StyledIcon} {
          display: inline-flex;
          bottom: auto;
        }

        ${StyledButton} {
          display: flex;
          line-height: normal;
          padding-bottom: 0;

          &:focus {
            border-bottom-right-radius: var(--borderRadius050);
            border-top-right-radius: var(--borderRadius050);

            ${addFocusStyling()}
          }
        }
      }
    }

    ${StyledBox} {
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

const StyledMenuFullscreenHeader = styled.div<{
  menuType: MenuType;
}>`
  height: 40px;

  ${StyledIconButton} {
    position: absolute;
    z-index: 1;
    right: 16px;
    top: 8px;
  }

  ${({ menuType }) => css`
    background-color: ${menuConfigVariants[menuType].submenuItemBackground};
  `}
`;

export { StyledMenuModal, StyledMenuFullscreen, StyledMenuFullscreenHeader };
