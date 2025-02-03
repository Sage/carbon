import styled from "styled-components";
import Label from "../../__internal__/label";

export const StyledLabel = styled(Label)`
  label {
    font-weight: var(--fontWeights400);
  }
`;

export const StyledHintText = styled.div<{
  isDisabled?: boolean;
  hasError?: boolean;
}>`
  ::after {
    content: " ";
  }

  margin-top: var(--spacing000);
  margin-bottom: var(--spacing100);
  color: ${({ isDisabled }) =>
    isDisabled ? "var(--colorsUtilityYin030)" : "var(--colorsUtilityYin055)"};
  font-size: 14px;
`;
