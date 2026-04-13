import styled, { css } from "styled-components";
import { margin } from "styled-system";
import addFocusStyling from "../../../../style/utils/add-focus-styling";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";

interface StyledNextSwitchProps {
  $labelInline?: boolean;
}

const StyledNextSwitch = styled.div.attrs(
  applyBaseTheme,
)<StyledNextSwitchProps>`
  ${margin}
  display: ${({ $labelInline }) => ($labelInline ? "flex" : "inline-flex")};
  flex-direction: ${({ $labelInline }) => ($labelInline ? "row" : "column")};
`;

interface StyledNextSwitchLabelWrapperProps {
  $labelInline?: boolean;
  $labelWidth?: number;
}

const StyledNextSwitchLabelWrapper = styled.div<StyledNextSwitchLabelWrapperProps>`
  ${({ $labelInline, $labelWidth }) => css`
    display: flex;
    flex-direction: column;
    margin-right: var(--global-space-comp-s);
    ${$labelInline &&
    $labelWidth &&
    css`
      width: ${$labelWidth}%;
    `}
  `}
`;

interface StyledNextSwitchLabelProps {
  $disabled?: boolean;
  $inputHint?: boolean;
  $labelInline?: boolean;
  $labelSpacing?: 1 | 2;
  $required?: boolean;
  $size?: "small" | "large";
}

const StyledNextSwitchLabel = styled.label<StyledNextSwitchLabelProps>`
  ${({
    $disabled,
    $inputHint,
    $labelInline,
    $labelSpacing,
    $required,
    $size,
  }) => css`
    display: flex;
    color: ${$disabled
      ? "var(--input-labelset-label-disabled)"
      : "var(--input-labelset-label-default)"};
    font: ${$size === "large"
      ? "var(--global-font-static-comp-medium-l)"
      : "var(--global-font-static-comp-medium-m)"};
    cursor: pointer;
    ${$required &&
    css`
      ::after {
        content: "*";
        color: var(--input-labelset-label-required);
        font: ${$size === "large"
          ? "var(--global-font-static-comp-medium-l)"
          : "var(--global-font-static-comp-medium-m)"};
        margin-left: var(--global-space-comp-xs);
      }
    `}
    /* required to give space above the Switch input when focus styling is applied. */
    ${!$inputHint &&
    css`
      margin-bottom: var(--global-space-comp-s);
    `}
    ${$labelInline &&
    css`
      margin-bottom: 0;
    `}
    ${($labelInline || $inputHint) &&
    css`
      margin-right: ${$labelSpacing
        ? `${$labelSpacing * 8}px`
        : "var(--global-space-comp-s)"};
    `}
  `}
`;

interface StyledNextSwitchRowProps {
  $size?: "small" | "large";
}

const StyledNextSwitchRow = styled.div<StyledNextSwitchRowProps>`
  ${({ $size }) => css`
    display: flex;
    align-items: center;
    gap: 8px var(--global-space-comp-s);
    /* This is required to give space above the Switch input when focus styling is applied. */
    ${$size === "large" &&
    css`
      margin-top: var(--global-space-comp-xs);
    `}
  `}
`;

interface StyledNextSwitchTrackProps {
  $checked: boolean;
  $disabled?: boolean;
  $size?: "small" | "large";
  $loading?: boolean;
}

const StyledNextSwitchTrack = styled.div<StyledNextSwitchTrackProps>`
  ${({ $checked, $disabled, $size, $loading }) => css`
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    width: ${$size === "large"
      ? "var(--global-size-3-xl)"
      : "var(--global-size-m)"};
    height: ${$size === "large"
      ? "var(--global-size-m)"
      : "var(--global-size-xs)"};
    border-radius: var(--global-radius-container-circle, 999px);
    border: var(--global-borderwidth-s) solid var(--input-switch-border-default);
    box-sizing: border-box;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    cursor: ${$disabled ? "not-allowed" : "pointer"};

    /* unchecked */
    background-color: transparent;
    border-color: ${$disabled
      ? "var(--input-switch-border-disabled)"
      : "var(--input-switch-fg-default)"};

    ${$checked &&
    !$disabled &&
    css`
      border-radius: var(--global-radius-container-circle, 999px);
      border: var(--global-borderwidth-s) solid
        var(--input-switch-border-active);
      background: var(--input-switch-bg-active);
    `}

    ${$disabled &&
    $checked &&
    css`
      background-color: var(--input-switch-bg-disabled);
      border-color: transparent;
    `}

    ${$loading &&
    css`
      /* hide thumb when loading */
      &::after {
        display: none;
      }
    `}

    &:focus-within {
      ${addFocusStyling()}
    }
  `}
`;

