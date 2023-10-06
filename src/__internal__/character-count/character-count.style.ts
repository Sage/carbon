import styled, { css } from "styled-components";

import baseTheme from "../../style/themes/base";
import visuallyHidden from "../../style/utils/visually-hidden";

const StyledCharacterCountWrapper = styled.div``;

const StyledCharacterCount = styled.div<{ isOverLimit: boolean }>`
  ::after {
    content: " ";
  }

  text-align: left;
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

const VisuallyHiddenCharacterCount = styled.div`
  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;

const VisuallyHiddenHint = styled.div`
  ::before {
    content: " ";
  }

  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;

StyledCharacterCount.defaultProps = {
  theme: baseTheme,
};

export {
  StyledCharacterCountWrapper,
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
  VisuallyHiddenHint,
};
