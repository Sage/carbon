import React, { useContext } from "react";
import StyledTitle from "./menu-segment-title.style";
import MenuContext from "../menu.context";
import { StyledMenuItem } from "../menu.style";
import { VariantType } from "../menu-item";

export interface MenuTitleProps {
  children: string;
  /** Set the colour variant for a menuType */
  variant?: VariantType;
}

const MenuSegmentTitle = React.forwardRef<HTMLDivElement, MenuTitleProps>(
  ({ children, variant = "default" }: MenuTitleProps, ref) => {
    const menuContext = useContext(MenuContext);

    return (
      <StyledMenuItem inSubmenu>
        <StyledTitle
          data-component="menu-segment-title"
          menuType={menuContext.menuType}
          ref={ref}
          variant={variant}
        >
          {children}
        </StyledTitle>
      </StyledMenuItem>
    );
  }
);

MenuSegmentTitle.displayName = "MenuSegmentTitle";

export default MenuSegmentTitle;
