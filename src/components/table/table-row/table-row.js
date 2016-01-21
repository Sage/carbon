import React from 'react';
import classNames from 'classnames';
import TableCell from './../table-cell';
import Icon from './../../icon';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'onDelete' which should be a function. This will
 * enable a delete action on the row.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

  static propTypes = {
    /**
     * Enables delete button and defined action on click.
     *
     * @property onDelete
     * @type {Function}
     */
    onDelete: React.PropTypes.func
  }


  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let { className, ...props } = this.props;
    let children = React.Children.toArray(this.props.children);

    className = classNames("ui-table-row", className);

    if (props.onDelete) {
      children.unshift(
        <TableCell key="actions" className="ui-table-cell--actions">
          <Icon type="delete" onClick={ props.onDelete } />
        </TableCell>
      );
    }

    return (
      <tr { ...props } className={ className }>
        { children }
      </tr>
    );
  }

}

export default TableRow;
