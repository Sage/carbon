import React from 'react';
import PropTypes from 'prop-types';
import StyledFlatTableRowHeader from './flat-table-row-header.style';

const FlatTableRowHeader = ({ align, children }) => {
  return (
    <StyledFlatTableRowHeader align={ align } data-element='flat-table-row-header'>
      { children }
    </StyledFlatTableRowHeader>
  );
};

FlatTableRowHeader.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(['center', 'left', 'right']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableRowHeader.defaultProps = {
  align: 'left'
};

export default FlatTableRowHeader;
