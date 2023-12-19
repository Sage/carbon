import React from "react";
import Box, { BoxProps } from "../../box";

export interface FlexTileContainerProps extends Pick<BoxProps, "columnGap"> {
  /** The child elements of FlexTileContainer need to be FlexTileCell components. */
  children: React.ReactNode;
}

export const FlexTileContainer = ({
  children,
  columnGap = 2,
}: FlexTileContainerProps): JSX.Element => {
  if (!children) {
    return <></>;
  }

  return (
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
      data-component="flex-tile-container"
    >
      {children}
    </Box>
  );
};

export default FlexTileContainer;
