import styled, { css } from "styled-components";
import { StyledButtonToggleLabel } from "../button-toggle/button-toggle.style";
import ValidationIconStyle from "../../__internal__/validations/validation-icon.style";

const ButtonToggleGroupStyle = styled.div`
  display: flex;

  ${({ inputWidth }) =>
    inputWidth &&
    css`
      width: ${`${inputWidth}%`};
    `};

  ${StyledButtonToggleLabel} {
    ${({ info }) =>
      info &&
      css`
        border-color: var(--colorsActionMinor500);
      `};
    ${({ warning }) =>
      warning &&
      css`
        border-color: var(--colorsSemanticCaution500);
      `}
    ${({ error }) =>
      error &&
      css`
        box-shadow: inset 1px 1px 0 var(--colorsSemanticNegative500),
          inset -1px -1px 0 var(--colorsSemanticNegative500);
        border-color: var(--colorsSemanticNegative500);
      `}
  }

  ${ValidationIconStyle} {
    margin-left: 4px;
  }
`;

export default ButtonToggleGroupStyle;
