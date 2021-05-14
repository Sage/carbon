import { SpaceProps } from "styled-system";
import { GridItemProps } from "../grid-item/grid-item";

type GridContainerChild = React.ReactElement<GridItemProps> | boolean | null | undefined;

export interface GridContainerProps extends SpaceProps {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children: React.ReactElement<GridItemProps> | GridContainerChild[];
  /** Any valid CSS value to override default grid-gap */
  gridGap?: string;
}

declare function GridContainer(props: GridContainerProps): JSX.Element;

export default GridContainer;
