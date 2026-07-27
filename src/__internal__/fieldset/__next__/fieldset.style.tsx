import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";

const sizeMap = {
  small: {
    contentMargin: "var(--global-space-comp-xs)",
    validationGap: "var(--global-space-comp-xs)",
    legendFont: "var(--global-font-static-comp-medium-s)",
  },
  medium: {
    contentMargin: "var(--global-space-comp-s)",
    validationGap: "var(--global-space-comp-s)",
    legendFont: "var(--global-font-static-comp-medium-m)",
  },
  large: {
    contentMargin: "var(--global-space-comp-m)",
    validationGap: "var(--global-space-comp-s)",
    legendFont: "var(--global-font-static-comp-medium-l)",
  },
};

export const StyledFieldset = styled.fieldset.attrs(applyBaseTheme)`
  margin: 0;
  margin-bottom: var(--fieldSpacing);
  ${margin}

  border: none;
  padding: 0;
  min-width: 0;
  min-inline-size: 0;
`;

export type StyledLegendProps = {
  $isRequired?: boolean;
  $isDisabled?: boolean;
  $size: "small" | "medium" | "large";
};

export const StyledLegend = styled.legend<StyledLegendProps>`
  ${({ $isRequired, $isDisabled, $size }) => css`
    display: flex;
    align-items: center;
    padding: 0;
    font: ${sizeMap[$size].legendFont};
    color: var(--input-labelset-label-default);

    ${$isRequired &&
    css`
      ::after {
        content: "*";
        font: ${sizeMap[$size].legendFont};
        color: var(--input-labelset-label-required);
        margin-left: var(--global-space-comp-xs);
      }
    `}

    ${$isDisabled &&
    css`
      color: var(--input-labelset-label-disabled);
      ::after {
        color: var(--input-labelset-label-disabled);
      }
    `}
  `};
`;

export const StyledFieldsetContentWrapper = styled.div<{
  $size: "small" | "medium" | "large";
  $hasLegend?: boolean;
}>`
  ${({ $size, $hasLegend }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: ${sizeMap[$size].validationGap};

    ${$hasLegend &&
    css`
      margin-top: ${sizeMap[$size].contentMargin};
    `}
  `};
`;
