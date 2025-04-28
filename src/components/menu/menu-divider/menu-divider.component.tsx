import React from "react";
import StyledDivider from "./menu-divider.style";
import { useStrictMenuContext } from "../__internal__/strict-menu.context";
import { StyledMenuItem } from "../menu.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface MenuDividerProps extends TagProps {
  size?: "default" | "large";
}

const MenuDivider = React.forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ size = "default", ...rest }: MenuDividerProps, ref) => {
    const { menuType } = useStrictMenuContext();

    return (
      <StyledMenuItem inSubmenu>
        <StyledDivider
          size={size}
          {...tagComponent("menu-divider", rest)}
          menuType={menuType}
          ref={ref}
        />
      </StyledMenuItem>
    );
  },
);

MenuDivider.displayName = "MenuDivider";

export default MenuDivider;
