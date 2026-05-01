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

interface StyledButtonToggleWrapper {
  $size: "small" | "medium" | "large";
  $isDisabled?: boolean;
  $fullWidth?: boolean;
}

export const StyledButtonToggleWrapper = styled.div<StyledButtonToggleWrapper>`
  ${({ $size, $isDisabled, $fullWidth }) => css`
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
