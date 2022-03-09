import styled, { css } from "styled-components";

const StyledCharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 4px;
  color: ${({ isOverLimit }) =>
    isOverLimit
      ? "var(--colorsSemanticNegative500)"
      : "var(--colorsUtilityYin055)"};

  ${({ isOverLimit }) =>
    isOverLimit &&
    css`
      font-weight: 700;
    `}
`;

export default StyledCharacterCount;
