import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import filterStyledSystemPaddingProps from "../../../style/utils/filter-styled-system-padding-props";
import filterStyledSystemMarginProps from "../../../style/utils/filter-styled-system-margin-props";
import Box from "../../box";

export interface TileContentProps extends SpaceProps, TagProps {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

/** @deprecated The `TileContent` component is deprecated and will be removed in a future version. Please use the `Box` component instead. */
const TileContent = ({
  children,
  width,
  height,
  ...rest
}: TileContentProps) => {
  if (!children) {
    return null;
  }

  const spacingProps = {
    ...filterStyledSystemPaddingProps(rest),
    ...filterStyledSystemMarginProps(rest),
  };

  return (
    <Box
      data-role="tile-content"
      width={width}
      height={height}
      flexGrow={width || height ? 0 : 1}
      position="relative"
      boxSizing="border-box"
      display="inline"
      {...spacingProps}
      {...tagComponent("tile-content", rest)}
    >
      {children}
    </Box>
  );
};

export default TileContent;
