import React from 'react';
import classNames from 'classnames';

/**
 * A TableCell widget.
 *
 * == How to use a TableCell in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left", "center" or "right".
 *
 * You can set a property of 'action' which should be a boolean. This will
 * set styling options for the cell used for action such as delete.
 *
 * @class TableCell
 * @constructor
 */
class TableCell extends React.Component {

  static propTypes = {
    /**
     * Defines the alignment of the cell (eg "left", "center" or "right").
     *
     * @property align
     * @type {String}
     */
    align: React.PropTypes.string,

    /**
     * Defines the cell type to be an action - used for the delete cell.
     *
     * @property action
     * @type {Boolean}
     */
    action: React.PropTypes.bool
  }

  /**
   * Returns classes to be used on the TD element.
   *
   * @method tableCellClasses
   * @return {String}
   */
  get tableCellClasses() {
    return classNames(
      "carbon-table-cell",
      this.props.className,
      { [`carbon-table-cell--align-${this.props.align}`]: this.props.align },
      { [`carbon-table-cell--action`]: this.props.action }
    );
  }

  /**
   * Returns props to be used on the TD element.
   *
   * @method tableCellProps
   * @return {Object}
   */
  get tableCellProps() {
    let { children, ...props } = this.props;
    props.className = this.tableCellClasses;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <td { ...this.tableCellProps }>
        { this.props.children }
      </td>
    );
  }

}

export default TableCell;
