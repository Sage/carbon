import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";

const sidebarSizes = {
  "extra-small": "214px",
  small: "314px",
  "medium-small": "414px",
  medium: "514px",
  "medium-large": "614px",
  large: "714px",
  "extra-large": "814px",
};

const SidebarStyle = styled.div`
  ${({ onCancel, position, size, theme }) => css`
    background-color: ${theme.disabled.input};
    border-radius: 1px;
    bottom: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    z-index: ${theme.zIndex.fullScreenModal};

    ${size &&
    css`
      width: ${sidebarSizes[size]};
    `}

    ${position &&
    css`
      box-shadow: ${theme.shadows.depth3};
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

SidebarStyle.defaultProps = {
  theme: baseTheme,
};

export default SidebarStyle;
