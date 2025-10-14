import styled, { css } from "styled-components";

/*
 * This has been left in as some legacy components still rely on it
 * Once Textarea, Fieldset, FileInput and TextEditor have been aligned this can be deleted
 */
const ErrorBorder = styled.span`
  ${({ warning }: { warning: boolean }) => css`
    position: absolute;
    z-index: 6;
    width: 2px;
    background-color: ${warning
      ? "var(--colorsSemanticCaution500)"
      : "var(--colorsSemanticNegative500)"};
    left: -12px;
    bottom: 0px;
    top: 0px;
  `}
`;

export default ErrorBorder;
