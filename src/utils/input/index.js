import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

var Input = (ComposedComponent) => class extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  static contextTypes = {
    form: React.PropTypes.object
  }

  /**
   * Determines if the component should re-render
   */
  shouldComponentUpdate = (nextProps, nextState) => {
    var { value, ...otherProps } = this.props;
    var previous = value;
    var { value, ...otherNextProps } = nextProps;

    if (!Immutable.is(previous, value) ||
        !_.isEqual(otherProps, otherNextProps) ||
        !_.isEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }

  /**
   * Returns modified properties for the input element.
   *
   * @method inputProps
   */
  inputProps = () => {
    var { ...inputProps } = this.props;

    inputProps.name = this.context.form.model + "[" + inputProps.name + "]";

    // set id so label will work correctly
    inputProps.id = inputProps.name;

    if (inputProps.onChange) {
      inputProps.onChange = this.handleOnChange;
    }

    return inputProps;
  }

  /**
   * Calls the onChange method with relevant data.
   */
  handleOnChange = (ev) => {
    this.props.onChange(ev, this.props);
  }

  /**
   * Returns HTML for the label.
   *
   * @method labelHTML
   */
  labelHTML = () => {
    if (this.props.label === false) {
      return;
    }

    var labelText = this.props.label || this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    return (
      <label htmlFor={ this.props.name }>{ labelText }:</label>
    );
  }

  state = {
    labelHTML: this.labelHTML,
    inputProps: this.inputProps
  }

  mainClasses = () => {
    return " base-input";
  }

  inputClasses = () => {
    return " base-input__input";
  }

  exposedMethods = () => {
    return {
      mainClasses: this.mainClasses,
      inputClasses: this.inputClasses,
      ...this.state
    };
  }

  render() {
    return (
      <ComposedComponent input={this.exposedMethods()} {...this.props} />
    );
  }

};

export default Input;
