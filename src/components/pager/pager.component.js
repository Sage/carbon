import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Immutable from 'immutable';
import {
  PagerContainerStyles,
  PagerSizeOptionsStyles,
  PagerNavigationStyles,
  PagerSummaryStyles,
  PagerNoSelectStyles,
  PagerSizeOptionsInnerStyles
} from './pager.styles';
import Dropdown from '../dropdown';
import NumberComponent from '../number';
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
    const totalRecordsCount = props.totalRecords >= 0 ? props.totalRecords : 0

    if (props.pageSize && props.pageSize !== '0' && totalRecordsCount > 0) {
      return Math.ceil(totalRecordsCount / props.pageSize);
    }
    return 1;
  }

  /** Emit change function depending on event */
  const emitChangeCallback = (element, ev) => {
    let newPage, newPageSize;
    switch (element) {
      case 'next':
        newPage = String(Number(this.props.currentPage) + 1);
        this.props.onPagination(newPage, this.props.pageSize, element);
        break;

      case 'input':
        newPage = Math.abs(Number(ev.target.value));

        if (Number.isNaN(newPage)) { newPage = '1'; }

        if (!newPage) {
          this.setState({ currentPage: this.props.currentPage });
          break;
        }

        if (newPage > this.maxPages) { newPage = String(this.maxPages); }

        this.props.onPagination(String(newPage), this.props.pageSize, element);
        break;

      case 'previous':
        newPage = String(Number(this.props.currentPage) - 1);
        this.props.onPagination(newPage, this.props.pageSize, element);
        break;

      case 'size':
        newPageSize = ev.target.value;
        if (!props.pageSizeSelectionOptions.find(x => x.get('id') === newPageSize)) {
          break;
        }
        props.onPagination('1', newPageSize, element);
        break;
      default:
        break;
    }
  };

  /** Return callback binding the element to target */
  const emitCallbackSelector = (element) => {
    return (ev) => {
      emitChangeCallback(element, ev);
    };
  };

  function currentPageInput() {
    const currentPageInputProps = {
      value: currentPage,
      className: 'carbon-pager__current-page',
      'data-element': 'current-page',
      onChange: (ev) => {
        setCurrentPage(ev.target.value);
      },
      onBlur: emitCallbackSelector('input'),
      onKeyUp: (ev) => {
        if (Events.isEnterKey(ev)) {
          emitChangeCallback('input', ev);
        }
      }
    };

    return (
      <NumberComponent { ...currentPageInputProps } />
    );
  }

  function sizeSelector() {
    return (
      <Dropdown
        options={ props.pageSizeSelectionOptions }
        value={ props.pageSize }
        onChange={ emitCallbackSelector('size') }
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
      <PagerNavigationStyles>
        {/* { this.previousArrow } */}
        <PagerNoSelectStyles>
          { I18n.t('pager.page_x', { defaultValue: 'Page ' }) }
        </PagerNoSelectStyles>
        { currentPageInput() }
        <PagerNoSelectStyles>
          { I18n.t('pager.of_y', { defaultValue: ' of ' }) }{ maxPages() }
        </PagerNoSelectStyles>
        {/* { this.nextArrow } */}
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
