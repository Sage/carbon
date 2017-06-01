import PropTypes from 'prop-types';
import Request from 'superagent';
import { cloneDeep } from 'lodash';
import DropdownFilter from './../dropdown-filter';
import { omit, assign } from 'lodash';

/**
 * A dropdown filter widget using ajax.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import DropdownFilterAjax from 'carbon/lib/components/dropdown-filter-ajax';
 *
 * To render a DropdownFilterAjax:
 *
 *   <DropdownFilter name="foo" path="/foo" onChange={ myChangeHandler } />
 *
 * You can also use the component in 'suggest' mode, which only shows the dropdown
 * once a filter term has been entered.
 *
 * You can also define a function using the 'create' prop, this will allow you
 * to trigger events to create new items.
 *
 * You can also define the number of rows returned by the ajax request using
 * the property rowsPerRequest.
 *
 * @class DropdownFilterAjax
 * @constructor
 */
class DropdownFilterAjax extends DropdownFilter {

  constructor(...args) {
    super(...args);

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */
    this.state.options = [];

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Number}
     * @default 1
     */
    this.state.page = 1;

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Number}
     * @default 0
     */
    this.state.pages = 0;

    /**
     * Tracks whether the scroll listener is active on the list, useful for
     * paginated results.
     *
     * @property listeningToScroll
     * @type {Boolean}
     * @default true
     */
    this.listeningToScroll = true;
  }

  static propTypes = omit(assign({}, DropdownFilter.propTypes, {
    /**
     * The ID value for the component
     *
     * @property value
     * @type {Number}
     */
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * The visible value for the input
     *
     * @property visibleValue
     * @type {String}
     */
    visibleValue: PropTypes.string,

    /**
     * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
     *
     * @property path
     * @type {String}
     */
    path: PropTypes.string.isRequired,


    /**
     * Additional parameters for the request (e.g. {foo: 'bar' })
     *
     * @property additionalRequestParams
     * @type {Object}
     */
    additionalRequestParams: PropTypes.object,

    /**
     * The number of rows to get per request
     *
     * @property rowsPerRequest
     * @type {Number}
     * @default 25
     */
    rowsPerRequest: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),

    /**
     * Enables create functionality for dropdown.
     *
     * @property create
     * @type {Function}
     */
    create: PropTypes.func,

    /**
     * Should the dropdown act and look like a suggestable input instead.
     *
     * @property suggest
     * @type {Boolean}
     */
    suggest: PropTypes.bool
  }), 'options');

  static defaultProps = {
    rowsPerRequest: 25,
    visibleValue: ''
  }

  /*
   * Handles changes to the visible input field. Updates filter and displayed value.
   *
   * @method handleVisibleChange
   * @param {Object} ev event
   */
  handleVisibleChange(ev) {
    super.handleVisibleChange(ev);
    this.getData(ev.target.value, 1);
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.blockBlur) {
      let filter = this.props.create ? this.state.filter : null;
      // close list and reset filter
      this.setState({ open: false, filter: filter });

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
      this.getData("", 1);
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
        let list = this.refs.list;
        let scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 25;

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
   * @param {Object} page The page number to get
   */
  getData = (query = "", page = 1) => {
    this.setState({ 'requesting': true });
    Request
      .get(this.props.path)
      .query({
        page: page,
        rows: this.props.rowsPerRequest,
        value: query
      })
      .query(this.props.additionalRequestParams)
      .end(this.ajaxUpdateList);
  }

  /**
   * Applies some data from AJAX to the list
   */
  ajaxUpdateList = (err, response) => {
    this.updateList(response.body.data[0]);
    this.setState({ 'requesting': false });
  }

  /**
   * Resets the scroll position of the list.
   *
   * @method resetScroll
   */
  resetScroll = () => {
    this.listeningToScroll = false;

    if (this.state.open) {
      let list = this.refs.list;
      list.scrollTop = 0;
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
    let pages = Math.ceil(data.records / this.props.rowsPerRequest),
        records = data.items;

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
      pages: pages
    });

    this.listeningToScroll = true;
  }

  /**
   * Properties to be assigned to the list.
   *
   * @method listProps
   */
  get listProps() {
    let props = super.listProps;

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
    let props = super.inputProps;

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
