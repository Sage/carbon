import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";

const StyledIconButton = styled.button.attrs({ type: "button" })`
  ${({ theme, disabled }) => css`
    ${margin}
    background: transparent;
    border: none;
    padding: 0;

    &:focus {
      color: ${theme.text.color};
      background-color: transparent;
      outline: solid 3px ${theme.colors.focus};
      z-index: 1;
    }

    &:hover {
      cursor: ${!disabled ? "pointer" : "not-allowed"};
    }

    &::-moz-focus-inner {
      border: none;
    }

    ${StyledIcon} {
      ${disabled && `color: ${theme.icon.disabled}`};
      position: relative;

      &:focus {
        border: none;
      }
    }
  `}
`;

StyledIconButton.defaultProps = {
  theme: baseTheme,
};

export default StyledIconButton;
