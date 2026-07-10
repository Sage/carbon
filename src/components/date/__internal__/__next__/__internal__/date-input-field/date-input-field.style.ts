import styled, { css } from "styled-components";
import Button from "../../../../../button/__next__";
import Divider from "../../../../../divider";
import StyledIcon from "../../../../../icon/icon.style";
import addFocusStyling from "../../../../../../style/utils/add-focus-styling";
import dateInputConfig from "./date-input-field.config";
import type { DatePickerSize } from "../date-picker/date-picker.types";

interface DateInputWrapperProps {
  $labelInline?: boolean;
  $size: DatePickerSize;
}

interface LabelWrapperProps {
  $labelAlign?: "left" | "right";
  $labelInline?: boolean;
  $size: DatePickerSize;
}

interface InputWrapperProps {
  $size: DatePickerSize;
  $maxWidth?: string;
  $inputWidth?: number;
  $minWidth: string;
}

const DateInputWrapper = styled.div<DateInputWrapperProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ $labelInline }) => ($labelInline ? "row" : "column")};

  gap: ${({ $labelInline, $size }) => {
    if (!$labelInline) return dateInputConfig[$size].stackedLayoutGap;
    return dateInputConfig[$size].inlineLayoutGap;
  }};
`;

const DateInputLabelWrapper = styled.div<LabelWrapperProps>`
  display: flex;
  flex-direction: column;
  align-self: flex-start;

  ${({ $labelAlign, $labelInline, $size }) => {
    const alignItems =
      $labelAlign === "left" || (!$labelInline && !$labelAlign)
        ? "flex-start"
        : "flex-end";
    const textAlign =
      $labelAlign === "left" || (!$labelInline && !$labelAlign)
        ? "left"
        : "right";

    return css`
      align-items: ${alignItems};
      text-align: ${textAlign};

      ${$labelInline &&
      css`
        display: flex;
        padding-block: ${dateInputConfig[$size].inlineLabelPadding};
        justify-content: flex-start;
        align-self: flex-start;
      `}

      ${!$labelInline &&
      css`
        justify-content: flex-end;
      `}
    `;
  }}
`;

const InputWrapper = styled.div<InputWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  position: relative;
  min-height: ${({ $size }) => dateInputConfig[$size].inputHeight};
  min-width: ${({ $minWidth }) => $minWidth};

  gap: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "var(--global-space-comp-xs)";
      default:
        return "var(--global-space-comp-s)";
    }
  }};

  ${({ $maxWidth, $inputWidth, $minWidth }) => css`
    ${$maxWidth && `max-width: ${$maxWidth};`}
    width: ${$inputWidth ? `${$inputWidth}%` : `${$maxWidth || $minWidth}`};
  `}

  > [data-role="input-container"] {
    box-sizing: border-box;
    width: 100%;
    min-height: ${({ $size }) => dateInputConfig[$size].inputHeight};
    height: ${({ $size }) => dateInputConfig[$size].inputHeight};

    &&&:focus-within {
      box-shadow: none;
      -webkit-box-shadow: none;
      outline: none;
    }

    .input-text-container:not(.disabled):not(.read-only) {
      cursor: text;
    }

    .input-text-container input {
      margin-right: 0;
      padding-left: ${({ $size }) => dateInputConfig[$size].inputInlinePadding};
      padding-right: ${({ $size }) =>
        dateInputConfig[$size].inputInlinePadding};
      overflow: visible;
      text-overflow: clip;
      width: 100%;
      -webkit-line-clamp: unset;
    }

    .input-text-container:not(.disabled):not(.read-only) input {
      cursor: text;
    }

    .input-text-container input:focus {
      border-radius: var(--global-radius-action-m) 0 0
        var(--global-radius-action-m);
      position: relative;
      z-index: 2;
    }

    .input-text-container input:focus-visible {
      border-radius: var(--global-radius-action-m) 0 0
        var(--global-radius-action-m);
      ${addFocusStyling()}
      position: relative;
      z-index: 2;
    }
  }

  > [data-role="error-border"] {
    left: ${({ $size }) => `-${dateInputConfig[$size].errorBorderOffset}`};
  }
`;

const CalendarTriggerControls = styled.span`
  align-self: stretch;
  display: inline-flex;
  align-items: center;
`;

const CalendarTriggerDividerWrapper = styled.span`
  display: inline-flex;
  align-self: stretch;
  align-items: center;
`;

interface CalendarTriggerDividerProps {
  $disabled?: boolean;
  $readOnly?: boolean;
}

const CalendarTriggerDivider = styled(Divider)<CalendarTriggerDividerProps>`
  && {
    align-self: stretch;
    box-sizing: border-box;
    display: inline-flex;
    height: 100%;
    padding-inline: 0;
    margin: 0;
    padding-block: var(--global-space-comp-s);
  }

  ${({ $disabled, $readOnly }) => {
    let borderColor = "var(--input-typical-border-default)";

    if ($disabled) {
      borderColor = "var(--input-typical-border-disabled)";
    } else if ($readOnly) {
      borderColor = "var(--input-typical-border-read-only)";
    }

    return css`
      &&& [data-role="divider-content"] {
        border-left-color: ${borderColor};
        opacity: 1;
      }
    `;
  }}
`;

interface CalendarTriggerButtonProps {
  $size: DatePickerSize;
  $readOnly?: boolean;
}

const CalendarTriggerButton = styled(Button)<CalendarTriggerButtonProps>`
  ${({ disabled, $readOnly }) => {
    let iconColor = "var(--input-typical-icon-default)";

    if (disabled) {
      iconColor = "var(--input-typical-icon-disabled)";
    } else if ($readOnly) {
      iconColor = "var(--input-typical-icon-read-only)";
    }

    return css`
      color: ${iconColor};
    `;
  }}

  && {
    width: ${({ $size }) => dateInputConfig[$size].pickerButtonSize};
    min-width: ${({ $size }) => dateInputConfig[$size].pickerButtonSize};
    height: ${({ $size }) => dateInputConfig[$size].pickerButtonSize};
    min-height: ${({ $size }) => dateInputConfig[$size].pickerButtonSize};
    padding: 0;
    border-radius: 0;
    border: none;
  }

  &&:not(:disabled) {
    cursor: pointer;
  }

  &&:hover {
    border-radius: 0 var(--global-radius-action-m) var(--global-radius-action-m)
      0;
  }

  &&:focus {
    border-radius: 0 var(--global-radius-action-m) var(--global-radius-action-m)
      0;
  }

  &&:focus-visible {
    border-radius: 0 var(--global-radius-action-m) var(--global-radius-action-m)
      0;
    ${addFocusStyling()}
    z-index: 2;
  }

  && ${StyledIcon} {
    color: currentColor;
  }

  &&:disabled {
    cursor: not-allowed;
  }
`;

export {
  DateInputWrapper,
  DateInputLabelWrapper,
  InputWrapper,
  CalendarTriggerControls,
  CalendarTriggerDividerWrapper,
  CalendarTriggerDivider,
  CalendarTriggerButton,
};
