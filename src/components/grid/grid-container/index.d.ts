import propTypes from "@styled-system/space";
import { GridItemProps } from "../grid-item";
import { SpacingProps } from "../../../utils/helpers/options-helper";

export interface GridContainerProps extends SpacingProps {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children: Array<React.ReactElement<GridItemProps>> | React.ReactElement<GridItemProps>;
  /** Any valid CSS value to override default grid-gap */
  gridGap?: string | number;
}

declare const GridContainer: React.FunctionComponent<GridContainerProps>;

export default GridContainer;
