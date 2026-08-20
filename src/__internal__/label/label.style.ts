import styled, { css } from "styled-components";
import labelStyleOverrides from "./label-style-overrides.style";

const getFontToken = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "var(--global-font-static-comp-medium-s)";
    case "large":
      return "var(--global-font-static-comp-medium-l)";
    default:
      // default is medium
      return "var(--global-font-static-comp-medium-m)";
  }
};

const getTimeFontToken = (size: "small" | "medium" | "large") => {
  switch (size) {
    case "small":
      return "var(--global-font-static-comp-regular-s)";
    case "large":
      return "var(--global-font-static-comp-regular-l)";
    default:
      return "var(--global-font-static-comp-regular-m)";
  }
};

const getTimeColourToken = (disabled?: boolean, readOnly?: boolean) => {
  if (disabled) {
    return "var(--input-typical-txt-disabled)";
  }
  if (readOnly) {
    return "var(--input-typical-txt-read-only)";
  }
  return "var(--input-typical-txt-default)";
};
interface StyledLabelProps {
  $size: "small" | "medium" | "large";
  $isRequired?: boolean;
  $disabled?: boolean;
  $readOnly?: boolean;
}

const StyledLabel = styled.label<StyledLabelProps>`
  ${({ $disabled, $readOnly }) => {
    if ($disabled) {
      return `
        cursor: not-allowed;
        color: var(--input-labelset-label-disabled);
      `;
    }
    if ($readOnly) {
      return `
        cursor: pointer;
        color: var(--input-labelset-label-read-only);
      `;
    }
    return `
      cursor: pointer;
      color: var(--input-labelset-label-default);
    `;
  }};

  font: ${({ $size }) => getFontToken($size)};

  ${({ $isRequired, $size, $disabled }) =>
    $isRequired &&
    css`
      display: inline-flex;
      align-items: center;

      ::after {
        content: "*";
        color: ${$disabled
          ? "var(--input-labelset-label-disabled)"
          : "var(--input-labelset-label-required)"};
        font: ${getFontToken($size)};
        margin-left: 4px;
      }
    `}

  ${({ $size, $disabled, $readOnly }) => css`
    .time & {
      font: ${getTimeFontToken($size)};
      color: ${getTimeColourToken($disabled, $readOnly)};
    }
  `}
 
  ${labelStyleOverrides}
  .fieldset-required-input & {
    ::after {
      content: "";
      margin-left: 0;
    }
  }
`;

export default StyledLabel;
