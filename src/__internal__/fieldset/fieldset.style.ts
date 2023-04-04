import styled, { css } from "styled-components";
import { margin } from "styled-system";
import BaseTheme from "../../style/themes/base";

const StyledFieldset = styled.fieldset`
  margin: 0;
  ${margin}
  border: none;
  padding: 0;
  min-width: 0;
  min-inline-size: 0;
`;

StyledFieldset.defaultProps = {
  theme: BaseTheme,
};

type StyledLegendContentProps = {
  isRequired?: boolean;
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
        margin-left: var(--spacing100);
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
  margin-bottom: 8px;
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
`;

export { StyledFieldset, StyledLegend, StyledLegendContent };
