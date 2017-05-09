import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compact } from 'lodash';
import Immutable from 'immutable';
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
    gutter: "medium"
  };

  /**
   * Builds row columns from the children object fields
   *
   * @method buildColumns
   * @return {Array} array of built columns
   */
  buildColumns = () => {
    if (!this.props.children) { return null; }

    let columns = [],
        children = (this.props.children.constructor === Array) ? compact(this.props.children) : this.props.children;

    if ((children.constructor === Array && children.length) || (Immutable.Iterable.isIterable(children))) {
      children.forEach((child, index) => {
        columns.push(this.buildColumn(child, index));
      });
    } else if (children.constructor !== Array) {
      columns.push(this.buildColumn(children, 0));
    }

    return columns;
  }

  /**
   * Builds each column field with appropriate classes
   *
   * @method buildColumn
   * @param {Object} child child component
   * @param {Object} key index of child
   * @return {Object} JSX of build column
   */
  buildColumn = (child, key) => {
    /**
     * This functionality is maintaining the deprecated behaviour
     * where Row can have any immediate children. As of React 16 this
     * will break and therefore we have added a column component to deal
     * with the complications and maintian functionality.
     *
     * Removing the deprecated behaviour in Carbon v2 we can likely
     * remove the buildColumns and buildColumn function and just render the Row's
     * children which will include the columns
     *
     * TODO: CarbonV2
     */

    if (child.type === Column) {
      return React.cloneElement(child, { key: key, columnDivide: this.props.columnDivide }, child.props.children);
    } else {

      // TODO: Extract into a Logger for ENV check and warning
      if (!global.process.env.NODE_ENV || global.process.env.NODE_ENV === 'development') {
        console.error('Warning: Row Component should only have a immediate child of type Column.'); // eslint-disable-line no-console
      }
      return (
        <Column key={ key } { ...child.props } columnDivide={ this.props.columnDivide }>
          { child }
        </Column>
      );
    }
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
