import styled, { css } from "styled-components";

const ErrorBorder = styled.span`
  ${({ warning }: { warning: boolean }) =>
    css`
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

const StyledInputHint = styled.p`
  display: block;
  flex: 1;
  margin-top: -3px;
  margin-bottom: 8px;
  color: var(--colorsUtilityYin055);
  white-space: pre-wrap;
`;

const StyledHintText = styled.div`
  margin-top: 0px;
  margin-bottom: 8px;
  color: var(--colorsUtilityYin055);
  font-size: 14px;
`;

export { StyledHintText, ErrorBorder, StyledInputHint };
