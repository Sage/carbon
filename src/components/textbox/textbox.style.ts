import styled, { css } from "styled-components";

const ErrorBorder = styled.span`
  ${({ warning }: { warning: boolean }) =>
    css`
      position: absolute;
      z-index: 6;
      width: 2px;
      height: calc(100% + var(--spacing300));
      background-color: ${warning
        ? "var(--colorsSemanticCaution500)"
        : "var(--colorsSemanticNegative500)"};
      left: -12px;
      bottom: 0px;
    `}
`;

const StyledHintText = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
  color: var(--colorsUtilityYin055);
  font-size: 14px;
`;

export { StyledHintText, ErrorBorder };