interface StyledNextSwitchThumbProps {
  $checked: boolean;
  $disabled?: boolean;
  $size?: "small" | "large";
}

const StyledNextSwitchThumb = styled.span<StyledNextSwitchThumbProps>`
  ${({ $checked, $disabled, $size }) => css`
    position: absolute;
    left: ${$size === "large" ? "4px" : "3px"};
    width: ${$size === "large" ? "28px" : "var(--global-size-3-xs)"};
    height: ${$size === "large" ? "28px" : "var(--global-size-3-xs)"};
    border-radius: 50%;
    background-color: ${$disabled
      ? "var(--input-switch-bg-disabled)"
      : "var(--input-switch-fg-default)"};
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    transform: ${$checked
      ? $size === "large"
        ? "translateX(32px)"
        : "translateX(15px)"
      : "translateX(0)"};

    ${$checked &&
    !$disabled &&
    css`
      background-color: var(--input-switch-fg-active);
    `}

    ${$checked &&
    $disabled &&
    css`
      background-color: var(--input-switch-fg-activate-disabled);
    `}
  `}
`;

interface StyledNextSwitchStateTextProps {
  $disabled?: boolean;
  $size?: "small" | "large";
}

const StyledNextSwitchStateText = styled.span<StyledNextSwitchStateTextProps>`
  ${({ $disabled, $size }) => css`
    color: ${$disabled
      ? "var(--input-switch-label-disabled)"
      : "var(--input-switch-label-default)"};
    font: ${$size === "large"
      ? "var(--global-font-static-comp-medium-l)"
      : "var(--global-font-static-comp-medium-m)"};
  `}
`;

interface StyledNextSwitchProcessingRowProps {
  $below?: boolean;
}

const StyledNextSwitchProcessingRow = styled.div<StyledNextSwitchProcessingRowProps>`
  ${({ $below }) => css`
    display: flex;
    align-items: ${$below ? "flex-start" : "center"};
    flex-direction: ${$below ? "column" : "row"};
    gap: ${$below
      ? "var(--global-space-comp-s)"
      : "var(--global-space-comp-m)"};
  `}
`;

interface StyledNextSwitchProcessingTextProps {
  $size?: "small" | "large";
}

const StyledNextSwitchProcessingText = styled.span<StyledNextSwitchProcessingTextProps>`
  ${({ $size }) => css`
    color: var(--input-switch-label-default);
    font: ${$size === "large"
      ? "var(--global-font-static-comp-medium-l)"
      : "var(--global-font-static-comp-medium-m)"};
  `}
`;

interface StyledNextSwitchLoaderWrapperProps {
  $checked: boolean;
  $size?: "small" | "large";
}

const StyledNextSwitchLoaderWrapper = styled.span<StyledNextSwitchLoaderWrapperProps>`
  ${({ $checked, $size }) => css`
    position: absolute;
    left: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    transform: ${$checked
      ? $size === "large"
        ? "translateX(32px)"
        : "translateX(15px)"
      : "translateX(0)"};
  `}
`;

const StyledNextSwitchInput = styled.input`
  position: absolute;
  inset: calc(0px - var(--global-borderwidth-s));
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
`;

export {
  StyledNextSwitch,
  StyledNextSwitchLabel,
  StyledNextSwitchLabelWrapper,
  StyledNextSwitchRow,
  StyledNextSwitchTrack,
  StyledNextSwitchThumb,
  StyledNextSwitchStateText,
  StyledNextSwitchProcessingRow,
  StyledNextSwitchProcessingText,
  StyledNextSwitchInput,
  StyledNextSwitchLoaderWrapper,
};
