import PropTypes from 'prop-types';
import Request from 'superagent';
import serialize from './../../utils/helpers/serialize';
import { Table, TableRow, TableCell, TableHeader, TableSubheader } from './../table';

/**
 * A Table Ajax Widget
 *
 * == How to use a Table Ajax in a component
 *
 * In your file
 *
 *   import Table from 'carbon/lib/components/table-ajax';
 *   import { TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
 *
 * To render a Table please see the Table Component
 *
 * TableAjax requires a path to be provided
 *
 * <TableAjax
 *    path='./path'
 * >
 *
 */
class TableAjax extends Table {
  /**
   * Timeout for firing ajax request
   *
   * @property timeout
   */
  timeout = null;

  /**
   * Tracks the ajax request
   *
   * @property _request
   */
  _request = null;

  static propTypes = {
    /**
     * Data used to filter the data
     *
     * @property filter
     * @type {Object}
     */
    filter: PropTypes.object,

    /**
     * A callback function used to format the Ajax
     * response into the format required by the table
     *
     * @property formatData
     * @type {Function}
     */
    formatData: PropTypes.func,

    /**
     * Setting to true turns on pagination for the table
     *
     * @property paginate
     * @type {Boolean}
     */
    paginate: PropTypes.bool,

    /**
     * Pagination
     * Page Size of grid (number of visible records)
     *
     * @property pageSize
     * @type {String}
     */
    pageSize: PropTypes.string,

    /**
     * Endpoint to fetch the data for table
     *
     * @property path
     * @type {String}
     */
    path: PropTypes.string.isRequired
  }

  static defaultProps = {
    paginate: true
  }

  state = {

    /**
     * Pagination
     * Current Visible Page
     *
     * @property currentPage
     * @type {String}
     */
    currentPage: this.props.currentPage || '1',

    /**
     * Pagination
     * Page Size of grid (number of visible records)
     *
     * @property pageSize
     * @type {String}
     */
    pageSize: this.defaultPageSize,

    /**
     * Pagination
     * Total number of records in the grid
     *
     * @property totalRecords
     * @type {String}
     */
    totalRecords: this.props.totalRecords || '0',

    /**
     * Sorting
     * either 'asc' or 'desc' order
     *
     * @property sortOrder
     * @type {String}
     */
    sortOrder: this.props.sortOrder || '',

    /**
     * Sorting
     * column name to sort
     *
     * @property sortedColumn
     * @type {String}
     */
    sortedColumn: this.props.sortedColumn || ''

  };

  /**
   * Request initial data on mount
   * @override
   *
   * @method componentDidMount
   * @return {Void}
   */
  componentDidMount() {
    super.componentDidMount();
    this.emitOnChangeCallback('data', this.emitOptions(), 0);
  }

