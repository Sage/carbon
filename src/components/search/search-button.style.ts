import styled from "styled-components";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";

import applyBaseTheme from "../../style/themes/apply-base-theme";

export const StyledButtonIcon = styled.div`
  &&& ${StyledIcon} {
    color: var(--colorsActionMajorYang100);
    margin-right: 0px;
  }
`;

const StyledSearchButton = styled.div.attrs(applyBaseTheme)`
  display: flex;
  align-self: end;
  border-bottom: none;
  min-width: fit-content;

  &&& ${StyledButton} {
    color: var(--colorsActionMajorYang100);
    border-color: var(--colorsActionMajorTransparent);
    border-bottom-left-radius: var(--borderRadius000);
    border-top-left-radius: var(--borderRadius000);
    border-bottom-right-radius: var(--borderRadius050);
    border-top-right-radius: var(--borderRadius050);

    :hover {
      border-color: var(--colorsActionMajorTransparent);
    }

    width: fit-content;

    ${StyledIcon}${StyledIcon} {
      color: var(--colorsActionMajorYang100);
    }

    margin: 0px 0px;
    padding-bottom: 3px;

    :focus {
      // Removing the z-index would cause the focus outline to render beneath the input field.
      // Reducing it to 1, keeps the focus outline visible while preventing it from overlapping
      // sticky elements. It can be removed entirely once the Search component no longer depends
      // on the deprecated Button component.
      z-index: 1;
    }
  }
`;

export default StyledSearchButton;
