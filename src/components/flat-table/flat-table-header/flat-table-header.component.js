import React from 'react';
import PropTypes from 'prop-types';
import StyledFlatTableHeader from './flat-table-header.style';

const FlatTableHeader = ({
  align, children
}) => {
  return (
    <StyledFlatTableHeader
      align={ align }
      data-element='flat-table-header'
    >
      { children }
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(['center', 'left', 'right']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableHeader.defaultProps = {
  align: 'left'
};

export default FlatTableHeader;
