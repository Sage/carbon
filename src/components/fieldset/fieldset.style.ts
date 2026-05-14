import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const sizeMap = {
  small: {
    labelGap: "var(--global-space-comp-xs)",
    validationGap: "var(--global-space-comp-xs)",
    childrenGap: "var(--global-space-comp-m)",
    legendFont: "var(--global-font-static-comp-medium-s)",
    regularLabelFont: "var(--global-font-static-comp-regular-s)",
    boldLabelFont: "var(--global-font-static-comp-medium-s)",
  },
  medium: {
    labelGap: "var(--global-space-comp-s)",
    validationGap: "var(--global-space-comp-s)",
    childrenGap: "var(--global-space-comp-l)",
    legendFont: "var(--global-font-static-comp-medium-m)",
    regularLabelFont: "var(--global-font-static-comp-regular-m)",
    boldLabelFont: "var(--global-font-static-comp-medium-m)",
  },
  large: {
    labelGap: "var(--global-space-comp-m)",
    validationGap: "var(--global-space-comp-s)",
    childrenGap: "var(--global-space-comp-xl)",
    legendFont: "var(--global-font-static-comp-medium-l)",
    regularLabelFont: "var(--global-font-static-comp-regular-l)",
    boldLabelFont: "var(--global-font-static-comp-medium-l)",
  },
};

export type StyledFieldsetProps = {
  $size: "small" | "medium" | "large";
};

export const StyledFieldset = styled.fieldset.attrs(
  applyBaseTheme,
)<StyledFieldsetProps>`
  ${({ $size }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[$size].labelGap};
    border: none;
    padding: 0;
    min-width: 0;
    min-inline-size: 0;
    margin: 0;
    margin-bottom: var(--fieldSpacing);
    ${margin}

    & * {
      --fieldSpacing: 0;
    }
  `};
`;

export type StyledLegendProps = {
  $isRequired?: boolean;
  $size: "small" | "medium" | "large";
};

export const StyledLegend = styled.legend<StyledLegendProps>`
  ${({ $isRequired, $size }) => css`
    display: flex;
    align-items: center;
    padding: 0;
    font: ${sizeMap[$size].legendFont};

    ${$isRequired &&
    css`
      ::after {
        content: "*";
        color: var(--input-labelset-label-required);
        font: ${sizeMap[$size].legendFont};
        margin-left: var(--global-space-comp-xs);
      }
    `}
  `};
`;

export const StyledFieldsetContentWrapper = styled.div<StyledFieldsetProps>`
  ${({ $size }) => css`
    display: flex;
    flex-direction: column;
    position: relative;
    gap: ${sizeMap[$size].validationGap};
  `};
`;

export type StyledFieldsetContentProps = {
  $orientation?: "horizontal" | "vertical";
  $size: "small" | "medium" | "large";
  $labelWeight?: "regular" | "bold";
};

export const StyledFieldsetContent = styled.div<StyledFieldsetContentProps>`
  ${({ $orientation, $size, $labelWeight }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[$size].childrenGap};

    ${$orientation === "horizontal" &&
    css`
      flex-direction: row;
      flex-wrap: wrap;
    `}

    .label {
      font: ${sizeMap[$size].regularLabelFont};
    }

    ${$labelWeight === "bold" &&
    css`
      .label {
        font: ${sizeMap[$size].boldLabelFont};
      }
    `}
  `};
`;
