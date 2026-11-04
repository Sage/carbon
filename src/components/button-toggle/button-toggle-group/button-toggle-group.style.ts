import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";

const sizeMap = {
  small: {
    gap: "var(--global-space-comp-xs)",
    borderRadius: "var(--global-radius-action-l)",
  },
  medium: {
    gap: "var(--global-space-comp-s)",
    borderRadius: "var(--global-radius-action-xl)",
  },
  large: {
    gap: "var(--global-space-comp-m)",
    borderRadius: "var(--global-radius-action-2-xl)",
  },
};

interface StyledButtonToggle {
  $size: "small" | "medium" | "large";
  $fullWidth?: boolean;
  $width?: number | string;
}

export const StyledButtonToggleGroup = styled.div.attrs(
  applyBaseTheme,
)<StyledButtonToggle>`
  ${({ $size, $fullWidth, $width }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[$size].gap};

    ${$fullWidth &&
    css`
      width: 100%;
    `}

    ${$width &&
    css`
      width: ${$width}%;
    `}
  `}

  ${margin}
`;

export const StyledLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface StyledButtonToggleWrapper {
  $size: "small" | "medium" | "large";
  $isDisabled?: boolean;
  $fullWidth?: boolean;
}

export const StyledButtonToggleWrapper = styled.div<StyledButtonToggleWrapper>`
  ${({ $size, $isDisabled, $fullWidth }) => css`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: var(--global-space-comp-xs);
    align-items: center;
    gap: var(--global-space-comp-s);

    ${!$fullWidth &&
    css`
      width: fit-content;
    `}

    border-radius: ${sizeMap[$size].borderRadius};
    border: var(--global-borderwidth-xs) solid
      var(--button-typical-toggle-border-default);

    ${$isDisabled &&
    css`
      border-color: var(--button-typical-toggle-border-disabled);
    `}
  `}
`;

// matches the border radius of the ButtonToggle rendered for each group size
const indicatorRadiusMap = {
  small: "12px",
  medium: "var(--global-radius-action-l)",
  large: "var(--global-radius-action-xl)",
};

interface StyledActiveIndicatorProps {
  $size: "small" | "medium" | "large";
  $isDisabled?: boolean;
  $rect: { left: number; top: number; width: number; height: number };
}

// position is applied inline to avoid generating a new class for every measured value
export const StyledActiveIndicator = styled.span.attrs<StyledActiveIndicatorProps>(
  ({ $rect }) => ({ style: $rect }),
)<StyledActiveIndicatorProps>`
  ${({ $size, $isDisabled }) => css`
    position: absolute;
    z-index: 0;
    pointer-events: none;
    border-radius: ${indicatorRadiusMap[$size]};
    background: ${$isDisabled
      ? "var(--button-typical-toggle-bg-active-disabled)"
      : "var(--button-typical-toggle-bg-active)"};
    transition:
      left 600ms cubic-bezier(0.22, 1, 0.36, 1),
      width 600ms cubic-bezier(0.22, 1, 0.36, 1) !important;

    @media (prefers-reduced-motion: reduce) {
      transition: none !important;
    }
  `}
`;
