import React from 'react';

class Row extends React.Component {

  buildColumns = () => {
    var columns = [];

    if (this.props.children.length) {
      this.props.children.forEach((child, index) => {
        columns.push(this.buildColumn(child, index));
      });
    } else {
      columns.push(this.buildColumn(this.props.children, 0));
    }

    return columns;
  }

  buildColumn = (child, key) => {
    var columnClass = "ui-row__column";

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
    var mainClasses = "ui-row";

    if (this.props.columns) {
      mainClasses += " ui-row--columns-" + this.props.columns;
    } else {
      mainClasses += " ui-row--columns-" + this.props.children.length;
    }

    return (
      <div className={ mainClasses }>
        { this.buildColumns() }
      </div>
    );
  }

};

export default Row;
