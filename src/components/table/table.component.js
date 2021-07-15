import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Immutable from "immutable";
import ActionToolbar from "../action-toolbar";
import Icon from "../icon";
import Link from "../link";
import StyledTable, { StyledInternalTableWrapper } from "./table.style";
import TableRow from "./table-row";
import TableCell from "./table-cell";
import TableHeader from "./table-header";
import TableSubheader from "./table-subheader";
import DraggableTableCell from "./draggable-table-cell";
import Pager from "../pager";
import Loader from "../loader";
import OptionsHelper from "../../utils/helpers/options-helper";
import Logger from "../../utils/logger/logger";
import LocaleContext from "../../__internal__/i18n-context";

let deprecatedWarnTriggered = false;

class Table extends React.Component {
  static contextType = LocaleContext;

  constructor(props) {
    super(props);
    if (!deprecatedWarnTriggered) {
      deprecatedWarnTriggered = true;
      // eslint-disable-next-line max-len
      Logger.deprecate(
        "`Table` component is deprecated and will soon be removed. Please use `FlatTable` instead: https://carbon.sage.com/?path=/story/design-system-flat-table--default-story"
      );
    }
  }

  state = {
    selectedCount: 0,
  };

  getChildContext = () => {
    return {
      attachActionToolbar: this.attachActionToolbar,
      detachActionToolbar: this.detachActionToolbar,
      attachToTable: this.attachToTable,
      detachFromTable: this.detachFromTable,
      checkSelection: this.checkSelection,
      highlightRow: this.highlightRow,
      onSort: this.onSort,
      highlightable: this.props.highlightable,
      selectable: this.props.selectable,
      selectAll: this.selectAll,
      selectRow: this.selectRow,
      sortedColumn: this.sortedColumn,
      sortOrder: this.sortOrder,
      passiveData: this.isPassive,
    };
  };

  componentDidMount() {
    this.resizeTable();
  }

