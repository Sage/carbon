import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '../table-cell';
import TableHeader from '../table-header';
import { Checkbox } from '../../../__experimental__/components/checkbox';
import guid from '../../../utils/helpers/guid';
import WithDrop from '../../drag-and-drop/with-drop';
import DraggableTableCell from '../draggable-table-cell';
import StyledTableRow from './table-row.style';
import { validProps } from '../../../utils/ether';
import tagComponent from '../../../utils/helpers/tags';
import { ActionPopover } from '../../action-popover';

/**
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 */
class TableRow extends React.Component {
  state = {
    /**
     * Internal state to store this table row's DOM node (for drag-and-drop functionality).
     */
    rowNode: null,
    /**
     * Internal state to track if the row is currently highlighted.
     */
    highlighted: false,

    /**
     * Internal state to track if the row is currently selected.
     */
    selected: false
  }

  constructor(props) {
    super(props);
    this._row = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (this.context.dragDropManager) {
      if (this.props.as !== 'header' && this.props.index === undefined) {
        throw new Error('You need to provide an index for rows that are draggable');
      }
    }

    if (this.requiresUniqueID && !this.props.uniqueID) {
      throw new Error('A TableRow which is selectable or highlightable should provide a uniqueID.');
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.uniqueID !== nextProps.uniqueID) {
      // if unique id has changed, check if the table has the new id as selected or not
      this.context.checkSelection(nextProps.uniqueID, this);
    }

    if (this.props.selected !== nextProps.selected) {
      // if developer is controlling selected state - set it
      this.setState({ selected: nextProps.selected });
    }

    if (this.props.highlighted !== nextProps.highlighted) {
      // if developer is controlling highlighted state - set it
      this.setState({ highlighted: nextProps.highlighted });
    }
  }

  componentWillUnmount() {
    if (this.context.detachFromTable) {
      this.context.detachFromTable(this.rowID);
    }
  }

  componentDidMount() {
    if (this._row.current) this.setState({ rowNode: this._row.current });
  }

  /**
   * Call the selectAll callback.
   */
  onSelectAll = () => {
    this.context.selectAll(this);
  }

  /**
   * Call the selectRow callback and call any custom event the developer may have set.
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
   * Sets additional props to the row.
   */
  get rowProps() {
    const { ...props } = validProps(this);

    props.isClickable = this.props.onClick || this.props.highlightable || this.context.highlightable;
    props.isDragged = (this.draggingIsOccurring() && this.context.dragAndDropActiveIndex === this.props.index);
    props.isDragging = this.draggingIsOccurring();
    props.isHighlighted = this.state.highlighted;
    props.isPassive = this.context.passiveData;
    props.isSelected = this.state.selected;
    props.isSelectable = this.shouldHaveMultiSelectColumn;

    if (this.context.highlightable || this.props.highlightable) {
      props.onClick = this.onRowClick;
    }

    return props;
  }

  /**
   * Determines if the developer has flagged this row as a header.
   */
  get isHeader() {
    return this.props.as === 'header';
  }

  /**
   * Determines what kind of cell to render for the checkbox.
   */
  get multiSelectCell() {
    // renders a TableHeader if row is flagged as a header.
    const cell = this.isHeader ? TableHeader : TableCell;

    return React.createElement(cell, {
      key: 'select', 'data-component': 'selectable-cell'
    }, this.multiSelect);
  }

  /**
   * Returns the checkbox for the select action.
   */
  get multiSelect() {
    if (this.props.hideMultiSelect) { return null; }

    // determines which action to use (multi-select or select-all)
    const action = (this.props.selectAll || this.isHeader) ? this.onSelectAll : this.onSelect;

    return (
      <Checkbox
        onClick={ ev => ev.stopPropagation() }
        onChange={ action }
        checked={ this.state.selected }
      />
    );
  }

  /**
   * Determines if the row should have a multi select column.
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
   */
  get requiresUniqueID() {
    const highlightable = this.props.highlightable !== false
      && (this.props.highlightable || this.context.highlightable),
        selectable = this.props.selectable !== false && (this.props.selectable || this.context.selectable);

    return highlightable || selectable;
  }

  /**
   * Determines if dragging is occurring within the current draggable context.
   */
  draggingIsOccurring = () => {
    return typeof this.context.dragAndDropActiveIndex === 'number';
  }

  /**
   * Returns a draggable cell if required.
   */
  renderDraggableCell = () => {
    if (!this.context.dragDropManager || this.isHeader) {
      return null;
    }

    return (
      <DraggableTableCell
        identifier={ this.props.dragAndDropIdentifier }
        draggableNode={ () => { return this.state.rowNode; } }
        canDrag={ !this.props.hideDrag }
      />
    );
  }

