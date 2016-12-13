import React from 'react';
import classNames from 'classnames';
import { compact, omit } from 'lodash';
import Immutable from 'immutable';

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
    children: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),

    /**
     * Pass a custom value for the gutter
     * (extra-small, small, medium, large or extra-large)
     *
     * @property gutter
     * @type {String}
     */
    gutter: React.PropTypes.string,

    /**
     * Show a divide between columns
     *
     * @property columnDivide
     * @type {String}
     */
    columnDivide: React.PropTypes.bool
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
    let columnClass = classNames(
      "carbon-row__column",
      child.props.columnClasses, {
        [`carbon-row__column--offset-${child.props.columnOffset}`]: child.props.columnOffset,
        [`carbon-row__column--span-${child.props.columnSpan}`]: child.props.columnSpan,
        [`carbon-row__column--align-${child.props.columnAlign}`]: child.props.columnAlign,
        "carbon-row__column--column-divide": this.props.columnDivide
      }
    );

    const childProps = omit(child.props, ['columnOffset', 'columnSpan', 'columnClasses', 'columnAlign']);
    const newChild = React.createElement(child.type, childProps, child.props.children);

    return (
      <div key={ key } className={ columnClass }>
        { newChild }
      </div>
    );
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
