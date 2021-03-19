import * as React from "react";

export interface MenuProps {
  children: React.ReactNode;
  menuType?: "light" | "dark";
}

declare const Menu: React.ComponentType<MenuProps>;
export default Menu;
