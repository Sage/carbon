import React from "react";

import { useStrictMenuContext } from "../__internal__/strict-menu.context";
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
}

export const ScrollableBlock = ({
  children,
  height,
  variant = "default",
  parent,
  parentVariant,
  ...rest
}: ScrollableBlockProps) => {
  const { menuType } = useStrictMenuContext();

  const scrollVariants: Record<string, ScrollVariant> = {
    light: "light",
    dark: "dark",
    white: "light",
    black: "dark",
  };

  return (
    <StyledScrollableBlock
      menuType={menuType}
      variant={variant}
      {...rest}
      {...tagComponent("submenu-scrollable-block", rest)}
    >
      {parent && (
        <MenuItem
          data-component="scrollable-block-parent"
          overrideColor
          variant={parentVariant}
          p="2px 16px"
          as="div"
          data-role="scrollable-block-parent-menu-item"
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
