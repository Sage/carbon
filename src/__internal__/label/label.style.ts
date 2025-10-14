import styled, { css } from "styled-components";

interface StyledLabelProps {
  $isLarge?: boolean;
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

  font: ${({ $isLarge }) =>
    $isLarge
      ? "var(--global-font-static-comp-medium-l)"
      : "var(--global-font-static-comp-medium-m)"};

  ${({ $isRequired, $isLarge }) =>
    $isRequired &&
    css`
      display: inline-flex;
      align-items: center;

      ::after {
        content: "*";
        color: var(--input-labelset-label-required);
        font: ${$isLarge
          ? "var(--global-font-static-comp-medium-l)"
          : "var(--global-font-static-comp-medium-m)"};
        margin-left: 4px;
      }
    `}

  .numeral-date-wrapper &,
  .time & {
    font: var(--global-font-static-comp-regular-m);
  }
`;

export default StyledLabel;
