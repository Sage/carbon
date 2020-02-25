import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StyledFlatTableCell from './flat-table-cell.style';

const FlatTableCell = ({ align, children }) => {
  return (
    <StyledFlatTableCell align={ align } data-element='flat-table-cell'>
      { children }
    </StyledFlatTableCell>
  );
};

FlatTableCell.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableCell.defaultProps = {
  align: 'left'
};

export default FlatTableCell;
