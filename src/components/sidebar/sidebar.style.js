import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";

const sidebarSizes = {
  "extra-small": "150px",
  small: "250px",
  "medium-small": "350px",
  medium: "450px",
  "medium-large": "550px",
  large: "650px",
  "extra-large": "750px",
};

const SidebarStyle = styled.div`
  background-color: ${({ theme }) => theme.disabled.input};
  border-radius: 1px;
  bottom: 0;
  position: fixed;
  top: 0;
  padding: 27px 32px 32px 32px;
  z-index: ${({ theme }) => theme.zIndex.fullScreenModal};

  ${({ size }) =>
    size &&
    css`
      width: ${sidebarSizes[size]};
    `};

  ${({ position, theme }) =>
    position &&
    css`
      box-shadow: ${theme.shadows.depth3};
      ${position}: 0;
    `};

  ${StyledIconButton} {
    position: absolute;
    z-index: 1;
    right: 25px;
    top: 25px;
  }
`;

SidebarStyle.defaultProps = {
  theme: baseTheme,
};

export default SidebarStyle;
