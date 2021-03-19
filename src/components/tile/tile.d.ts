import * as React from "react";
import { SpacingProps } from "utils/helpers/options-helper/options-helper";

export interface TileProps extends SpacingProps {
  /** Sets the theme of the tile - either 'tile' or 'transparent' */
  as?: "tile" | "transparent";
  /**
   * The content to render within the tile. Each child will be wrapped with
   * a TileContent wrapper, which allows any individual child component to take a
   * percentage-based width prop, dictating the percentage of the tile width it will take up.
   *
   * Width will have no effect on a child component if the tile orientation is set to 'vertical'.
   */
  children?: React.ReactNode;
  /** The orientation of the tile - set to either horizontal or vertical */
  orientation?: "horizonta" | "vertical";
  /**
   * Set a pixel with for the Tile component. If both are set to non-zero values, this
   * takes precedence over the percentage-based "width" prop.
   */
  pixelWidth?: number;
  /**
   * Set a percentage-based width for the whole Tile component, relative to its parent.
   * If unset or zero, this will default to 100%.
   */
  width?: number;
}

declare const Tile: React.FunctionComponent<TileProps>;

export default Tile;
