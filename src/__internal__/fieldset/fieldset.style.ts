import styled, { css } from "styled-components";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";

type StyledFieldsetProps = {
  width?: string;
};

const StyledFieldset = styled.fieldset<StyledFieldsetProps>`
  margin: 0;
  margin-bottom: var(--fieldSpacing);
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
  optionalLabel?: string;
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
        font-weight: var(--fontWeights500);
        margin-left: var(--spacing050);
        position: relative;
        top: 1px;
      }
    `}

  ${({ isOptional, optionalLabel }) =>
    isOptional &&
    css`
      ::after {
        content: "(${optionalLabel})";
        color: var(--colorsUtilityYin055);
        font-weight: var(--fontWeights400);
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

export type StyledLegendProps = {
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
  font-weight: var(--fontWeights500);
  color: var(--colorsUtilityYin090);

  ${({ align, inline }) =>
    align &&
    css`
      text-align: ${align};
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};

      ${!inline &&
      css`
        width: -moz-available;
      `}
    `};

  ${({ inline, width, rightPadding }) =>
    inline &&
    css`
      float: left;
      box-sizing: border-box;
      margin: 0;
      ${width && `width: ${width}%`};
      padding-right: ${rightPadding === 1
        ? "var(--spacing100)"
        : "var(--spacing200)"};
    `}
  ${margin}
`;

const StyledIconWrapper = styled.div`
  margin-left: var(--spacing050);
`;

export { StyledFieldset, StyledLegend, StyledLegendContent, StyledIconWrapper };
