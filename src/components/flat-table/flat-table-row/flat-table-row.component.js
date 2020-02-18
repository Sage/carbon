import React from 'react';
import PropTypes from 'prop-types';
import StyledFlatTableRow from './flat-table-row.style';

const FlatTableRow = ({ children }) => {
  return (
    <StyledFlatTableRow data-element='flat-table-row'>
      { children }
    </StyledFlatTableRow>
  );
};

FlatTableRow.propTypes = {
  children: PropTypes.node.isRequired
};

export default FlatTableRow;
