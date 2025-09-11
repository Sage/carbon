import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

type StyledFieldsetProps = {
  width?: string;
};

export const StyledFieldset = styled.fieldset.attrs(
  applyBaseTheme,
)<StyledFieldsetProps>`
  margin: 0;
  margin-bottom: var(--fieldSpacing);
  ${margin}
  border: none;
  padding: 0;
  min-width: 0;
  min-inline-size: 0;
  ${({ width }) => width && `width: ${width};`}
`;

export type StyledLegendProps = {
  inline?: boolean;
  width?: number;
  align?: "left" | "right";
  rightPadding?: 1 | 2;
  isRequired?: boolean;
  isDisabled?: boolean;
};

export const StyledLegend = styled.legend<StyledLegendProps>`
  display: flex;
  align-items: center;
  padding: 0;
  line-height: 24px;
  font-weight: var(--fontWeights500);
  color: var(--colorsUtilityYin090);

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

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--colorsUtilityYin030);
      ::after {
        color: var(--colorsUtilityYin030);
      }
    `}

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

export const StyledIconWrapper = styled.div`
  margin-left: var(--spacing050);
`;
