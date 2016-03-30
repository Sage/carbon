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
   * Returns classes to be used on the TH element.
   *
   * @method tableHeaderClasses
   * @return {String}
   */
  get tableHeaderClasses() {
    return classNames(
      "ui-table-header",
      this.props.className,
      { [`ui-table-header--align-${this.props.align}`]: this.props.align }
    );
  }

  /**
   * Returns props to be used on the TH element.
   *
   * @method tableHeaderProps
   * @return {Object}
   */
  get tableHeaderProps() {
    let { children, ...props } = this.props;
    props.className = this.tableHeaderClasses;
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
      </th>
    );
  }

}

export default TableHeader;
