import React from 'react';
import classNames from 'classnames';
import Immutable from 'immutable';
import TableRow from './table-row';
import TableCell from './table-cell';
import TableHeader from './table-header';
import Pager from './../pager';

/**
 * A Table widget.
 *
 * == How to use a Table in a component:
 *
 * In your file:
 *
 *   import { Table, TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
 *
 * To render a Table:
 *
 *   // map data to table rows
 *   let tableRows = (
 *     this.props.data.map((datum, key) => {
 *       return (
 *         <TableRow>
 *           <TableCell>
 *             { datum.firstName }
 *           </TableCell>
 *
 *           <TableCell>
 *             { datum.lastName }
 *           </TableCell>
 *         </TableRow>
 *       );
 *     });
 *   );
 *
 *   // prepend array of rows with a header row
 *   tableRows.unshift(
 *     <TableRow>
 *       <TableHeader>First Name</TableHeader>
 *       <TableHeader>Last Name</TableHeader>
 *     </TableRow>
 *   );
 *
 *   // render the table with the table rows
 *   <Table>
 *     { tableRows }
 *   </Table>
 *
 * == Pagination
 *
 * To add a pagination footer to the table you will need to pass some extra props to the table
 *
 *  let sizeOptions = Immutable.fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }]),
 *
 * <Table
 *   paginate={ true }                        // Show the pagination footer
 *   currentPage='1'                          // Required - Current visible page
 *   pageSize='10'                            // Required - Number of records to show per page
 *   totalRecords                             // Required - Total number of records
 *   showPageSizeSelection={ false }          // Options  - Show page size selection
 *   pageSizeSelectionOptions={ sizeOptions } // Optional - Page Size Options
 *   thead={ TableRow }                       // Optional - A TableRow to be wrapped in <thead>
 * />
 *
 * == Sorting
 *
 *  To enable column sorting, you will need to configure the Table Header component.
 * See the Table Header component documentation.
 *
 * @class Table
 * @constructor
 */
class Table extends React.Component {

  /**
   * Maintains the height of the table
   *
   * @property tableHeight
   * @type {Number}
   */
  tableHeight = 0;

  static propTypes = {
    /**
     * Data used to filter the data
     *
     * @property filter
     * @type {Object}
     */
    filter: React.PropTypes.object,

    /**
     * Emitted when table component changes e.g.
     * Pager, sorting, filter
     *
     * @property onChange
     * @type {Function}
     */
    onChange: React.PropTypes.func,

    /**
     * Show the pagination footer
     *
     * @property paginate
     * @type {Boolean}
     */
    paginate: React.PropTypes.bool,

    /**
     * Pagination
     * Current Visible Page
     *
     * @property currentPage
     * @type {String}
     */
    currentPage: React.PropTypes.string,

    /**
     * Pagination
     * Page Size of grid (number of visible records)
     *
     * @property pageSize
     * @type {String}
     */
    pageSize: React.PropTypes.string,

    /**
     * Pagination
     * Options for pageSize default - 10, 25, 50
     *
     * @property pageSizeSelectionOptions
     * @type {Object} Immutable
     */
    pageSizeSelectionOptions: React.PropTypes.object,

    /**
     * Pagination
     * Is the page size dropdown visible
     *
     * @property showPageSizeSelection
     * @type {Boolean}
     */
    showPageSizeSelection: React.PropTypes.bool,

    /**
     * Pagination
     * Total number of records in the grid
     *
     * @property totalRecords
     * @type {String}
     */
    totalRecords: React.PropTypes.string,

    /**
     * Allow table to shrink in size.
     *
     * @property shrink
     * @type {Boolean}
     */
    shrink: React.PropTypes.bool,

    /**
     * TableRows to be wrapped in <thead>
     *
     * @property thead
     * @type {Object}
     */
    thead: React.PropTypes.object
  }

  /**
   * Lifecycle for after mounting
   * Resize the table to set the correct height on pageload
   *
   * @method componentDidMount
   * @return {Void}
   */
  componentDidMount() {
    this.resizeTable();
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the table component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property childContextTypes
     * @type {Object}
     */
    attachToTable: React.PropTypes.func,
    detachFromTable: React.PropTypes.func,
    checkSelection: React.PropTypes.func,
    onSort: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    multiSelectable: React.PropTypes.bool,
    selectAll: React.PropTypes.func,
    selectRow: React.PropTypes.func,
    sortedColumn: React.PropTypes.string,
    sortOrder: React.PropTypes.string
  }

