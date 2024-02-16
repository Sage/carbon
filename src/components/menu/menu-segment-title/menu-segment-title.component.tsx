import React, { useContext } from "react";
import { StyledTitle, StyledSegmentChildren } from "./menu-segment-title.style";
import MenuContext from "../menu.context";
import { StyledMenuItem } from "../menu.style";
import { VariantType } from "../menu-item";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

const AS_VALUES = ["h2", "h3", "h4", "h5", "h6"] as const;

type AllowedAsValues = typeof AS_VALUES[number];
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
    ref
  ) => {
    const menuContext = useContext(MenuContext);

    return (
      <StyledMenuItem inSubmenu>
        <StyledTitle
          as={AS_VALUES.includes(as) ? as : /* istanbul ignore next */ "h2"}
          {...tagComponent("menu-segment-title", rest)}
          menuType={menuContext.menuType}
          ref={ref}
          variant={variant}
        >
          {text}
        </StyledTitle>
        {children && (
          <StyledSegmentChildren data-element="segment-child">
            {children}
          </StyledSegmentChildren>
        )}
      </StyledMenuItem>
    );
  }
);

MenuSegmentTitle.displayName = "MenuSegmentTitle";

export default MenuSegmentTitle;
