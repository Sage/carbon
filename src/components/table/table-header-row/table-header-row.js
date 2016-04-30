import React from 'react';
import classNames from 'classnames';
import TableCell from './../table-cell';
import TableHeader from './../table-header';
import Checkbox from './../../checkbox';

/**
 * A TableHeaderRow widget.
 *
 * == How to use a TableHeaderRow in a component:
 *
 * See documentation for Table component.
 *
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 *
 * @class TableHeaderRow
 * @constructor
 */
class TableHeaderRow extends React.Component {

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */
  static contextTypes = {
    attachToTable: React.PropTypes.func,
    detachFromTable: React.PropTypes.func,
    checkSelection: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    multiSelectable: React.PropTypes.bool,
    selectAll: React.PropTypes.func,
    selectRow: React.PropTypes.func
  }

  state = {
    selected: false
  }

  // componentWillMount() {
  //   if (this.context.attachToTable && this.props.uniqueID) {
  //     this.context.attachToTable(this.props.uniqueID, this);
  //   }
  // }
  //
  // componentWillUnmount() {
  //   if (this.context.detachFromTable && this.props.uniqueID) {
  //     this.context.detachFromTable(this.props.uniqueID);
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.uniqueID != nextProps.uniqueID) {
      this.context.checkSelection(nextProps.uniqueID, this);
    }
  }

  selectAll = () => {
    this.context.selectAll(this);
  }

  /**
   * Classes to be applied to the table row component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames(
      'ui-table-header-row',
      this.props.className
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let content = [this.props.children];

    if (this.context.multiSelectable || this.props.multiSelectable) {
      content.unshift(
        <TableHeader key="select" className="ui-table-cell--select">
          <Checkbox onChange={ this.selectAll } checked={ this.state.selected } />
        </TableHeader>
      );
    }

    return (
      <tr className={ this.mainClasses }>
        { content }
      </tr>
    );
  }

}

export default TableHeaderRow;
