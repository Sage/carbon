import styled, { css } from "styled-components";
import { margin } from "styled-system";

import StyledInput from "../../__internal__/legacy-input/input.style";
import StyledHintText from "../../__internal__/legacy-hint-text/hint-text.style";
import InputPresentationStyle from "../../__internal__/legacy-input/input-presentation.style";
import StyledLabel, {
  StyledLabelContainer,
} from "../../__internal__/legacy-label/label.style";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { TextareaProps } from "./textarea.component";

export const DEFAULT_MIN_HEIGHT = 80;

export type ResizeOptions = "none" | "both" | "horizontal" | "vertical";

export type TextAreaSize = "small" | "medium" | "large";
export interface StyledTextAreaProps
  extends Pick<TextareaProps, "minHeight" | "borderRadius"> {
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** When true, adjusts padding for icon */
  hasIcon?: boolean;
  /** Specify the resize behavior of the textarea */
  $resize?: "none" | "both" | "horizontal" | "vertical";
  /** Specify a custom max-width for the textarea */
  $maxWidth?: string;
  $size: TextAreaSize;
  $readOnly?: boolean;
  $hasHint?: boolean;
  $isRequired?: boolean;
  $disabled?: boolean;
  $hasWarning?: boolean;
  $hasError?: boolean;
  $labelSpacing?: 1 | 2;
  $labelWidth: number;
  $inputWidth?: number | undefined;
}

const InputSizes = {
  small: {
    horizontalPadding: "var(--global-space-comp-s)",
    verticalPadding: "var(--global-space-comp-xs)",
  },
  medium: {
    horizontalPadding: "var(--global-space-comp-m)",
    verticalPadding: "var(--global-space-comp-s)",
  },
  large: {
    horizontalPadding: "var(--global-space-comp-l)",
    verticalPadding: "var(--global-space-comp-m)",
  },
};

const getResizeWidth = ({
  $resize,
  labelInline,
  $labelWidth,
  $inputWidth,
}: {
  $resize?: ResizeOptions;
  labelInline?: boolean;
  $labelWidth: number;
  $inputWidth?: number;
}) => {
  if (!$resize || $resize === "none") {
    return;
  }

  const widthValue = $inputWidth || 100 - $labelWidth;

  return labelInline ? `${widthValue}vw` : "100vw";
};

export const getFont = (size: TextAreaSize, format: "medium" | "regular") => {
  const sizeMap = {
    small: `var(--global-font-static-comp-${format}-s)`,
    medium: `var(--global-font-static-comp-${format}-m)`,
    large: `var(--global-font-static-comp-${format}-l)`,
  };

  return css`
    font: ${sizeMap[size]};
  `;
};

const getMarginBottom = (hasHint: boolean, size?: TextAreaSize) => {
  if (hasHint) {
    return css`
      margin-bottom: 0px;
    `;
  }

  const sizeMap = {
    small: "var(--global-space-comp-xs)",
    medium: "var(--global-space-comp-s)",
    large: "var(--global-space-comp-m)",
  };

  return css`
    ${size && `margin-bottom: ${sizeMap[size]};`};
  `;
};

