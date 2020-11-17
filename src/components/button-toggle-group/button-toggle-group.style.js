import styled, { css } from "styled-components";
import { StyledButtonToggleLabel } from "../button-toggle/button-toggle.style";
import ValidationIconStyle from "../validations/validation-icon.style";
import baseTheme from "../../style/themes/base";

const ButtonToggleGroupStyle = styled.div`
  display: flex;

  ${({ inputWidth }) =>
    inputWidth &&
    css`
      width: ${`${inputWidth}%`};
    `};

  ${StyledButtonToggleLabel} {
    ${({ theme, info }) =>
      info &&
      css`
        border-color: ${theme.colors.info};
      `};
    ${({ theme, warning }) =>
      warning &&
      css`
        border-color: ${theme.colors.warning};
      `}
    ${({ theme, error }) =>
      error &&
      css`
        box-shadow: inset 1px 1px 0 ${theme.colors.error},
          inset -1px -1px 0 ${theme.colors.error};
        border-color: ${theme.colors.error};
      `}
  }

  ${ValidationIconStyle} {
    margin-left: 4px;
  }
`;

ButtonToggleGroupStyle.defaultProps = {
  theme: baseTheme,
};

export default ButtonToggleGroupStyle;
