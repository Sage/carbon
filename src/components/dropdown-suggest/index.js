import React from 'react';
import Request from 'superagent';
import Immutable from 'immutable';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';
import List from './../../utils/decorators/list';

/**
 * A dropdown-suggest widget.
 *
 * == How to use a dropdown-suggest in a component:
 *
 * In your file
 *
 *   import DropdownSuggest from 'carbon/lib/components/dropdown-suggest';
 *
 * To render a DropdownSuggest:
 *
 *   <DropdownSuggest path={foo} />
 *
 * @class DropdownSuggest
 * @constructor
 * @decorators {List,Input,InputIcon,InputLabel,InputValidation}
 */
const DropdownSuggest = List(Input(InputIcon(InputLabel(InputValidation(
class DropdownSuggest extends React.Component {

  static propTypes = {
    /**
     * The path to your data (e.g. "/core_accounting/ledger_accounts/suggestions")
     *
     * @property path
     * @type {String}
     */
    path: React.PropTypes.string.isRequired,

    /**
     * An object to hold data for rendering in the widget
     *
     * @property value
     * @type {Object}
     * @default Immutable.Map({})
     */
    value: React.PropTypes.object
  };

  static defaultProps = {
    value: Immutable.Map({})
  };

  /**
   * Tracks whether the scroll listener is active on the list, useful for
   * paginated results.
   *
   * @property listeningToScroll
   * @type {Boolean}
   */
  listeningToScroll = true;

  state = {

    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */
    options: [],

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
    pages: 0
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
    let query = this.props.value.get('id') ? "" : this.props.value.get(this.props.resource_key);

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
    // Default page size is 10 records
    let pages = Math.ceil(data.records / 10),
        records;
    // Adds next set of records as page scrolled down
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

    if (this.props.value.get('id') || !this.state.options.length) {
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
    if (this.listeningToScroll) {
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
    if (this.timeout) { clearTimeout(this.timeout); }
    let val = buildImmutableValue(this.props, ev.target.value, null);
    this.emitOnChangeCallback(val);

    this.timeout = setTimeout(() => {
      this.getData(1);
    }, 200);
  }

  /**
   * Handles a select action on a list item - overrides the method supplied by the list decorator
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  handleSelect = (ev) => {
    let val = buildImmutableValue(this.props, ev.target.textContent, ev.target.value);
    this.emitOnChangeCallback(val);
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
        if (element) {
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
      name: nameWithID,
      value: this.props.value.get('id')
    };

    return props;
  }

  /**
   * Root Class getter, returns a single class
   *
   * @method rootClass
   */
  get rootClass() {
    return 'ui-dropdown-suggest';
  }

  /**
   * Main Class getter, can be extended with additional classes.
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return this.rootClass;
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return `${this.rootClass}__input`;
  }

  get listHTML() {
    let listClasses = `${this.rootClass}__list` +
        (this.state.open ? '' : ' hidden');

    return (
      <ul
        ref="list"
        className={ listClasses }
        onScroll={ this.handleScroll }>
        { this.results(this.state.options) }
      </ul>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses } >

        { this.labelHTML }
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.inputIconHTML("dropdown") }
        { this.validationHTML }

        { this.listHTML }

      </div>
    );
  }
}
)))));

// Private Functions

/**
 * Transforms selected element into an Immutable Object.
 *
 * @method buildImmutableValue
 * @private
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
