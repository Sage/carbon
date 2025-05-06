import React from "react";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { SpaceProps, WidthProps } from "styled-system";

import StyledTile from "./tile.style";
import { TileProvider } from "./__internal__/tile.context";
import filterStyledSystemPaddingProps from "../../style/utils/filter-styled-system-padding-props";
import filterStyledSystemMarginProps from "../../style/utils/filter-styled-system-margin-props";
import computeContentPadding from "./__internal__/compute-content-padding";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import { TILE_HIGHLIGHT_VARIANTS } from "./tile.config";

type DesignTokensType = keyof typeof DesignTokens;
type HighlightVariantType = (typeof TILE_HIGHLIGHT_VARIANTS)[number];

export interface TileProps extends SpaceProps, WidthProps, TagProps {
  /** Sets the theme of the tile */
  variant?: "tile" | "transparent" | "active" | "grey";
  /**
   * The content to render within the tile. Each child will be wrapped with
   * a TileContent wrapper, which allows any individual child component to take a
   * percentage-based width prop, dictating the percentage of the tile width it will take up.
   *
   * Width will have no effect on a child component if the tile orientation is set to 'vertical'.
   */
  children?: React.ReactNode;
  /** The orientation of the tile - set to either horizontal or vertical */
  orientation?: "horizontal" | "vertical";
  /**
   * Set a percentage-based width for the whole Tile component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width?: string | number;
  /** Sets the border width by using these design tokens */
  borderWidth?: Extract<DesignTokensType, `borderWidth${string}`>;
  /** Sets the border variant that should be used */
  borderVariant?:
    | "default"
    | "selected"
    | "positive"
    | "negative"
    | "caution"
    | "info";
  /** Sets the level of roundness of the corners, "default" is 8px, "large" is 16px and "small" is 4px */
  roundness?: "default" | "large" | "small";
  /**
   * Set a percentage-based height for the whole Tile component, relative to its parent.
   */
  height?: string | number;
  /** Sets the highlight variant */
  highlightVariant?: HighlightVariantType;
}

export const Tile = ({
  variant = "tile",
  p = 3,
  children,
  orientation = "horizontal",
  width = "100%",
  roundness = "default",
  height,
  borderWidth,
  borderVariant,
  highlightVariant,
  ...rest
}: TileProps) => {
  const isHorizontal = orientation === "horizontal";
  const paddingProps = filterStyledSystemPaddingProps({ p, ...rest });
  const marginProps = filterStyledSystemMarginProps(rest);
  const contentPaddingProps = computeContentPadding(paddingProps, isHorizontal);

  return (
    <StyledTile
      variant={variant}
      width={width}
      height={height}
      isHorizontal={isHorizontal}
      p={p}
      roundness={roundness}
      highlightVariant={highlightVariant}
      borderWidth={borderWidth}
      borderVariant={borderVariant}
      {...paddingProps}
      {...marginProps}
      {...tagComponent("tile", rest)}
    >
      <TileProvider
        value={{ isHorizontal, paddingPropsFromTile: contentPaddingProps }}
      >
        {children}
      </TileProvider>
    </StyledTile>
  );
};

export default Tile;
