import styled, { css } from "styled-components";

const ErrorBorder = styled.span`
  ${({ warning }: { warning: boolean }) => css`
    width: 2px;
    position: absolute;
    left: -10px;
    top: 0px;
    bottom: 0px;
    z-index: 6;
    background-color: ${warning
      ? "var(--input-validation-bar-warn)"
      : "var(--input-validation-border-error)"};
  `}
  transform: scaleX(1);
`;

export default ErrorBorder;
