import styled from "styled-components";

import visuallyHidden from "../../../../../style/utils/visually-hidden";

export const StyledCharacterCounter = styled.div`
  text-align: left;
  font-size: var(--fontSizes100);
  margin-top: var(--spacing050);
  margin-bottom: var(--spacing050);
  color: var(--colorsUtilityYin055);
`;

export const VisuallyHiddenCharacterCounter = styled.div`
  ::after {
    content: " ";
  }

  ${visuallyHidden}
`;

export default StyledCharacterCounter;