  /**
   * Returns table object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext = () => {
    return {
      attachToTable: this.attachToTable,
      detachFromTable: this.detachFromTable,
      checkSelection: this.checkSelection,
      onSort: this.onSort,
      selectable: this.props.selectable,
      multiSelectable: this.props.multiSelectable,
      selectAll: this.selectAll,
      selectRow: this.selectRow,
      sortedColumn: this.sortedColumn,
      sortOrder: this.sortOrder
    };
  }

  state = {
    count: 0
  }

  rows = {}

  selectedRows = {}

  headerSelect = null

  attachToTable = (id, row) => {
    this.rows[id] = row;
  }

  detachFromTable = (id) => {
    delete this.rows[id];
  }

  get numberOfRowsSelected() {
    return Object.keys(this.selectedRows).length;
  }

  selectRow = (id, row, state) => {
    let selectable = this.props.selectable || row.props.selectable,
        multiSelectable = this.props.multiSelectable || row.props.multiSelectable,
        isSelected = this.selectedRows[id];

    if (this.headerSelect) {
      this.headerSelect.setState({ selected: false });
      this.headerSelect = null;
    }

    if (selectable && isSelected) { return false; }

    if (multiSelectable) {
      if (!state && isSelected) {
        delete this.selectedRows[id];
      } else {
        this.selectedRows[id] = row;
      }
    } else {
      // reset rows selected
      for (let key in this.selectedRows) {
        let r = this.selectedRows[key];
        r.setState({ selected: false });
      }

      this.selectedRows = {
        [id]: row
      };
    }

    this.setState({ count: this.numberOfRowsSelected });
    row.setState({ selected: state });
  }

  selectAll = (row) => {
    let selectState = !row.state.selected;

    for (let key in this.rows) {
      let r = this.rows[key];
      this.selectRow(r.props.uniqueID, r, selectState);
    }

    row.setState({ selected: selectState });

    if (selectState) {
      this.headerSelect = row;
    } else {
      this.headerSelect = null;
    }

    this.setState({ count: this.numberOfRowsSelected });
  }

  checkSelection = (id, row) => {
    let isSelected = this.selectedRows[id];

    if (isSelected && !row.state.selected) {
      row.setState({ selected: true });
    } else if (!isSelected && row.state.selected) {
      row.setState({ selected: false });
    }
  }

  /**
   * Lifecycle for after a update has happened
   * If filter has changed then emit the on change event.
   *
   * @method componentWillReceiveProps
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    // if filter has changed, update the data
    if (!Immutable.is(this.props.filter, nextProps.filter)) {
      this.emitOnChangeCallback('filter', this.emitOptions(nextProps));
    }
  }

  /**
   * Lifecycle for after a update has happened
   * If pageSize has updated to a smaller value - reset table height
   * else resize table
   *
   * @method componentDidUpdate
   * @return {Void}
   */
  componentDidUpdate(prevProps) {
    if (this.shouldResetTableHeight(prevProps)) {
      this.resetTableHeight();
    } else {
      this.resizeTable();
    }
  }

  /**
   * Reset the minHeight and tableHeight of the table
   *
   * @method resetTableHeight
   * @return {Void}
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
   *
   * @method resizeTable
   * @return {Void}
   */
  resizeTable() {
    let shrink = this.props.shrink && this._table.offsetHeight < this.tableHeight;

    if (shrink || this._table.offsetHeight > this.tableHeight) {
      this.tableHeight = this._table.offsetHeight;
      this._wrapper.style.minHeight = this.tableHeight + 'px';
    }
  }

  /**
   * Test if the table height should be reset to 0
   *
   * @method shouldResetTableHeight
   * @param prevProps - props before update
   * @return {Boolean}
   */
  shouldResetTableHeight(prevProps) {
    return prevProps.pageSize > this.pageSize;
  }

  /**
   * Get pageSize for table
   *
   * @method pageSize
   * @return {String} table page size
   */
  get pageSize() {
    return this.props.pageSize;
  }