const StyledTextarea = styled.div.attrs(applyBaseTheme)<StyledTextAreaProps>`
  margin-bottom: var(--fieldSpacing);
  ${margin};

  ${StyledInput} {
    ${({ $size }) => getFont($size, "regular")}
    box-sizing: border-box;
    color: var(--input-typical-txt-default);
    border-radius: ${({ borderRadius }) =>
      !borderRadius && "var(--global-radius-action-m)"};
    resize: ${({ $resize }) => $resize};
    min-height: ${({ minHeight }) =>
      minHeight ? `${minHeight}px` : "var(--global-size-4-xl)"};
    padding: ${({ $size }) =>
      `${InputSizes[$size].verticalPadding} ${InputSizes[$size].horizontalPadding}`};
    width: ${({ $resize, labelInline, $labelWidth, $inputWidth }) =>
      `${getResizeWidth({ $resize, labelInline, $labelWidth, $inputWidth })}`};
    ${({ $resize, $maxWidth }) =>
      $resize !== "none" && $maxWidth && `max-width: ${$maxWidth};`};

    ${({ hasIcon }) => hasIcon && "padding-right: var(--spacing500);"}

    ${({ $disabled }) =>
      $disabled && `color: var(--input-typical-txt-disabled);`}
    
    &::-webkit-scrollbar {
      width: 12px;
      border-radius: var(--global-radius-container-circle);
    }

    &::-webkit-scrollbar-track {
      background-color: var(--container-scrollbar-bg-default);
      border-radius: 0 var(--global-radius-container-circle)
        var(--global-radius-container-circle) 0;
      margin-top: 1px; // To prevent the scrollbar track from overlapping with the validation box-shadow inset
      ${(props) =>
        props.$resize !== "none" &&
        css`
          border-radius: 0 var(--global-radius-container-circle) 0 0;
        `}
    }

    &::-webkit-scrollbar-thumb {
      border-radius: var(--global-radius-container-circle);
      background-clip: padding-box;
      border: var(--global-space-comp-2-xs) solid transparent;
      background-color: var(--container-scrollbar-fg-default);
      ${({ $size }) =>
        $size === "large" ? "min-height: 41px;" : "min-height: 33px;"};
    }

    &::-webkit-resizer {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5' viewBox='0 0 5 5' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.12983 2.12983C4.32507 2.32507 4.32507 2.64162 4.12983 2.83686L2.83686 4.12983C2.64162 4.32507 2.32507 4.32507 2.12983 4.12983C1.93459 3.93459 1.93459 3.61804 2.12983 3.4228L3.4228 2.12983C3.61804 1.93459 3.93459 1.93459 4.12983 2.12983ZM3.12202 0.146431C3.31726 0.341672 3.31726 0.658221 3.12202 0.853462L0.853462 3.12202C0.658221 3.31726 0.341672 3.31726 0.146431 3.12202C-0.0488103 2.92678 -0.0488103 2.61023 0.146431 2.41499L2.41499 0.146431C2.61023 -0.0488103 2.92678 -0.0488104 3.12202 0.146431Z' fill='%2375838F'/%3E%3C/svg%3E");
      background-size: 6px 6px;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 0 0 var(--global-radius-container-circle) 0;
    }

    &.has-scrollbar::-webkit-resizer {
      background-color: var(--container-scrollbar-bg-default);
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
      border-radius: 0 0 var(--global-radius-container-circle) 0;
    }
  }

  ${StyledLabelContainer} {
    ${({ $hasHint, $size }) => getMarginBottom(!!$hasHint, $size)}
  }

  ${({ labelInline, $labelSpacing, $size }) =>
    labelInline &&
    css`
      ${StyledLabelContainer} {
        align-items: flex-start;
        padding-top: var(--global-space-comp-s);
        margin-bottom: 0px;
        ${!$labelSpacing &&
        `padding-right: ${$size === "large" ? "var(--global-space-comp-xl)" : "var(--global-space-comp-l)"};`}
      }
    `}

  ${StyledLabel} {
    color: var(--input-labelset-label-default);
    ${({ $size }) => getFont($size, "medium")}
    ${({ $readOnly }) =>
      $readOnly && "color: var(--input-labelset-label-read-only);"}
    ${({ $isRequired, $size }) =>
      $isRequired &&
      css`
        ::after {
          ${getFont($size, "medium")}
          color: var(--input-labelset-label-required);
          margin-left: var(--global-space-comp-xs);
        }
      `}
  }

  ${InputIconToggleStyle} {
    height: 40px;
    position: absolute;
    height: 100%;
    top: 0px;
    right: 4px;
  }

  ${InputPresentationStyle} {
    padding: 1px; // To prevent the validation box-shadow inset from overlapping with the scrollbar track
    border-radius: ${({ borderRadius }) =>
      !borderRadius && "var(--global-radius-action-m)"};
    min-height: var(--global-size-4-xl);

    width: ${({ $resize }) => ($resize !== "none" ? "auto" : "100%")};
    max-width: 100%;

    ${({ $disabled }) =>
      $disabled &&
      css`
        background: var(--input-typical-bg-disabled);
        border-color: var(--input-typical-border-disabled);
      `}
    ${({ $readOnly }) =>
      $readOnly &&
      css`
        background: var(--input-typical-bg-read-only);
        border-color: var(--input-typical-border-read-only);
      `}
  }

  ${StyledHintText} {
    color: var(--input-labelset-label-alt);
    ${({ $size }) => getFont($size, "regular")}
    ${({ $size }) => getMarginBottom(false, $size)}
  }

  ${StyledValidationMessage} {
    ${({ $hasWarning, $size }) =>
      $hasWarning &&
      css`
        color: var(--input-validation-label-warn);
        ${getFont($size, "regular")}
      `}
    ${({ $hasError, $size }) =>
      $hasError &&
      css`
        color: var(--input-validation-label-error);
        ${getFont($size, "medium")}
      `}
  }
`;

export const StyledTextareaValidationContainer = styled.div<{
  labelInline?: boolean;
  $inputWidth?: number;
  $labelWidth: number;
}>`
  position: relative;
  width: ${({ labelInline, $inputWidth, $labelWidth }) =>
    labelInline ? `${$inputWidth || 100 - $labelWidth}%` : "100%"};
`;

export default StyledTextarea;