  /**
   * Lifecycle for after a update has happened
   * Retrieve the data when page size chagnes
   * Resize the grid to fit new content
   *
   * @method componentDidUpdate
   * @param {Object} preProps The previos props passed down to the component
   * @param {Object} prevState The previous of the component
   * @return {Void}
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageSize !== prevState.pageSize) {
      this.emitOnChangeCallback('data', this.emitOptions());
    }
    this.resizeTable();
  }

  /**
   * Lifecycle before a mounted component receives new props
   * Set pageSize state if component pass a new pageSize props
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps The new props passed down to the component
   * @return {Void}
   */
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (this.props.pageSize !== nextProps.pageSize) {
      this.setState({ pageSize: nextProps.pageSize });
    }
  }

  /**
   * Lifecycle for when a component unmounts
   * Clears any deferred tasks
   *
   * @method componentWillUnmount
   * @return {Void}
   */
  componentWillUnmount() {
    this.stopTimeout();
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the table-ajax component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property childContextTypes
     * @type {Object}
     */
    attachActionToolbar: PropTypes.func, // tracks the action toolbar component
    detachActionToolbar: PropTypes.func, // tracks the action toolbar component
    attachToTable: PropTypes.func, // attach the row to the table
    checkSelection: PropTypes.func, // a function to check if the row is currently selected
    detachFromTable: PropTypes.func, // detach the row from the table
    highlightable: PropTypes.bool, // table can enable all rows to be highlightable
    onSort: PropTypes.func, // a callback function for when a sort order is updated
    selectAll: PropTypes.func, // a callback function for when all visible rows are selected
    selectRow: PropTypes.func, // a callback function for when a row is selected
    highlightRow: PropTypes.func, // a callback function for when a row is highlighted
    selectable: PropTypes.bool, // table can enable all rows to be selectable
    sortOrder: PropTypes.string, // the current sort order applied
    sortedColumn: PropTypes.string // the currently sorted column
  }

  /**
   * Returns table object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext = () => {
    return {
      attachActionToolbar: this.attachActionToolbar,
      detachActionToolbar: this.detachActionToolbar,
      attachToTable: this.attachToTable,
      detachFromTable: this.detachFromTable,
      checkSelection: this.checkSelection,
      onSort: this.onSort,
      selectable: this.props.selectable,
      highlightable: this.props.highlightable,
      selectAll: this.selectAll,
      selectRow: this.selectRow,
      highlightRow: this.highlightRow,
      sortedColumn: this.sortedColumn,
      sortOrder: this.sortOrder
    };
  }

  /**
   * Get pageSize for table
   * @override
   *
   * @method pageSize
   * @return {String} table page size
   */
  get pageSize() {
    return this.state.pageSize;
  }

  /**
   * Returns the currently sorted column.
   *
   * @method sortedColumn
   * @return {String}
   */
  get sortedColumn() {
    return this.state.sortedColumn;
  }

  /**
   * Returns the current sort order.
   *
   * @method sortOrder
   * @return {String}
   */
  get sortOrder() {
    return this.state.sortOrder;
  }

  /**
   * Emit onChange event row data
   * @override
   *
   * @method emitOnChangeCallback
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Void}
   */
  emitOnChangeCallback = (element, options, timeout = 250) => {
    if (this.selectAllComponent) {
      // reset the select all component
      this.selectAllComponent.setState({ selected: false });
      this.selectAllComponent = null;
    }

    const resetHeight = Number(options.pageSize) < Number(this.pageSize),
        currentPage = (element === 'filter') ? '1' : options.currentPage;

    this.setState({
      currentPage,
      pageSize: options.pageSize,
      sortOrder: options.sortOrder,
      sortedColumn: options.sortedColumn
    });

    this.stopTimeout();
    this.timeout = setTimeout(() => {
      // track the request incase we need to abort it
      this._request = Request
        .get(this.props.path)
        .set('Accept', 'application/json')
        .query(this.queryParams(element, options))
        .end((err, response) => {
          this._hasRetreivedData = true;
          this.handleResponse(err, response);
          if (resetHeight) { this.resetTableHeight(); }
        });
    }, timeout);
  }

  /**
   * Clears the ajax timeout if present
   *
   * @method stopTimeout
   * @return {Void}
   */
  stopTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (this._request) {
      this._request.abort();
    }
  }

  /**
   * Handles what happens with response.
   *
   * @method handlerResponse
   * @param {Object} err
   * @param {Object} response
   */
  handleResponse = (err, response) => {
    if (!err) {
      const data = this.props.formatData ? this.props.formatData(response.body) : response.body;
      this.props.onChange(data);
      this.setState({ totalRecords: String(data.records) });
    }
  }

  /**
   * Formatted params for server request
   *
   * @method queryParams
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Object} params for query
   */
  queryParams = (element, options) => {
    const query = options.filter || {};
    query.page = (element === 'filter') ? '1' : options.currentPage;
    query.rows = options.pageSize;
    if (options.sortOrder) { query.sord = options.sortOrder; }
    if (options.sortedColumn) { query.sidx = options.sortedColumn; }
    return serialize(query);
  }

  /**
   * Base Options to be emitted by onChange
   * @override
   *
   * @method emitOptions
   * @return {Object} options to emit
   */
  emitOptions = (props = this.props) => {
    return {
      currentPage: this.state.currentPage,
      filter: props.filter ? props.filter.toJS() : {},
      pageSize: this.state.pageSize,
      sortedColumn: this.state.sortedColumn,
      sortOrder: this.state.sortOrder
    };
  }

  /**
   * Props to pass to pager component
   * @override
   *
   * @method pagerProps
   * @return {Object} props
   */
  get pagerProps() {
    return {
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
      totalRecords: this.state.totalRecords,
      onPagination: this.onPagination,
      pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
      showPageSizeSelection: this.props.showPageSizeSelection
    };
  }

  componentTags(props) {
    return {
      'data-component': 'table-ajax',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }
}

export {
  TableAjax,
  TableRow,
  TableCell,
  TableHeader,
  TableSubheader
};
