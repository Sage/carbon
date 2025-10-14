import styled from "styled-components";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

interface InputContainerProps {
  error?: boolean;
  inputWidth?: number;
  disabled?: boolean;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  ${({ inputWidth }) => inputWidth && `width: ${inputWidth}%;`}

  min-height: ${({ size = "medium" }) => {
    switch (size) {
      case "small":
        return "var(--global-size-s)";
      case "large":
        return "var(--global-size-l)";
      default:
        return "var(--global-size-m)";
    }
  }};

  align-items: center;
  align-self: stretch;
  border-radius: var(--global-radius-action-m);

  border: ${({ error, disabled, readOnly }) => {
    if (disabled) {
      return `var(--global-borderwidth-xs) solid var(--input-typical-border-disabled)`;
    }
    if (readOnly) {
      return `var(--global-borderwidth-xs) solid var(--input-typical-border-read-only)`;
    }
    return error
      ? `var(--global-borderwidth-s) solid var(--input-validation-border-error)`
      : `var(--global-borderwidth-xs) solid var(--input-typical-border-default)`;
  }};

  background: ${({ disabled, readOnly }) => {
    if (disabled) {
      return "var(--input-typical-bg-disabled)";
    }
    if (readOnly) {
      return "var(--input-typical-bg-read-only)";
    }
    return "var(--input-typical-bg-default)";
  }};

  &:focus-within {
    ${addFocusStyling()}
    z-index: 2;
  }

  [data-role="input-text-container"] {
    display: flex;

    padding: ${({ size = "medium" }) => {
      switch (size) {
        case "small":
          return "0 var(--global-space-comp-s)";
        case "large":
          return "0 var(--global-space-comp-l)";
        default:
          return "0 var(--global-space-comp-m)";
      }
    }};

    align-items: center;

    gap: ${({ size = "medium" }) => {
      switch (size) {
        case "small":
          return "var(--global-space-comp-xs)";
        case "large":
          return "var(--global-space-comp-m)";
        default:
          return "var(--global-space-comp-s)";
      }
    }};

    flex: 1 0 0;
    align-self: stretch;

    input {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      flex: 1 0 0;
      overflow: hidden;
      border: none;
      outline: none;
      background: transparent;

      color: ${({ disabled, readOnly }) => {
        if (disabled) {
          return "var(--input-typical-txt-disabled)";
        }
        if (readOnly) {
          return "var(--input-typical-txt-read-only)";
        }
        return "var(--input-typical-txt-default)";
      }};

      text-overflow: ellipsis;
      font-family: var(--fontFamiliesDefault);

      font-size: ${({ size }) =>
        size === "large"
          ? "var(--global-font-static-body-regular-l)"
          : "var(--global-font-static-body-regular-m)"};

      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }
  }
`;

export default InputContainer;
