import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledIconButton from "../../icon-button/icon-button.style";
import Box from "../../box";
import StyledSearch from "../../search/search.style";
import StyledIcon from "../../icon/icon.style";
import StyledButton from "../../button/button.style";

const StyledMenuFullscreen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;

  a,
  button,
  div {
    font-size: 16px;
  }

  ${({ isOpen, menuType, startPosition, theme }) => css`
    background-color: ${theme.menu[menuType].background};
    z-index: ${theme.zIndex.fullScreenModal};

    ${menuType === "dark" &&
    css`
      ${StyledSearch} span > [data-component="icon"] {
        color: ${theme.menu.dark.searchIcon};

        &:hover {
          color: ${theme.menu.dark.searchIconHover};
        }
      }
    `}

    ${menuType === "light" &&
    css`
      ${StyledSearch} span > [data-component="icon"] {
        color: ${theme.search.icon};

        &:hover {
          color: ${theme.search.iconHover};
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
          outline: solid 3px var(--colorsSemanticFocus500);
          box-shadow: none;
        }
      }
    }

    ${isOpen &&
    css`
      visibility: visible;
      ${startPosition}: 0;
      transition: all 0.3s ease;
    `}

    ${!isOpen &&
    css`
      visibility: hidden;
      ${startPosition}: -100%;
      transition: all 0.3s ease;
    `}
  `}

  ${Box} {
    &::-webkit-scrollbar {
      width: 16px;
    }
  }
`;

const StyledMenuFullscreenHeader = styled.div`
  height: 40px;

  ${StyledIconButton} {
    position: absolute;
    z-index: 1;
    right: 16px;
    top: 8px;
  }

  ${({ menuType, theme }) => css`
    background-color: ${theme.menu[menuType].submenuBackground};
  `}
`;

StyledMenuFullscreen.defaultProps = {
  theme: baseTheme,
};

StyledMenuFullscreenHeader.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuFullscreen, StyledMenuFullscreenHeader };
