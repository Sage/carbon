import * as React from "react";
import { LayoutProps, FlexboxProps } from "styled-system";
import { Expand, ExplicitUnion } from "../../__internal__/utils/helpers/types";

type menuType = "light" | "dark" | "white" | "black";
interface MenuContextProps {
  menuType: menuType;
  isFirstElement: boolean;
  handleKeyDown: (
    ev: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>,
    submenuOpen?: boolean
  ) => void;
  isFocused: boolean;
  openSubmenu: boolean;
  inMenu: boolean;
}

export interface MenuProps extends Expand<LayoutProps>, Expand<FlexboxProps> {
  /** Children elements */
  children: React.ReactNode;
  /** Defines the color scheme of the component */
  menuType?: ExplicitUnion<menuType>;
}

declare const MenuContext: React.Context<MenuContextProps>;
declare function Menu(props: MenuProps): JSX.Element;

export { MenuContext };
export default Menu;
