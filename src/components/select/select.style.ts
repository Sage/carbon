import styled, { css } from "styled-components";
import { margin } from "styled-system";

import InputPresentationStyle from "../../__internal__/input/input-presentation.style";
import StyledInput from "../../__internal__/input/input.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { SimpleSelectProps } from "./simple-select";

export interface StyledSelectProps
  extends Pick<SimpleSelectProps, "disabled" | "readOnly" | "transparent"> {
  hasTextCursor?: boolean;
  isOpen: boolean;
  size?: string;
}

const StyledSelect = styled.div
  .attrs(applyBaseTheme)
  .attrs({ size: "medium" })<StyledSelectProps>`
  ${({ hasTextCursor, disabled, readOnly, theme, transparent, isOpen }) => css`
    margin-bottom: var(--fieldSpacing);
    ${margin}

    position: relative;

    ${StyledInput} {
      cursor: text;

      ${disabled &&
      css`
        cursor: not-allowed;
        color: var(--colorsUtilityYin030);
        text-shadow: none;
      `}

      ${readOnly &&
      css`
        cursor: ${hasTextCursor ? "text" : "default"};
        color: var(--colorsActionMinorYin090);
        text-shadow: none;
      `}
    }

    ${InputPresentationStyle} {
      cursor: ${hasTextCursor ? "text" : "pointer"};
      padding-right: 0;

      ${isOpen &&
      css`
        z-index: ${theme.zIndex.aboveAll};
      `}

      ${disabled &&
      css`
        cursor: not-allowed;
      `}

      ${readOnly &&
      css`
        cursor: ${hasTextCursor ? "text" : "default"};
      `}
    }

    ${InputIconToggleStyle} {
      margin-right: 0;
    }

    ${transparent &&
    css`
      ${InputPresentationStyle} {
        background: transparent;
        border: none;
      }

      ${InputIconToggleStyle} {
        margin-left: 0;
      }
    `}

    ${!hasTextCursor &&
    css`
      ${StyledInput} {
        position: absolute;
        width: inherit;
        opacity: 0;
        padding: 0;
      }
    `}
  `}
`;

export default StyledSelect;
