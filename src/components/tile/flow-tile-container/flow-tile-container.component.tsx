import React from "react";
import Box, { BoxProps } from "../../box";

export interface FlowTileContainerProps extends Pick<BoxProps, "columnGap"> {
  /** The child elements of ResponsiveTileContainer need to be ResponsiveCell components. */
  children: React.ReactNode;
}

export const ResponsiveTileContainer = ({
  children,
  columnGap = 2,
}: FlowTileContainerProps) => (
  <Box
    alignContent="stretch"
    alignItems="stretch"
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    columnGap={columnGap}
    justifyContent="flex-start"
    overflow="hidden"
    width="100%"
    data-component="responsive-tile-container"
  >
    {children}
  </Box>
);

export default ResponsiveTileContainer;
