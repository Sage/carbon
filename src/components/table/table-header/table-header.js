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
    align: React.PropTypes.string
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
      <th className={ className }>
        { this.props.children }
      </th>
    );
  }

}

export default TableHeader;
