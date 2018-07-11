import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Column from './column';

/**
 * A row widget.
 *
 * This is a standalone row widget used for layout; for table rows use the table-row widget.
 *
 * == How to use a Row in a component:
 *
 * In your file
 *
 *   import { Row, Column } from 'carbon/lib/components/row';
 *
 * To render the Row:
 *
 *   <Row>
 *     <Column>Column1</Column>
 *     <Column>Column2</Column>
 *   </Row>
 *
 * A Rows child must be of type Column
 *
 * @class Row
 * @constructor
 */
class Row extends React.Component {
  static propTypes = {

    /**
     * The elements to be rendered in the row
     *
     * @property children
     * @type {Object | Array}
     */
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Pass a custom value for the gutter
     * (extra-small, small, medium, large or extra-large)
     *
     * @property gutter
     * @type {String}
     */
    gutter: PropTypes.string,

    /**
     * Show a divide between columns
     *
     * @property columnDivide
     * @type {String}
     */
    columnDivide: PropTypes.bool,

    /**
     * Manually define number of columns
     *
     * @property columns
     * @type {String}
     */
    columns: PropTypes.string,

    /**
     * class to apply to each child column
     *
     * @property columnClasses
     * @type {String}
     */
    columnClasses: PropTypes.string
  }

  static defaultProps = {
    gutter: 'medium'
  };

  /**
   * Builds row columns from the children object fields
   *
   * @method buildColumns
   * @return {Array} array of built columns
   */
  buildColumns = () => {
    return React.Children.toArray(this.props.children).map((child) => {
      return React.cloneElement(
        child, {
          columnClasses: this.props.columnClasses,
          columnDivide: this.props.columnDivide
        },
        child.props.children
      );
    });
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    const columns = this.props.columns || React.Children.toArray(this.props.children).length;

    return classNames(
      'carbon-row',
      `carbon-row--gutter-${this.props.gutter}`,
      this.props.className,
      `carbon-row--columns-${columns}`
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        { this.buildColumns() }
      </div>
    );
  }
}

export default Row;
export {
  Row,
  Column
};
