import styled, { css } from "styled-components";

import baseTheme from "../../style/themes/base";

const StyledCharacterCount = styled.div<{ isOverLimit: boolean }>`
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

StyledCharacterCount.defaultProps = {
  theme: baseTheme,
};

export default StyledCharacterCount;
