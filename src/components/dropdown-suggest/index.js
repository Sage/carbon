import React from 'react';
import Request from 'superagent';

import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';

import Immutable from 'immutable';

// Decorators
@Input
@InputIcon
@InputLabel
@InputValidation
/**
 * A dropdown-suggest widget.
 *
 * == How to use a dropdown-suggest in a component:
 *
 * In your file
 *
 *  import DropdownSuggest from 'carbon/lib/components/dropdown-suggest';
 *
 *  In the render method:
 *
 *    <DropdownSuggest path={foo} />
 *
 * This component receives its props from the decorators listed above.
 * Refer to the Input decorator for more information on required and optional props.
 *
 * @class DropdownSuggest
 * @constructor
 */
class DropdownSuggest extends React.Component {


  static propTypes = {
    /**
     * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
     *
     * @property path
     * @type { String }
     */
    path: React.PropTypes.string.isRequired

    /**
     * An object to hold data for rendering in the widget
     *
     * @property value
     * @type { Object }
     * @default Immutable.Map({})
     */
     value: React.PropTypes.object
  }

  static defaultProps = {
    value: Immutable.Map({})
  }

  /**
   * Tracks whether the scroll listener is active on the list.
   *
   * @property listeningToScroll
   * @type {Boolean}
   */
  listeningToScroll = true;

  /**
   * Private state with initial values
   */
  state = {

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */
    options: [],

    /**
     * Defines whether the list is open or not.
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: false,

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Number}
     * @default 1
     */
    page: 1,

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Number}
     * @default 0
     */
    pages: 0,

    /**
     * The ID of the highlighted item in the list.
     *
     * @property highlighted
     * @type {Number}
     * @default null
     */
    highlighted: null
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param {Object} value Immutable object representing the value
   */
  emitOnChangeCallback = (value) => {
    this._handleOnChange({ target: { value: value } });
  }

  /**
   * Retrieves data from the server for the list.
   *
   * @method getData
   * @param {Object} page Page, defaults to 1.
   */
  getData = (page = 1) => {
    // Passes empty string to query if value has been selected
    let query = typeof this.props.value.get('id') !== 'undefined' ?
                "" : this.props.value.get(this.props.resource_key);

    Request
      .get(this.props.path)
      .query({
        page: page,
        rows: 10,
        value: query
      })
      .end((err, response) => {
        this.updateList(response.body.data[0]);
      });
  }

  /**
   * Asks for the next page of data.
   *
   * @method getNextPage
   */
  getNextPage = () => {
    if (this.state.page < this.state.pages) {
      this.getData(this.state.page + 1);
    }
  }

  /**
   * Sets or appends the list with new data and causes a setState.
   *
   * @method updateList
   * @param {Object} data data returned from server
   */
  updateList = (data) => {
    let pages = Math.ceil(data.records / 10),
        records;

    if (data.page > 1) {
      records = this.state.options.concat(data.items);
    } else {
      records = data.items;
      this.resetScroll();
    }

    this.listeningToScroll = true;

    let highlighted = data.records ? records[0].id : null;

    this.setState({
      options: records,
      open: true,
      pages: pages,
      page: data.page,
      highlighted: highlighted
    });
  }

  /**
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    this.resetScroll();
    this.setState({ open: false });
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    let filter = this.refs.filter;

    setTimeout(() => {
      filter.setSelectionRange(0, 9999);
    }, 0);

    if (typeof this.props.value.get('id') !== 'undefined' || !this.state.options.length) {
      this.getData();
    } else {
      this.setState({ open: true });
    }
  }

  /**
   * Handles what happens on scroll of the list.
   *
   * @method handleScroll
   */
  handleScroll = () => {
    if (typeof this.listeningToScroll !== 'undefined') {
      if (this.state.page < this.state.pages) {
        let list = this.refs.list;
        let scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 20;

        if (list.scrollTop > scrollTriggerPosition) {
          this.listeningToScroll = false;
          this.getNextPage();
        }
      }
    }
  }

