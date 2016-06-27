import React from 'react';
import classNames from 'classnames';
import { compact } from 'lodash';

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
    ])
  }

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

    if (children.constructor === Array && children.length) {
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
      "ui-row__column",
      child.props.columnClasses, {
        [`ui-row__column--offset-${child.props.columnOffset}`]: child.props.columnOffset,
        [`ui-row__column--span-${child.props.columnSpan}`]: child.props.columnSpan,
        [`ui-row__column--align-${child.props.columnAlign}`]: child.props.columnAlign
      }
    );

    return (
      <div key={ key } className={ columnClass }>
        { child }
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
    }

    return classNames(
      'ui-row',
      this.props.className,
      `ui-row--columns-${columns}`
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
