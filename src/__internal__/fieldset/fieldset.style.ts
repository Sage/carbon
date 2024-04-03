import styled, { css } from "styled-components";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";

type StyledFieldsetProps = {
  width?: string;
};

const StyledFieldset = styled.fieldset<StyledFieldsetProps>`
  margin: 0;
  ${margin}
  border: none;
  padding: 0;
  min-width: 0;
  min-inline-size: 0;
  ${({ width }) => width && `width: ${width};`}
`;

StyledFieldset.defaultProps = {
  theme: BaseTheme,
};

type StyledLegendContentProps = {
  isRequired?: boolean;
  isOptional?: boolean;
  isDisabled?: boolean;
};
const StyledLegendContent = styled.span<StyledLegendContentProps>`
  display: flex;
  align-items: center;
  line-height: 24px;
  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        line-height: 24px;
        color: var(--colorsSemanticNegative500);
        font-weight: 700;
        margin-left: var(--spacing050);
        position: relative;
        top: 1px;
      }
    `}

  ${({ isOptional }) =>
    isOptional &&
    css`
      ::after {
        content: "(optional)";
        color: var(--colorsUtilityYin055);
        font-weight: 350; //TODO: (tokens) use token var(--fontWeights400) - FE-6022
        margin-left: var(--spacing050);
      }
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--colorsUtilityYin030);
      ::after {
        color: var(--colorsUtilityYin030);
      }
    `}
`;

type StyledLegendProps = {
  inline?: boolean;
  width?: number;
  align?: "left" | "right";
  rightPadding?: 1 | 2;
};

const StyledLegend = styled.legend<StyledLegendProps>`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing100);
  padding: 0;
  font-weight: 600;
  ${({ inline, width, align, rightPadding }) =>
    inline &&
    css`
      float: left;
      box-sizing: border-box;
      margin: 0;
      ${width && `width: ${width}%`};
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
      padding-right: ${rightPadding === 1
        ? "var(--spacing100)"
        : "var(--spacing200)"};
    `}
  ${margin}
`;

export { StyledFieldset, StyledLegend, StyledLegendContent };
