import styled from "styled-components";
import StyledButton from "../../../button/__internal__/__next__/button.style";

const StyledListActionButtonWrapper = styled.div`
  padding-top: var(--spacing100);
  padding-bottom: var(--spacing100);
  border-top: 1px solid var(--colorsUtilityDisabled600);
  box-shadow:
    0 0px 0 0 rgba(0, 0, 0, 0),
    0 -8px 8px 0 rgba(0, 0, 0, 0.03);
  width: 100%;
  position: sticky;
  bottom: 0;
  background-color: inherit;
  border-bottom-left-radius: var(--borderRadius050);
  border-bottom-right-radius: var(--borderRadius050);

  ${StyledButton} {
    border: none;
    justify-content: left;
    padding-left: var(--spacing200);
    padding-right: var(--spacing200);
  }
`;

export default StyledListActionButtonWrapper;
