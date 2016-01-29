import React from 'react';
import classNames from 'classnames';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let { className, ...props } = this.props;

    className = classNames("ui-table-row", className);

    return (
      <tr { ...props } className={ className }>
        { props.children }
      </tr>
    );
  }

}

export default TableRow;
