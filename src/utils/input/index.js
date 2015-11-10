import React from 'react';
import _ from 'lodash';

var Input = (ComposedComponent) => class extends ComposedComponent {

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
  shouldComponentUpdate(nextProps, nextState) {
    super.shouldComponentUpdate(nextProps, nextState);
    if (!_.isEqual(this.props, nextProps) ||
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

    if (this.props.validations) {
      labelText += "*";
    }

    return (
      <label className="base-input__label" htmlFor={ this.generateFormName() }>{ labelText }</label>
    );
  }

  get mainClasses() {
    return super.mainClasses + " base-input";
  }

  get inputClasses() {
    return super.inputClasses + " base-input__input";
  }

  /**
   * Returns modified properties for the input element.
   *
   * @method inputProps
   */
  get inputProps() {
    var { ...inputProps } = this.props;

    inputProps.name = this.generateFormName();

    // set id so label will work correctly
    inputProps.id = inputProps.name;

    if (inputProps.onChange) {
      inputProps.onChange = this.handleOnChange;
    }

    return inputProps;
  }

  render() {
    const renderedElement = super.render();

    debugger

    var {props, state, type, ...other} = renderedElement;

    return (
      <renderedElement.type { ...props } { ...state } { ...other } >
        { this.labelHTML() }
        { renderedElement.props.children }
      </renderedElement.type>
    )
  }

};

export default Input;
