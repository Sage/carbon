import React, { useMemo } from "react";
import { SpaceProps, GridProps } from "styled-system";
import invariant from "invariant";

import StyledGridContainer from "./grid-container.style";
import GridItem from "../grid-item";

export interface GridContainerProps
  extends SpaceProps,
    GridProps,
    React.HTMLAttributes<HTMLDivElement> {
  /** Defines the Components to be rendered within the GridContainer. Requires GridItemProps */
  children?: React.ReactNode;
}

export const GridContainer = (props: GridContainerProps) => {
  const { children, ...rest } = props;
  const hasProperChildren = useMemo(() => {
    const incorrectChild = React.Children.toArray(children).find(
      (child: React.ReactNode) => {
        if (!React.isValidElement(child)) {
          return true;
        }

        return (
          (child.type as React.FunctionComponent).displayName !==
          GridItem.displayName
        );
      }
    );

    return !incorrectChild;
  }, [children]);

  invariant(
    hasProperChildren,
    `GridContainer only accepts children of type ${GridItem.displayName}.`
  );

  return (
    <StyledGridContainer data-component="grid" {...rest}>
      {children}
    </StyledGridContainer>
  );
};

export default GridContainer;
