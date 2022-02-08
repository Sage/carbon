import styled from "styled-components";
import StyledButton from "../../button/button.style";
import StyledIcon from "../../icon/icon.style";

const StyledListActionButtonWrapper = styled.div`
  padding-top: var(--spacing100);
  padding-bottom: var(--spacing100);
  border-top: 1px solid var(--colorsUtilityDisabled600);
  box-shadow: 0 0px 0 0 rgba(0, 0, 0, 0), 0 -8px 8px 0 rgba(0, 0, 0, 0.03);

  ${StyledIcon} {
    color: var(--colorsUtilityYin090);
  }

  ${StyledButton} {
    background: transparent;
    border: none;
    color: var(--colorsUtilityYin090);
    justify-content: left;
    padding-left: var(--spacing200);
    padding-right: var(--spacing200);
    width: 100%;

    :hover {
      background-color: var(--colorsUtilityMajor025);
      ${StyledIcon} {
        color: var(--colorsUtilityYin090);
      }
    }
  }
`;

export default StyledListActionButtonWrapper;
