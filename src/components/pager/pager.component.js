import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Immutable from 'immutable';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerNavigationStyles,
  PagerSummaryStyles
} from './pager.styles';

const Pager = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  function recordsText(numberOfRecords) {
    const count = numberOfRecords >= 0 ? numberOfRecords : 0;
    const descriptor = I18n.t(
      'pager.records',
      { count: Number(numberOfRecords), defaultValue: ' records' }
    );

    return `${count} ${descriptor}`;
  }

  return (
    <PagerContainerStyles>
      <PagerSizeOptionsStyles>Show 100 items</PagerSizeOptionsStyles>
      <PagerNavigationStyles>First Prev Page {currentPage} Next Last</PagerNavigationStyles>
      <PagerSummaryStyles>{recordsText(props.totalRecords)}</PagerSummaryStyles>
    </PagerContainerStyles>
  );
};

Pager.propTypes = {
  /** Current visible page */
  currentPage: PropTypes.string.isRequired,
  /** Total number of records */
  totalRecords: PropTypes.number.isRequired,
  /** Function called when pager changes (PageSize, Current Page) */
  onPagination: PropTypes.func.isRequired,
  /** Pagination page size */
  pageSize: PropTypes.string,
  /** Should the page size selection dropdown be shown */
  showPageSizeSelection: PropTypes.bool,
  /** Set of page size options */
  pageSizeSelectionOptions: PropTypes.object
}

Pager.defaultProps = {
  pageSize: '10',
  showPageSizeSelection: false,
  pageSizeSelectionOptions: Immutable.fromJS([
    { id: '10', name: 10 },
    { id: '25', name: 25 },
    { id: '50', name: 50 }
  ])
}

export default Pager;
