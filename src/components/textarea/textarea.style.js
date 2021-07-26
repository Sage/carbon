import styled, { css } from "styled-components";
import { margin } from "styled-system";

import StyledInput from "../../__internal__/input/input.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import BaseTheme from "../../style/themes/base";

const StyledTextarea = styled.div`
  ${margin};

  ${StyledInput} {
    resize: none;
    min-height: 40px;
    margin-top: 5px;
    margin-bottom: 5px;
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
  }
`;

StyledTextarea.defaultProps = {
  theme: BaseTheme,
};

export default StyledTextarea;
