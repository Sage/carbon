import styled from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../../style/themes/apply-base-theme";

interface StyledTextInputProps {
  labelInline?: boolean;
  containerWidth?: number;
  size?: "small" | "medium" | "large";
}

interface LabelSetProps {
  labelInline?: boolean;
  labelSetWidth?: number;
}

interface InputSetProps {
  inputWidth?: number;
  size?: "small" | "medium" | "large";
}

const StyledTextInput = styled.div.attrs(applyBaseTheme)<StyledTextInputProps>`
  ${margin}

  display: flex;
  flex-direction: ${({ labelInline }) => (labelInline ? "row" : "column")};
  ${({ containerWidth }) => containerWidth && `width: ${containerWidth}%;`}
  align-items: flex-start;

  gap: ${({ labelInline, size }) => {
    if (!labelInline) {
      switch (size) {
        case "small":
          return "var(--global-space-comp-xs)";
        case "large":
          return "var(--global-space-comp-m)";
        default:
          return "var(--global-space-comp-s)";
      }
    }
    switch (size) {
      case "large":
        return "var(--global-space-comp-xl)";
      default:
        return "var(--global-space-comp-l)";
    }
  }};
`;

const LabelSet = styled.div<LabelSetProps>`
  display: flex;
  flex-direction: column;
  ${({ labelInline }) =>
    labelInline && "padding-top: var(--global-space-comp-s);"}
  ${({ labelSetWidth }) => labelSetWidth && `width: ${labelSetWidth}%;`}
  
  justify-content: ${({ labelInline }) =>
    labelInline ? "flex-start" : "flex-end"};

  align-items: ${({ labelInline }) =>
    labelInline ? "flex-end" : "flex-start"};

  align-self: stretch;
`;

const InputSet = styled.div<InputSetProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ inputWidth }) => inputWidth && `width: ${inputWidth}%;`}

  gap: ${({ size }) => {
    switch (size) {
      case "small":
        return "var(--global-space-comp-xs)";
      default:
        return "var(--global-space-comp-s)";
    }
  }};
`;

export { StyledTextInput, LabelSet, InputSet };
export type { StyledTextInputProps, LabelSetProps };
