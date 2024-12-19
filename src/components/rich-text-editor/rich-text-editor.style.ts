import styled from "styled-components";

import Box from "../box";

const StyledRichTextEditor = styled(Box)`
  position: relative;
`;

export const StyledHintText = styled.div<{
  isDisabled?: boolean;
}>`
  ::after {
    content: " ";
  }

  margin-top: var(--spacing000);
  margin-bottom: var(--spacing150);
  color: ${({ isDisabled }) =>
    isDisabled ? "var(--colorsUtilityYin030)" : "var(--colorsUtilityYin055)"};
  font-size: 14px;
`;

export default StyledRichTextEditor;
