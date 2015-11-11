import React from 'react';

class Row extends React.Component {

  static propTypes = {
    children: React.PropTypes.array.isRequired
  }

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
