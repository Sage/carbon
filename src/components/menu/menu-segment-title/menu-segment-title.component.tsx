import React, { useContext } from "react";
import { StyledTitle, StyledSegmentChildren } from "./menu-segment-title.style";
import MenuContext from "../__internal__/menu.context";
import { StyledMenuItem } from "../menu.style";
import { VariantType } from "../menu-item";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import SubmenuContext from "../__internal__/submenu/submenu.context";

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
    const menuContext = useContext(MenuContext);
    const { submenuHasMaxWidth } = useContext(SubmenuContext);

    return (
      <StyledMenuItem inSubmenu>
        <StyledTitle
          as={AS_VALUES.includes(as) ? as : /* istanbul ignore next */ "h2"}
          {...tagComponent("menu-segment-title", rest)}
          menuType={menuContext.menuType}
          ref={ref}
          variant={variant}
          shouldWrap={submenuHasMaxWidth}
        >
          {text}
        </StyledTitle>
        {children && (
          <StyledSegmentChildren data-role="menu-segment-children">
            {children}
          </StyledSegmentChildren>
        )}
      </StyledMenuItem>
    );
  },
);

MenuSegmentTitle.displayName = "MenuSegmentTitle";

export default MenuSegmentTitle;