  /**
   * Lifecycle for after a update has happened
   * If filter has changed then emit the on change event.
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // if filter has changed, update the data
    if (!Immutable.is(this.props.filter, nextProps.filter)) {
      this.emitOnChangeCallback("filter", this.emitOptions(nextProps));
    }

    if (this.props.highlightable && nextProps.highlightable === false) {
      this.resetHighlightedRow();
    }

    if (this.props.selectable && nextProps.selectable === false) {
      for (const key in this.rows) {
        // update all the rows with the new state
        const row = this.rows[key];
        this.selectRow(row.props.uniqueID, row, false);
      }
      this.selectedRows = {};
    }
  }

  componentDidUpdate(prevProps) {
    if (this.shouldResetTableHeight(prevProps)) {
      this.resetTableHeight();
    } else {
      this.resizeTable();
    }
  }

  onSort = (sortedColumn, sortOrder) => {
    const options = this.emitOptions();
    options.sortedColumn = sortedColumn;
    options.sortOrder = sortOrder;
    this.emitOnChangeCallback("table", options);
  };

  onPagination = (currentPage, pageSize, element) => {
    if (this.props.onPageSizeChange && element === "size") {
      this.props.onPageSizeChange(pageSize);
    }
    const options = this.emitOptions();
    options.currentPage = currentPage;
    options.pageSize = pageSize;
    this.emitOnChangeCallback("pager", options);
  };

  get sortedColumn() {
    return this.props.sortedColumn;
  }

  get sortOrder() {
    return this.props.sortOrder;
  }

  get pageSize() {
    return this.props.pageSize;
  }

  emitOnChangeCallback = (element, options) => {
    if (this.selectAllComponent) {
      // reset the select all component
      this.selectAllComponent.setState({ selected: false });
      this.selectAllComponent = null;
    }

    this.props.onChange(element, options);
  };

  attachActionToolbar = (comp) => {
    this.actionToolbarComponent = comp;
  };

  detachActionToolbar = () => {
    this.actionToolbarComponent = null;
  };

  attachToTable = (id, row) => {
    this.rows[id] = row;
  };

  detachFromTable = (id) => {
    delete this.rows[id];
  };

  refresh = () => {
    this.resetHighlightedRow();
    this.selectedRows = {};
    if (this.actionToolbarComponent) {
      this.actionToolbarComponent.setState({
        total: 0,
        selected: [],
      });
    }

    for (const key in this.rows) {
      const _row = this.rows[key];
      _row.setState({ selected: false });
    }
    this.emitOnChangeCallback("refresh", this.emitOptions());
  };

  resetHighlightedRow = () => {
    if (this.highlightedRow.row && this.rows[this.highlightedRow.row.rowID]) {
      this.highlightedRow.row.setState({ highlighted: false });
    }

    this.highlightedRow = {
      id: null,
      row: null,
    };
  };

  highlightRow = (id, row) => {
    let state = true;

    if (this.highlightedRow.id !== null) {
      if (id === this.highlightedRow.id) {
        state = !row.state.highlighted;
      } else {
        this.resetHighlightedRow();
      }
    }

    row.setState({ highlighted: state });

    this.highlightedRow = {
      id,
      row,
    };

    if (this.props.onHighlight) {
      this.props.onHighlight(id, state, row);
    }
  };

  selectRow = (id, row, state, skipCallback) => {
    const isSelected = this.selectedRows[id] !== undefined;

    if (state === isSelected) {
      return;
    }

    if (this.selectAllComponent) {
      this.selectAllComponent.setState({ selected: false });
      this.selectAllComponent = null;
    }

    if (!state && isSelected) {
      delete this.selectedRows[id];
    } else if (!row.props.selectAll) {
      this.selectedRows[id] = row;
    }

    row.setState({ selected: state });

    if (this.actionToolbarComponent && !skipCallback) {
      const keys = Object.keys(this.selectedRows);

      this.actionToolbarComponent.setState({
        total: keys.length,
        selected: this.selectedRows,
      });
    }

    if (this.props.onSelect && !skipCallback) {
      this.props.onSelect(this.selectedRows);
    }
  };

  selectAll = (row) => {
    const selectState = !row.state.selected;

    for (const key in this.rows) {
      const _row = this.rows[key];
      if (_row.shouldHaveMultiSelectColumn) {
        this.selectRow(_row.props.uniqueID, _row, selectState, true);
      }
    }

    row.setState({ selected: selectState });

    this.selectAllComponent = selectState ? row : null;

    if (this.actionToolbarComponent) {
      const keys = Object.keys(this.selectedRows);

      this.actionToolbarComponent.setState({
        total: keys.length,
        selected: this.selectedRows,
      });
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.selectedRows);
    }
  };

  checkSelection = (id, row) => {
    const isSelected = this.selectedRows[id] !== undefined,
      isHighlighted = this.highlightedRow.id === id;

    if (isSelected !== row.state.selected) {
      row.setState({ selected: isSelected });
    }

    if (isHighlighted !== row.state.highlighted) {
      row.setState({ highlighted: isHighlighted });
    }
  };

  resetTableHeight() {
    this._wrapper.style.minHeight = "0";
    this.tableHeight = 0;
    setTimeout(() => {
      this.resizeTable();
    }, 0);
  }

  resizeTable() {
    if (!this._table) {
      return;
    }
    const shrink =
      this.props.shrink && this._table.offsetHeight < this.tableHeight;

    if (shrink || this._table.offsetHeight > this.tableHeight) {
      this.tableHeight = this._table.offsetHeight;
      this._wrapper.style.minHeight = `${this.tableHeight - 1}px`;
    }
  }

  shouldResetTableHeight(prevProps) {
    return (
      prevProps.size !== this.props.size || prevProps.pageSize > this.pageSize
    );
  }

  selectAllComponent = null;

  actionToolbarComponent = null;

  selectedRows = {};

  highlightedRow = { id: null, row: null };

  rows = {};

  tableHeight = 0;

  emitOptions = (props = this.props) => {
    let currentPage = props.currentPage || 0;

    if (Number(props.currentPage) > Number(props.pageSize)) {
      currentPage = 1;
    }

    return {
      currentPage,
      filter: props.filter ? props.filter.toJS() : {},
      pageSize: props.pageSize || "",
      sortOrder: props.sortOrder || "",
      sortedColumn: props.sortedColumn || "",
    };
  };

  get pagerProps() {
    return {
      currentPage: this.props.currentPage,
      onPagination: this.onPagination,
      pageSize: this.defaultPageSize,
      pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
      showPageSizeSelection: this.props.showPageSizeSelection,
      totalRecords: this.props.totalRecords,
    };
  }

  get defaultPageSize() {
    if (this.props.pageSize) {
      return this.props.pageSize;
    }
    if (this.props.pageSizeSelectionOptions) {
      return this.props.pageSizeSelectionOptions.first().get("id");
    }
    return "10";
  }

  get pager() {
    if (this.props.paginate) {
      return <Pager {...this.pagerProps} />;
    }
    return null;
  }

  get isPassive() {
    return Boolean(
      this.props.isPassiveData &&
        !this.props.highlightable &&
        !this.props.selectable
    );
  }

  get thead() {
    if (this.props.thead) {
      return <thead>{this.props.thead}</thead>;
    }
    return null;
  }

  get actionToolbar() {
    if (!this.props.selectable || !this.props.actions) {
      return null;
    }

    return (
      <ActionToolbar
        total={this.state.selectedCount}
        actions={this.props.actions}
      >
        {this.props.actionToolbarChildren}
      </ActionToolbar>
    );
  }

  configureLink = (onConfigure) => {
    if (!onConfigure) {
      return null;
    }

    return (
      <div>
        <Link href="#" onClick={onConfigure}>
          <Icon type="settings" />
        </Link>
      </div>
    );
  };

  get loadingRow() {
    return (
      <TableRow
        key="__loading__"
        selectable={false}
        highlightable={false}
        hideMultiSelect
      >
        <TableCell colSpan="42" align="center">
          <TransitionGroup>
            <CSSTransition classNames="table-loading" timeout={300} appear>
              <Loader size="small" />
            </CSSTransition>
          </TransitionGroup>
        </TableCell>
      </TableRow>
    );
  }

  get emptyRow() {
    if (this.props.customEmptyRow) {
      return this.props.customEmptyRow;
    }

    return (
      <TableRow key="__loading__" selectable={false} highlightable={false}>
        <TableCell colSpan="42" align="center">
          {this.context.table.noData}
        </TableCell>
      </TableRow>
    );
  }

  get tableContent() {
    let { children } = this.props,
      hasChildren = children;

    if (children && children.count) {
      const numOfChildren = children.count(),
        onlyChildIsHeader =
          numOfChildren === 1 && children.first().props.as === "header";

      if (onlyChildIsHeader) {
        if (this._hasRetreivedData) {
          children = children.push(this.emptyRow);
        } else {
          children = children.push(this.loadingRow);
        }
      } else {
        hasChildren = numOfChildren > 0;
      }
    }

    if (hasChildren) return children;
    if (this._hasRetreivedData) return this.emptyRow;
    return this.loadingRow;
  }

  get tbody() {
    if (this.props.tbody === false) {
      return this.tableContent;
    }
    return <tbody>{this.tableContent}</tbody>;
  }

  dataState = () => {};

  get dataComponent() {
    return "table";
  }

  componentTags(props) {
    return {
      "data-component": this.dataComponent,
      "data-element": props["data-element"],
      "data-role": props["data-role"],
      "data-state": this.dataState(),
      "aria-busy": this.state.ariaBusy,
    };
  }

  get caption() {
    if (this.props.caption) {
      return <caption>{this.props.caption}</caption>;
    }

    return null;
  }

  render() {
    const tableProps = {
      tableType: this.props.theme,
      size: this.props.size,
      isZebra: this.props.isZebra,
      paginate: this.props.paginate,
    };

    if (this.props["aria-describedby"]) {
      tableProps["aria-describedby"] = this.props["aria-describedby"];
    }

    return (
      <div {...this.componentTags(this.props)}>
        {this.actionToolbar}
        <StyledInternalTableWrapper
          ref={(wrapper) => {
            this._wrapper = wrapper;
          }}
          paginate={this.props.paginate}
          className={this.props.className}
        >
          {this.configureLink(this.props.onConfigure)}
          <StyledTable
            ref={(table) => {
              this._table = table;
            }}
            {...tableProps}
          >
            {this.caption}
            {this.thead}
            {this.tbody}
          </StyledTable>
        </StyledInternalTableWrapper>
        {this.pager}
      </div>
    );
  }
}

Table.propTypes = {
  /**  The actions to display in the toolbar  */
  actions: PropTypes.object,
  /** The extra actions to display in the toolbar */
  actionToolbarChildren: PropTypes.func,
  /** Children elements */
  children: PropTypes.node,
  /** Custom className */
  className: PropTypes.string,
  /**  Custom empty row */
  customEmptyRow: PropTypes.node,
  /** Data used to filter the data */
  filter: PropTypes.object,
  /** Emitted when table component changes e.g. Pager, sorting, filter */
  onChange: PropTypes.func,
  /** Enable configure icon that triggers this callback on click */
  onConfigure: PropTypes.func,
  /** Show the pagination footer */
  paginate: PropTypes.bool,
  /** Pagination - Current Visible Page */
  currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Pagination - Page Size of grid (number of visible records) */
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Pagination - Options for pageSize - default: 10, 25, 50 */
  pageSizeSelectionOptions: PropTypes.object,
  /** Pagination - Is the page size dropdown visible  */
  showPageSizeSelection: PropTypes.bool,
  /** Enables multi-selectable table rows. */
  selectable: PropTypes.bool,
  /** Enables highlightable table rows. */
  highlightable: PropTypes.bool,
  /** A callback for when a row is selected. */
  onSelect: PropTypes.func,
  /** A callback for when a row is highlighted. */
  onHighlight: PropTypes.func,
  /** A callback for when the page size changes. */
  onPageSizeChange: PropTypes.func,
  /** Pagination - Total number of records in the grid */
  totalRecords: PropTypes.number,
  /** Allow table to shrink in size. */
  shrink: PropTypes.bool,
  /** The currently sorted column. */
  sortedColumn: PropTypes.string,
  /** The current sort order applied. */
  sortOrder: PropTypes.string,
  /** TableRows to be wrapped in <thead> */
  thead: PropTypes.object,
  /** Determines if you want the table to automatically render a tbody. */
  tbody: PropTypes.bool,
  /** A string to render as the table's caption */
  caption: PropTypes.string,
  /** The HTML id of the element that contains a description of this table. */
  "aria-describedby": PropTypes.string,
  /** Renders as 'primary' / 'dark', 'secondary' / 'light', 'tertiary' / 'transparent' */
  theme: PropTypes.oneOf(OptionsHelper.tableThemes),
  /** Used to define the tables size Renders as:  'compact', 'small', 'medium' and 'large' */
  size: PropTypes.oneOf(OptionsHelper.tableSizes),
  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool,
  /** Set if data is passive and requires no hover added styling */
  isPassiveData: PropTypes.bool,
};