  /**
   * Emit onChange event with options
   * needed to fetch the new data
   *
   * @method emitOnChangeCallback
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Void}
   */
  emitOnChangeCallback = (element, options) => {
    if (this.headerSelect) {
      this.headerSelect.setState({ selected: false });
      this.headerSelect = null;
    }
    this.props.onChange(element, options);
  }

  /**
   * Handles when the pager emits a onChange event
   * Passes data to emitOnChangeCallback in the correct
   * format
   *
   * @method onPagination
   * @param {String} currentPage
   * @param {String} pageSize
   * @return {Void}
   */
  onPagination = (currentPage, pageSize) => {
    let options = this.emitOptions();
    options.currentPage = currentPage;
    options.pageSize = pageSize;
    this.emitOnChangeCallback('pager', options);
  }

  /**
   * Returns the currently sorted column.
   *
   * @method sortedColumn
   * @return {String}
   */
  get sortedColumn() {
    return this.props.sortedColumn;
  }

  /**
   * Returns the current sort order.
   *
   * @method sortOrder
   * @return {String}
   */
  get sortOrder() {
    return this.props.sortOrder;
  }

  /**
   * Handles what happens on sort.
   *
   * @method onSort
   * @param {String} sortedColumn
   * @param {String} sortOrder
   */
  onSort = (sortedColumn, sortOrder) => {
    let options = this.emitOptions();
    options.sortedColumn = sortedColumn;
    options.sortOrder = sortOrder;
    this.emitOnChangeCallback('table', options);
  }

  /**
   * Base Options to be emitted by onChange
   *
   * @method emitOptions
   * @return {Object} options to emit
   */
  emitOptions = (props = this.props) => {
    let currentPage = props.currentPage || '';

    if (Number(props.currentPage) > Number(props.pageSize)) {
      currentPage = "1";
    }

    return {
      // What if paginate if false - think about when next change functionality is added
      currentPage: currentPage,
      filter: props.filter ? props.filter.toJS() : {},
      pageSize: props.pageSize || '',
      sortOrder: props.sortOrder || '',
      sortedColumn: props.sortedColumn || ''
    };
  }

  /**
   * Props to pass to pager component
   *
   * @method pagerProps
   * @return {Object} props
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
   *
   * @method defaultPageSize
   * @return {Void}
   */
  get defaultPageSize() {
    if (this.props.pageSize) {
      return this.props.pageSize;
    } else if (this.props.pageSizeSelectionOptions) {
      return this.props.pageSizeSelectionOptions.first().get('id');
    }
    return '10';
  }

  /**
   * Returns the pager if paginate is true
   *
   * @method pager
   * @return {JSX} pager
   */
  get pager() {
    if (this.props.paginate) {
      return (<Pager { ...this.pagerProps } />);
    }
  }

  /**
   * Classes that apply to the parent table div
   *
   * @method mainClasses
   * @return {String}
   */
  get mainClasses() {
    return classNames(
      'ui-table',
      this.props.className
    );
  }

  /**
   * Classes that apply to the table wrapper
   *
   * @method wrapperClasses
   * @return {String}
   */
  get wrapperClasses() {
    return classNames(
      'ui-table__wrapper',
      this.props.className,
      { [`ui-table--pager`]: this.props.paginate }
    );
  }

  /**
   * Classes to apply to the table
   *
   * @method tableClasses
   * @return {String}
   */
  get tableClasses() {
    return 'ui-table__table';
  }


  /**
   * Returns thead content wrapped in <thead>
   *
   * @method thead
   * @return {JSX}
   */
  get thead() {
    if (this.props.thead) {
      return (
        <thead className="ui-table__header">
          { this.props.thead }
        </thead>
      );
    }
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>
        <div className={ this.wrapperClasses } ref={ (wrapper) => { this._wrapper = wrapper; } } >
          <table className={ this.tableClasses } ref={ (table) => { this._table = table; } } >
            { this.thead }
            <tbody>
              { this.props.children }
            </tbody>
          </table>
        </div>
        { this.pager }
      </div>
    );
  }
}

export {
  Table,
  TableRow,
  TableCell,
  TableHeader
};
