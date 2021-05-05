import * as React from "react";
import { IconTypes } from "../../../utils/helpers/options-helper/options-helper";

export interface MenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: IconTypes;
  submenuDirection?: string;
  selected?: boolean;
  submenu?: React.ReactNode | boolean;
  href?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  target?: string;
  variant?: "default" | "alternate";
  showDropdownArrow?: boolean;
  ariaLabel?: string;
}

declare const MenuItem: React.ComponentType<MenuItemProps>;
export default MenuItem;
