import * as React from "react";
import { SpaceProps, GridProps } from "styled-system";
import { GridItemProps } from "../grid-item/grid-item";

type GridContainerChild =
  | React.ReactElement<GridItemProps>
  | boolean
  | null
  | undefined;

export interface GridContainerProps extends SpaceProps, GridProps {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children?: GridContainerChild | GridContainerChild[];
}

declare function GridContainer(props: GridContainerProps): JSX.Element;

export default GridContainer;
