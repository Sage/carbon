import React from 'react';
import PropTypes from 'prop-types';
import GridContainerStyle from './grid-container.style';
import GridItem from '../grid-item';

const GridContainer = (props) => {
  const {
    children
  } = props;
  return (
    <GridContainerStyle data-component='grid'>
      {children}
    </GridContainerStyle>
  );
};

GridContainer.propTypes = {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: PropTypes.oneOfType([GridItem, PropTypes.arrayOf(GridItem)]).isRequired
};
export default GridContainer;