  /**
   * Handles what happens on change of the input.
   *
   * @method handleChange
   * @param {Object} ev event
   */
  handleChange = (ev) => {
    if (typeof this.timeout !== 'undefined') { clearTimeout(this.timeout); }
    let val = buildImmutableValue(this.props, ev.target.value, null);
    this.emitOnChangeCallback(val);

    this.timeout = setTimeout(() => {
      this.getData(1);
    }, 200);
  }

  /**
   * Handles a select action on a list item.
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  handleSelect = (ev) => {
    let val = buildImmutableValue(this.props, ev.target.textContent, ev.target.value);
    this.emitOnChangeCallback(val);
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOver
   * @param {Object} ev event
   */
  handleMouseOver = (ev) => {
    this.setState({ highlighted: ev.target.value });
  }

  /**
   * Handles when a user keys up on input.
   *
   * @method handleKeyUp
   * @param {Object} ev event
   */
  handleKeyDown = (ev) => {
    let list = this.refs.list,
        element = list.getElementsByClassName('ui-dropdown-suggest__item--highlighted')[0],
        nextVal;

    switch(ev.which) {
      case 13: // return
        if (typeof element !== 'undefined') {
          ev.preventDefault();
          let val = buildImmutableValue(this.props, element.textContent, element.value);
          this.setState({ open: false });
          this.emitOnChangeCallback(val);
        }
        break;
      case 38: // up arrow
        nextVal = list.lastChild.value;

        if (element && element.previousElementSibling) {
          nextVal = element.previousElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
      case 40: // down arrow
        nextVal = list.firstChild.value;

        if (element && element.nextElementSibling) {
          nextVal = element.nextElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
    }
  }

  /**
   * Resets the scroll position of the list.
   *
   * @method resetScroll
   */
  resetScroll = () => {
    this.listeningToScroll = false;
    let list = this.refs.list;
    list.scrollTop = 0;
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "filter";
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    props.onChange = this.handleChange;
    props.onKeyDown = this.handleKeyDown;
    props.value = props.value.get(this.props.resource_key);
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    let nameWithID = this.inputProps.name.split(/\]$/)[0] + "_id]";
    let props = {
      ref: "input",
      type: "hidden",
      readOnly: true,
      name: nameWithID
    };

    if (typeof this.props.value !== 'undefined')
      { props.value = this.props.value.get('id'); }

    return props;
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-dropdown-suggest';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-dropdown-suggest__input';
  }

  /**
   * Getter that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   */
  get results() {
    let results;

    if (this.state.options.length) {
      results = this.state.options.map((option) => {
        let className = "ui-dropdown-suggest__item";

        return <li
                  key={option.name + option.id}
                  value={option.id}
                  onMouseDown={this.handleSelect}
                  onMouseOver={this.handleMouseOver}
                  className={(this.state.highlighted == option.id) ?
                    className +
                    ` ${rootClassName}__item--highlighted` :
                    className}>
                  {option.name}
                </li>;
      });

    } else {
      results = <li>No results</li>;
    }

    return results;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let listClasses = "ui-dropdown-suggest__list" +
        (this.state.open ? '' : ' hidden');

    return (
      <div className={ this.mainClasses } >

        { this.labelHTML }
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.inputIconHTML("dropdown") }
        { this.validationHTML }

        <ul
          ref="list"
          className={ listClasses }
          onScroll={ this.handleScroll }>
          { this.results }
        </ul>

      </div>
    );
  }
}

// Private Functions

/**
 * Transforms selected element into an Immutable Object.
 *
 * @method buildImmutableValue
 * @param {Object} props
 * @param {String} name
 * @param {Number} id
 */
function buildImmutableValue(props, name, id) {
  let newValue = props.value.set(props.resource_key, name);
  newValue = newValue.set('id', id);

  return newValue;
}

export default DropdownSuggest;
