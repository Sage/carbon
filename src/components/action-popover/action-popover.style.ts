import styled from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const MenuButton = styled.div.attrs(applyBaseTheme)`
  position: relative;
  width: fit-content;
  margin: auto;
  ${margin}

  /*
   * PopoverMenu normally constrains its content to the width available from
   * its control wrapper. ActionPopover's control is an icon-only button, so
   * that available width is only the icon width and causes both menus and
   * submenus to collapse. Allow these menus to use their max-content width.
   */
  [data-role="menu-wrapper"] {
    max-width: none;

    ul[role="list"] {
      max-height: none;
    }
  }
`;

export default MenuButton;
