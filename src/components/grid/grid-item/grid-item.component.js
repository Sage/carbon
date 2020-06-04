/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import GridItemStyle from './grid-item.style';

const GridItem = (props) => {
  const {
    children,
    responsiveSettings,
    gridColumnStart,
    gridColumnEnd,
    gridRowStart,
    gridRowEnd,
    alignSelf,
    justifySelf
  } = props;

  return (
    <GridItemStyle
      { ...{
        gridColumnStart,
        gridColumnEnd,
        gridRowStart,
        gridRowEnd,
        alignSelf,
        justifySelf
      } }
      responsiveSettings={ responsiveSettings }
    >
      {children}
    </GridItemStyle>
  );
};

GridItem.propTypes = {
  /** Defines the Component(s) to be rendered within the GridItem */
  children: PropTypes.node,
  /** Starting column position of the GridItem within the GridContainer by referring to the grid line where the item begins */
  gridColumnStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Ending column position of the GridItem within the GridContainer by referring to the grid line where the item ends */
  gridColumnEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Starting row position of the GridItem within the GridContainer by referring to the grid line where the item begins */
  gridRowStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Ending row position of the GridItem within the GridContainer by referring to the grid line where the item ends */
  gridRowEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
  alignSelf: PropTypes.string,
  /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
  justifySelf: PropTypes.string,
  responsiveSettings: PropTypes.arrayOf(
    PropTypes.shape({
      /** How the grid item is aligned along the block (column) axis. Values: start, end, center, stretch */
      alignSelf: PropTypes.string,
      /** Starting column position of the GridItem within the GridContainer by referring to the grid line where the item begins */
      colStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** Ending column position of the GridItem within the GridContainer by referring to the grid line where the item ends */
      colEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** How the grid item is aligned along the inline (row) axis. Values: start, end, center, stretch */
      justifySelf: PropTypes.string,
      /** Starting row position of the GridItem within the GridContainer by referring to the grid line where the item begins */
      maxWidth: PropTypes.string,
      /** Starting row position of the GridItem within the GridContainer by referring to the grid line where the item begins */
      rowStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      /** Ending row position of the GridItem within the GridContainer by referring to the grid line where the item ends */
      rowEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

GridItem.defaultProps = {
  gridColumnStart: 1,
  gridColumnEnd: 13,
  gridRowStart: 'auto',
  gridRowEnd: 'auto'
};

export default GridItem;
