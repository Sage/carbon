import * as React from "react";
import { LayoutProps, FlexBoxProps } from "../../utils/helpers/options-helper";

export interface MenuProps extends LayoutProps, FlexBoxProps {
  children: React.ReactNode;
  menuType?: "light" | "dark";
}

declare const Menu: React.ComponentType<MenuProps>;
export default Menu;
