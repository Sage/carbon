import styled from "styled-components";

const StyledCounter = styled.span<{ hasError: boolean }>`
  color: ${({ hasError }) =>
    hasError
      ? "var(--colorsSemanticNegative500)"
      : "var(--colorsUtilityYin055)"};
  width: 100%;
`;

const StyledCounterWrapper = styled.div`
  margin: 16px 16px 0px 4px;
  min-width: 40px;
  height: 21px;
  font-size: 14px;
  display: flex;
  float: right;
  text-align: right;
  align-items: center;
`;

export { StyledCounter, StyledCounterWrapper };
