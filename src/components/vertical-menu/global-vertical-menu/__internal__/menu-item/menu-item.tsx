import React from "react";

import StyledMenuItemContent from "./menu-item.style";
import { V2MenuItem } from "../../global-vertical-menu.context";
import Icon, { IconType } from "../../../../icon";

export interface MenuItemProps {
  item: V2MenuItem;
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
