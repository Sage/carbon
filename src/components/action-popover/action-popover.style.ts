import styled from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const MenuButton = styled.div.attrs(applyBaseTheme)`
  position: relative;
  width: fit-content;
  margin: auto;
  ${margin}

  [data-component="popover-menu-item"] [data-role="button-child-container"] {
    width: 100%;
    justify-content: start;
  }
`;

export default MenuButton;
