import React from "react";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import StyledGridItem, { StyledGridItemProps } from "./grid-item.style";

export interface GridItemProps
  extends StyledGridItemProps,
    React.HTMLAttributes<HTMLDivElement>,
    TagProps {
  /** Defines the Component(s) to be rendered within the GridItem */
  children?: React.ReactNode;
}

export const GridItem = (props: GridItemProps) => {
  const { children, responsiveSettings, ...rest } = props;
  return (
    <StyledGridItem
      {...rest}
      {...tagComponent("grid-item", rest)}
      responsiveSettings={responsiveSettings}
    >
      {children}
    </StyledGridItem>
  );
};

GridItem.displayName = "GridItem";
export default GridItem;
