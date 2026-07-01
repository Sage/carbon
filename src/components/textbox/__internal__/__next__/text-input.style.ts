import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";

interface StyledTextInputProps {
  $labelInline?: boolean;
  $size: "small" | "medium" | "large";
  $hasValidationFailure?: boolean;
}

interface LabelWrapperProps {
  $labelInline?: boolean;
  $labelWrapperWidth?: number;
  $size: "small" | "medium" | "large";
}

interface InputWrapperProps {
  $size: "small" | "medium" | "large";
  $maxWidth?: string;
  $inputWidth?: number;
}

const StyledTextInput = styled.div.attrs(applyBaseTheme)<StyledTextInputProps>`
  [data-component="inline-inputs"] &,
  &[data-element="current-page"] {
    --fieldSpacing: 0px;
  }
  margin-bottom: var(--fieldSpacing);
  ${margin}

  display: flex;
  align-items: flex-start;
  flex-direction: ${({ $labelInline }) => ($labelInline ? "row" : "column")};

  gap: ${({ $labelInline, $size, $hasValidationFailure }) => {
    if (!$labelInline) {
      switch ($size) {
        case "small":
          return "var(--global-space-comp-xs)";
        case "large":
          return "var(--global-space-comp-m)";
        default:
          return "var(--global-space-comp-s)";
      }
    }
    switch ($size) {
      case "large":
        return $hasValidationFailure
          ? "var(--global-space-comp-l)"
          : "var(--global-space-comp-m)";
      default:
        return $hasValidationFailure
          ? "var(--global-space-comp-l)"
          : "var(--global-space-comp-s)";
    }
  }};

  .fieldset-content & {
    gap: var(--global-space-comp-xs);
  }

  .time & {
    gap: unset;
  }
  .legacy-search & {
    flex: 1 1 0%;
  }
`;

const LabelWrapper = styled.div<LabelWrapperProps>`
  ${({ $labelWrapperWidth }) =>
    $labelWrapperWidth &&
    `
    --label-spacing: ${$labelWrapperWidth}%;

    [data-component="date-range"] & {
      --label-spacing: ${$labelWrapperWidth * 2}%;
    }
  `}

  display: flex;
  flex-direction: column;
  align-self: stretch;
  ${({ $labelInline, $size }) => css`
    ${$labelInline &&
    css`
      padding-top: var(--global-space-comp-${$size.charAt(0)});
      justify-content: flex-start;
      align-items: flex-end;
      align-self: stretch;
      width: var(--label-spacing, auto);
    `}

    ${!$labelInline &&
    css`
      justify-content: flex-end;
      align-items: flex-start;
    `}
  `}
`;

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-width: 0;

  gap: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "var(--global-space-comp-xs)";
      default:
        return "var(--global-space-comp-s)";
    }
  }};

  ${({ $maxWidth, $inputWidth }) => css`
    ${$maxWidth && `max-width: ${$maxWidth};`}
    width: ${$inputWidth ? `${$inputWidth}%` : "100%"};
  `}
`;

export { StyledTextInput, LabelWrapper, InputWrapper };
