import styled from "styled-components";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";

import applyBaseTheme from "../../style/themes/apply-base-theme";

const StyledSearchButton = styled.div.attrs(applyBaseTheme)`
  display: flex;
  align-self: end;
  border-bottom: none;

  & ${StyledButton} {
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
      z-index: ${({ theme }) => theme.zIndex.smallOverlay};
    }
  }
`;

export default StyledSearchButton;
