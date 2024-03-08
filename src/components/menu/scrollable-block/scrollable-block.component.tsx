import React, { useContext, useEffect, useState } from "react";

import MenuContext from "../menu.context";
import MenuItem, { VariantType } from "../menu-item";
import StyledScrollableBlock from "./scrollable-block.style";
import Box from "../../box";
import { ScrollVariant } from "../../box/box.component";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface ScrollableBlockProps extends TagProps {
  /** Children elements */
  children: React.ReactNode;
  /** A custom height to be applied to the component. */
  height?: string | number;
  /** set the colour variant for a menuType */
  variant?: VariantType;
  /** the element, if any, displayed at the top of the block to be its semantic "parent",
   * but not part of the scrollable section
   */
  parent?: React.ReactElement;
  /** the colour variant for the parent element, if different from the variant of the block */
  parentVariant?: VariantType;
  /** private prop to allow radius styling to be applied */
  applyRadiusStyling?: boolean;
}

export const ScrollableBlock = ({
  children,
  height,
  variant = "default",
  parent,
  parentVariant,
  ...rest
}: ScrollableBlockProps) => {
  const { menuType } = useContext(MenuContext);

  const scrollVariants: Record<string, ScrollVariant> = {
    light: "light",
    dark: "dark",
    white: "light",
    black: "dark",
  };

  const [
    shouldApplyRadiusStyles,
    setShouldApplyRadiusStyles,
  ] = useState<boolean>(true);

  const scrollableBlock = document.querySelector(
    '[data-component="submenu-scrollable-block"]'
  );

  const submenuBlock = document.querySelector('[data-component="submenu"]');

  const listItems = scrollableBlock?.querySelectorAll(
    '[data-component="menu-item"] li'
  );

  // Work out if the last item in the scrollable-block is visible
  useEffect(() => {
    if (!listItems || !submenuBlock) {
      return;
    }

    const lastItemRect = listItems[
      listItems.length - 1
    ].getBoundingClientRect();

    const isLastItemVisible =
      lastItemRect.bottom < submenuBlock.getBoundingClientRect().bottom;

    // If the last item is not visible then the radius styling should be applied
    // as this means it is in the overflow of the scroll block.
    setShouldApplyRadiusStyles(!isLastItemVisible);
  }, [children, listItems, submenuBlock]);

  return (
    <StyledScrollableBlock
      {...tagComponent("submenu-scrollable-block", rest)}
      menuType={menuType}
      variant={variant}
      applyRadiusStyling={shouldApplyRadiusStyles}
      {...rest}
    >
      {parent && (
        <MenuItem
          data-component="scrollable-block-parent"
          overrideColor
          variant={parentVariant}
          p="2px 16px"
          as="div"
        >
          {parent}
        </MenuItem>
      )}
      <Box
        overflowY="scroll"
        scrollVariant={scrollVariants[menuType]}
        height={height}
        p={0}
        as="ul"
        role="list"
      >
        {children}
      </Box>
    </StyledScrollableBlock>
  );
};

export default ScrollableBlock;
