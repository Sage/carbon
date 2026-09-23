import React from "react";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import { SpaceProps, WidthProps } from "styled-system";

import { StyledTile, StyledTileWrapper, StyledTileKeyline } from "./tile.style";
import { TileProvider } from "./__internal__/tile.context";
import filterStyledSystemPaddingProps from "../../style/utils/filter-styled-system-padding-props";
import filterStyledSystemMarginProps from "../../style/utils/filter-styled-system-margin-props";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  TILE_HIGHLIGHT_VARIANTS,
  STATUS_KEYLINE_VARIANTS,
  HIGHLIGHT_VARIANT_TO_STATUS_KEYLINE_MAP,
  TILE_ROUNDNESS_VALUE_MAP,
  TILE_VARIANT_DEPRECATION_MAP,
} from "./tile.config";
import Logger from "../../__internal__/utils/logger";

export type Roundness = "curved" | "moderate";
export type LegacyRoundness = "default" | "large" | "small";
type DesignTokensType = keyof typeof DesignTokens;
type HighlightVariantType = (typeof TILE_HIGHLIGHT_VARIANTS)[number];
export type DeprecatedTileVariants = "tile" | "transparent" | "active" | "grey";
export type TileVariants =
  | "standard"
  | "alt"
  | "positive"
  | "negative"
  | "unavailable";

export interface TileProps extends SpaceProps, WidthProps, TagProps {
  /** Sets the theme of the tile */
  variant?: TileVariants | DeprecatedTileVariants;
  /**
   * The content to render within the tile. Each child will be wrapped with
   * a TileContent wrapper, which allows any individual child component to take a
   * percentage-based width prop, dictating the percentage of the tile width it will take up.
   *
   * Width will have no effect on a child component if the tile orientation is set to 'vertical'.
   */
  children?: React.ReactNode;
  /** The orientation of the tile - set to either horizontal or vertical
   * @deprecated The `orientation` prop has been deprecated and will be removed in a future version.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Set a percentage-based width for the whole Tile component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width?: string | number;
  /** Sets the border width by using these design tokens
   * @deprecated The `borderWidth` prop is depreacted and will be removed in a future version.
   */
  borderWidth?: Extract<DesignTokensType, `borderWidth${string}`>;
  /** Sets the border variant that should be used
   * @deprecated The `borderVariant` prop has been deprecated and will be removed in a future version. Use the `outline` prop instead.
   */
  borderVariant?:
    | "default"
    | "selected"
    | "positive"
    | "negative"
    | "caution"
    | "info";
  /** Sets the level of roundness of the corners. Values can be "curved" or "moderate". Legacy values "default", "large", and "small" are also supported but deprecated and should not be used. */
  roundness?: Roundness | LegacyRoundness;
  /**
   * Set a percentage-based height for the whole Tile component, relative to its parent.
   */
  height?: string | number;
  /** Sets the highlight variant
   * @deprecated The `highlightVariant` prop has been deprecated and will be removed in a future version. Use the `statusKeyline` prop instead.
   */
  highlightVariant?: HighlightVariantType;
  /** Adds an outline to the tile to increase its visual prominence */
  outline?: boolean;
  /** Inverts the tile colors for use on dark backgrounds for the 'standard' and 'alt' variants */
  inverse?: boolean;
  /** Sets the status keyline to indicate the status of the content within the tile */
  statusKeyline?: (typeof STATUS_KEYLINE_VARIANTS)[number];
}

let deprecatedRoundnessValueTrigger = false;

const Tile = ({
  variant = "standard",
  p,
  children,
  width = "100%",
  roundness = "curved",
  height,
  highlightVariant,
  outline,
  inverse,
  statusKeyline,
  ...rest
}: TileProps) => {
  if (
    !deprecatedRoundnessValueTrigger &&
    ["default", "large", "small"].includes(roundness)
  ) {
    deprecatedRoundnessValueTrigger = true;
    Logger.deprecate(
      `The legacy roundness value: '${roundness}' in Tile is deprecated. Please use 'curved' or 'moderate' instead.`,
    );
  }

  const actualRoundness = TILE_ROUNDNESS_VALUE_MAP[roundness];
  const paddingProps = filterStyledSystemPaddingProps({ p, ...rest });
  const marginProps = filterStyledSystemMarginProps(rest);

  const statusKeylineValue = statusKeyline
    ? statusKeyline
    : highlightVariant
      ? HIGHLIGHT_VARIANT_TO_STATUS_KEYLINE_MAP[highlightVariant]
      : undefined;

  let actualVariant: TileVariants;
  if (variant in TILE_VARIANT_DEPRECATION_MAP) {
    actualVariant =
      TILE_VARIANT_DEPRECATION_MAP[variant as DeprecatedTileVariants];
  } else {
    actualVariant = variant as TileVariants;
  }

  const [hasFooter, setHasFooter] = React.useState(false);
  const [footerVariant, setFooterVariant] = React.useState<
    "selected" | "active" | undefined
  >(undefined);

  return (
    <StyledTileWrapper
      data-role="tile-wrapper"
      roundness={actualRoundness}
      width={width}
      height={height}
    >
      <TileProvider
        value={{
          hasFooter,
          setHasFooter,
          footerVariant,
          setFooterVariant,
        }}
      >
        <StyledTileKeyline
          data-role="tile-keyline"
          statusKeyline={statusKeylineValue}
          inverse={inverse}
        />
        <StyledTile
          variant={actualVariant}
          p={p}
          roundness={actualRoundness}
          {...paddingProps}
          {...marginProps}
          {...tagComponent("tile", rest)}
          outline={outline}
          inverse={inverse}
          statusKeyline={statusKeylineValue}
          $hasFooter={hasFooter}
          $footerVariant={footerVariant}
        >
          {children}
        </StyledTile>
      </TileProvider>
    </StyledTileWrapper>
  );
};

export default Tile;
