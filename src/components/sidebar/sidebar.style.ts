import styled, { css } from "styled-components";

import { SidebarProps } from "./sidebar.component";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";
import { SIDEBAR_SIZES_CSS } from "./sidebar.config";

type StyledSidebarProps = {
  onCancel?: SidebarProps["onCancel"];
  position?: SidebarProps["position"];
  size?: SidebarProps["size"];
};

const StyledSidebar = styled.div<StyledSidebarProps>`
  // prevents outline being added in safari
  :focus {
    outline: none;
  }

  ${({ onCancel, position, size, theme }) => css`
    background: var(--colorsUtilityMajor025);
    border-radius: 1px;
    bottom: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    z-index: ${theme.zIndex.fullScreenModal};

    ${size &&
    css`
      width: ${SIDEBAR_SIZES_CSS[size]};
    `}

    ${position &&
    css`
      box-shadow: var(--boxShadow300);
      ${position}: 0;
    `}

    ${onCancel &&
    css`
      > ${StyledIconButton}:first-of-type {
        position: absolute;
        z-index: 1;
        right: 25px;
        top: 25px;
      }
    `}
  `}
`;

StyledSidebar.defaultProps = {
  theme: baseTheme,
};

export default StyledSidebar;
