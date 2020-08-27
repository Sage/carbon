import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { StyledFlatTableWrapper, StyledFlatTable } from './flat-table.style';
import { SidebarContext } from '../drawer';

const FlatTable = ({
  children,
  hasStickyHead,
  colorTheme,
  pager
}) => {
  invariant(!pager || pager.type.name === 'Pager', '<FlatTable> pager must be an instance of <Pager>');

  return (
    <SidebarContext.Consumer>
      {isInSidebar => (
        <StyledFlatTableWrapper
          isInSidebar={ isInSidebar }
          hasStickyHead={ hasStickyHead }
          colorTheme={ colorTheme }
          hasPager={ !!pager }
        >
          <StyledFlatTable data-component='flat-table'>
            { children }
          </StyledFlatTable>
          { pager }
        </StyledFlatTableWrapper>
      )}
    </SidebarContext.Consumer>
  );
};

FlatTable.propTypes = {
  /** FlatTableHead and FlatTableBody */
  children: PropTypes.node.isRequired,
  /** If true, the header does not scroll with the content */
  hasStickyHead: PropTypes.bool,
  /** `FlatTable` color theme */
  colorTheme: PropTypes.oneOf(['light', 'transparent-base', 'transparent-white', 'dark']),
  /** `FlatTable` can have an optional `Pager` sibling for pagination of records */
  pager: PropTypes.node
};

FlatTable.defaultProps = {
  colorTheme: 'dark'
};

export default FlatTable;
