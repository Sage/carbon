import styled from "styled-components";

import visuallyHidden from "../../../../../style/utils/visually-hidden";

export const StyledCharacterCounter = styled.div<{ marginTop: string }>`
  text-align: left;
  font-size: var(--fontSizes100);
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: var(--spacing050);
  color: var(--colorsUtilityYin055);
`;

export const VisuallyHiddenCharacterCounter = styled.div`
  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;
