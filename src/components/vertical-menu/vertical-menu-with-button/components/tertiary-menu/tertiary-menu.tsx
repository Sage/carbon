import React from "react";
import StyledTertiaryMenuItem from "./tertiary-menu.style";

export interface TertiaryMenuItemProps {
  href?: string;
  id: string;
  label?: string;
}
export interface TertiaryMenuProps {
  children?: React.ReactNode;
  id: string;
}

export const TertiaryMenuItem = ({
  href,
  id,
  label,
}: TertiaryMenuItemProps) => {
  return (
    <StyledTertiaryMenuItem href={href} id={id} tabIndex={0}>
      {label}
    </StyledTertiaryMenuItem>
  );
};

export const TertiaryMenu = ({ children, id }: TertiaryMenuProps) => {
  return (
    <div id={id} data-component="tertiary-menu">
      {children}
    </div>
  );
};

export default TertiaryMenu;
