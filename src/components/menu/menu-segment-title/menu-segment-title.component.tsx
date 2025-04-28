import React, { useContext, useMemo } from "react";
import { StyledTitle, StyledSegmentChildren } from "./menu-segment-title.style";

import { useStrictMenuContext } from "../__internal__/strict-menu.context";
import { StyledMenuItem } from "../menu.style";
import { VariantType } from "../menu-item";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import MenuSegmentContext from "./menu-segment-title.context";

const AS_VALUES = ["h2", "h3", "h4", "h5", "h6"] as const;

type AllowedAsValues = (typeof AS_VALUES)[number];
export interface MenuTitleProps extends TagProps {
  children?: React.ReactNode;
  text: string;
  /** Set the colour variant for a menuType */
  variant?: VariantType;
  /** Set the heading level for the segment title */
  as?: AllowedAsValues;
}

const MenuSegmentTitle = React.forwardRef<HTMLDivElement, MenuTitleProps>(
  (
    { children, variant = "default", text, as = "h2", ...rest }: MenuTitleProps,
    ref,
  ) => {
    const { menuType, inFullscreenView } = useStrictMenuContext();
    const { submenuHasMaxWidth } = useContext(SubmenuContext);

    const isChildOfFullscreenMenu = !!inFullscreenView;

    const overriddenVariant = useMemo(() => {
      return isChildOfFullscreenMenu &&
        variant === "alternate" &&
        ["white", "black"].includes(menuType)
        ? "default"
        : variant;
    }, [isChildOfFullscreenMenu, menuType, variant]);

    return (
      <StyledMenuItem inSubmenu>
        <StyledTitle
          as={AS_VALUES.includes(as) ? as : /* istanbul ignore next */ "h2"}
          {...tagComponent("menu-segment-title", rest)}
          menuType={menuType}
          ref={ref}
          variant={overriddenVariant}
          shouldWrap={submenuHasMaxWidth}
        >
          {text}
        </StyledTitle>
        {children && (
          <StyledSegmentChildren
            data-role="menu-segment-children"
            menuType={menuType}
            variant={overriddenVariant}
          >
            <MenuSegmentContext.Provider
              value={{ isChildOfSegment: true, overriddenVariant }}
            >
              {children}
            </MenuSegmentContext.Provider>
          </StyledSegmentChildren>
        )}
      </StyledMenuItem>
    );
  },
);

MenuSegmentTitle.displayName = "MenuSegmentTitle";

export default MenuSegmentTitle;
