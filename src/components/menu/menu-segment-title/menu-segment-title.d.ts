import * as React from "react";

export interface MenuTitleProps {
  children: string;
  variant?: "default" | "alternate";
}

declare function MenuTitle(props: MenuTitleProps & React.RefAttributes<HTMLDivElement>): JSX.Element;

export default MenuTitle;
