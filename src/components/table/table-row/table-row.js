import React from 'react';
import classNames from 'classnames';
import TableCell from './../table-cell';
import TableHeader from './../table-header';
import Checkbox from './../../checkbox';
import guid from './../../../utils/helpers/guid';
import { validProps } from '../../../utils/ether';
import { WithDragAndDrop } from './../../with-drag-and-drop';

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
    /**
     * Enables multi-selectable table rows.
     *
     * @property selectable
     * @type {Boolean}
     */
    selectable: React.PropTypes.bool,

    /**
     * Enables highlightable table rows.
     *
     * @property highlightable
     * @type {Boolean}
     */
    highlightable: React.PropTypes.bool,

    /**
     * Allows developers to manually control selected state for the row.
     *
     * @property selected
     * @type {Boolean}
     */
    selected: React.PropTypes.bool,

    /**
     * Allows developers to manually control highlighted state for the row.
     *
     * @property highlighted
     * @type {Boolean}
     */
    highlighted: React.PropTypes.bool,

    /**
     * Define a unique ID so the table can track the row (useful for highlightable or selectable rows).
     *
     * @property uniqueID
     * @type {String}
     */
    uniqueID: React.PropTypes.string,

    /**
     * What the row should be displayed as, set to 'header' to display as header
     *
     * @property as
     * @type {String}
     */
    as: React.PropTypes.string,

    /**
     * Whether to hide the multiSelect
     *
     * @property hideMultiSelect
     * @type {Boolean}
     */
    hideMultiSelect: React.PropTypes.bool,

    /**
     * Whether to select all
     *
     * @property selectAll
     * @type {Boolean}
     */
    selectAll: React.PropTypes.bool,

    /**
     * Callback for when a row is highlighted
     * @property onHighlight
     * @type {Function}
     */
    onHighlight: React.PropTypes.func,

    /**
     * Callback for when a row is selected
     * @property onSelect
     * @type {Function}
     */
    onSelect: React.PropTypes.func,

    /**
     * Used if this row is within a draggable context
     *
     * @property index
     * @type {Number}
     */
    index: React.PropTypes.number
  }

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */
  static contextTypes = {
    attachToTable: React.PropTypes.func, // attach the row to the table
    detachFromTable: React.PropTypes.func, // detach the row from the table
    checkSelection: React.PropTypes.func, // a function to check if the row is currently selected
    highlightRow: React.PropTypes.func, // highlights the row
    selectAll: React.PropTypes.func, // a callback function for when all visible rows are selected
    highlightable: React.PropTypes.bool, // table can enable all rows to be highlightable
    selectable: React.PropTypes.bool, // table can enable all rows to be multi-selectable
    selectRow: React.PropTypes.func, // a callback function for when a row is selected
    dragDropManager: React.PropTypes.object, // the React DND DragDropManager
    moveItem: React.PropTypes.func, // a callback function for when a draggable item is moved
    canDrag: React.PropTypes.func, // a callback function to specify whether dragging is allowed
    beginDrag: React.PropTypes.func, // a callback function called when dragging starts
    hover: React.PropTypes.func // a callback function called when an item is hovered over a drop target
  }

  state = {
    /**
     * Internal state to track if the row is currently highlighted.
     *
     * @property highlighted
     * @type {Boolean}
     * @default false
     */
    highlighted: false,

    /**
     * Internal state to track if the row is currently selected.
     *
     * @property selected
     * @type {Boolean}
     * @default false
     */
    selected: false
  }

  /**
   * @method componentWillMount
   * @return {Void}
   */
  componentWillMount() {
    if (this.context.dragDropManager) {
      if (this.props.as !== 'header' && this.props.index === undefined) {
        throw new Error('You need to provide an index for rows that are draggable');
      }
    }

    if (this.requiresUniqueID && !this.props.uniqueID) {
      throw new Error("A TableRow which is selectable or highlightable should provide a uniqueID.");
    }

    if (this.context.attachToTable && this.props.uniqueID && !this.props.selectAll && !this.isHeader) {
      // generate row id
      this.rowID = guid();
      // only attach to the table if we have a unique id
      this.context.attachToTable(this.rowID, this);
      // also check if row is already selected/highlighted
      this.context.checkSelection(this.props.uniqueID, this);
    }

    if (this.props.selected) {
      // if developer is controlling selected state - set it
      this.setState({ selected: true });
    }

    if (this.props.highlighted) {
      // if developer is controlling highlighted state - set it
      this.setState({ highlighted: true });
    }
  }

  /**
   * @method componentWillUnmount
   * @return {Void}
   */
  componentWillUnmount() {
    if (this.context.detachFromTable) {
      this.context.detachFromTable(this.rowID);
    }
  }

  /**
   * @method componentWillReceiveProps
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.uniqueID != nextProps.uniqueID) {
      // if unique id has changed, check if the table has the new id as selected or not
      this.context.checkSelection(nextProps.uniqueID, this);
    }

    if (this.props.selected != nextProps.selected) {
      // if developer is controlling selected state - set it
      this.setState({ selected: nextProps.selected });
    }

    if (this.props.highlighted != nextProps.highlighted) {
      // if developer is controlling highlighted state - set it
      this.setState({ highlighted: nextProps.highlighted });
    }
  }

  /**
   * Call the selectAll callback.
   *
   * @method onSelectAll
   * @return {Void}
   */
  onSelectAll = () => {
    this.context.selectAll(this);
  }

  /**
   * Call the selectRow callback and call any custom event the developer may have set.
   *
   * @method onRowClick
   * @return {Void}
   */
  onRowClick = (...args) => {
    if (this.props.onHighlight) {
      // trigger onHighlight callback if defined
      this.props.onHighlight(this.props.uniqueID, !this.state.highlighted, this);
    } else {
      // trigger highlightRow method on the table
      this.context.highlightRow(this.props.uniqueID, this);
    }

    // trigger any custom onClick event the developer may have set
    if (this.props.onClick) { this.props.onClick(...args); }
  }

  /**
   * Call the selectRow callback.
   *
   * @method onSelect
   * @return {Void}
   */
  onSelect = (ev) => {
    if (this.props.onSelect) {
      // trigger onSelect callback if defined
      this.props.onSelect(this.props.uniqueID, ev.target.value, this);
    } else {
      // trigger selectRow method on the table
      this.context.selectRow(this.props.uniqueID, this, !this.state.selected);
    }
  }

  /**
   * Classes to be applied to the table row component
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return classNames(
      'carbon-table-row',
      this.props.className, {
        'carbon-table-row--clickable': this.props.onClick || this.props.highlightable || this.context.highlightable,
        'carbon-table-row--selected': this.state.selected,
        'carbon-table-row--highlighted': (this.state.highlighted && !this.state.selected)
      }
    );
  }

  /**
   * Sets additional props to the row.
   *
   * @method rowProps
   * @return {Object}
   */
  get rowProps() {
    let { ...props } = validProps(this);

    props.className = this.mainClasses;

    if (this.context.highlightable || this.props.highlightable) {
      props.onClick = this.onRowClick;
    }

    return props;
  }

  /**
   * Determines if the developer has flagged this row as a header.
   *
   * @method isHeader
   * @return {Boolean}
   */
  get isHeader() {
    return this.props.as === "header";
  }

  /**
   * Determines what kind of cell to render for the checkbox.
   *
   * @method multiSelectCell
   * @return {Object} JSX
   */
  get multiSelectCell() {
    // renders a TableHeader if row is flagged as a header.
    let cell = this.isHeader ? TableHeader : TableCell;

    return React.createElement(cell, {
      key: "select", className: "carbon-table-cell--select"
    }, this.multiSelect);
  }

  /**
   * Returns the checkbox for the select action.
   *
   * @method multiSelect
   * @return {Object} JSX
   */
  get multiSelect() {
    if (this.props.hideMultiSelect) { return null; }

    // determines which action to use (multi-select or select-all)
    let action = (this.props.selectAll || this.isHeader) ? this.onSelectAll : this.onSelect;

    return <Checkbox onClick={ (ev) => ev.stopPropagation() } onChange={ action } checked={ this.state.selected } />;
  }

  /**
   * Determines if the row should have a multi select column.
   *
   * @method shouldHaveMultiSelectColumn
   * @return {Boolean}
   */
  get shouldHaveMultiSelectColumn() {
    // if component specifically disables selectable, don't put the cell in
    if (this.props.selectable !== false) {
      // if multi-seletable, add the checkbox cell
      if (this.props.selectAll || this.context.selectable || this.props.selectable) {
        return true;
      }
    }

    return false;
  }

  /**
   * Determines if the row requires a unique ID.
   *
   * @method requiresUniqueID
   * @return {Boolean}
   */
  get requiresUniqueID() {
    let highlightable = this.props.highlightable !== false && (this.props.highlightable || this.context.highlightable),
        selectable = this.props.selectable !== false && (this.props.selectable || this.context.selectable);

    return highlightable || selectable;
  }

  /**
   * Renders the component
   *
   * @method render
   */
  render() {
    let content = [this.props.children];
    let row = (
      <tr { ...this.rowProps }>
        { content }
      </tr>
    );

    if (this.shouldHaveMultiSelectColumn) {
      content.unshift(this.multiSelectCell);
    }

    if (this.context.dragDropManager) {
      return (
        <WithDragAndDrop
          moveItem={ this.context.moveItem }
          canDrag={ this.context.canDrag }
          beginDrag={ this.context.beginDrag }
          hover={ this.context.hover }
          index={ this.props.index }
        >
          { row }
        </WithDragAndDrop>
      );
    } else {
      return row;
    }
  }
}

export default TableRow;
