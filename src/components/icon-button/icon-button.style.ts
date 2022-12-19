import styled, { css } from "styled-components";
import { space } from "styled-system";

import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";

const StyledIconButton = styled.button.attrs({ type: "button" })`
  ${({ disabled }: { disabled?: boolean }) => css`
    && {
      ${space}
    }
    background: transparent;
    border: none;

    &:focus {
      background-color: transparent;
      outline: solid 3px var(--colorsSemanticFocus500);
      z-index: 1;
    }

    &:hover {
      cursor: ${!disabled ? "pointer" : "not-allowed"};
    }

    &::-moz-focus-inner {
      border: none;
    }

    ${StyledIcon} {
      ${disabled &&
      css`
        color: var(--colorsActionMinorYin030);
        background-color: transparent;
      `};
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
