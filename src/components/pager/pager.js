import React from 'react';
import classNames from 'classnames';
import Icon from './../icon';
import NumberComponent from './../number';
import Dropdown from './../dropdown';
import Immutable from 'immutable';

class Pager extends React.Component {

  static propTypes = {
    currentPage: React.PropTypes.string.isRequired,
    pageSize: React.PropTypes.string.isRequired,
    numberOfRows: React.PropTypes.string.isRequired,
    handlePageChange: React.PropTypes.func.isRequired,

    showPageSizeSelection: React.PropTypes.bool,
    pageSizeSelectionOptions: React.PropTypes.object,
    selectedPageSize: React.PropTypes.string
  }

  static defaultProps = {
    showPageSizeSelection: true,
    pageSizeSelectionOptions: Immutable.fromJS([ 10, 25, 50 ]),
    selectedPageSize: '10'
  }

  emitCurrentPageChangeCallback = (element, ev) => {
    let newPage;
    switch (element) {
      case 'next':
        newPage = String(Number(this.props.currentPage) + 1)
        this.props.handlePageChange(newPage);
        break;
      case 'input':
        this.props.handlePageChange(ev.target.value)
        break;
      case 'previous':
        newPage = String(Number(this.props.currentPage) - 1);
        this.props.handlePageChange(newPage);
        break;
    }
  }

  get disablePrevious() {
    return this.props.currentPage === '1';
  }

  get disableNext() {
    return this.props.currentPage * this.props.pageSize >= this.props.numberOfRows;
  }

  get disableCurrentPageInput() {
    return this.props.numberOfRows <= this.props.pageSize;
  }

  get previousArrow() {
    let classes = 'ui-pager__previous',
        props = { type: 'arrow' }

    if (this.disablePrevious) {
      classes += ' ui-pager__previous--disabled';
    } else {
      props.onClick = this.emitCurrentPageChangeCallback.bind(this, 'previous');
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
      value: this.props.currentPage,
      onBlur: this.emitCurrentPageChangeCallback.bind(this, 'input')
    }

    // if (this.disableCurrentPageInput) {
      props.disabled = true;
      props.readOnly = true;
    // }

    return (
      <NumberComponent { ...props } className={ classes } />
    );
  }

  get nextArrow() {
    let classes = 'ui-pager__next',
        props = { type: 'arrow' }

    if (this.disableNext) {
      classes += ' ui-pager__next--disabled';
    } else {
      props.onClick = this.emitCurrentPageChangeCallback.bind(this, 'next');
    }

    return (
      <Icon { ...props } className={ classes } />
    );
  }

  // get sizeSelectionDropdown() {
  //   if (this.props.showPageSizeSelection) {
  //     return (
  //       <Dropdown options={ this.props.pageSizeSelectionOptions } />    
  //     );
  //   }
  // }

  render() {
    return(
      <div className='ui-pager'>

        <div className='ui-pager__navigation' >

          { this.sizeSelectionDropdown }
          
          { this.previousArrow }

          { this.currentPageInput }

          { this.nextArrow }

        </div>

      </div>
    );
  }
}

export default Pager;
