import React from 'react';
import _ from 'lodash';
import Immutable from 'immutable';

const Input = (ComposedComponent) => class extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  static contextTypes = {
    form: React.PropTypes.object
  }

  static defaultProps = ComposedComponent.defaultProps

  /**
   * Determines if the component should re-render
   */
  shouldComponentUpdate = (nextProps, nextState) => {
    var { value, ...otherProps } = this.props;
    let previous = value;
    var { value, ...otherNextProps } = nextProps;

    if (!Immutable.is(previous, value) ||
        !_.isEqual(otherProps, otherNextProps) ||
        !_.isEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }

  generateFormName = () => {
    if (this.context.form) {
      if (this.props.name.charAt(0) === "[") {
        return this.context.form.model + this.props.name;
      } else {
        return this.context.form.model + "[" + this.props.name + "]";
      }
    } else {
      return this.props.name;
    }
  }

  /**
   * Returns modified properties for the input element.
   *
   * @method inputProps
   */
  inputProps = () => {
    let { ...inputProps } = this.props;

    inputProps.name = this.generateFormName();

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
    if (this.props.label === false) { return }

    let labelText = this.props.label || this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    if (this.props.validations) {
      labelText += "*";
    }

    return (
      <label className="base-input__label" htmlFor={ this.generateFormName() }>{ labelText }</label>
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
