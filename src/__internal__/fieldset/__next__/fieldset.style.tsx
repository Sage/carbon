import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import StyledValidationMessage from "../../validation-message/validation-message.style";

const sizeMap = {
  small: {
    contentMargin: "var(--global-space-comp-xs)",
    validationMargin: "var(--global-space-comp-xs)",
  },
  medium: {
    contentMargin: "var(--global-space-comp-s)",
    validationMargin: "var(--global-space-comp-s)",
  },
  large: {
    contentMargin: "var(--global-space-comp-m)",
    validationMargin: "var(--global-space-comp-s)",
  },
};

type StyledFieldsetProps = {
  $validationMessagePositionTop?: boolean;
  $size: "small" | "medium" | "large";
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

  // TODO: Remove once spacing is updated in ValidationMessage
  ${StyledValidationMessage} {
    ${({ $validationMessagePositionTop, $size }) => css`
      margin: 0;
      margin-${$validationMessagePositionTop ? "bottom" : "top"}: ${sizeMap[$size].validationMargin};
    `}
  }
`;

export type StyledLegendProps = {
  $align?: "left" | "right";
  $isRequired?: boolean;
  $isDisabled?: boolean;
  $isLarge?: boolean;
};

export const StyledLegend = styled.legend<StyledLegendProps>`
  display: flex;
  align-items: center;
  padding: 0;
  font: var(--global-font-static-comp-medium-s);
  color: var(--input-labelset-label-default);

  ${({ $isLarge, $isDisabled, $isRequired, $align }) => css`
    ${$isLarge &&
    css`
      font: var(--global-font-static-comp-medium-l);
    `}

    ${$isRequired &&
    css`
      ::after {
        content: "*";
        font: var(--global-font-static-comp-medium-s);
        color: var(--input-labelset-label-required);
        margin-left: var(--global-space-comp-xs);
        position: relative;

        ${$isLarge &&
        css`
          font: var(--global-font-static-comp-medium-l);
        `}
      }
    `}

    ${$isDisabled &&
    css`
      color: var(--input-labelset-label-disabled);
      ::after {
        color: var(--input-labelset-label-disabled);
      }
    `}

    ${$align &&
    css`
      text-align: ${$align};
      justify-content: ${$align === "right" ? "flex-end" : "flex-start"};
    `}
  `}
`;

export const StyledFieldsetContentWrapper = styled.div<{
  $size: "small" | "medium" | "large";
}>`
  position: relative;

  ${({ $size }) => css`
    margin-top: ${sizeMap[$size].contentMargin};
  `};
`;
