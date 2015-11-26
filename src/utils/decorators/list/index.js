import React from 'react';
import chainFunctions from './../../helpers/chain-functions';

var List = (ComposedComponent) => class Component extends ComposedComponent {

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
    this.setState({ open: false });
  }

  /**
   * Handles a select action on a list item
   *
   * @method handleSelect
   * @param {Object} ev event
   */
  _handleSelect = (ev) => {
    if (this.handleSelect) {
      this.handleSelect(ev);
    } else {
      this.emitOnChangeCallback(ev.target.value);
    }
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOver
   * @param {Object} ev event
   */
  _handleMouseOver = (ev) => {
    this.setState({ highlighted: ev.target.value });
  }

  /**
   * Function that returns search results. Builds each list item with relevant handlers and classes.
   *
   * @method results
   */
  results = (options) => {
    let results;

    if (options.length) {
      results = options.map((option) => {
        let className = `${this.rootClass}__item`;

        return <li
                  key={option.name + option.id}
                  value={option.id}
                  onMouseDown={this._handleSelect}
                  onMouseOver={this._handleMouseOver}
                  className={(this.state.highlighted == option.id) ?
                    `${className} ${className}--highlighted` :
                    className}>
                  {option.name}
                </li>;
      });

    } else {
      results = <li>No results</li>;
    }

    return results;
  }

  get inputProps() {
    var inputProps = super.inputProps || {};

    inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);

    if (this.props.onChange === inputProps.onChange) {
      inputProps.onChange = this._handleOnChange;
    }
    return inputProps;
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

};

export default List;
