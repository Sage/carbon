import styled, { css } from "styled-components";

export interface StyledLabelProps {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
  color: var(--colorsUtilityYin090);
  display: block;
  font-weight: 600; //TODO: (tokens) use token var(--fontWeights500)

  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        color: var(--colorsSemanticNegative500);
        font-weight: 700;
        margin-left: var(--spacing050);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--colorsUtilityYin030);
    `}
`;

export interface StyledLabelContainerProps {
  /** Label alignment */
  align?: "left" | "right";
  /** When true, label is placed in line an input */
  inline?: boolean;
  /** Flag to configure component as optional in Form */
  optional?: boolean;
  /** Padding right, integer multiplied by base spacing constant (8) */
  pr?: 1 | 2;
  /** Padding left, integer multiplied by base spacing constant (8) */
  pl?: 1 | 2;
  /** Label width */
  width?: number;
}

const DEFAULT_CONTAINER_WIDTH = 30;

export const StyledLabelContainer = styled.div<StyledLabelContainerProps>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${({ align, inline, pr, pl, width }) =>
    inline &&
    css`
      box-sizing: border-box;
      margin-bottom: 0;
      ${pr &&
      css`
        padding-right: var(${pr === 1 ? "--spacing100" : "--spacing200"});
      `};
      ${pl &&
      css`
        padding-left: var(${pl === 1 ? "--spacing100" : "--spacing200"});
      `};
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
      width: ${width || DEFAULT_CONTAINER_WIDTH}%;
    `}

  ${({ optional }) =>
    optional &&
    css`
      ::after {
        content: "(optional)";
        font-weight: 350; //TODO: (tokens) use token var(--fontWeights400)
        margin-left: var(--spacing050);
        color: var(--colorsUtilityYin055);
      }
    `}
`;

export default StyledLabel;
