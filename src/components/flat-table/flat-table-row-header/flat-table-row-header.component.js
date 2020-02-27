import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StyledFlatTableRowHeader from './flat-table-row-header.style';

const FlatTableRowHeader = ({ align, children }) => {
  return (
    <StyledFlatTableRowHeader align={ align } data-element='flat-table-row-header'>
      { children }
    </StyledFlatTableRowHeader>
  );
};

FlatTableRowHeader.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableRowHeader.defaultProps = {
  align: 'left'
};

export default FlatTableRowHeader;
