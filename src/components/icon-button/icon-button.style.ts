import styled, { css } from "styled-components";
import { space } from "styled-system";

import StyledIcon from "../icon/icon.style";
import { baseTheme } from "../../style/themes";
import addFocusStyling from "../../style/utils/add-focus-styling";

const oldFocusStyling = `
  background-color: transparent;
  outline: solid 3px var(--colorsSemanticFocus500);
  z-index: 1;
`;

const StyledIconButton = styled.button.attrs({ type: "button" })`
  ${({ disabled }: { disabled?: boolean }) => css`
    && {
      ${space}
    }
    background: transparent;
    border: none;
    border-radius: var(--borderRadius050);

    &:focus {
      ${({ theme }) =>
        `${
          !theme.focusRedesignOptOut
            ? addFocusStyling()
            : /* istanbul ignore next */ oldFocusStyling
        }`}
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
