import React from 'react';
import classNames from 'classnames';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'onDelete' which should be a function. This will
 * enable a delete action on the row.
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

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

    return (
      <tr { ...props } className={ this.mainClasses }>
        { props.children }
      </tr>
    );
  }

}

export default TableRow;
