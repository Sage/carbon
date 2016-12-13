import React from 'react';
import classNames from 'classnames';
import Icon from './../../icon';
import { validProps } from '../../../utils/ether';

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

  static propTypes = {

    /**
     * Aligns the content of the cell (can be "left", "center" or "right").
     *
     * @property align
     * @type {String}
     */
    align: React.PropTypes.string,

    /**
     * Name of the column to sort. Should correspond to name in database.
     *
     * @property name
     * @type {String}
     */
    name: function(props, propName) {
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
     *
     * @property sortable
     * @type {Boolean}
     */
    sortable: React.PropTypes.bool
  }

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */
  static contextTypes = {
    onSort: React.PropTypes.func,
    sortedColumn: React.PropTypes.string,
    sortOrder: React.PropTypes.string
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
   * Returns sort icon HTML if column is sortable and has been sorted.
   *
   * @method sortIconHTML
   * @return {JSX} Icon JSX
   */
  get sortIconHTML() {
    if (this.sorted) {
      let type = this.context.sortOrder === 'desc' ? 'sort-down' : 'sort-up';
      return <Icon type={ type } className={ this.sortIconClasses } />;
    }
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
        [`carbon-table-header__icon--align-${ this.props.align }`]: this.props.align
      }
    );
  }

  /**
   * Returns classes to be used on the TH element.
   *
   * @method tableHeaderClasses
   * @return {String}
   */
  tableHeaderClasses() {
    return classNames(
      "carbon-table-header",
      this.props.className,
      {
        [`carbon-table-header--align-${this.props.align}`]: this.props.align,
        'carbon-table-header--sortable': this.props.sortable
      }
    );
  }

  /**
   * Returns props to be used on the TH element.
   *
   * @method tableHeaderProps
   * @return {Object}
   */
  get tableHeaderProps() {
    let { ...props } = validProps(this);

    delete props.children;

    props.className = this.tableHeaderClasses();
    props.onClick = this.props.sortable ? this.emitSortEvent.bind(this) : '';

    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <th { ...this.tableHeaderProps }>
        { this.props.children }
        { this.sortIconHTML }
      </th>
    );
  }

}

export default TableHeader;
