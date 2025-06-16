import React from "react";
import { SpaceProps } from "styled-system";
import StyledTileContent from "./tile-content.style";
import { useTileContext } from "../__internal__/tile.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import filterStyledSystemPaddingProps from "../../../style/utils/filter-styled-system-padding-props";
import filterStyledSystemMarginProps from "../../../style/utils/filter-styled-system-margin-props";

export interface TileContentProps extends SpaceProps, TagProps {
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

const TileContent = ({
  children,
  width,
  height,
  ...rest
}: TileContentProps) => {
  const { isHorizontal, paddingPropsFromTile } = useTileContext();

  if (!children) {
    return null;
  }

  const spacingProps = {
    ...filterStyledSystemPaddingProps(rest),
    ...filterStyledSystemMarginProps(rest),
  };

  return (
    <StyledTileContent
      width={width}
      height={height}
      isHorizontal={isHorizontal}
      {...paddingPropsFromTile}
      {...spacingProps}
      {...tagComponent("tile-content", rest)}
    >
      {children}
    </StyledTileContent>
  );
};

export default TileContent;
