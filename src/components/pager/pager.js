import css from './../../utils/css';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from './../icon';
import NumberComponent from './../number';
import Dropdown from './../dropdown';
import I18n from "i18n-js";
import Immutable from 'immutable';
import Events from './../../utils/helpers/events';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * A Pager widget.
 *
 * == How to use a Pager in a component:
 *
 * In your file
 *
 *   import Pager from 'carbon/lib/components/pager';
 *
 * To render a Pager:
 *
 *   <Pager currentPage='1' totalRecords='100' onPagination={ function(){} } />
 *
 * @class Pager
 */
class Pager extends React.Component {

  static propTypes = {

    /**
     * Current visible page
     *
     * @property currentPage
     * @type {String}
     */
    currentPage: PropTypes.string.isRequired,

    /**
     * Total number of records
     *
     * @property totalRecords
     * @type {String}
     */
    totalRecords: PropTypes.string.isRequired,

    /**
     * Function called when any pager changes take place
     * PageSize, Current Page
     *
     * @property onPagination
     * @type {Function}
     */
    onPagination: PropTypes.func.isRequired,

    /**
     * Pagination page size
     *
     * @property pageSize
     * @type {String}
     */
    pageSize: PropTypes.string,

    /**
     * Should the page size selection dropdown be shown
     *
     * @property showPageSizeSelection
     * @type {Boolean}
     */
    showPageSizeSelection: PropTypes.bool,

    /**
     * Set of page size options
     *
     * @property pageSizeSelectionOptions
     * @type {Object}
     */
    pageSizeSelectionOptions: PropTypes.object
  }

  static defaultProps = {
    pageSize: '10',
    showPageSizeSelection: false,
    pageSizeSelectionOptions: Immutable.fromJS([
      { id: '10', name: 10 },
      { id: '25', name: 25 },
      { id: '50', name: 50 }
    ])
  }

  state = {

    /**
     * Current page is held in state so the
     * user can use the input field
     *
     * New props always overide the currentPage
     *
     * @property currentPage
     * @type {String}
     */
    currentPage: this.props.currentPage
  }

  /**
   * Ensure the currentPage is defined by props
   *
   * @method componentWillReceiveProps
   * @param {Object} new props for component
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPage !== this.state.currentPage){
      this.setState({ currentPage: nextProps.currentPage });
    }
  }

  /**
   * Handle current page input internally until blur event
   *
   * @method handleCurrentPageInputChange
   * @return {Void}
   */
  handleCurrentPageInputChange = (ev) => {
    this.setState({ currentPage: ev.target.value });
  }

  /**
   * Handle key up event in the page input
   *
   * @method handleCurrentPageKeyUp
   * @param {Event} key up event
   * @return {Void}
   */
  handleCurrentPageKeyUp = (ev) => {
    if (Events.isEnterKey(ev)) {
      this.emitChangeCallback('input', ev);
    }
  }

  /**
   * Emit change function depending on event
   *
   * @method emitChangeCallback
   * @param {String} element source of change
   * @param {Event} ev change event
   */
  emitChangeCallback = (element, ev) => {
    let newPage, newPageSize;
    switch (element) {
      case 'next':
        newPage = String(Number(this.props.currentPage) + 1);
        this.props.onPagination(newPage, this.props.pageSize, element);
        break;

      case 'input':
        newPage = ev.target.value;

        if (!newPage) {
          this.setState({ currentPage: this.props.currentPage });
          break;
        }

        if (Number(newPage) > this.maxPage) {
          newPage = String(this.maxPage);
        }

        if (Number(newPage) < 1) {
          newPage = "1";
        }

        this.props.onPagination(newPage, this.props.pageSize, element);
        break;

      case 'previous':
        newPage = String(Number(this.props.currentPage) - 1);
        this.props.onPagination(newPage, this.props.pageSize, element);
        break;

      case 'size':
        newPageSize = ev.target.value;
        if (!this.props.pageSizeSelectionOptions.find(x => x.get('id') === newPageSize)) {
          break;
        }
        // TODO: Clever current page correction
        this.props.onPagination('1', newPageSize, element);
        break;
    }
  }

