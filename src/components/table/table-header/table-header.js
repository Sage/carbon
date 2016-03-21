import React from 'react';
import classNames from 'classnames';

/**
 * A TableHeader widget.
 *
 * == How to use a TableHeader in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left" or "right".
 *
 * @class TableHeader
 * @constructor
 */
class TableHeader extends React.Component {

  static propTypes = {
    /**
     * Aligns the content of the cell (can be "left" or "right").
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
    name:  function(props, propName, componentName) {
      if (props.sortable && !props[propName]) {
        return new Error('Sortable columns require a prop of name of type String');
      }
      if (typeof props[propName] !== 'string') {
        return new Error('name must be a string');
      }
    },

    /**
     * Whether column is sortable.
     *
     * @property sortable
     * @type {Boolean}
     */
    sortable: React.PropTypes.boolean,

    /**
     * Order to sort in - either 'asc' (ascending) or 'desc' (descending)
     *
     * @property sortOrder
     * @type {String}
     */
    sortOrder: React.PropTypes.string
  }

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */
  static contextTypes = {
    onSort: React.PropTypes.func
  }

  /**
   * Emits sort event to parent context - table.
   *
   * @method emitSortEvent
   */
  emitSortEvent = () => {
    let columnToSort = this.props.name;
    let sortOrder = this.props.sortOrder || 'asc';
    this.context.onSort(columnToSort, sortOrder);
  }

  get sortIconHTML() {
    
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let className = classNames(
      "ui-table-header",
      this.props.className,
      { [`ui-table-header--align-${this.props.align}`]: this.props.align }
    );

    let onClick = this.props.sortable ? this.emitSortEvent.bind(this) : '';

    return (
      <th className={ className } onClick={ onClick } name={ this.props.name }>
        { sortIconHTML }
        { this.props.children }
      </th>
    );
  }

}

export default TableHeader;
