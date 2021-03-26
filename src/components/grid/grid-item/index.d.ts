import * as React from "react";

interface ResponsiveSettingsShape {
  /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
  alignSelf?: string;
  /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
  justifySelf?: string;
  /**
   *  Starting row position of the GridItem within the GridContainer
   *  by referring to the grid line where the item begins
   */
  maxWidth?: number;
  /** Starting and ending column position of the GridItem within the GridContainer separated by "/" */
  gridColumn?: string | number;
  /** Starting and ending row position of the GridItem within the GridContainer separated by "/" */
  gridRow?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding */
  p?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-left */
  pl?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-right */
  pr?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-top */
  pt?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-bottom */
  pb?: string | number;
  /**
   * Any valid CSS value or a number to be multiplied by base spacing unit (8).
   * Overrides default horizontal paddings
   */
  px?: string | number;
  /**
   * Any valid CSS value or a number to be multiplied by base spacing unit (8).
   * Overrides default vertical paddings
   */
  py?: string | number;
}

export interface GridItemProps {
  /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
  alignSelf?: string;
  /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
  justifySelf?: string;
  /** Defines the Component(s) to be rendered within the GridItem */
  children?: React.ReactNode;
  /** Starting and ending column position of the GridItem within the GridContainer separated by "/" */
  gridColumn?: string | number;
  /** Starting and ending row position of the GridItem within the GridContainer separated by "/" */
  gridRow?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding */
  p?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-left */
  pl?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-right */
  pr?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-top */
  pt?: string | number;
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-bottom */
  pb?: string | number;
  responsiveSettings?: [ResponsiveSettingsShape];
}

declare function GridItem(props: GridItemProps): JSX.Element;

export default GridItem;
