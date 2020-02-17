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
import Dropdown from '../../__deprecated__/components/dropdown';
import { classicTheme } from '../../style/themes';
import { isClassic } from '../../utils/helpers/style-helper';

const Pager = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const [currentTheme, setCurrentTheme] = useState(classicTheme.name);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, [props.currentPage]);

  /** Term used to describe table data */
  const descriptor = I18n.t(
    'pager.records',
    {
      count: Number(props.totalRecords),
      defaultValue: isClassic(currentTheme) ? ' records' : ' items'
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
      <PagerSizeOptionsInnerStyles>
        { I18n.t('pager.show', { defaultValue: 'Show ' }) } { sizeSelector() } { descriptor }
      </PagerSizeOptionsInnerStyles>
    );

    return props.showPageSizeSelection ? elem : null;
  }

  return (
    <PagerContainerStyles data-component='pager'>
      <PagerSizeOptionsStyles>{pageSizeOptions()}</PagerSizeOptionsStyles>
      <PagerNavigation
        { ...props }
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
        setCurrentThemeName={ setCurrentTheme }
      />
      <PagerSummaryStyles>{ props.totalRecords } { descriptor }</PagerSummaryStyles>
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
  ])
};

export default Pager;
