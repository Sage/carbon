/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import GridItemStyle from "./grid-item.style";

const GridItem = (props) => {
  const {
    children,
    responsiveSettings,
    gridColumn,
    gridRow,
    alignSelf,
    justifySelf,
    p,
    pl,
    pr,
    pt,
    pb,
    px,
    py,
  } = props;

  const styledSystemProps = {
    gridColumn,
    gridRow,
    alignSelf,
    justifySelf,
    p,
    pl,
    pr,
    pt,
    pb,
  };

  if (px) {
    styledSystemProps.px = px;
  }

  if (py) {
    styledSystemProps.py = py;
  }

  return (
    <GridItemStyle
      responsiveSettings={responsiveSettings}
      {...styledSystemProps}
    >
      {children}
    </GridItemStyle>
  );
};

GridItem.propTypes = {
  /** Defines the Component(s) to be rendered within the GridItem */
  children: PropTypes.node,
  /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
  alignSelf: PropTypes.string,
  /** Starting and ending column position of the GridItem within the GridContainer separated by "/" */
  gridColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Starting and ending row position of the GridItem within the GridContainer separated by "/" */
  gridRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
  justifySelf: PropTypes.string,
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
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default horizontal paddings */
  px: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default vertical paddings */
  py: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  responsiveSettings: PropTypes.arrayOf(
    PropTypes.shape({
      /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
      alignSelf: PropTypes.string,
      /** Starting and ending column position of the GridItem within the GridContainer separated by "/" */
      gridColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** Starting and ending row position of the GridItem within the GridContainer separated by "/" */
      gridRow: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
      justifySelf: PropTypes.string,
      /** Maximum width of the item */
      maxWidth: PropTypes.string,
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
    })
  ),
};

export default GridItem;
