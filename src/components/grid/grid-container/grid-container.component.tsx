import React from "react";
import { SpaceProps, GridProps } from "styled-system";

import { Expand } from "../../../__internal__/utils/helpers/types";
import StyledGridContainer from "./grid-container.style";

export interface GridContainerProps
  extends Expand<SpaceProps>,
    GridProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children?: React.ReactNode;
}

export const GridContainer = (props: GridContainerProps) => (
  <StyledGridContainer data-component="grid" {...props} />
);

export default GridContainer;
