import React from "react";
import { SpaceProps, GridProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import StyledGridContainer from "./grid-container.style";

/**
 * @deprecated `GridContainer` has been deprecated. See the Carbon documentation for migration details.
 */
export interface GridContainerProps
  extends SpaceProps,
    GridProps,
    React.HTMLAttributes<HTMLDivElement>,
    TagProps {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children?: React.ReactNode;
}

/**
 * @deprecated `GridContainer` has been deprecated. See the Carbon documentation for migration details.
 */
const GridContainer = (props: GridContainerProps) => (
  <StyledGridContainer {...props} {...tagComponent("grid", props)} />
);

export default GridContainer;
