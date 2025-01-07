import styled, { css } from "styled-components";
import StyledIconSpan from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import StyledInput from "../../__internal__/input/input.style";
import Fieldset from "../../__internal__/fieldset";
import { StyledLegend } from "../../__internal__/fieldset/fieldset.style";

interface StyledDateFieldProps {
  isYearInput?: boolean;
  hasValidationIconInField: boolean;
  size?: "small" | "medium" | "large";
}

const inputWidth = {
  small: "44px",
  medium: "50px",
  large: "64px",
};

const inputWidthYear = (hasValidationIconInField: boolean) => ({
  small: hasValidationIconInField ? "75px" : "66px",
  medium: "80px",
  large: "84px",
});

export const StyledNumeralDate = styled.div<{ name?: string }>`
  display: inline-flex;
  gap: var(--spacing150);
`;

export const StyledDateField = styled.div<StyledDateFieldProps>`
  ${({ isYearInput, hasValidationIconInField, size }) => css`
    ${size &&
    css`
      ${StyledInputPresentation} {
        position: relative;
        min-width: ${isYearInput
          ? inputWidthYear(hasValidationIconInField)[size]
          : inputWidth[size]};
      }
    `}

    ${StyledInput} {
      text-align: center;
      ${hasValidationIconInField && "padding-right: 0"}
    }

    ${StyledIconSpan} {
      width: var(--spacing400);
      z-index: 999;
    }

    label {
      font-weight: var(--fontWeights400);
    }
  `}
`;

export const StyledFieldset = styled(Fieldset)`
  ${({ inline }) => css`
    ${inline &&
    css`
      display: flex;
      align-items: center;
    `}
  `}

  ${StyledLegend} {
    margin-bottom: 0;
  }
`;
