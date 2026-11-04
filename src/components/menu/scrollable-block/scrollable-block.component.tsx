import React from "react";

import MenuItemVariantContext from "../__internal__/menu-item-variant.context";
import MenuItem, { VariantType } from "../menu-item";
import StyledScrollableBlock, {
  ScrollableContainer,
} from "./scrollable-block.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface ScrollableBlockProps extends TagProps {
  /** Children elements */
  children: React.ReactNode;
  /** A custom height to be applied to the component. */
  height?: string | number;
  /** A custom max height to be applied to the component. */
  maxHeight?: string | number;
  /** Set the variant of the ScrollableBlock */
  variant?: VariantType;
  /** the element, if any, displayed at the top of the block to be its semantic "parent",
   * but not part of the scrollable section
   */
  parent?: React.ReactElement;
  /** the colour variant for the parent element, if different from the variant of the block */
  parentVariant?: VariantType;
}

export const ScrollableBlock = ({
  children,
  height,
  maxHeight,
  variant = "default",
  parent,
  parentVariant,
  ...rest
}: ScrollableBlockProps) => {
  return (
    <StyledScrollableBlock
      {...rest}
      {...tagComponent("submenu-scrollable-block", rest)}
    >
      {parent && (
        <MenuItem
          data-component="scrollable-block-parent"
          variant={parentVariant}
          as="div"
          data-role="scrollable-block-parent-menu-item"
        >
          {parent}
        </MenuItem>
      )}
      <ScrollableContainer role="list" $height={height} $maxHeight={maxHeight}>
        <MenuItemVariantContext.Provider value={{ menuItemVariant: variant }}>
          {children}
        </MenuItemVariantContext.Provider>
      </ScrollableContainer>
    </StyledScrollableBlock>
  );
};

export default ScrollableBlock;
