import React from 'react';
import classNames from 'classnames';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
<<<<<<< HEAD
 * You can set a property of 'onDelete' which should be a function. This will
 * enable a delete action on the row.
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 *
=======
>>>>>>> master
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
   * Classes to be applied to the table row component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames(
      'ui-table-row',
      this.props.className,
      {'ui-table-row--clickable':  this.props.onClick}
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let { ...props } = this.props;
    let children = React.Children.toArray(props.children);

    if (props.onDelete) {
      children.unshift(
        <TableCell key="actions" className="ui-table-cell--actions">
          <Icon type="delete" onClick={ props.onDelete } />
        </TableCell>
      );
    }

    return (
      <tr { ...props } className={ this.mainClasses }>
        { children }
      </tr>
    );
  }

}

export default TableRow;
