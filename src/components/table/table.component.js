import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Immutable from 'immutable';
import I18n from 'i18n-js';
import ActionToolbar from '../action-toolbar/action-toolbar';
import Icon from '../icon';
import Link from '../link';
import StyledTable, { StyledInternalTableWrapper } from './table.style';
import TableRow from './table-row';
import TableCell from './table-cell';
import TableHeader from './table-header';
import TableSubheader from './table-subheader';
import DraggableTableCell from './draggable-table-cell';
import Pager from '../pager';
import Spinner from '../spinner/spinner.component';
import OptionsHelper from '../../utils/helpers/options-helper';

class Table extends React.Component {
  state = {
    selectedCount: 0
  }

  /**
   * Returns table object to child components.
   */
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
      sortOrder: this.sortOrder
    };
  }

  /**
   * Lifecycle for after mounting
   * Resize the table to set the correct height on pageload
   */
  componentDidMount() {
    this.resizeTable();
  }

  /**
   * Lifecycle for after a update has happened
   * If filter has changed then emit the on change event.
   */
  componentWillReceiveProps(nextProps) {
    // if filter has changed, update the data
    if (!Immutable.is(this.props.filter, nextProps.filter)) {
      this.emitOnChangeCallback('filter', this.emitOptions(nextProps));
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

  /**
   * Lifecycle for after a update has happened
   * If pageSize has updated to a smaller value - reset table height
   * else resize table
   */
  componentDidUpdate(prevProps) {
    if (this.shouldResetTableHeight(prevProps)) {
      this.resetTableHeight();
    } else {
      this.resizeTable();
    }
  }

  /**
   * Handles what happens on sort.
   */
  onSort = (sortedColumn, sortOrder) => {
    const options = this.emitOptions();
    options.sortedColumn = sortedColumn;
    options.sortOrder = sortOrder;
    this.emitOnChangeCallback('table', options);
  }

  /**
   * Handles when the pager emits a onChange event
   * Passes data to emitOnChangeCallback in the correct
   * format
   */
  onPagination = (currentPage, pageSize, element) => {
    if (this.props.onPageSizeChange && element === 'size') {
      this.props.onPageSizeChange(pageSize);
    }
    const options = this.emitOptions();
    options.currentPage = currentPage;
    options.pageSize = pageSize;
    this.emitOnChangeCallback('pager', options);
  }

  /**
   * Returns the currently sorted column.
   */
  get sortedColumn() {
    return this.props.sortedColumn;
  }

  /**
   * Returns the current sort order.
   */
  get sortOrder() {
    return this.props.sortOrder;
  }

  /**
   * Get pageSize for table
   */
  get pageSize() {
    return this.props.pageSize;
  }

  /**
   * Emit onChange event with options
   * needed to fetch the new data
   */
  emitOnChangeCallback = (element, options) => {
    if (this.selectAllComponent) {
      // reset the select all component
      this.selectAllComponent.setState({ selected: false });
      this.selectAllComponent = null;
    }

    this.props.onChange(element, options);
  }

  /**
   * Attaches action toolbar to the table.
   */
  attachActionToolbar = (comp) => {
    this.actionToolbarComponent = comp;
  }

  /**
   * Detaches action toolbar to the table.
   */
  detachActionToolbar = () => {
    this.actionToolbarComponent = null;
  }

  /**
   * Attaches a row to the table.
   */
  attachToTable = (id, row) => {
    this.rows[id] = row;
  }

  /**
   * Detaches a row from the table.
   */
  detachFromTable = (id) => {
    delete this.rows[id];
  }

  /**
   * Refreshes the grid and resets any selected rows.
   */
  refresh = () => {
    this.resetHighlightedRow();
    this.selectedRows = {};
    if (this.actionToolbarComponent) {
      this.actionToolbarComponent.setState({
        total: 0,
        selected: []
      });
    }

    for (const key in this.rows) {
      const _row = this.rows[key];
      _row.setState({ selected: false });
    }
    this.emitOnChangeCallback('refresh', this.emitOptions());
  }

  /**
   * Resets the highlighted row.
   */
  resetHighlightedRow = () => {
    if (this.highlightedRow.row && this.rows[this.highlightedRow.row.rowID]) {
      this.highlightedRow.row.setState({ highlighted: false });
    }

    this.highlightedRow = {
      id: null,
      row: null
    };
  }

  /**
   * Highlights the row in the table.
   */
  highlightRow = (id, row) => {
    let state = true;

    if (this.highlightedRow.id !== null) {
      if (id === this.highlightedRow.id) {
        // is the same row - toggle the current state
        state = !row.state.highlighted;
      } else {
        // is a different row - reset the old row
        this.resetHighlightedRow();
      }
    }

    // set state of the highlighted row
    row.setState({ highlighted: state });

    // update the current highlighted row
    this.highlightedRow = {
      id,
      row
    };

    if (this.props.onHighlight) {
      // trigger onHighlight event
      this.props.onHighlight(id, state, row);
    }
  }

  /**
   * Selects the row in the table.
   */
  selectRow = (id, row, state, skipCallback) => {
    const isSelected = this.selectedRows[id] !== undefined;

    // if row state has not changed - return early
    if (state === isSelected) { return; }

    if (this.selectAllComponent) {
      // if there is a select all component, reset it
      this.selectAllComponent.setState({ selected: false });
      this.selectAllComponent = null;
    }

    if (!state && isSelected) {
      // if unselecting the row, delete it from the object
      delete this.selectedRows[id];
    } else if (!row.props.selectAll) {
      // add current row to the list of selected rows
      this.selectedRows[id] = row;
    }

    // set new state for the row
    row.setState({ selected: state });

    if (this.actionToolbarComponent && !skipCallback) {
      const keys = Object.keys(this.selectedRows);

      // update action toolbar
      this.actionToolbarComponent.setState({
        total: keys.length,
        selected: this.selectedRows
      });
    }

    if (this.props.onSelect && !skipCallback) {
      // trigger onSelect event
      this.props.onSelect(this.selectedRows);
    }
  }

  /**
   * Selects all the currently visible rows.
   */
  selectAll = (row) => {
    const selectState = !row.state.selected;

    for (const key in this.rows) {
      // update all the rows with the new state
      const _row = this.rows[key];
      if (_row.shouldHaveMultiSelectColumn) {
        this.selectRow(_row.props.uniqueID, _row, selectState, true);
      }
    }

    // update the row with the new state
    row.setState({ selected: selectState });

    // if select state is true, track the select all component
    this.selectAllComponent = selectState ? row : null;


    if (this.actionToolbarComponent) {
      const keys = Object.keys(this.selectedRows);

      // update action toolbar
      this.actionToolbarComponent.setState({
        total: keys.length,
        selected: this.selectedRows
      });
    }

    if (this.props.onSelect) {
      // trigger onSelect event
      this.props.onSelect(this.selectedRows);
    }
  }

  /**
   * Checks the rows status using the table's stored checked rows and updates
   * its status based on this.
   */
  checkSelection = (id, row) => {
    const isSelected = this.selectedRows[id] !== undefined,
        isHighlighted = this.highlightedRow.id === id;

    if (isSelected !== row.state.selected) {
      row.setState({ selected: isSelected });
    }

    if (isHighlighted !== row.state.highlighted) {
      row.setState({ highlighted: isHighlighted });
    }
  }

  /**
   * Reset the minHeight and tableHeight of the table
   */
  resetTableHeight() {
    this._wrapper.style.minHeight = '0';
    this.tableHeight = 0;
    setTimeout(() => {
      this.resizeTable();
    }, 0);
  }

  /**
   * Increase the minheight of the table if the new height
   * is greater than the previous
   */
  resizeTable() {
    if (!this._table) { return; }
    const shrink = this.props.shrink && this._table.offsetHeight < this.tableHeight;

    if (shrink || this._table.offsetHeight > this.tableHeight) {
      this.tableHeight = this._table.offsetHeight;
      this._wrapper.style.minHeight = `${this.tableHeight - 1}px`;
    }
  }

  /**
   * Test if the table height should be reset to 0
   */
  shouldResetTableHeight(prevProps) {
    return prevProps.size !== this.props.size || prevProps.pageSize > this.pageSize;
  }

  /**
   * Tracks the component used for select all.
   */
  selectAllComponent = null;

  /**
   * Tracks the action toolbar component.
   */
  actionToolbarComponent = null;

  /**
   * Tracks the rows which are currently selected.
   */
  selectedRows = {};

  /**
   * Tracks the currently highlighted row.
   */
  highlightedRow = {
    id: null,
    row: null
  };

  /**
   * The rows currently attached to the table.
   */
  rows = {};

  /**
   * Maintains the height of the table
   */
  tableHeight = 0;

  /**
   * Base Options to be emitted by onChange
   */
  emitOptions = (props = this.props) => {
    let currentPage = props.currentPage || '';

    if (Number(props.currentPage) > Number(props.pageSize)) {
      currentPage = '1';
    }

    return {
      // What if paginate is false - think about when next change functionality is added
      currentPage,
      filter: props.filter ? props.filter.toJS() : {},
      pageSize: props.pageSize || '',
      sortOrder: props.sortOrder || '',
      sortedColumn: props.sortedColumn || ''
    };
  }

  /**
   * Props to pass to pager component
   */
  get pagerProps() {
    return {
      currentPage: this.props.currentPage,
      onPagination: this.onPagination,
      pageSize: this.defaultPageSize,
      pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
      showPageSizeSelection: this.props.showPageSizeSelection,
      totalRecords: this.props.totalRecords
    };
  }

  /**
   * Page size for page load
   */
  get defaultPageSize() {
    if (this.props.pageSize) {
      return this.props.pageSize;
    }
    if (this.props.pageSizeSelectionOptions) {
      return this.props.pageSizeSelectionOptions.first().get('id');
    }
    return '10';
  }

  /**
   * Returns the pager if paginate is true
   */
  get pager() {
    if (this.props.paginate) {
      return (<Pager { ...this.pagerProps } />);
    }
    return null;
  }

  /**
   * Returns thead content wrapped in <thead>
   */
  get thead() {
    if (this.props.thead) {
      return (
        <thead>
          { this.props.thead }
        </thead>
      );
    }
    return null;
  }

  /**
   * Returns the component for the action toolbar.
   */
  get actionToolbar() {
    if (!this.props.selectable || !this.props.actions) { return null; }

    return (
      <ActionToolbar
        total={ this.state.selectedCount }
        actions={ this.props.actions }
      >
        { this.props.actionToolbarChildren }
      </ActionToolbar>
    );
  }

  configureLink = (onConfigure) => {
    if (!onConfigure) { return null; }

    return (
      <div>
        <Link href='#' onClick={ onConfigure }>
          <Icon type='settings' />
        </Link>
      </div>
    );
  }

  /**
   * Returns a row to be used for loading.
   */
  get loadingRow() {
    return (
      <TableRow
        key='__loading__' selectable={ false }
        highlightable={ false } hideMultiSelect
      >
        <TableCell colSpan='42' align='center'>
          <CSSTransitionGroup
            component='div'
            transitionName='table-loading'
            transitionEnterTimeout={ 300 }
            transitionLeaveTimeout={ 300 }
            transitionAppearTimeout={ 300 }
            transitionAppear
          >
            <Spinner size='small' className='table__spinner' />
          </CSSTransitionGroup>
        </TableCell>
      </TableRow>
    );
  }

  /**
   * Returns a row to be used for no data.
   */
  get emptyRow() {
    if (this.props.customEmptyRow) {
      return this.props.customEmptyRow;
    }

    return (
      <TableRow
        key='__loading__' selectable={ false }
        highlightable={ false }
      >
        <TableCell colSpan='42' align='center'>
          { I18n.t('table.no_data', { defaultValue: 'No results to display' }) }
        </TableCell>
      </TableRow>
    );
  }

  /**
   * Works out what content to display in the table.
   */
  get tableContent() {
    let { children } = this.props,
        hasChildren = children;

    // if using immutable js we can count the children
    if (children && children.count) {
      const numOfChildren = children.count(),
          onlyChildIsHeader = numOfChildren === 1 && children.first().props.as === 'header';

      if (onlyChildIsHeader) {
        if (this._hasRetreivedData) {
          // if already retreived data then show empty row
          children = children.push(this.emptyRow);
        } else {
          // if not yet retreived data then show loading row
          children = children.push(this.loadingRow);
        }
      } else {
        // check if there actually are any children
        hasChildren = numOfChildren > 0;
      }
    }

    if (hasChildren) return children;
    if (this._hasRetreivedData) return this.emptyRow;
    return this.loadingRow;
  }

  /**
   * Returns the content, wrapped in a tbody.
   */
  get tbody() {
    if (this.props.tbody === false) {
      return this.tableContent;
    }
    return (
      <tbody>
        { this.tableContent }
      </tbody>
    );
  }

  /**
   * Placeholder function for defining the data state, intended to be overriden in subclasses
   */
  dataState = () => { }

  /**
   * The name used for the data-component attribute
   */
  get dataComponent() { return 'table'; }

  /**
   * Data tags used for the data-component attribute
   */
  componentTags(props) {
    return {
      'data-component': this.dataComponent,
      'data-element': props['data-element'],
      'data-role': props['data-role'],
      'data-state': this.dataState(),
      'aria-busy': this.state.ariaBusy
    };
  }

  /**
   * Returns the caption prop wrapped in a <caption> tag,
   * or null if no caption prop was given.
   */
  get caption() {
    if (this.props.caption) {
      return <caption>{ this.props.caption }</caption>;
    }

    return null;
  }

  /**
   * Renders the component.
   */
  render() {
    const tableProps = {
      tableType: this.props.theme,
      size: this.props.size,
      isZebra: this.props.isZebra,
      paginate: this.props.paginate
    };

    if (this.props['aria-describedby']) {
      tableProps['aria-describedby'] = this.props['aria-describedby'];
    }

    return (
      <div { ...this.componentTags(this.props) }>
        { this.actionToolbar }
        <StyledInternalTableWrapper
          ref={ (wrapper) => { this._wrapper = wrapper; } }
          paginate={ this.props.paginate }
        >
          { this.configureLink(this.props.onConfigure) }
          <StyledTable
            ref={ (table) => { this._table = table; } }
            { ...tableProps }
          >
            { this.caption }
            { this.thead }
            { this.tbody }
          </StyledTable>
        </StyledInternalTableWrapper>
        { this.pager }
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

  /** Pagination Current Visible Page */
  currentPage: PropTypes.string,

  /** Pagination Page Size of grid (number of visible records) */
  pageSize: PropTypes.string,

  /** Pagination Options for pageSize default - 10, 25, 50 */
  pageSizeSelectionOptions: PropTypes.object,

  /** Pagination Is the page size dropdown visible  */
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

  /** Pagination Total number of records in the grid */
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
  'aria-describedby': PropTypes.string,

  /** Renders as 'primary' / 'dark', 'secondary' / 'light', 'tertiary' / 'transparent' */
  theme: PropTypes.oneOf(OptionsHelper.tableThemes),

  /** Used to define the tables size Renders as:  'compact', 'small', 'medium' and 'large' */
  size: PropTypes.oneOf(OptionsHelper.tableSizes),

  /** Toggles the zebra striping for the table rows */
  isZebra: PropTypes.bool
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
  sortedColumn: PropTypes.string // the currently sorted column
};

Table.defaultProps = {
  theme: OptionsHelper.tableThemes[0],
  size: OptionsHelper.tableSizes[2]
};

export {
  Table,
  TableRow,
  TableCell,
  TableHeader,
  TableSubheader,
  DraggableTableCell
};
