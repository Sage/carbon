import styled, { css } from "styled-components";
import Button from "../../../button/__next__";
import Divider from "../../../divider";
import StyledIcon from "../../../icon/icon.style";
import { propsForSize as buttonSizeConfig } from "../../../button/__next__/button.config";
import addFocusStyling from "../../../../style/utils/add-focus-styling";
import type { DatePickerSize } from "../date-picker";
import legacyInputSizes from "../../../../__internal__/legacy-input/input-sizes.style";
import visuallyHidden from "../../../../style/utils/visually-hidden";

const DatePickerTriggerContainer = styled.span`
  align-self: stretch;
  display: inline-flex;
  align-items: center;
`;

interface LegacyDatePickerTriggerProps {
  $disabled?: boolean;
  $readOnly?: boolean;
  $size: DatePickerSize;
}

const LegacyDatePickerTrigger = styled.span<LegacyDatePickerTriggerProps>`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: center;
  width: ${({ $size }) => legacyInputSizes[$size].height};
  cursor: ${({ $disabled, $readOnly }) => {
    if ($disabled) return "not-allowed";
    if ($readOnly) return "default";
    return "pointer";
  }};

  ${({ $disabled, $readOnly }) => {
    let iconColor = "var(--input-typical-icon-default)";

    if ($readOnly) {
      iconColor = "var(--input-typical-icon-read-only)";
    } else if ($disabled) {
      iconColor = "var(--button-typical-subtle-label-disabled)";
    }

    return css`
      ${StyledIcon} {
        color: ${iconColor};
      }
    `;
  }}
`;

const DatePickerTriggerDividerWrapper = styled.span`
  display: inline-flex;
  align-self: stretch;
  align-items: center;
`;

interface DatePickerTriggerDividerProps {
  $disabled?: boolean;
  $readOnly?: boolean;
}

const DatePickerTriggerDivider = styled(Divider)<DatePickerTriggerDividerProps>`
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
      && [data-role="divider-content"] {
        border-inline-start-color: ${borderColor};
        opacity: 1;
      }
    `;
  }}
`;

interface DatePickerTriggerButtonProps {
  $size: DatePickerSize;
  $readOnly?: boolean;
}

const DatePickerTriggerButton = styled(Button)<DatePickerTriggerButtonProps>`
  ${({ disabled, $readOnly }) => {
    let iconColor = "var(--input-typical-icon-default)";

    if ($readOnly) {
      iconColor = "var(--input-typical-icon-read-only)";
    } else if (disabled) {
      iconColor = "var(--button-typical-subtle-label-disabled)";
    }

    return css`
      color: ${iconColor};

      && ${StyledIcon} {
        color: ${iconColor};
      }
    `;
  }}

  && {
    --date-picker-trigger-size: calc(
      ${({ $size }) => buttonSizeConfig[$size].height} -
        (2 * var(--global-borderwidth-xs))
    );

    width: var(--date-picker-trigger-size);
    min-width: var(--date-picker-trigger-size);
    height: var(--date-picker-trigger-size);
    min-height: var(--date-picker-trigger-size);
    padding: var(--global-space-none);
    border-radius: var(--global-radius-none);
    border: none;
  }

  &&[aria-expanded="true"]:not(:disabled) {
    background-color: var(--button-typical-subtle-bg-active);
    color: var(--button-typical-subtle-label-active);

    ${StyledIcon} {
      color: var(--button-typical-subtle-label-active);
    }
  }

  &&:not(:disabled) {
    cursor: pointer;
  }

  &&:hover {
    border-radius: var(--global-radius-none) var(--global-radius-action-m)
      var(--global-radius-action-m) var(--global-radius-none);
  }

  &&:focus-visible {
    border-radius: var(--global-radius-none) var(--global-radius-action-m)
      var(--global-radius-action-m) var(--global-radius-none);
    ${addFocusStyling()}
    z-index: 2;
  }

  &&:disabled {
    cursor: not-allowed;
  }
`;

const DatePickerTriggerDescription = styled.span`
  ${visuallyHidden}
`;

export {
  DatePickerTriggerContainer,
  DatePickerTriggerDividerWrapper,
  DatePickerTriggerDivider,
  DatePickerTriggerButton,
  LegacyDatePickerTrigger,
  DatePickerTriggerDescription,
};
