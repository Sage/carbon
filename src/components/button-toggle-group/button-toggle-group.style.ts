import styled, { css } from "styled-components";
import { StyledButtonToggleLabel } from "../button-toggle/button-toggle.style";
import ValidationIconStyle from "../../__internal__/validations/validation-icon.style";

import { ButtonToggleGroupProps } from ".";
import { ValidationProps } from "../../__internal__/validations";

type StyledButtonToggleGroupProps = ValidationProps &
  Pick<ButtonToggleGroupProps, "inputWidth">;

const StyledButtonToggleGroup = styled.div<StyledButtonToggleGroupProps>`
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
        border-color: var(--colorsSemanticInfo500);
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

export default StyledButtonToggleGroup;
