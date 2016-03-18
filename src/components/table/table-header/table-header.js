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

    name:  function(props, propName, componentName) {
      if (props.sortable && !props[propName]) {
        return new Error('Sortable columns require a prop of name of type String');
      }
      if (typeof props[propName] !== 'string') {
        return new Error('name must be a String');
      }
    },

    sortable: React.PropTypes.boolean,

    // 'asc', 'desc'
    sortOrder: React.PropTypes.String
  }

  static contextTypes = {
    onSort: React.PropTypes.func
  }

  emitSortEvent = () => {
    let columnToSort = this.props.name;
    let sortOrder = this.props.sortOrder || 'asc';
    this.context.onSort(columnToSort, sortOrder);
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

    return (
      <th className={ className } onClick={ this.emitSortEvent.bind(this) } name={ this.props.name }>
        { this.props.children }
      </th>
    );
  }

}

export default TableHeader;
