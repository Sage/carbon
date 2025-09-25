import React from "react";
import { SpaceProps, GridProps } from "styled-system";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import StyledGridContainer from "./grid-container.style";
import Logger from "../../../__internal__/utils/logger";

export interface GridContainerProps
  extends SpaceProps,
    GridProps,
    React.HTMLAttributes<HTMLDivElement>,
    TagProps {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children?: React.ReactNode;
}

let deprecationWarningTriggered = false;

export const GridContainer = (props: GridContainerProps) => {
  if (!deprecationWarningTriggered) {
    Logger.deprecate(
      "The `Grid` component is deprecated and will soon be removed.",
    );
    deprecationWarningTriggered = true;
  }
  return <StyledGridContainer {...props} {...tagComponent("grid", props)} />;
};

export default GridContainer;
