import React from "react";

import StyledMenuItemContent from "./responsive-vertical-menu-item.style";
import { ResponsiveVerticalMenuButtonItem } from "../responsive-vertical-menu.context";
import Icon, { IconType } from "../../../icon";

export interface MenuItemProps {
  item: ResponsiveVerticalMenuButtonItem;
}

export interface MenuItemContentProps {
  customIcon?: () => React.JSX.Element;
  icon?: IconType;
  label?: string;
}

const MenuItemContent = ({ customIcon, icon, label }: MenuItemContentProps) => {
  return customIcon ? (
    <StyledMenuItemContent>
      {customIcon()}
      {label}
    </StyledMenuItemContent>
  ) : (
    <StyledMenuItemContent>
      {icon && <Icon type={icon} />}
      {label}
    </StyledMenuItemContent>
  );
};

export default MenuItemContent;
