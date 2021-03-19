import * as React from "react";

export interface MenuTitleProps {
  children: string;
  variant?: "default" | "alternate";
}

declare const MenuTitle: React.ComponentType<MenuTitleProps>;
export default MenuTitle;
