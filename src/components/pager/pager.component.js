import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Immutable from 'immutable';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerNavigationStyles,
  PagerButtonWrapperStyles,
  PagerSummaryStyles,
  PagerNoSelectStyles,
  PagerSizeOptionsInnerStyles
} from './pager.styles';
import Dropdown from '../dropdown';
import NumberComponent from '../number';
import Icon from '../icon';
import Events from '../../utils/helpers/events';

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

  function maxPages() {
    const totalRecordsCount = props.totalRecords >= 0 ? props.totalRecords : 0;

    if (props.pageSize && props.pageSize !== '0' && totalRecordsCount > 0) {
      return Math.ceil(totalRecordsCount / props.pageSize);
    }
    return 1;
  }

  const updatePageFromInput = (ev) => {
    let newPage = Math.abs(Number(ev.target.value));

    if (Number.isNaN(newPage)) { newPage = '1'; }
    if (!newPage) {
      setCurrentPage(this.props.currentPage);
    }
    if (newPage > maxPages) { newPage = String(maxPages); }

    props.onPagination(String(newPage), this.props.pageSize, 'input');
  };

  function currentPageInput() {
    const currentPageInputProps = {
      value: currentPage,
      className: 'carbon-pager__current-page',
      'data-element': 'current-page',
      onChange: (ev) => {
        setCurrentPage(ev.target.value);
      },
      onBlur: updatePageFromInput,
      onKeyUp: (ev) => {
        if (Events.isEnterKey(ev)) {
          updatePageFromInput(ev);
        }
      }
    };

    return <NumberComponent { ...currentPageInputProps } />;
  }

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

  function navArrow(step) {
    const arrowProps = {
      'data-element': 'next-page',
      type: 'dropdown'
    };
    const totalRecordsCount = props.totalRecords >= 0 ? props.totalRecords : 0;
    const disabled = props.currentPage * props.pageSize >= totalRecordsCount;

    return (
      <PagerButtonWrapperStyles disabled={ disabled } next={ step === 1 }>
        <Icon
          onClick={ () => { navArrowChange(step); } }
          { ...arrowProps }
        />
      </PagerButtonWrapperStyles>
    );
  }

  function navArrowChange(step) {
    const newPage = String(Number(props.currentPage) + step);
    const desc = step === 1 ? 'next' : 'previous';
    props.onPagination(newPage, props.pageSize, desc);
  }

  return (
    <PagerContainerStyles>
      <PagerSizeOptionsStyles>{pageSizeOptions()}</PagerSizeOptionsStyles>
      <PagerNavigationStyles>
        { navArrow(-1) }
        <PagerNoSelectStyles>
          { I18n.t('pager.page_x', { defaultValue: 'Page ' }) }
        </PagerNoSelectStyles>
        { currentPageInput() }
        <PagerNoSelectStyles>
          { I18n.t('pager.of_y', { defaultValue: ' of ' }) }{ maxPages() }
        </PagerNoSelectStyles>
        { navArrow(1) }
      </PagerNavigationStyles>
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
