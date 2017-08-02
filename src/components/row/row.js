import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compact } from 'lodash';
import Immutable from 'immutable';
import Column from './column';
import Logger from './../../utils/logger';

/**
 * A row widget.
 *
 * This is a standalone row widget used for layout; for table rows use the table-row widget.
 *
 * == How to use a Row in a component:
 *
 * In your file
 *
 *   import Row from 'carbon/lib/components/row';
 *
 * To render the Row:
 *
 *   <Row />
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
    columns: PropTypes.string
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
    return React.Children.map(this.props.children, (child) => {
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
    let columns = 1;

    if (this.props.columns) {
      columns = this.props.columns;
    } else if (this.props.children && this.props.children.constructor === Array) {
      columns = compact(this.props.children).length;
    } else if (Immutable.Iterable.isIterable(this.props.children)) {
      columns = this.props.children.size;
    }

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
