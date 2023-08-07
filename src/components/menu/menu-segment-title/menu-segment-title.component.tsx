import React, { useContext } from "react";
import StyledTitle from "./menu-segment-title.style";
import MenuContext from "../menu.context";
import { StyledMenuItem } from "../menu.style";
import { VariantType } from "../menu-item";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface MenuTitleProps extends TagProps {
  children: string;
  /** Set the colour variant for a menuType */
  variant?: VariantType;
}

const MenuSegmentTitle = React.forwardRef<HTMLDivElement, MenuTitleProps>(
  ({ children, variant = "default", ...rest }: MenuTitleProps, ref) => {
    const menuContext = useContext(MenuContext);

    return (
      <StyledMenuItem inSubmenu>
        <StyledTitle
          {...tagComponent("menu-segment-title", rest)}
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
