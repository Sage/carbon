import React from "react";
import PropTypes from "prop-types";
import GridContainerStyle from "./grid-container.style";
import GridItem from "../grid-item";

const GridContainer = (props) => {
  const { children, p, pl, pr, pt, pb, px, py, gridGap } = props;

  const styledSystemProps = {
    p,
    pl,
    pr,
    pt,
    pb,
    gridGap,
  };

  if (px) {
    styledSystemProps.px = px;
  }

  if (py) {
    styledSystemProps.py = py;
  }

  return (
    <GridContainerStyle data-component="grid" {...styledSystemProps}>
      {children}
    </GridContainerStyle>
  );
};

GridContainer.propTypes = {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: PropTypes.oneOfType([GridItem, PropTypes.arrayOf(GridItem)])
    .isRequired,
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding */
  p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-left */
  pl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-right */
  pr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-top */
  pt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default padding-bottom */
  pb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Any valid CSS value or a number to be multiplied by base spacing unit (8).
   * Overrides default horizontal paddings
   * */
  px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Any valid CSS value or a number to be multiplied by base spacing unit (8).
   * Overrides default vertical paddings
   * */
  py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value to override default grid-gap */
  gridGap: PropTypes.string,
};
export default GridContainer;
