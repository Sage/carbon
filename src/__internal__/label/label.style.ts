import styled from "styled-components";
import labelStyleOverrides from "./label-style-overrides.style";
import requiredIndicatorStyles from "../../style/utils/required-indicator";

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
    requiredIndicatorStyles({
      font: getFontToken($size),
      disabled: $disabled,
    })}

  ${labelStyleOverrides}
  .fieldset-required-input & {
    ::after {
      content: "";
      margin-inline-start: 0;
    }
  }
`;

export default StyledLabel;
