import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
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

const gridItemType = PropTypes.shape({
  type: PropTypes.oneOf([GridItem]),
});

GridContainer.propTypes = {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: PropTypes.oneOfType([gridItemType, PropTypes.arrayOf(gridItemType)])
    .isRequired,
  ...propTypes.space,
  gridGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default GridContainer;
