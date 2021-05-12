import * as React from "react";

export interface MenuDividerProps {
  size?: "default" | "large";
}

declare function MenuDivider(props: MenuDividerProps & React.RefAttributes<HTMLDivElement>): JSX.Element;

export default MenuDivider;
