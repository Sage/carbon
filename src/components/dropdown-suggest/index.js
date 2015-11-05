import React from 'react';
import Request from 'superagent';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';
import InputIcon from './../../utils/input/icon';
import InputHelper from './../../utils/helpers/input';
import Immutable from 'immutable';

class DropdownSuggest extends React.Component {

  static defaultProps = {
    value: Immutable.Map({})
  }

  /**
   * Define property types
   */
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
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
   * Sets or appends the list with new data and causes a setState.
   *
   * @method updateList
   */
  updateList = (data) => {
    var pages = Math.ceil(data.records / 10);

    if (data.page > 1) {
      var records = this.state.options.concat(data.items);
    } else {
      var records = data.items;
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
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.skipValidation) {
      this.props.validation.handleBlur();
    }

    this.skipValidation = false;
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

    this.props.validation.handleFocus();
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
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    var val = this.newValue(ev.target.value, null);
    this.emitOnChangeCallback(val)

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
    this.skipValidation = true;
    var val = this.newValue(ev.target.textContent, ev.target.value);
    this.emitOnChangeCallback(val);
  }

  newValue = (name, id) => {
    var newValue = this.props.value.set(this.props.resource_key, name)
    newValue = newValue.set('id', id);

    return newValue;
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOver
   */
  handleMouseOver = (ev) => {
    this.setState({
      highlighted: ev.target.value
    });
  }

  /**
   * Handles when a user keys up on input.
   *
   * @method handleKeyUp
   */
  handleKeyDown = (ev) => {
    var list = this.refs.list,
        element = list.getElementsByClassName('ui-dropdown-suggest__item--highlighted')[0];

    switch(ev.which) {
      case 13: // return
        if (element) {
          ev.preventDefault();
          var val = this.newValue(element.textContent, element.value);
          this.setState({ open: false });
          this.emitOnChangeCallback(val)
        }
        break;
      case 38: // up arrow
        var nextVal = list.lastChild.value;

        if (element && element.previousElementSibling) {
          nextVal = element.previousElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
      case 40: // down arrow
        var nextVal = list.firstChild.value;

        if (element && element.nextElementSibling) {
          nextVal = element.nextElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
    }
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param [value] Immutable object representing the value
   */
  emitOnChangeCallback = (value) => {
    this.props.onChange({ target: { value: value } } , this.props);
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

  /**
   * Sets props for input fieild.
   *
   * @method inputProps
   */
  inputProps = (inputProps) => {
    var { name, ...inputProps } = this.props.input.inputProps();

    inputProps.onFocus = this.handleFocus;
    inputProps.onBlur = this.handleBlur;
    inputProps.onChange = this.handleChange;
    inputProps.onKeyDown = this.handleKeyDown;

    inputProps.value = this.props.value.get(this.props.resource_key);

    return inputProps;
  }

  /**
   * Gets props for selected option id.
   *
   * @method hiddenFieldProps
   */
  hiddenFieldProps = () => {
    var inputProps = this.props.input.inputProps();
    var nameWithID = inputProps.name.split(/\]$/)[0] + "_id]";
    var props = {
      name: nameWithID
    };

    if (this.props.value) {
      props.value = this.props.value.get('id');
    }

    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    var rootClassName = 'ui-dropdown-suggest';

    if (this.state.options.length) {
      var results = this.state.options.map((option) => {
        let className = `${rootClassName}__item`;

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
    }
    else {
      var results = <li>No results</li>;
    }



    var listClasses = `${rootClassName}__list` +
        (this.state.open ? '' : ' hidden');

    var inputProps = this.inputProps();


    return (
      <div className={ InputHelper.mainClasses(rootClassName, this.props) } >

        { this.props.input.labelHTML() }

        <input
          className={ InputHelper.inputClasses(rootClassName, this.props) }
          ref="filter"
          { ...inputProps } />

        { this.props.icon.inputIconHTML("dropdown", inputProps.id) }

        <input
          ref="input"
          readOnly="true"
          hidden="true"
          { ...this.hiddenFieldProps() } />

        <ul
          ref="list"
          className={ listClasses }
          onScroll={ this.handleScroll } >
          {results}
        </ul>

        { this.props.validation.errorMessageHTML() }

      </div>
    );
  }
}

export default InputIcon(InputValidation(Input(DropdownSuggest)))
