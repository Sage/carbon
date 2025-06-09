import styled, { css } from "styled-components";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import visuallyHidden from "../../style/utils/visually-hidden";

const StyledCharacterCountWrapper = styled.div``;

const StyledCharacterCount = styled.div.attrs(applyBaseTheme)<{
  isOverLimit: boolean;
}>`
  text-align: left;
  font-size: var(--fontSizes100);
  margin-top: var(--spacing050);
  margin-bottom: var(--spacing050);
  color: ${({ isOverLimit }) =>
    isOverLimit
      ? "var(--colorsSemanticNegative500)"
      : "var(--colorsUtilityYin055)"};

  ${({ isOverLimit }) =>
    isOverLimit &&
    css`
      font-weight: var(--fontWeights500);
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

export {
  StyledCharacterCountWrapper,
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
  VisuallyHiddenHint,
};
