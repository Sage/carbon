import { margin } from "../../../style/utils/spacing";
import styled, { css } from "styled-components";

import applyBaseTheme from "../../../style/themes/apply-base-theme";
import requiredIndicatorStyles from "../../../style/utils/required-indicator";

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
  $isReadOnly?: boolean;
  $size: "small" | "medium" | "large";
};

export const StyledLegend = styled.legend<StyledLegendProps>`
  ${({ $isRequired, $isDisabled, $isReadOnly, $size }) => css`
    padding: 0;
    font: ${sizeMap[$size].legendFont};
    color: var(--input-labelset-label-default);

    ${$isRequired &&
    requiredIndicatorStyles({
      font: sizeMap[$size].legendFont,
      disabled: $isDisabled,
    })}

    ${$isReadOnly &&
    css`
      color: var(--input-labelset-label-read-only);
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
