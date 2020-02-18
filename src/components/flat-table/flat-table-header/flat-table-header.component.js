import React from 'react';
import PropTypes from 'prop-types';
import OptionsHelper from '../../../utils/helpers/options-helper';
import StyledFlatTableHeader from './flat-table-header.style';

const FlatTableHeader = ({ align, children }) => {
  return (
    <StyledFlatTableHeader align={ align } data-element='flat-table-header'>
      { children }
    </StyledFlatTableHeader>
  );
};

FlatTableHeader.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

FlatTableHeader.defaultProps = {
  align: 'left'
};

export default FlatTableHeader;
