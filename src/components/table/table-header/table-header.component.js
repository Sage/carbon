import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import StyledTableHeader from './table-header.style';
import Icon from '../../icon/icon';
import { validProps } from '../../../utils/ether/ether';
// import './table-header.scss';

/**
 * A TableHeader widget.
 *
 * == How to use a TableHeader in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left", "center" or "right".
 *
 * == Sortable Columns:
 *
 * To make a column sortable, pass a prop of 'sortable={ true }' to the corresponding
 * TableHeader.
 * Sortable columns also require a 'name' prop which must correspond to the database key.
 *
 * You can also provide a custom sortOrder - 'asc' (ascending) or 'desc' (descending).
 * By Default columns are sorted in ascending order.
 *
 * See the Table documentation for more information on hooking up a change handler
 * to setup sort functionality in your app.
 *
 * @class TableHeader
 * @constructor
 */
class TableHeader extends React.Component {
  /**
   * Event handler for clicks on the <a> tag used for activating
   * column sorting.
   *
   * Used to prevent the default action of the <a> tag.
   *
   * @method onSortableColumnClick
   * @return {Void}
   */
  onSortableColumnClick(event) {
    event.preventDefault();
  }

  /**
   * Returns props to be used on the TH element.
   *
   * @method tableHeaderProps
   * @return {Object}
   */
  get tableHeaderProps() {
    const { ...props } = validProps(this);

    delete props.children;

    if (this.props.sortable) props.onClick = this.emitSortEvent;
    return props;
  }

  get isCurrentSortedColumn() {
    return this.props.sortable && this.props.name === this.context.sortedColumn;
  }

  /**
   * Returns classes to apply to the sort icon
   *
   * @method sortIconClasses
   * @return {JSX} Icon JSX
   */
  get sortIconClasses() {
    return classNames(
      'carbon-table-header__icon',
      {
        [`carbon-table-header__icon--align-${this.props.align}`]: this.props.align
      }
    );
  }


  /**
   * Returns sort icon HTML if column is sortable and has been sorted.
   *
   * @method sortIconHTML
   * @return {JSX} Icon JSX
   */
  get sortIconHTML() {
    if (this.sorted) {
      const type = this.context.sortOrder === 'desc' ? 'sort-down' : 'sort-up';
      return <Icon type={ type } className={ this.sortIconClasses } />;
    }
    return null;
  }

  /**
   * Determines if this column is currently sorted.
   *
   * @method sorted
   * @return {Boolean}
   */
  get sorted() {
    return this.props.sortable && this.context.sortedColumn === this.props.name;
  }

  /**
   * Returns descriptive text to describe the sortable column, and about
   * what will happen when they next attempt to sort the column i.e. which
   * direction it will sort in.
   *
   * NB If the current sortOrder is undefined, assume the next sort order
   * will be descending.
   *
   * @method sortDescription
   * @return {string}
   */
  get sortDescription() {
    if (!this.props.sortable) {
      return null;
    }

    const currentSortOrder = this.context.sortOrder;
    let nextSortOrder = null;
    let currentSortDescription = null;

    if (currentSortOrder) {
      nextSortOrder = currentSortOrder === 'asc' ? 'descending' : 'ascending';
      currentSortDescription = `sorted ${currentSortOrder === 'desc' ? 'descending' : 'ascending'}, `;
    } else {
      nextSortOrder = 'descending';
      currentSortDescription = '';
    }

    return `Sortable column, ${currentSortDescription}activate to sort column ${nextSortOrder}`;
  }

  /**
   * Returns classes to be used on the TH element.
   *
   * @method tableHeaderClasses
   * @return {String}
   */
  // tableHeaderClasses() {
  //   return classNames(
  //     'carbon-table-header',
  //     this.props.className,
  //     {
  //       [`carbon-table-header--align-${this.props.align}`]: this.props.align,
  //       'carbon-table-header--sortable': this.props.sortable
  //     }
  //   );
  // }

  ariaAttributes() {
    const aria = {};
    if (this.context.sortOrder && this.isCurrentSortedColumn) {
      aria['aria-sort'] = this.context.sortOrder === 'asc' ? 'ascending' : 'descending';
    }

    return aria;
  }

  /**
   * Emits sort event to parent context - table.
   *
   * @method emitSortEvent
   */
  emitSortEvent = () => {
    let sortOrder = this.context.sortOrder || 'desc';

    // If this is the current sorted column. flip order
    if (this.sorted) {
      sortOrder = this.context.sortOrder === 'asc' ? 'desc' : 'asc';
    }

    this.context.onSort(this.props.name, sortOrder);
  }

  componentTags(props) {
    return {
      'data-component': 'table-header',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let contents = null;

    if (this.props.sortable) {
      const sortOrder = this.context.sortOrder === 'asc' ? 'desc' : 'asc';
      contents = (
        <a
          href={ `#sort-${sortOrder}` }
          aria-label={ this.sortDescription }
          onClick={ this.onSortableColumnClick }
        >
          { this.sortIconHTML }
          { this.props.children }
        </a>
      );
    } else {
      contents = this.props.children;
    }
    return (
      <StyledTableHeader
        { ...this.tableHeaderProps } { ...this.componentTags(this.props) }
        { ...this.ariaAttributes() }
        align={ this.props.align }
        sortable={ this.props.sortable }
      >
        { contents }
      </StyledTableHeader>
    );
  }
}

TableHeader.propTypes = {

  /**
   * Aligns the content of the cell (can be "left", "center" or "right").
   */
  align: PropTypes.oneOf(['left', 'center', 'right', '']),

  /**
   * The body of the content component.
   */
  children: PropTypes.node,

  /**
   * Custom className
   */
  className: PropTypes.string,

  /**
   * Name of the column to sort. Should correspond to name in database.
   */
  name(props, propName) {
    if (props.sortable) {
      if (!props[propName]) {
        throw new Error('Sortable columns require a prop of name of type String');
      }
      if (typeof props[propName] !== 'string') {
        throw new Error('name must be a string');
      }
    }
  },

  /**
   * Whether column is sortable.
   */
  sortable: PropTypes.bool
};

TableHeader.defaultProps = {
  align: '',
  children: null,
  className: '',
  name: '',
  sortable: false
};

/**
 * Sort handler passed from table context
 */
TableHeader.contextTypes = {
  onSort: PropTypes.func,
  sortedColumn: PropTypes.string,
  sortOrder: PropTypes.string
};

export default TableHeader;
