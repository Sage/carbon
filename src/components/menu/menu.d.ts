import * as React from "react";

interface MenuContextProps {
  menuType: "light" | "dark";
  isFirstElement: boolean;
  handleKeyDown: (ev, submenuOpen) => void;
  isFocused: boolean;
  openSubmenu: boolean;
}

export interface MenuProps {
  /** Children elements */
  children: React.ReactNode;
  /** Defines the color scheme of the component */
  menuType?: "light" | "dark";
}

declare const MenuContext: React.Context<MenuContextProps>;
declare function Menu(props: MenuProps): JSX.Element;

export { MenuContext };
export default Menu;
