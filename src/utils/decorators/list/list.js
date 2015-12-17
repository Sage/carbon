import React from 'react';
import chainFunctions from './../../helpers/chain-functions';
import I18n from 'i18n-js';

/**
 * List decorator.
 *
 * This decorator is specific to the dropdown and dropdown-suggest components,
 * providing functionality common to both.
 *
 * @method List
 */
let List = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
    this.state = this.state || {};

    /**
     * Defines whether the list is open or not.
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    this.state.open = false;

    /**
     * The ID of the highlighted item in the list.
     *
     * @property highlighted
     * @type {Number}
     * @default null
     */
    this.state.highlighted = null;
  }

  /**
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  _handleBlur = () => {
    if (!this.blockBlur) {
      this.setState({ open: false });
    }
  }

  /**
   * Handles a select action on a list item
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  _handleSelect = (ev) => {
    this.blockBlur = false;
    this._handleBlur();

    if (this.handleSelect) {
      this.handleSelect(ev);
    } else {
      this.emitOnChangeCallback(ev.currentTarget.getAttribute('value'));
    }
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOver
   * @param {Object} ev event
   */
  _handleMouseOver = (ev) => {
    this.setState({ highlighted: ev.currentTarget.getAttribute('value') });
  }

  /**
   * Getter for classes for the common list
   *
   * @method commonListClasses
   */
  get commonListClasses() {
    return ' common-list';
  }

  /**
   * Function that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   */
  results = (options) => {
    let results;
    let className = `${this.rootClass}__item`;
    let commonName  = `${this.commonListClasses}__item`;

    if (options.length) {
      results = options.map((option) => {
        let klass = className + commonName;

        // add highlighted class
        if (this.state.highlighted == option.id) {
          klass += ` ${className}--highlighted${commonName}--highlighted`;
        }

        // add selected class
        if (this.props.value == option.id) {
          klass += ` ${className}--selected${commonName}--selected`;
        }

        return <li
                  key={ option.name + option.id }
                  value={ option.id }
                  onClick={ this._handleSelect }
                  onMouseOver={ this._handleMouseOver }
                  className={ klass }>
                  { option.name }
                </li>;
      });

    } else {
      results = <li className={ `${commonName} ${commonName}--noResult` }>
                  {
                    I18n.t("dropdownlist.no_results", {
                      defaultValue: "No results match \"%{term}\"",
                      term: this.state.filter
                    })
                  }
                </li>;
    }

    return results;
  }

  /**
   * Getter for inputProps. Provides common blur handler.
   *
   * @method inputProps
   */
  get inputProps() {
    let inputProps = super.inputProps || {};

    inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);

    return inputProps;
  }
};

export default List;
