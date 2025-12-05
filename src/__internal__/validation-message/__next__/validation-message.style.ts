import styled, { css } from "styled-components";

interface StyledValidationMessageProps {
  isError?: boolean;
  isDarkBackground?: boolean;
  isLarge?: boolean;
}

const StyledValidationMessage = styled.span<StyledValidationMessageProps>`
  ${({ isError, isLarge }) => {
    return css`
      display: flex;
      align-items: center;
      align-content: center;
      align-self: stretch;
      flex-wrap: wrap;
      margin: 0px;

      margin: 0px;

      color: ${isError
        ? "var(--input-validation-label-error)"
        : "var(--input-validation-label-warn)"};

      font-family: var(--fontFamiliesDefault);

      font-size: ${isLarge
        ? "var(--global-font-static-body-regular-l)"
        : "var(--global-font-static-body-regular-m)"};

      font-style: normal;
      font-weight: ${isError ? "500" : "400"};
      line-height: 150%;
    `;
  }}
`;

export default StyledValidationMessage;
