import styled, { css } from "styled-components";
import { margin } from "styled-system";

import StyledInput from "../../__internal__/input/input.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import BaseTheme from "../../style/themes/base";

export const MIN_HEIGHT = 64;

const StyledTextarea = styled.div`
  ${margin};

  ${StyledInput} {
    box-sizing: border-box;
    resize: none;
    min-height: ${MIN_HEIGHT}px;
    padding: var(--spacing150) var(--spacing200);

    ${({ hasIcon }) => hasIcon && "padding-right: var(--spacing500)"}
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

StyledTextarea.defaultProps = {
  theme: BaseTheme,
};

export default StyledTextarea;
