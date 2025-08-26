import styled, { css } from "styled-components";
import { margin } from "styled-system";

import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import CheckboxStyle from "../checkbox/checkbox.style";

export interface StyledFieldsetProps {
  newValidation?: boolean;
}

const FieldsetStyle = styled.fieldset.attrs(
  applyBaseTheme,
)<StyledFieldsetProps>`
  margin: 0;
  margin-bottom: var(--fieldSpacing);
  ${margin}
  border: none;
  padding: 0;

  ${({ newValidation }) =>
    !newValidation &&
    css`
      & * {
        --fieldSpacing: 0;
      }

      &&&& ${FormFieldStyle} {
        margin-top: 0;
        margin-bottom: -1px;
      }

      & ${CheckboxStyle} {
        padding-top: 8px;
        padding-bottom: 8px;
      }
    `}
`;

export interface StyledLegendProps {
  /** Flag to configure fields as mandatory. */
  isRequired?: boolean;
}

const StyledLegend = styled.legend<StyledLegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing250);
  font-size: var(--fontSizes400);
  font-weight: var(--fontWeights500);
  color: var(--colorsUtilityYin090);
  line-height: 24px;

  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        line-height: 24px;
        color: var(--colorsSemanticNegative500);
        font-weight: var(--fontWeights500);
        margin-left: var(--spacing100);
        position: relative;
        top: 1px;
        left: -4px;
      }
    `}
`;

export { FieldsetStyle, StyledLegend };
