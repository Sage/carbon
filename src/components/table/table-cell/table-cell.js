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
 * align the content to either "left" or "right".
 *
 * @class TableCell
 * @constructor
 */
class TableCell extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let className = classNames(
      "ui-table-cell",
      this.props.className,
      { [`ui-table-cell--align-${this.props.align}`]: this.props.align }
    );

    return (
      <td className={ className }>
        { this.props.children }
      </td>
    );
  }

}

export default TableCell;
