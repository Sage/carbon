import React from 'react';
import classNames from 'classnames';
import TableCell from './../table-cell';
import TableHeader from './../table-header';
import Checkbox from './../../checkbox';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 *
 * @class TableRow
 * @constructor
 */
class TableRow extends React.Component {

  static propTypes = {
    multiSelectable: (props) => {
      if (props.selectable && props.multiSelectable) {
        throw new Error("A TableRow can only either be 'selectable' or 'multiSelectable' - not both.");
      }

      if (props.multiSelectable && !props.uniqueID) {
        throw new Error("A multiSelectable TableRow must provide a uniqueID prop to track itself within the Table.");
      }
    },

    selectable: (props) => {
      if (props.selectable && props.multiSelectable) {
        throw new Error("A TableRow can only either be 'selectable' or 'multiSelectable' - not both.");
      }

      if (props.selectable && !props.uniqueID) {
        throw new Error("A selectable TableRow must provide a uniqueID prop to track itself within the Table.");
      }
    }
  }

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
    selectAll: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    multiSelectable: React.PropTypes.bool,
    selectRow: React.PropTypes.func
  }

  state = {
    selected: false
  }

  componentWillMount() {
    if (this.context.selectable && !this.props.uniqueID) {
      throw new Error("A selectable TableRow must provide a uniqueID prop to track itself within the Table.");
    }

    if (this.context.attachToTable && this.props.uniqueID) {
      this.context.attachToTable(this.props.uniqueID, this);
      this.context.checkSelection(this.props.uniqueID, this);
    }

    if (this.props.selected) {
      this.setState({ selected: true });
    }
  }

  componentWillUnmount() {
    if (this.context.detachFromTable && this.props.uniqueID) {
      this.context.detachFromTable(this.props.uniqueID);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.uniqueID != nextProps.uniqueID) {
      this.context.checkSelection(nextProps.uniqueID, this);
    }

    if (this.props.selected != nextProps.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onSelectAll = () => {
    this.context.selectAll(this);
  }

  onRowClick = (...args) => {
    this.context.selectRow(this.props.uniqueID, this, !this.state.selected);
    this.props.onClick(...args);
  }

  onMultiSelect = () => {
    this.context.selectRow(this.props.uniqueID, this, !this.state.selected);
  }

  /**
   * Classes to be applied to the table row component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames(
      'ui-table-row',
      `ui-table-row--${this.props.as}`,
      this.props.className, {
        'ui-table-row--clickable':  this.props.onClick,
        'ui-table-row--selected':  this.state.selected
      }
    );
  }

  get rowProps() {
    let { ...props } = this.props;

    props.className = this.mainClasses;

    if (this.context.selectable || this.props.selectable) {
      props.onClick = this.onRowClick;
    }

    return props;
  }

  get multiSelect() {
    if (this.props.hideMultiSelect) { return null; }

    let action;

    if (this.props.selectAll) {
      action = this.onSelectAll;
    } else if (this.context.multiSelectable || this.props.multiSelectable) {
      action = this.onMultiSelect;
    }

    return <Checkbox onChange={ action } checked={ this.state.selected } />;
  }

  get isHeader() {
    return this.props.as === "header";
  }

  get multiSelectCell() {
    let cell = this.isHeader ? TableHeader : TableCell;

    return React.createElement(cell, {
      key: "select", className: "ui-table-cell--select"
    }, this.multiSelect);
  }

  /**
   * Renders the component
   *
   * @method render
   */
  render() {
    let content = [this.props.children];

    if (this.props.selectAll || this.context.multiSelectable || this.props.multiSelectable) {
      content.unshift(this.multiSelectCell);
    }

    return (
      <tr { ...this.rowProps }>
        { content }
      </tr>
    );
  }

}

export default TableRow;
