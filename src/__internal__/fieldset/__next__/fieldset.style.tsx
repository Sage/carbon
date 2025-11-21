import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import StyledHintText from "../../hint-text/hint-text.style";
import StyledValidationMessage from "../../validation-message/validation-message.style";

type StyledFieldsetProps = {
  validationMessagePositionTop?: boolean;
  size: "small" | "medium" | "large";
};

const sizeMap = {
  small: {
    contentMargin: "var(--global-space-comp-xs, 4px)",
    validationMargin: "var(--global-space-comp-xs, 4px)",
    childrenGap: "var(--global-space-comp-s, 8px)",
  },
  medium: {
    contentMargin: "var(--global-space-comp-s, 8px)",
    validationMargin: "var(--global-space-comp-s, 8px)",
    childrenGap: "var(--global-space-comp-m, 12px)",
  },
  large: {
    contentMargin: "var(--global-space-comp-m, 12px)",
    validationMargin: "var(--global-space-comp-s, 8px)",
    childrenGap: "var(--global-space-comp-l, 16px)",
  },
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
  width: fit-content;

  // TODO: Remove once HintText and ValidationMessage have been updated to new designs
  ${StyledHintText} {
    line-height: 150%;
  }

  ${StyledValidationMessage} {
    ${({ validationMessagePositionTop, size }) => css`
      line-height: 150%;
      margin: 0;
      margin-${validationMessagePositionTop ? "bottom" : "top"}: ${sizeMap[size].validationMargin};
    `}
  }
`;

export type StyledLegendProps = {
  align?: "left" | "right";
  isRequired?: boolean;
  isDisabled?: boolean;
  isLarge?: boolean;
};

export const StyledLegend = styled.legend<StyledLegendProps>`
  display: flex;
  align-items: center;
  padding: 0;
  line-height: 150%;
  font-weight: 500;
  font-size: var(--core-fontSize-static-large-step0, 14px);
  color: var(--input-labelset-label-default, rgba(0, 0, 0, 0.95));

  ${({ isLarge }) =>
    isLarge &&
    css`
      font-size: var(--core-fontSize-static-large-step1, 16px);
    `}

  ${({ isRequired }) =>
    isRequired &&
    css`
      ::after {
        content: "*";
        line-height: 150%;
        color: var(--input-labelset-label-required, #db004e);
        font-weight: 500;
        margin-left: var(--global-space-comp-xs, 4px);
        position: relative;
      }
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--input-labelset-label-disabled, rgba(0, 0, 0, 0.42));
      ::after {
        color: var(--input-labelset-label-disabled, rgba(0, 0, 0, 0.42));
      }
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
      justify-content: ${align === "right" ? "flex-end" : "flex-start"};
    `};
`;

export const StyledFieldsetContentWrapper = styled.div<{
  size: "small" | "medium" | "large";
  validationMessagePositionTop?: boolean;
}>`
  position: relative;

  ${({ size }) => css`
    margin-top: ${sizeMap[size].contentMargin};
  `};
`;

export const StyledFieldsetContent = styled.div<{
  inline?: boolean;
  size: "small" | "medium" | "large";
}>`
  ${({ inline, size }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[size].childrenGap};

    ${inline &&
    css`
      flex-direction: row;
      gap: 12px var(--global-space-comp-l, 16px);
    `}
  `};
`;
