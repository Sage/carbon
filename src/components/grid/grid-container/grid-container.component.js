import React from 'react';
import PropTypes from 'prop-types';
import GridContainerStyle from './grid-container.style';
import GridItem from '../grid-item';

const GridContainer = (props) => {
  const {
    children,
    m,
    ml,
    mr,
    mt,
    mb,
    mx,
    my,
    gridGap
  } = props;

  const styledSystemProps = {
    m,
    ml,
    mr,
    mt,
    mb,
    gridGap
  };

  if (mx) {
    styledSystemProps.mx = mx;
  }

  if (my) {
    styledSystemProps.my = my;
  }

  return (
    <GridContainerStyle
      data-component='grid'
      { ...styledSystemProps }
    >
      {children}
    </GridContainerStyle>
  );
};

GridContainer.propTypes = {
  /** Defines the Components to be rendered within the GridContainer. Requires a GridItem */
  children: PropTypes.oneOfType([GridItem, PropTypes.arrayOf(GridItem)]).isRequired,
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin */
  m: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-left */
  ml: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-right */
  mr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-top */
  mt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default margin-bottom */
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default horizontal margins */
  mx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value or a number to be multiplied by base spacing unit (8). Overrides default vertical margins */
  my: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Any valid CSS value to override default grid-gap */
  gridGap: PropTypes.string
};
export default GridContainer;
