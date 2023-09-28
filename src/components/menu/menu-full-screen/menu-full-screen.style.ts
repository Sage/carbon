import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledIconButton from "../../icon-button/icon-button.style";
import StyledBox from "../../box/box.style";
import StyledSearch from "../../search/search.style";
import StyledIcon from "../../icon/icon.style";
import StyledButton from "../../button/button.style";
import menuConfigVariants from "../menu.config";
import { MenuFullscreenProps } from "./menu-full-screen.component";
import { MenuType } from "../menu.context";
import addFocusStyling from "../../../style/utils/add-focus-styling";

interface StyledMenuFullScreenProps
  extends Pick<MenuFullscreenProps, "isOpen" | "startPosition"> {
  menuType: MenuType;
}

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
  box-shadow: none;
`;

const StyledMenuFullscreen = styled.div<StyledMenuFullScreenProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  outline: none;

  a,
  button,
  div {
    font-size: 16px;
  }

  ${({ menuType, theme }) => css`
    background-color: ${menuConfigVariants[menuType].background};
    z-index: ${theme.zIndex.fullScreenModal};

    && {
      ${menuType === "dark" &&
      css`
        ${StyledSearch} span > [data-component="icon"] {
          color: var(--colorsUtilityMajor200);

          &:hover {
            color: var(--colorsUtilityMajor150);
          }
        }
      `}

      ${menuType === "light" &&
      css`
        ${StyledSearch} span > [data-component="icon"] {
          color: var(--colorsUtilityMajor200);

          &:hover {
            color: var(--colorsUtilityMajor400);
          }
        }
      `}

      ${StyledSearch} {
        ${StyledIcon} {
          display: inline-flex;
          margin-right: 0;
          bottom: auto;
        }

        ${StyledButton} {
          display: flex;
          line-height: normal;
          padding-bottom: 0;

          &:focus {
            border-bottom-right-radius: var(--borderRadius050);
            border-top-right-radius: var(--borderRadius050);

            ${!theme.focusRedesignOptOut
              ? addFocusStyling()
              : /* istanbul ignore next */ oldFocusStyling}
          }
        }
      }
    }
  `}

  ${StyledBox} {
    &::-webkit-scrollbar {
      width: 16px;
    }
  }
`;

const StyledMenuFullscreenHeader = styled.div<StyledMenuFullScreenProps>`
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

StyledMenuFullscreen.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuFullscreen, StyledMenuFullscreenHeader };