  /**
   * Calculate the maximum page
   *
   * @method maxPage
   * @return {Integer}
   */
  get maxPage() {
    if (this.props.pageSize && this.props.pageSize !== '0') {
      return Math.ceil(this.props.totalRecords / this.props.pageSize) || 1;
    }
    return 1;
  }

  /**
   * Should the previous arrow be disabled
   *
   * @method disablePrevious
   * @return {Boolean}
   */
  get disablePrevious() {
    return this.props.currentPage === '1';
  }

  /**
   * Should the next arrow be disabled
   *
   * @method disableNext
   * @return {Boolean}
   */
  get disableNext() {
    return this.props.currentPage * this.props.pageSize >= Number(this.props.totalRecords);
  }

  /**
   * Get previous arrow icon
   *
   * @method previousArrow
   * @return {JSX}
   */
  get previousArrow() {
    let props = {
      type: 'dropdown',
      className: 'carbon-pager__previous',
      'data-element': 'previous-page'
    };

    if (this.disablePrevious) {
      props.className += ' carbon-pager__previous--disabled';
    } else {
      props.onClick = this.emitChangeCallback.bind(this, 'previous');
    }

    return (
      <Icon { ...props } />
    );
  }

  /**
   * Get current page number input
   *
   * @method currentPageInput
   * @return {JSX}
   */
  get currentPageInput() {
    let props = {
      value: this.state.currentPage,
      className: 'carbon-pager__current-page',
      'data-element': 'current-page',
      onChange: this.handleCurrentPageInputChange,
      onBlur: this.emitChangeCallback.bind(this, 'input'),
      onKeyUp: this.handleCurrentPageKeyUp
    };

    return (
      <NumberComponent { ...props } />
    );
  }

  /**
   * Get next arrow icon
   *
   * @method nextArrow
   * @return {JSX}
   */
  get nextArrow() {
    let props = {
      className: 'carbon-pager__next',
      'data-element': 'next-page',
      type: 'dropdown'
    };

    if (this.disableNext) {
      props.className += ' carbon-pager__next--disabled';
    } else {
      props.onClick = this.emitChangeCallback.bind(this, 'next');
    }

    return (
      <Icon { ...props } />
    );
  }

  /**
   * Page Size Selection Dropdown
   *
   * @method sizeSelectionDropdown
   * @return {JSX}
   */
  get sizeSelectionDropdown() {
    if (this.props.showPageSizeSelection) {
      return (
        <div>
          <span className={ css.unselectable }>{ showSizeText() }</span>
          <Dropdown
            options={ this.props.pageSizeSelectionOptions }
            value={ this.props.pageSize }
            onChange={ this.emitChangeCallback.bind(this, 'size') }
            data-element='page-select'
          />
          <span className={ css.unselectable }>{ recordsText(this.props.pageSize) }</span>
        </div>
      );
    }
  }

  /**
   * Render method for page
   *
   * @method render
   * @return {JSX}
   */
  render() {
    return(
      <div className='carbon-pager' { ...tagComponent('pager', this.props) }>

        <div className='carbon-pager__size' >
          { this.sizeSelectionDropdown }
        </div>

        <div className='carbon-pager__navigation' >
          { this.previousArrow }
          <span className={ css.unselectable }>{ pageX() }</span>
          { this.currentPageInput }
          <span className={ css.unselectable }>{ ofY() }{ this.maxPage }</span>
          { this.nextArrow }
        </div>

        <div className='carbon-pager__summary'>
          { this.props.totalRecords }{ recordsText(this.props.totalRecords) }
        </div>
      </div>
    );
  }
}

function showSizeText() {
  return I18n.t('pager.size', { defaultValue: 'Show ' });
}

function recordsText(numberOfRecords) {
  return I18n.t('pager.records', { count: Number(numberOfRecords), defaultValue: ' records' });
}

function pageX() {
  return I18n.t('pager.page_x', { defaultValue: 'Page ' });
}

function ofY() {
  return I18n.t('pager.of_y', { defaultValue: ' of ' });
}

export default Pager;