  /**
   * Returns the row wrapped in draggable functionality if required.
   */
  renderDraggableRow = (row) => {
    if (!this.context.dragDropManager || this.isHeader) {
      return row;
    }

    return (
      <WithDrop
        identifier={ this.props.dragAndDropIdentifier }
        index={ this.props.index }
        canDrop={ () => { return !this.props.hideDrag; } }
        droppableNode={ () => { return this.state.rowNode; } }
      >
        {row}
      </WithDrop>
    );
  }

  set highlighted(highlighted) {
    this.setState({ highlighted });
  }

  getChildrenWithStateUpdaters() {
    return React.Children.map(this.props.children, (td) => {
      let hasActionPopover = false;

      if (!td) {
        return td;
      }

      const childrenWithProps = React.Children.map(td.props.children, (child) => {
        // When a table has an ActionPopover, the opening and closing the ActionPopover should control the highlight
        // state of the row
        if (child && child.type === ActionPopover) {
          hasActionPopover = true;
          const props = {
            onOpen: () => {
              this.highlighted = true;
              child.props.onOpen();
            },
            onClose: () => {
              this.highlighted = false;
              child.props.onClose();
            }
          };
          return React.cloneElement(child, props);
        }
        return child;
      });

      return hasActionPopover ? React.cloneElement(td, { children: childrenWithProps }) : td;
    });
  }

  /**
   * Renders the component
   */
  render() {
    const content = [this.getChildrenWithStateUpdaters()];

    if (this.shouldHaveMultiSelectColumn) {
      content.unshift(this.multiSelectCell);
    }

    return this.renderDraggableRow(
      <StyledTableRow
        { ...this.rowProps }
        { ...tagComponent('table-row', this.props) }
        ref={ this._row }
      >
        {this.renderDraggableCell()}
        {content}
      </StyledTableRow>

    );
  }
}

TableRow.propTypes = {
  theme: PropTypes.object,

  /**  Children elements */
  children: PropTypes.node,

  /** A custom class name for the component. */
  className: PropTypes.string,

  /** Allows developers to specify a callback after the row is clicked. */
  onClick: PropTypes.func,

  /** Enables multi-selectable table rows. */
  selectable: PropTypes.bool,

  /** Enables highlightable table rows. */
  highlightable: PropTypes.bool,

  /** Allows developers to manually control selected state for the row. */
  selected: PropTypes.bool,

  /** Allows developers to manually control highlighted state for the row. */
  highlighted: PropTypes.bool,

  /** Define a unique ID so the table can track the row (useful for highlightable or selectable rows). */
  uniqueID: PropTypes.string,

  /** What the row should be displayed as, set to 'header' to display as header */
  as: PropTypes.string,

  /** Whether to hide the multiSelect */
  hideMultiSelect: PropTypes.bool,

  /** Whether to select all */
  selectAll: PropTypes.bool,

  /** Callback for when a row is highlighted */
  onHighlight: PropTypes.func,

  /** Callback for when a row is selected */
  onSelect: PropTypes.func,

  /** Used if this row is within a draggable context */
  index: PropTypes.number,

  /** Optional to associate the drag and drag context. */
  dragAndDropIdentifier: PropTypes.string,

  /** Used to determine if line is empty or not */
  hideDrag: PropTypes.bool,

  /** Used to determine if line is dragged */
  dragged: PropTypes.bool,

  /** Used to determine if line is empty is dragging */
  dragging: PropTypes.func
};

TableRow.safeProps = [
  'onClick',
  'theme'
];

TableRow.contextTypes = {
  attachToTable: PropTypes.func, // attach the row to the table
  detachFromTable: PropTypes.func, // detach the row from the table
  checkSelection: PropTypes.func, // a function to check if the row is currently selected
  highlightRow: PropTypes.func, // highlights the row
  selectAll: PropTypes.func, // a callback function for when all visible rows are selected
  highlightable: PropTypes.bool, // table can enable all rows to be highlightable
  selectable: PropTypes.bool, // table can enable all rows to be multi-selectable
  selectRow: PropTypes.func, // a callback function for when a row is selected
  dragDropManager: PropTypes.object, // the React DND DragDropManager
  dragAndDropActiveIndex: PropTypes.number, // tracks the currently active index
  passiveData: PropTypes.bool // tracks if the data should be rendered passively
};

export default TableRow;
