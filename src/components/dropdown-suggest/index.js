import React from 'react';
import Request from 'superagent';

import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import InputIcon from './../../utils/decorators/input-icon';

import Immutable from 'immutable';

@Input
@InputIcon
@InputLabel
@InputValidation
class DropdownSuggest extends React.Component {

  static defaultProps = {
    value: Immutable.Map({})
  }

  /**
   * Define property types
   */
  static propTypes = {
    path: React.PropTypes.string.isRequired
  }

  /**
   * Tracks whether the scroll listener is active on the list.
   *
   * @property listeningToScroll
   * @type {Boolean}
   */
  listeningToScroll = true;

  /**
   * Default state
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
     */
    open: false,

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Integer}
     */
    page: 1,

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Integer}
     */
    pages: 0,

    /**
     * The ID of the highlighted item in the list.
     *
     * @property highlighted
     * @type {Integer}
     */
    highlighted: null
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param [value] Immutable object representing the value
   */
  emitOnChangeCallback = (value) => {
    this._handleOnChange({ target: { value: value } });
  }

  /**
   * Retrieves data from the server for the list.
   *
   * @method getData
   */
  getData = (page = 1) => {
    // Passes empty string to query if value has been selected
    var query = this.props.value.get('id') ? "" : this.props.value.get(this.props.resource_key);

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
   */
  updateList = (data) => {
    var pages = Math.ceil(data.records / 10),
        records;

    if (data.page > 1) {
      records = this.state.options.concat(data.items);
    } else {
      records = data.items;
      this.resetScroll();
    }

    this.listeningToScroll = true;

    var highlighted = data.records ? records[0].id : null;

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
    var filter = this.refs.filter;

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
        var list = this.refs.list;
        var scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 20;

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
   */
  handleChange = (ev) => {
    if (this.timeout) { clearTimeout(this.timeout); }
    var val = buildImmutableValue(this.props, ev.target.value, null);
    this.emitOnChangeCallback(val);

    this.timeout = setTimeout(() => {
      this.getData(1);
    }, 200);
  }

  /**
   * Handles a select action on a list item.
   *
   * @method handleSelect
   */
  handleSelect = (ev) => {
    var val = buildImmutableValue(this.props, ev.target.textContent, ev.target.value);
    this.emitOnChangeCallback(val);
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOver
   */
  handleMouseOver = (ev) => {
    this.setState({ highlighted: ev.target.value });
  }

  /**
   * Handles when a user keys up on input.
   *
   * @method handleKeyUp
   */
  handleKeyDown = (ev) => {
    var list = this.refs.list,
        element = list.getElementsByClassName('ui-dropdown-suggest__item--highlighted')[0],
        nextVal;

    switch(ev.which) {
      case 13: // return
        if (element) {
          ev.preventDefault();
          var val = buildImmutableValue(this.props, element.textContent, element.value);
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
    var list = this.refs.list;
    list.scrollTop = 0;
  }

  get inputProps() {
    var { ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "filter";
    props.onFocus = this.handleFocus;
    props.onBlur = this.handleBlur;
    props.onChange = this.handleChange;
    props.onKeyDown = this.handleKeyDown;
    props.value = this.props.value.get(this.props.resource_key);
    return props;
  }

  get hiddenInputProps() {
    var nameWithID = this.inputProps.name.split(/\]$/)[0] + "_id]";
    var props = {
      ref: "input",
      type: "hidden",
      readOnly: true,
      name: nameWithID
    };

    if (this.props.value) { props.value = this.props.value.get('id'); }

    return props;
  }

  get mainClasses() {
    return 'ui-dropdown-suggest';
  }

  get inputClasses() {
    return 'ui-dropdown-suggest__input';
  }

  get results() {
    var results;

    if (this.state.options.length) {
      results = this.state.options.map((option) => {
        var className = "ui-dropdown-suggest__item";

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
    var listClasses = "ui-dropdown-suggest__list" +
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
          onScroll={ this.handleScroll }
        >
          { this.results }
        </ul>

      </div>
    );
  }
}

function buildImmutableValue(props, name, id) {
  var newValue = props.value.set(props.resource_key, name);
  newValue = newValue.set('id', id);

  return newValue;
}

export default DropdownSuggest;
