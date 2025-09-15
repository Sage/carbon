import styled, { css } from "styled-components";

import { NewValidationContextProps } from "../../components/carbon-provider/__internal__/new-validation.context";

export interface StyledLabelProps {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** Flag to determine whether to use colours for dark backgrounds */
  isDarkBackground?: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
  ${({ isDarkBackground }) => css`
    color: ${isDarkBackground
      ? "var(--colorsUtilityYang100)"
      : "var(--colorsUtilityYin090)"};
  `}
  display: block;
  font-weight: var(--fontWeights500);

  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        color: var(--colorsSemanticNegative500);
        font-weight: var(--fontWeights500);
        margin-left: var(--spacing050);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--colorsUtilityYin030);
    `}
`;

export interface StyledLabelContainerProps extends NewValidationContextProps {
  /** Label alignment */
  align?: "left" | "right";
  /** When true, label is placed in line an input */
  inline?: boolean;
  /** Padding right, integer multiplied by base spacing constant (8) */
  pr?: 1 | 2;
  /** Padding left, integer multiplied by base spacing constant (8) */
  pl?: 1 | 2;
  /** Label width */
  width?: number;
}

export const StyledLabelContainer = styled.div<StyledLabelContainerProps>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${({ align }) => css`
    justify-content: ${align !== "right" ? "flex-start" : "flex-end"};
  `}

  :has([data-element="input-hint"]) {
    flex-direction: column;
    align-items: flex-start;
  }

  ${({ inline, validationRedesignOptIn, pr, pl, width }) =>
    inline &&
    css`
      box-sizing: border-box;
      margin-bottom: 0;

      ${validationRedesignOptIn &&
      css`
        align-items: flex-end !important;
        justify-content: flex-start;
        margin-top: 5px;
      `}

      ${pr &&
      css`
        padding-right: var(${pr === 1 ? "--spacing100" : "--spacing200"});
      `};
      ${pl &&
      css`
        padding-left: var(${pl === 1 ? "--spacing100" : "--spacing200"});
      `};
      width: ${width}%;
    `}
`;

export default StyledLabel;
