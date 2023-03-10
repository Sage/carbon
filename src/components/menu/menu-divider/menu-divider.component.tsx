import React, { useContext } from "react";
import StyledDivider from "./menu-divider.style";
import MenuContext from "../menu.context";
import { StyledMenuItem } from "../menu.style";

export interface MenuDividerProps {
  size?: "default" | "large";
}

export const MenuDivider = React.forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ size = "default" }: MenuDividerProps, ref) => {
    const menuContext = useContext(MenuContext);

    return (
      <StyledMenuItem inSubmenu>
        <StyledDivider
          size={size}
          data-component="menu-divider"
          menuType={menuContext.menuType}
          ref={ref}
        />
      </StyledMenuItem>
    );
  }
);

MenuDivider.displayName = "MenuDivider";

export default MenuDivider;
