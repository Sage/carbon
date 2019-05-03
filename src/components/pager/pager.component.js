import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Immutable from 'immutable';
import PagerNavigation from './pager-navigation.component';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,

  PagerSummaryStyles,
  PagerSizeOptionsInnerStyles
} from './pager.styles';
import Dropdown from '../dropdown';

const Pager = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  /** Term used to describe table data */
  const descriptor = I18n.t(
    'pager.records',
    { count: Number(props.totalRecords), defaultValue: ' records' }
  );

  function sizeSelector() {
    return (
      <Dropdown
        options={ props.pageSizeSelectionOptions }
        value={ props.pageSize }
        onChange={ (ev) => { props.onPagination('1', ev.target.value, 'size'); } }
        data-element='page-select'
      />
    );
  }

  function pageSizeOptions() {
    const elem = (
      <PagerSizeOptionsInnerStyles>Show {sizeSelector()} {descriptor}</PagerSizeOptionsInnerStyles>
    );

    return props.showPageSizeSelection ? elem : null;
  }

  return (
    <PagerContainerStyles>
      <PagerSizeOptionsStyles>{pageSizeOptions()}</PagerSizeOptionsStyles>
      <PagerNavigation
        { ...props }
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
      />
      <PagerSummaryStyles>{props.totalRecords} {descriptor}</PagerSummaryStyles>
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
};

Pager.defaultProps = {
  pageSize: '10',
  showPageSizeSelection: false,
  pageSizeSelectionOptions: Immutable.fromJS([
    { id: '10', name: 10 },
    { id: '25', name: 25 },
    { id: '50', name: 50 }
  ])
};

export default Pager;
