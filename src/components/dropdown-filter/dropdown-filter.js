import React from 'react';
import Dropdown from './../dropdown';
import I18n from 'i18n-js';

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
  handleVisibleChange = (ev) => {
    this.setState({ filter: ev.target.value });
  }

  /*
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    if (!this.blockBlur) { this.setState({ open: false, filter: null }); }
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus() {
    super.handleFocus();
    this.refs.input.setSelectionRange(0, this.refs.input.value.length);
  }

  /**
   * Prepares list options by converting to JSON and formatting filtered options.
   *
   * @method prepareList
   * @param {Object} options Immutable map of list options
   */
  prepareList = (options) => {
    let _options = options.toJS();

    if (typeof this.state.filter === 'string') {
      let filter = this.state.filter;
      let regex = new RegExp(filter, 'i');

      // if user has entered a search filter
      _options = _options.filter((option) => {
        if (option.name.search(regex) > -1) {
          option.name = this.highlightMatches(option.name, filter);
          return option;
        }
      });
    }

    return _options;
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
        <li className={ 'ui-dropdown__list__item ui-dropdown__list__item--no-results' }>
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
   * Returns the list options in the correct format
   *
   * @method options
   */
  get options() {
    return this.prepareList(this.props.options);
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   */
  get mainClasses() {
    let classes = super.mainClasses;
    return classes + ' ui-dropdown-filter';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   */
  get inputClasses() {
    let classes = super.inputClasses;

    if (typeof this.state.filter === 'string') {
      classes += ' ui-dropdown__input--filtered';
    }

    return classes;
  }

  /**
   * Input props for the dropdown, extended from the base dropdown component.
   *
   * @method inputProps
   */
  get inputProps() {
    let props = super.inputProps;

    // use value from cache or get value by id
    let value = this.visibleValue || this.nameByID(this.props.value);

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
