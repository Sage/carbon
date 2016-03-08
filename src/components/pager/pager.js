import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import NumberComponent from './../number';
import Dropdown from './../dropdown';
import Immutable from 'immutable';

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
 *   <Pager currentPage='1' numberOfRows='100' handlePageChange={ function(){} } />
 *
 * @class Pager
 */
class Pager extends React.Component {

  static propTypes = {
    currentPage: React.PropTypes.string.isRequired,
    numberOfRows: React.PropTypes.string.isRequired,
    handlePagerChange: React.PropTypes.func.isRequired,

    pageSize: React.PropTypes.string,
    showPageSizeSelection: React.PropTypes.bool,
    pageSizeSelectionOptions: React.PropTypes.object,
  }

  static defaultProps = {
    pageSize: 10,
    showPageSizeSelection: false,
    pageSizeSelectionOptions: Immutable.fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }]),
  }

  state = {
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
    this.setState({ currentPage: nextProps.currentPage });
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

  emitChangeCallback = (element, ev) => {
    let newPage;
    switch (element) {
      case 'next':
        newPage = String(Number(this.props.currentPage) + 1)
        this.props.handlePagerChange(newPage, this.props.pageSize);
        break;
      case 'input':
        let maxPage = this.maxPage;
        newPage = ev.target.value;
        
        if (Number(newPage) > maxPage) {
          newPage = String(maxPage);
        }

        this.props.handlePagerChange(newPage, this.props.pageSize)
        break;
      case 'previous':
        newPage = String(Number(this.props.currentPage) - 1);
        this.props.handlePagerChange(newPage, this.props.pageSize);
        break;
      case 'size':
        let newPageSize = ev.target.value;
        // TODO: Clever current page correction
        this.props.handlePagerChange('1', newPageSize);
        break;
    }
  }

  get maxPage() {
    return Math.ceil(this.props.numberOfRows / this.props.pageSize);
  }

  get disablePrevious() {
    return this.props.currentPage === '1';
  }

  get disableNext() {
    return this.props.currentPage * this.props.pageSize >= Number(this.props.numberOfRows);
  }

  get disableCurrentPageInput() {
    return Number(this.props.numberOfRows) <= Number(this.props.pageSize);
  }

  get previousArrow() {
    let classes = 'ui-pager__previous',
        props = { type: 'dropdown' }

    if (this.disablePrevious) {
      classes += ' ui-pager__previous--disabled';
    } else {
      props.onClick = this.emitChangeCallback.bind(this, 'previous');
    }

    return (
      <Icon { ...props } className={ classes } />
    );
  }

  get currentPageInput() {
    let classes = classNames(
      'ui-pager__current-page',
      { 'ui-pager__current-page--disabled': this.disableCurrentPageInput }
    );

    let props = {
      value: this.state.currentPage,
      onChange: this.handleCurrentPageInputChange,
      onBlur: this.emitChangeCallback.bind(this, 'input')
    }

    if (this.disableCurrentPageInput) {
      props.disabled = true;
      props.readOnly = true;
    }

    return (
      <NumberComponent { ...props } className={ classes } />
    );
  }

  get nextArrow() {
    let classes = 'ui-pager__next',
        props = { type: 'dropdown' }

    if (this.disableNext) {
      classes += ' ui-pager__next--disabled';
    } else {
      props.onClick = this.emitChangeCallback.bind(this, 'next');
    }

    return (
      <Icon { ...props } className={ classes } />
    );
  }

  get sizeSelectionDropdown() {
    if (this.props.showPageSizeSelection) {
      return (
        <Dropdown
          options={ this.props.pageSizeSelectionOptions }
          value={ this.props.pageSize }
          onChange={ this.emitChangeCallback.bind(this, 'size') }
        />
      );
    }
  }

  render() {
    return(
      <div className='ui-pager'>

        <div className='ui-pager__size' >
          { this.sizeSelectionDropdown }
        </div>

        <div className='ui-pager__navigation' >
          { this.previousArrow }
          { this.currentPageInput }
          { this.nextArrow }
        </div>

        <div className='ui-pager__summary'>
          { this.props.numberOfRows } records 
        </div>

      </div>
    );
  }
}

export default Pager;
