import styled, { css } from "styled-components";
import { labelStyleOverrides } from "./label-style-overrides.style";

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
        color: var(--input-labelset-label-readOnly);
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

  .numeral-date-wrapper &,
  .time & {
    font: var(--global-font-static-comp-regular-m);
  }

  ${labelStyleOverrides}
`;

export default StyledLabel;
