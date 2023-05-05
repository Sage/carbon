import styled, { css } from "styled-components";
import {
  StyledButtonToggleLabel,
  StyledButtonToggle,
} from "../button-toggle/button-toggle.style";
import ValidationIconStyle from "../../__internal__/validations/validation-icon.style";

import { ButtonToggleGroupProps } from ".";
import { ValidationProps } from "../../__internal__/validations";

type StyledButtonToggleGroupProps = ValidationProps &
  Pick<ButtonToggleGroupProps, "inputWidth" | "fullWidth">;

const StyledButtonToggleGroup = styled.div<StyledButtonToggleGroupProps>`
  display: flex;

  ${StyledButtonToggleLabel}:not(:first-of-type):not(:last-of-type) {
    border-radius: var(--borderRadius000);
  }

  ${StyledButtonToggle}:first-of-type ${StyledButtonToggleLabel} {
    border-top-left-radius: var(--borderRadius400);
    border-bottom-left-radius: var(--borderRadius400);
    border-top-right-radius: var(--borderRadius000);
    border-bottom-right-radius: var(--borderRadius000);
  }

  ${StyledButtonToggle}:last-of-type ${StyledButtonToggleLabel} {
    border-top-left-radius: var(--borderRadius000);
    border-bottom-left-radius: var(--borderRadius000);
    border-top-right-radius: var(--borderRadius400);
    border-bottom-right-radius: var(--borderRadius400);
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      ${StyledButtonToggleLabel} {
        width: 100%;
      }
      ${StyledButtonToggle} {
        flex: auto;
      }
    `}

  ${({ inputWidth }) =>
    inputWidth &&
    css`
      width: ${`${inputWidth}%`};
    `}

  ${StyledButtonToggleLabel} {
    ${({ info }) =>
      info &&
      css`
        border-color: var(--colorsSemanticInfo500);
      `}
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
