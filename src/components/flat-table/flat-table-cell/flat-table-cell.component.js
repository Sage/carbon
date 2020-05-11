import React from 'react';
import PropTypes from 'prop-types';
import StyledFlatTableCell from './flat-table-cell.style';

const FlatTableCell = ({
  align,
  children,
  colspan,
  rowspan
}) => {
  return (
    <StyledFlatTableCell
      align={ align }
      data-element='flat-table-cell'
      colSpan={ colspan }
      rowSpan={ rowspan }
    >
      { children }
    </StyledFlatTableCell>
  );
};

FlatTableCell.propTypes = {
  /** Content alignment */
  align: PropTypes.oneOf(['center', 'left', 'right']),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Number of columns that a cell should span */
  colspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Number of rows that a cell should span */
  rowspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

FlatTableCell.defaultProps = {
  align: 'left'
};

export default FlatTableCell;
