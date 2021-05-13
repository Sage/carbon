import * as React from "react";
import { PaddingProps } from "styled-system";

interface ResponsiveSettingsShape extends PaddingProps {
  /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
  alignSelf?: string;
  /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
  justifySelf?: string;
  /** Maximum width of the item */
  maxWidth?: string;
  /** Starting and ending column position of the GridItem within the GridContainer separated by "/" */
  gridColumn?: string | number;
  /** Starting and ending row position of the GridItem within the GridContainer separated by "/" */
  gridRow?: string | number;
}

export interface GridItemProps extends PaddingProps {
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
  responsiveSettings?: ResponsiveSettingsShape[];
}

declare function GridItem(props: GridItemProps): JSX.Element;

export default GridItem;
