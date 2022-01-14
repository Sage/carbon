import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledIconButton from "../../icon-button/icon-button.style";
import Box from "../../box";

const StyledMenuFullscreen = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;

  a,
  button,
  div {
    font-size: 16px;
  }

  ${({ isOpen, menuType, startPosition, theme }) => css`
    background-color: ${theme.menu[menuType].background};
    z-index: ${theme.zIndex.fullScreenModal};

    ${isOpen &&
    css`
      visibility: visible;
      ${startPosition}: 0;
      transition: all 0.3s ease;
    `}

    ${!isOpen &&
    css`
      visibility: hidden;
      ${startPosition}: -100vw;
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
