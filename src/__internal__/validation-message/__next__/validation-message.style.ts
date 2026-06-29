import styled, { css } from "styled-components";
import validationMessageStyleOverrides from "./validation-message-style-overrides.style";

interface StyledValidationMessageProps {
  $isError?: boolean;
  $size?: "small" | "medium" | "large";
}

const StyledValidationMessage = styled.span<StyledValidationMessageProps>`
  ${({ $isError, $size }) => {
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

      ${$size === "large" &&
      css`
        font: ${$isError
          ? "var(--global-font-static-comp-medium-l)"
          : "var(--global-font-static-comp-regular-l)"};
      `}
      ${$size === "medium" &&
      css`
        font: ${$isError
          ? "var(--global-font-static-comp-medium-m)"
          : "var(--global-font-static-comp-regular-m)"};
      `}
      ${$size === "small" &&
      css`
        font: ${$isError
          ? "var(--global-font-static-comp-medium-s)"
          : "var(--global-font-static-comp-regular-s)"};
      `}

      ${validationMessageStyleOverrides}
    `;
  }}
`;

export default StyledValidationMessage;
