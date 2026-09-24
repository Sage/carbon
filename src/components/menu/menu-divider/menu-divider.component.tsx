import React from "react";
import StyledDivider from "./menu-divider.style";
import { useStrictMenuContext } from "../__internal__/strict-menu.context";
import { StyledMenuItem } from "../menu-item/menu-item.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface MenuDividerProps extends TagProps {
  size?: "default" | "large";
}

const MenuDivider = React.forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ size = "default", ...rest }: MenuDividerProps, ref) => {
    const { variant, inFullscreenView } = useStrictMenuContext();

    return (
      <StyledMenuItem
        $inSubmenu
        $removeHeight
        aria-hidden="true"
        data-role="divider-container"
      >
        <StyledDivider
          $size={size}
          {...tagComponent("menu-divider", rest)}
          $menuVariant={variant}
          $inFullscreenView={inFullscreenView}
          ref={ref}
        />
      </StyledMenuItem>
    );
  },
);

MenuDivider.displayName = "MenuDivider";

export default MenuDivider;
