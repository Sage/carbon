import PropTypes from 'prop-types';
import Request from 'superagent';
import { omit, assign, cloneDeep } from 'lodash';
import DropdownFilter from '../dropdown-filter';

class DropdownFilterAjax extends DropdownFilter {
  constructor(...args) {
    super(...args);

    /**
     * A collection of results for the list.
     */
    this.state.options = [];

    /**
     * The current page number for the results.
     */
    this.state.page = 1;

    /**
     * The total number of pages of results.
     */
    this.state.pages = 0;

    /**
     * Tracks whether the scroll listener is active on the list, useful for
     * paginated results.
     */
    this.listeningToScroll = true;

    /**
     * Tracks the ajax request.
     */
    this.pendingRequest = null;
  }

  static propTypes = omit(assign({}, DropdownFilter.propTypes, {
    /**
     * The ID value for the component
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * The visible value for the input
     */
    visibleValue: PropTypes.string,

    /**
     * custom http header for the request
     */
    acceptHeader: PropTypes.string,

    /**
     * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
     */
    path: PropTypes.string.isRequired,


    /**
     * Additional parameters for the request (e.g. {foo: 'bar' })
     */
    additionalRequestParams: PropTypes.object,

    /**
     * The number of rows to get per request
     */
    rowsPerRequest: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Enables create functionality for dropdown.
     */
    create: PropTypes.func,

    /**
     * A callback function used to format the Ajax
     * response into the format required by the table
     *
     * Expected return object format
     * {
        records - number of items returned
        items - array of items in a format { id: ..., name: ... }
        page - current page number
       }
     */
    formatResponse: PropTypes.func,

    /**
     * A callback function used to format the Ajax
     * request into the format required endpoint
     */
    formatRequest: PropTypes.func,

    /**
     * A callback function used to set the Ajax
     * headers using custom ones provided by the consumer
     *
     * Expected return object format
     * {
        'Accept': 'application/json',
        'jwt': 'secret',
        ...
       }
     */
    getCustomHeaders: PropTypes.func,

    /**
     * Should the dropdown act and look like a suggestable input instead.
     */
    suggest: PropTypes.bool,

    /**
     * Integer to determine timeout for defered callback for data request. Default: 500
     */
    dataRequestTimeout: PropTypes.number,

    /**
     * Enable the ability to send cookies from the origin.
     */
    withCredentials: PropTypes.bool
  }), 'options');

  static defaultProps = {
    rowsPerRequest: 25,
    acceptHeader: 'application/json',
    visibleValue: '',
    dataRequestTimeout: 500
  }

  /*
   * Handles changes to the visible input field. Updates filter and displayed value.
   *
   * @method handleVisibleChange
   * @param {Object} ev event
   */
  handleVisibleChange(ev) {
    super.handleVisibleChange(ev);
    if (this.dataFetchTimeout) {
      clearTimeout(this.dataFetchTimeout);
    }
    const query = ev.target.value;
    this.dataFetchTimeout = setTimeout(
      () => this.getData(query, 1),
      this.props.dataRequestTimeout
    );
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.blockBlur) {
      // close list and reset filter
      this.setState(prevState => ({
        open: false,
        filter: this.props.create ? prevState.filter : null
      }));

      if (this.dataFetchTimeout) {
        clearTimeout(this.dataFetchTimeout);
      }

      if (this.pendingRequest !== null) {
        this.pendingRequest.abort();
      }

      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    if (!this.props.suggest && !this.blockFocus) {
      this.getData('', 1);
    } else {
      this.blockFocus = false;
    }

    this._input.setSelectionRange(0, this._input.value.length);
  }

  /**
   * Handles what happens on scroll of the list.
   *
   * @method handleScroll
   */
  handleScroll = () => {
    if (this.listeningToScroll) {
      if (this.state.page < this.state.pages) {
        const { list } = this;
        const scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 25;

        if (list.scrollTop > scrollTriggerPosition) {
          this.listeningToScroll = false;
          this.getData(this.state.visibleValue, this.state.page + 1);
        }
      }
    }
  }

  /**
   * Retrieves data from the server for the list.
   *
   * @method getData
   * @param {String} query The search term
   */
  getData = (query = '', page = 1) => {
    this.setState({ requesting: true });
    if (this.pendingRequest) this.pendingRequest.abort();

    this.pendingRequest = Request
      .get(this.props.path)
      .query(this.getParams(query, page))
      .query(this.props.additionalRequestParams)
      .set(this.getHeaders());

    if (this.props.withCredentials) this.pendingRequest.withCredentials();
    this.pendingRequest.end(this.ajaxUpdateList);
  }

  /**
   * Retrieve params for the list.
   *
   * @method getParams
   */
  getParams = (query, page) => {
    const params = {};
    params.page = page;
    params.rows = this.props.rowsPerRequest;
    params.value = query;
    if (this.props.formatRequest) {
      return this.props.formatRequest(params);
    }
    return params;
  }

  /**
   * Retrieve headers to use for the request
   *
   * @method getHeaders
   */
  getHeaders = () => {
    return this.props.getCustomHeaders ? this.props.getCustomHeaders() : { Accept: this.props.acceptHeader };
  }

  /**
   * Applies some data from AJAX to the list
   */
  ajaxUpdateList = (err, response) => {
    this.updateList(
      this.props.formatResponse ? this.props.formatResponse(response.body) : response.body.data[0]
    );
    this.setState({ requesting: false });
  }

  /**
   * Resets the scroll position of the list.
   *
   * @method resetScroll
   */
  resetScroll = () => {
    this.listeningToScroll = false;
    if (this.state.open && this.list) {
      this.list.scrollTop = 0;
    }
  }

  /**
   * Sets or appends the list with new data and causes a setState.
   *
   * @method updateList
   * @param {Object} data
   */
  updateList = (data) => {
    // Default page size is 25 records
    const pages = Math.ceil(data.records / this.props.rowsPerRequest);
    let records = data.items;

    // Adds next set of records as page scrolled down
    if (data.page > 1) {
      records = this.state.options.concat(records);
    } else {
      this.resetScroll();
    }

    this.setState({
      open: true,
      options: records,
      page: data.page,
      pages
    });

    this.listeningToScroll = true;
  }

  /**
   * Properties to be assigned to the list.
   *
   * @method listProps
   */
  get listProps() {
    const props = super.listProps;

    props.onScroll = this.handleScroll;

    return props;
  }

  /**
   * Returns the list options in the correct format
   *
   * @method options
   */
  get options() {
    return this.prepareList(cloneDeep(this.state.options));
  }

  /**
   * Converts requesting state into a string for the automation property data-state
   */
  requestingState = () => {
    return this.state.requesting ? 'requesting-list' : 'idle';
  }

  /**
   * Input props for the dropdown, extended from the base dropdown component.
   *
   * @method inputProps
   */
  get inputProps() {
    const props = super.inputProps;

    if (typeof this.state.filter !== 'string') {
      props.value = this.props.visibleValue;
    } else {
      props.value = this.state.filter;
    }

    return props;
  }

  componentTags(props) {
    return {
      'data-component': 'dropdown-filter-ajax',
      'data-element': props['data-element'],
      'data-role': props['data-role']
    };
  }
}

export default DropdownFilterAjax;
