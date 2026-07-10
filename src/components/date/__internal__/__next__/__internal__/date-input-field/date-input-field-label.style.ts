import styled, { css } from "styled-components";
import Typography from "../../../../../typography";
import type { DatePickerSize } from "../date-picker/date-picker.types";

const getLabelFontToken = (size: DatePickerSize) => {
  switch (size) {
    case "small":
      return "var(--global-font-static-comp-medium-s)";
    case "large":
      return "var(--global-font-static-comp-medium-l)";
    default:
      return "var(--global-font-static-comp-medium-m)";
  }
};

interface FieldLabelProps {
  $disabled?: boolean;
  $readOnly?: boolean;
  $isRequired?: boolean;
  $size: DatePickerSize;
}

const Label = styled(Typography)<FieldLabelProps>`
  ${({ $disabled, $readOnly, $isRequired, $size }) => css`
    && {
      display: inline;
      cursor: ${$disabled ? "not-allowed" : "pointer"};
      color: ${$disabled
        ? "var(--input-labelset-label-disabled)"
        : $readOnly
          ? "var(--input-labelset-label-readOnly)"
          : "var(--input-labelset-label-default)"};
    }

    ${$isRequired &&
    css`
      &&::after {
        content: "*";
        margin-left: 4px;
        font: ${getLabelFontToken($size)};
        color: ${$disabled
          ? "var(--input-labelset-label-disabled)"
          : "var(--input-labelset-label-required)"};
      }
    `}
  `}
`;

interface HintProps {
  $disabled?: boolean;
}

const Hint = styled(Typography)<HintProps>`
  && {
    display: inline-flex;
    color: ${({ $disabled }) =>
      $disabled
        ? "var(--input-labelset-label-disabled)"
        : "var(--input-labelset-label-alt)"};
  }
`;

export { Label, Hint };
