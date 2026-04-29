import styled, { css } from "styled-components";

interface StyledValidationMessageProps {
  $isError?: boolean;
  $isLarge?: boolean;
}

const StyledValidationMessage = styled.span<StyledValidationMessageProps>`
  ${({ $isError, $isLarge }) => {
    return css`
      display: flex;
      align-items: center;
      align-content: center;
      align-self: stretch;
      flex-wrap: wrap;
      margin: 0px;

      color: ${$isError
        ? "var(--input-validation-label-error)"
        : "var(--input-validation-label-warn)"};

      ${$isLarge &&
      css`
        font: ${$isError
          ? "var(--global-font-static-comp-medium-l)"
          : "var(--global-font-static-comp-regular-l)"};
      `}
      ${!$isLarge &&
      css`
        font: ${$isError
          ? "var(--global-font-static-comp-medium-m)"
          : "var(--global-font-static-comp-regular-m)"};
      `}
    `;
  }}
`;

export default StyledValidationMessage;
