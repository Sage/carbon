import * as React from "react";
import { LayoutProps, FlexboxProps } from "styled-system";

type menuType = "light" | "dark" | "white" | "black";
interface MenuContextProps {
  menuType: menuType;
  isFirstElement: boolean;
  handleKeyDown: (ev, submenuOpen) => void;
  isFocused: boolean;
  openSubmenu: boolean;
  inMenu: boolean;
}

export interface MenuProps extends LayoutProps, FlexboxProps {
  /** Children elements */
  children: React.ReactNode;
  /** Defines the color scheme of the component */
  menuType?: menuType;
}

declare const MenuContext: React.Context<MenuContextProps>;
declare function Menu(props: MenuProps): JSX.Element;

export { MenuContext };
export default Menu;
