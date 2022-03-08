import React from "react";
import styledSystemPropTypes from "@styled-system/prop-types";
import GridContainerStyle from "./grid-container.style";
import GridItem from "../grid-item";

const GridContainer = (props) => {
  const { children, ...rest } = props;
  return (
    <GridContainerStyle data-component="grid" {...rest}>
      {children}
    </GridContainerStyle>
  );
};

GridContainer.propTypes = {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: (props, propName, componentName) => {
    let error;
    const prop = props[propName];

    React.Children.forEach(prop, (child) => {
      if (!child) {
        return;
      }

      if (GridItem.displayName !== child.type.displayName) {
        error = new Error(
          `\`${componentName}\` only accepts children of type \`${GridItem.displayName}\`.`
        );
      }
    });

    return error;
  },
  ...styledSystemPropTypes.space,
  ...styledSystemPropTypes.grid,
};
export default GridContainer;
