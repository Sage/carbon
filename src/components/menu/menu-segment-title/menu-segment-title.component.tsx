import React, { useContext } from "react";
import { StyledTitle, StyledSegmentChildren } from "./menu-segment-title.style";

import { useStrictMenuContext } from "../__internal__/strict-menu.context";
import MenuItemVariantContext from "../__internal__/menu-item-variant.context";
import { StyledMenuItem } from "../menu-item/menu-item.style";
import { VariantType } from "../menu-item";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import SubmenuContext from "../__internal__/submenu/submenu.context";

type AllowedAsValues = "h2" | "h3" | "h4" | "h5" | "h6";
export interface MenuTitleProps extends TagProps {
  /** MenuItem children to be rendered within the segment */
  children?: React.ReactNode;
  /** The text content for the segment title */
  text: string;
  /** Set the variant of the MenuSegmentTitle  */
  variant?: VariantType;
  /** Set the heading level for the segment title */
  as?: AllowedAsValues;
  /** Data tag prop bag for segmented children */
  segmentWrapperProps?: TagProps;
}

const MenuSegmentTitle = React.forwardRef<HTMLDivElement, MenuTitleProps>(
  (
    {
      children,
      variant = "default",
      text,
      as = "h2",
      segmentWrapperProps,
      ...rest
    }: MenuTitleProps,
    ref,
  ) => {
    const { variant: menuVariant, inFullscreenView } = useStrictMenuContext();
    const { submenuMaxWidth } = useContext(SubmenuContext);

    return (
      <StyledMenuItem $inSubmenu $removeHeight>
        <StyledTitle
          as={as}
          {...tagComponent("menu-segment-title", rest)}
          $menuVariant={menuVariant}
          ref={ref}
          $variant={!inFullscreenView ? variant : undefined}
          $shouldWrap={!!submenuMaxWidth}
          $isInFullscreen={inFullscreenView}
        >
          {text}
        </StyledTitle>
        {children && (
          <StyledSegmentChildren
            {...tagComponent("menu-segment-title", {
              "data-role": "menu-segment-children",
              ...segmentWrapperProps,
            })}
          >
            <MenuItemVariantContext.Provider
              value={{ menuItemVariant: variant }}
            >
              {children}
            </MenuItemVariantContext.Provider>
          </StyledSegmentChildren>
        )}
      </StyledMenuItem>
    );
  },
);

MenuSegmentTitle.displayName = "MenuSegmentTitle";

export default MenuSegmentTitle;
