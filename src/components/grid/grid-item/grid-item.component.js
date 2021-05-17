/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import GridItemStyle from "./grid-item.style";
import { filterStyledSystemPaddingProps } from "../../../style/utils";

const GridItem = (props) => {
  const { children, responsiveSettings, ...rest } = props;
  return (
    <GridItemStyle responsiveSettings={responsiveSettings} {...rest}>
      {children}
    </GridItemStyle>
  );
};

const paddingPropTypes = filterStyledSystemPaddingProps(
  styledSystemPropTypes.space
);

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
  ...paddingPropTypes,
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
      ...paddingPropTypes,
    })
  ),
};

GridItem.displayName = "GridItem";
export default GridItem;
