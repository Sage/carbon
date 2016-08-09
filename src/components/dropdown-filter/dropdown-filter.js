import React from 'react';
import Dropdown from './../dropdown';
import I18n from 'i18n-js';
import classNames from 'classnames';
import escapeStringRegexp from 'escape-string-regexp';

/**
 * A dropdown filter widget.
 *
 * == How to use a dropdown in a component:
 *
 * In your file
 *
 *   import DropdownFilter from 'carbon/lib/components/dropdown-filter';
 *
 * To render a DropdownFilter:
 *
 *   <DropdownFilter name="foo" options={ foo } onChange={ myChangeHandler } />
 *
 * The developer should pass data to the store as JSON. e.g.
 *
 *   foo: [{ id: 1, name: "Foo" }, { id: 2, name: "Bar" }]
 *
 * You can also use the component in 'suggest' mode, which only shows the dropdown
 * once a filter term has been entered.
 *
 * You can also define a function using the 'create' prop, this will allow you
 * to trigger events to create new items.
 *
 * @class DropdownFilter
 * @constructor
 */
class DropdownFilter extends Dropdown {

  constructor(...args) {
    super(...args);

    /**
     * The user input search text.
     *
     * @property filter
     * @type {String}
     * @default null
     */
    this.state.filter = null;

    /**
     * Determines if list is being opened on current render.
     *
     * @property openingList
     * @type {Boolean}
     * @default false
     */
    this.openingList = false;

    // bind scope to functions - allowing them to be overridden and
    // recalled with the use of super
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  static propTypes = {
    /**
     * The ID value for the component
     *
     * @property value
     * @type {String}
     */
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),

    /**
     * The options to be displayed in the dropdown. Should be set in the store and passed from the parent component.
     *
     * @property options
     * @type {object}
     */
    options: React.PropTypes.object.isRequired,

    /**
     * Enables create functionality for dropdown.
     *
     * @property create
     * @type {Function}
     */
    create: React.PropTypes.func,

    /**
     * Should the dropdown act and look like a suggestable input instead.
     *
     * @property suggest
     * @type {Boolean}
     */
    suggest: React.PropTypes.bool
  }

  /**
   * Lifecycle hook for when the component will update.
   *
   * @method componentWillUpdate
   * @param {Object} nextProps
   * @param {Object} nextState
   */
  componentWillUpdate(nextProps, nextState) {
    // if list is being opened, set boolean
    if (this.state.open != nextState.open) {
      this.openingList = true;
    }
  }

  /**
   * Selects the value for the component
   *
   * @method selectValue
   * @param {String} val
   */
  selectValue(val, visibleVal) {
    super.selectValue(val, visibleVal);
    this.setState({ filter: null });
  }

  /*
   * Handles changes to the visible input field. Updates filter and displayed value.
   *
   * @method handleVisibleChange
   * @param {Object} ev event
   */
  handleVisibleChange(ev) {
    let state = {
      filter: ev.target.value,
      highlighted: null
    };

    if (this.props.suggest && ev.target.value.length <= 0) {
      state.open = false;
    } else {
      state.open = true;
    }

    this.setState(state);

    this.openingList = false;

    if (this.props.create) {
      // if create is enabled then empty the selected value so the filter persists
      this.emitOnChangeCallback("", ev.target.value);
    }
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.blockBlur) {
      let filter = this.props.create ? this.state.filter : null;
      this.setState({ open: false, filter: filter });
    }
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    if (!this.props.suggest && !this.blockFocus) {
      this.setState({ open: true });
    } else {
      this.blockFocus = false;
    }

    this._input.setSelectionRange(0, this._input.value.length);
  }

  /**
   * Handles what happens when create button is clicked.
   *
   * @method handleCreate
   */
  handleCreate = (ev) => {
    this.setState({ open: false });
    this.props.create(ev, this);
  }

  /**
   * Prepares list options by converting to JSON and formatting filtered options.
   *
   * @method prepareList
   * @param {Object} options Immutable map of list options
   */
  prepareList = (options) => {
    if ((this.props.suggest || !this.openingList) && typeof this.state.filter === 'string') {
      let filter = this.state.filter;
      let regex = new RegExp(escapeStringRegexp(filter), 'i');

      // if user has entered a search filter
      options = options.filter((option) => {
        if (option.name.search(regex) > -1) {
          option.name = this.highlightMatches(option.name, filter);
          return option;
        }
      });
    }

    return options;
  }

  /**
   * Function that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   */
  results(options) {
    let items = super.results(options);

    if (!items.length) {
      items = (
        <li className={ 'ui-dropdown__list-item ui-dropdown__list-item--no-results' }>
          {
            I18n.t("dropdownlist.no_results", {
              defaultValue: "No results match \"%{term}\"",
              term: this.state.filter
            })
          }
        </li>
      );
    }

    return items;
  }

  /**
   * Return the list item which should be highlighted by default.
   *
   * @method highlighted
   */
  highlighted = (options) => {
    let highlighted = null;

    if (this.state.highlighted) {
      highlighted = this.state.highlighted;
    } else {
      if (!this.state.filter && this.props.value) {
        highlighted = this.props.value;
      } else if (this.state.filter && options.length) {
        highlighted = options[0].id;
      }
    }

    return highlighted;
  }

  /**
   * Getter to return HTML for list to render method.
   *
   * @method listHTML
   */
  get listHTML() {
    let original = super.listHTML,
        html = [original];

    if (this.state.open && this.props.create) {
      let text = "Create ";

      if (this.state.filter) {
        text += '"' + this.state.filter + '"';
      } else {
        text += "New";
      }

      html.push(
        <a key="dropdown-action" className="ui-dropdown__action" onClick={ this.handleCreate }>{ text }</a>
      );
    }

    return html;
  }

  /**
   * Returns the list options in the correct format
   *
   * @method options
   */
  get options() {
    return this.prepareList(this.props.options.toJS());
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   */
  get mainClasses() {
    return classNames(
      super.mainClasses,
      'ui-dropdown-filter'
    );
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   */
  get inputClasses() {
    return classNames(
      super.inputClasses,
      {
        'ui-dropdown__input--filtered': !this.props.create && typeof this.state.filter === 'string'
      }
    );
  }

  /**
   * Input props for the dropdown, extended from the base dropdown component.
   *
   * @method inputProps
   */
  get inputProps() {
    let props = super.inputProps;

    let value = props.value;

    if (typeof this.state.filter === 'string') {
      // if filter has a value, use that instead
      value = this.state.filter;
    }

    props.readOnly = this.props.readOnly || false;
    props.onChange = this.handleVisibleChange;
    props.value = value;

    return props;
  }

  /**
   * Find and highlights search terms in text
   *
   * @method highlightMatches
   * @param {String} optionText - the text to search
   * @param {String} value - the search term
   */
  highlightMatches = (optionText, value) => {
    if (!value.length) { return optionText; }

    let beginning, end, middle, newValue, parsedOptionText, valIndex;

    parsedOptionText = optionText.toLowerCase();
    valIndex = parsedOptionText.indexOf(value);

    if (valIndex === -1) {
      return optionText;
    }

    beginning = optionText.substr(0, valIndex);
    middle = optionText.substr(valIndex, value.length);
    end = optionText.substr(valIndex + value.length, optionText.length);

    // find end of string recursively
    if (end.indexOf(value) !== -1) {
      end = this.highlightMatches(end, value);
    }

    // build JSX object
    newValue = [<span   key="beginning">{ beginning }</span>,
                <strong key="middle"><u>{ middle }</u></strong>,
                <span   key="end">{ end }</span>];

    return newValue;
  }

}

export default DropdownFilter;
