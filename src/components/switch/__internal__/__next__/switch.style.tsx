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

interface StyledNextSwitchLabelProps {
  $disabled?: boolean;
  $inputHint?: boolean;
  $labelInline?: boolean;
  $labelSpacing?: 1 | 2;
  $labelWidth?: number;
  $required?: boolean;
}

const StyledNextSwitchLabel = styled.label<StyledNextSwitchLabelProps>`
  ${({
    $disabled,
    $inputHint,
    $labelInline,
    $labelSpacing,
    $labelWidth,
    $required,
  }) => css`
    display: flex;
    color: ${$disabled
      ? "var(--input-labelset-label-disabled, rgba(0, 0, 0, 0.42))"
      : "var(--input-labelset-label-default, rgba(0, 0, 0, 0.95))"};
    font-family: var(--core-fontFamilies-component, "Sage UI");
    font-size: var(--core-fontSize-static-large-step0, 14px);
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    cursor: pointer;
    ${$required &&
    css`
      ::after {
        content: "*";
        color: var(--input-labelset-label-required);
        font-weight: var(--fontWeights500);
        margin-left: var(--global-space-comp-xs);
      }
    `}
    /* required to give space above the Switch input when focus styling is applied. */
    ${!$inputHint &&
    css`
      margin-bottom: 3px;
    `}
    ${$labelInline &&
    css`
      margin-bottom: 0;
      margin-right: ${$labelSpacing
        ? `${$labelSpacing * 8}px`
        : "var(--global-space-comp-s, 8px)"};
      ${$labelWidth &&
      css`
        width: ${$labelWidth}%;
      `}
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
    gap: 8px var(--global-space-comp-S, 8px);
    /* This is required to give space above the Switch input when focus styling is applied. */
    ${$size === "large" &&
    css`
      margin-top: 6px;
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
      ? "var(--global-size-3XL, 72px)"
      : "var(--global-size-M, 40px)"};
    height: ${$size === "large"
      ? "var(--global-size-M, 40px)"
      : "var(--global-size-XS, 24px)"};
    border-radius: var(--global-radius-container-circle, 999px);
    border: var(--global-borderwidth-S, 2px) solid
      var(--input-switch-border-default, #75838f);
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
      ? "var(--input-switch-border-disabled, rgba(0, 0, 0, 0.30))"
      : "var(--input-switch-fg-default, #75838F)"};

    ${$checked &&
    !$disabled &&
    css`
      border-radius: var(--global-radius-container-circle, 999px);
      border: var(--global-borderwidth-S, 2px) solid
        var(--input-switch-border-active, rgba(0, 0, 0, 0));
      background: var(--input-switch-bg-active, #000);
    `}

    ${$disabled &&
    $checked &&
    css`
      background-color: var(--input-switch-bg-disabled, rgba(0, 0, 0, 0.3));
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
    width: ${$size === "large" ? "28px" : "var(--global-size-3XS, 16px)"};
    height: ${$size === "large" ? "28px" : "var(--global-size-3XS, 16px)"};
    border-radius: 50%;
    background-color: ${$disabled
      ? "var(--input-switch-bg-disabled, rgba(0, 0, 0, 0.30))"
      : "var(--input-switch-fg-default, #75838F)"};
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
      background-color: var(--input-switch-fg-active, #fff);
    `}

    ${$checked &&
    $disabled &&
    css`
      background-color: var(--input-switch-fg-activateDisabled, #fff);
    `}
  `}
`;

interface StyledNextSwitchStateTextProps {
  $disabled?: boolean;
}

const StyledNextSwitchStateText = styled.span<StyledNextSwitchStateTextProps>`
  ${({ $disabled }) => css`
    color: ${$disabled
      ? "var(--input-switch-label-disabled, rgba(0, 0, 0, 0.30))"
      : "var(--input-switch-label-default, rgba(0, 0, 0, 0.55))"};
    font-family: var(--core-fontFamilies-component, "Sage UI");
    font-size: var(--core-fontSize-static-large-step0, 14px);
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
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
      ? "var(--global-space-comp-S)"
      : "var(--global-space-comp-M)"};
  `}
`;

const StyledNextSwitchProcessingText = styled.span`
  color: var(--input-switch-label-default, rgba(0, 0, 0, 0.55));
  font-family: var(--core-fontFamilies-component, "Sage UI");
  font-size: var(--core-fontSize-static-large-step0, 14px);
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
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
  inset: calc(0px - var(--global-borderwidth-S, 2px));
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
`;

export {
  StyledNextSwitch,
  StyledNextSwitchLabel,
  StyledNextSwitchRow,
  StyledNextSwitchTrack,
  StyledNextSwitchThumb,
  StyledNextSwitchStateText,
  StyledNextSwitchProcessingRow,
  StyledNextSwitchProcessingText,
  StyledNextSwitchInput,
  StyledNextSwitchLoaderWrapper,
};
