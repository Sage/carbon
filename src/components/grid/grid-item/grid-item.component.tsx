import React from "react";

import StyledGridItem, { StyledGridItemProps } from "./grid-item.style";

export interface GridItemProps
  extends StyledGridItemProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Defines the Component(s) to be rendered within the GridItem */
  children?: React.ReactNode;
}

export const GridItem = (props: GridItemProps) => {
  const { children, responsiveSettings, ...rest } = props;
  return (
    <StyledGridItem {...rest} responsiveSettings={responsiveSettings}>
      {children}
    </StyledGridItem>
  );
};

GridItem.displayName = "GridItem";
export default GridItem;
