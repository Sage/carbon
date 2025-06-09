import styled, { css } from "styled-components";
import { space } from "styled-system";

import StyledIcon from "../icon/icon.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

const StyledIconButton = styled.button
  .attrs(applyBaseTheme)
  .attrs({ type: "button" })`
  ${({ disabled }: { disabled?: boolean }) => css`
    && {
      ${space}
    }
    background: transparent;
    border: none;
    border-radius: var(--borderRadius050);

    &:focus {
      ${addFocusStyling()}
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

export default StyledIconButton;
