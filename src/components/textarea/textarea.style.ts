import styled, { css } from "styled-components";
import { margin } from "styled-system";

import StyledInput from "../../__internal__/input/input.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { TextareaProps } from "./textarea.component";

export const DEFAULT_MIN_HEIGHT = 64;

export interface StyledTextAreaProps extends Pick<TextareaProps, "minHeight"> {
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** When true, adjusts padding for icon */
  hasIcon?: boolean;
}

const StyledTextarea = styled.div.attrs(applyBaseTheme)<StyledTextAreaProps>`
  margin-bottom: var(--fieldSpacing);
  flex-grow: 1;

  ${margin};

  ${StyledInput} {
    box-sizing: border-box;
    resize: none;
    ${({ minHeight }) => `min-height: ${minHeight || DEFAULT_MIN_HEIGHT}px;`}
    padding: var(--spacing150) var(--spacing200);

    ${({ hasIcon }) => hasIcon && "padding-right: var(--spacing500);"}
  }

  ${({ labelInline }) =>
    labelInline &&
    css`
      ${StyledLabelContainer} {
        align-items: flex-start;
        padding-top: 6px;
      }
    `}

  ${InputIconToggleStyle} {
    height: 40px;
    position: absolute;
    height: 100%;
    top: 0px;
    right: 4px;
  }
`;

export default StyledTextarea;
