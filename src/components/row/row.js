import React from 'react';

/**
 * A row widget.
 *
 * This is a standalone row widget used for layout; for table rows use the table-row widget.
 *
 * == How to use a Row in a component:
 *
 * In your file
 *
 *   import Row from 'carbon/lib/components/Row';
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
    ]).isRequired
  }

  /**
   * Builds row columns from the children object fields
   *
   * @method buildColumns
   */
  buildColumns = () => {
    let columns = [];

    if (this.props.children.length) {
      this.props.children.forEach((child, index) => {
        columns.push(this.buildColumn(child, index));
      });
    } else {
      columns.push(this.buildColumn(this.props.children, 0));
    }

    return columns;
  }

  /**
   * Builds each column field with appropriate classes
   *
   * @method buildColumn
   */
  buildColumn = (child, key) => {
    let columnClass = "ui-row__column";

    if (child.props.columnClasses) {
      columnClass += " " + child.props.columnClasses;
    }

    if (child.props.columnOffset) {
      columnClass += " ui-row__column--offset-" + child.props.columnOffset;
    }

    if (child.props.columnSpan) {
      columnClass += " ui-row__column--span-" + child.props.columnSpan;
    }

    return (
      <div key={ key } className={ columnClass }>
        { child }
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let mainClasses = "ui-row";

    if (this.props.className) {
      mainClasses += ` ${this.props.className}`;
    }

    if (this.props.columns) {
      mainClasses += " ui-row--columns-" + this.props.columns;
    } else if(this.props.children.constructor === Array) {
      mainClasses += " ui-row--columns-" + this.props.children.length;
    } else {
      mainClasses += " ui-row--columns-1";
    }

    return (
      <div className={ mainClasses }>
        { this.buildColumns() }
      </div>
    );
  }

}

export default Row;
