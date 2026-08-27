import styled from "styled-components";
import { margin } from "styled-system";

import applyBaseTheme from "../../style/themes/apply-base-theme";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import addFocusStyling from "../../style/utils/add-focus-styling";

const MenuButton = styled.div.attrs(applyBaseTheme)`
  position: relative;
  && ${StyledIcon} {
    cursor: pointer;
  }
  width: fit-content;
  margin: auto;
  ${margin}
`;

const MenuButtonOverrideWrapper = styled.div`
  ${StyledButton} {
    padding: 0px var(--sizing100);
    width: 100%;

    [data-component="icon"] {
      color: inherit;
    }

    &:hover,
    &:focus {
      background-color: var(--colorsActionMajorTransparent);
      color: var(--colorsActionMajor600);

      [data-component="icon"] {
        color: inherit;
      }
    }

    &[aria-expanded="true"] {
      ${addFocusStyling()}
      background-color: var(--colorsActionMajorTransparent);
      color: var(--colorsActionMajor600);

      [data-component="icon"] {
        color: inherit;
      }
    }
  }
`;

export { MenuButton, MenuButtonOverrideWrapper };