Table.childContextTypes = {
  /**
   * Defines a context object for child components of the table component.
   * https://facebook.github.io/react/docs/context.html
   */
  attachActionToolbar: PropTypes.func, // tracks the action toolbar component
  detachActionToolbar: PropTypes.func, // tracks the action toolbar component
  attachToTable: PropTypes.func, // attach the row to the table
  checkSelection: PropTypes.func, // a function to check if the row is currently selected
  detachFromTable: PropTypes.func, // detach the row from the table
  highlightRow: PropTypes.func, // highlights the row
  selectable: PropTypes.bool, // table can enable all rows to be multi-selectable
  onSort: PropTypes.func, // a callback function for when a sort order is updated
  selectAll: PropTypes.func, // a callback function for when all visible rows are selected
  selectRow: PropTypes.func, // a callback function for when a row is selected
  highlightable: PropTypes.bool, // table can enable all rows to be highlightable
  sortOrder: PropTypes.string, // the current sort order applied
  sortedColumn: PropTypes.string, // the currently sorted column
  passiveData: PropTypes.bool, // Renders data as passive, without hover styling etc
};

Table.defaultProps = {
  theme: OptionsHelper.tableThemes[0],
  size: OptionsHelper.tableSizes[2],
};

export {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableSubheader,
  DraggableTableCell,
};
