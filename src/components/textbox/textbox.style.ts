import styled, { css } from "styled-components";

const ErrorBorder = styled.span<{ warning: boolean; inline?: boolean }>`
  ${({ warning, inline }) => css`
    position: absolute;
    z-index: 6;
    width: 2px;
    background-color: ${warning
      ? "var(--colorsSemanticCaution500)"
      : "var(--colorsSemanticNegative500)"};
    left: -12px;
    bottom: ${inline ? "10px" : "0px"};
    top: 0px;
  `}
`;

export default ErrorBorder;
