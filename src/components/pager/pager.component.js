import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Immutable from 'immutable';
import { withTheme } from 'styled-components';
import PagerNavigation from './pager-navigation.component';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerSummaryStyles,
  PagerSizeOptionsInnerStyles
} from './pager.styles';
import Dropdown from '../dropdown';
import baseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const Pager = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  const { theme } = props;
  /** Term used to describe table data */
  const descriptor = I18n.t(
    'pager.records',
    {
      count: Number(props.totalRecords),
      defaultValue: (theme && theme.name === THEMES.classic) ? ' records' : ' items'
    }
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
  pageSizeSelectionOptions: PropTypes.object,
  /** Current theme */
  theme: PropTypes.object
};

Pager.defaultProps = {
  pageSize: '10',
  showPageSizeSelection: false,
  pageSizeSelectionOptions: Immutable.fromJS([
    { id: '10', name: 10 },
    { id: '25', name: 25 },
    { id: '50', name: 50 }
  ]),
  theme: baseTheme
};

export const PagerWithoutTheme = Pager;

export default withTheme(Pager);
