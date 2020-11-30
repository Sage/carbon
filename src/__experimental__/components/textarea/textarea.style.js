import styled, { css } from "styled-components";
import StyledInput from "../input/input.style";
import { StyledLabelContainer } from "../label/label.style";
import InputIconToggleStyle from "../input-icon-toggle/input-icon-toggle.style";

const StyledTextarea = styled.div`
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

export default StyledTextarea;
