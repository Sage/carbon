import React from "react";
import Box, { BoxProps } from "../../box";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface FlexTileCellProps extends TagProps, BoxProps {
  /** The content to render within the responsive cell. */
  children: React.ReactNode;
}

const FlexTileCell = ({
  children,
  flexGrow = 1,
  flexBasis = "160px",
  flexShrink = 0,
  ...rest
}: FlexTileCellProps): JSX.Element => {
  if (!children) {
    return <></>;
  }

  return (
    <Box
      display="flex"
      position="relative"
      flexGrow={flexGrow}
      flexBasis={flexBasis}
      flexShrink={flexShrink}
      {...rest}
      {...tagComponent("flex-tile-cell", rest)}
    >
      {children}
    </Box>
  );
};

export default FlexTileCell;
