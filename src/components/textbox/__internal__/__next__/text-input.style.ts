import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";

interface StyledTextInputProps {
  $labelInline?: boolean;
  $size?: "small" | "medium" | "large";
}

interface LabelWrapperProps {
  $labelInline?: boolean;
  $labelWrapperWidth?: number;
}

interface InputWrapperProps {
  $size?: "small" | "medium" | "large";
  $maxWidth?: string;
  $inputWidth?: number;
}

const StyledTextInput = styled.div.attrs(applyBaseTheme)<StyledTextInputProps>`
  ${margin}

  display: flex;
  align-items: flex-start;
  flex-direction: ${({ $labelInline }) => ($labelInline ? "row" : "column")};

  gap: ${({ $labelInline, $size }) => {
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
        return "var(--global-space-comp-xl)";
      default:
        return "var(--global-space-comp-l)";
    }
  }};

  .time & {
    gap: unset;
  }
  .search & {
    flex: 1 1 0%;
  }
`;

const LabelWrapper = styled.div<LabelWrapperProps>`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  ${({ $labelInline }) => css`
    ${$labelInline &&
    css`
      padding-top: var(--global-space-comp-s);
      justify-content: flex-start;
      align-items: flex-end;
    `}

    ${!$labelInline &&
    css`
      justify-content: flex-end;
      align-items: flex-start;
    `}
  `}
  ${({ $labelWrapperWidth }) =>
    $labelWrapperWidth && `width: ${$labelWrapperWidth}%;`}
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

  &[data-is-open="true"] {
    z-index: var(--adaptiveSidebarModalBackdrop, 9999);
  }
`;

export { StyledTextInput, LabelWrapper, InputWrapper };
