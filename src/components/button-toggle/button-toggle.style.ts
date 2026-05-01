import styled, { css } from "styled-components";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

const sizeMap = {
  small: {
    size: "var(--global-size-xs)", // height & width
    padding: "var(--global-space-comp-2-xs) var(--global-space-comp-s)",
  },
  medium: {
    size: "var(--global-size-s)",
    padding: "var(--global-space-comp-xs) var(--global-space-comp-m)",
  },
  large: {
    size: "var(--global-size-m)",
    padding: "var(--global-space-comp-s) var(--global-space-comp-l)",
  },
};

interface StyledButtonToggleProps {
  disabled?: boolean;
  $size: "small" | "medium" | "large";
  $active?: boolean;
  $iconOnly?: boolean;
  $fullWidth?: boolean;
}

const StyledButtonToggle = styled.button.attrs(
  applyBaseTheme,
)<StyledButtonToggleProps>`
  ${({ $active, $size, disabled, $iconOnly, $fullWidth }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;

    cursor: pointer;
    gap: var(--global-space-comp-s);
    height: ${sizeMap[$size].size};

    ${!$iconOnly &&
    css`
      padding: ${sizeMap[$size].padding};
    `}

    ${$iconOnly &&
    css`
      width: ${sizeMap[$size].size};
    `}

    ${$fullWidth &&
    css`
      flex: 1 1 auto;
    `}

    border-radius: var(--global-radius-action-circle);
    border: none;
    background-color: transparent;

    color: var(--button-typical-toggle-label-default);
    font: var(--global-font-static-comp-medium-m);
    text-align: center;

    ${$active &&
    css`
      background: var(--button-typical-toggle-bg-active);
      color: var(--button-typical-toggle-label-active);
    `}

    ${disabled &&
    css`
      cursor: not-allowed;
      color: var(--button-typical-toggle-label-disabled);

      ${$active &&
      css`
        background: var(--button-typical-toggle-bg-active-disabled);
        color: var(--button-typical-toggle-label-active-disabled);
      `}
    `}

    ${!disabled &&
    css`
      &:focus {
        ${addFocusStyling()}
      }

      &:hover {
        background: var(--button-typical-toggle-bg-hover);
        color: var(--button-typical-toggle-label-hover);
      }
    `}
  `}
`;

export default StyledButtonToggle;
