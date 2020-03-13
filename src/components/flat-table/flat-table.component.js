import React from 'react';
import PropTypes from 'prop-types';
import { StyledFlatTableWrapper, StyledFlatTable } from './flat-table.style';

const FlatTable = ({
  children,
  hasStickyHead
}) => {
  return (
    <StyledFlatTableWrapper
      hasStickyHead={ hasStickyHead }
    >
      <StyledFlatTable data-component='flat-table'>
        { children }
      </StyledFlatTable>
    </StyledFlatTableWrapper>
  );
};

FlatTable.propTypes = {
  /** FlatTableHead and FlatTableBody */
  children: PropTypes.node.isRequired,
  /** If true, the header does not scroll with the content */
  hasStickyHead: PropTypes.bool
};

export default FlatTable;
