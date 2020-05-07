import React from 'react';
import PropTypes from 'prop-types';
import StyledFlatTableHeader from './flat-table-header.style';

const FlatTableHeader = ({
  align, children, colspan, rowspan
}) => {
  return (
    <StyledFlatTableHeader
      align={ align }
      data-element='flat-table-header'
      colSpan={ colspan }
      rowSpan={ rowspan }
    >
      { children }
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(['center', 'left', 'right']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Number of columns that a header cell should span */
  colspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Number of rows that a header cell should span */
  rowspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

FlatTableHeader.defaultProps = {
  align: 'left'
};

export default FlatTableHeader;
