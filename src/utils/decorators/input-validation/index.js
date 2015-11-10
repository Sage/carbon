import React from 'react';
import Icon from './../../icon';
import chainFunctions from './../../helpers/chain-functions';

var InputValidation = (ComposedComponent) => class Component extends ComposedComponent {

  constructor() {
    super();
    this.state = this.state || {};
    this.state.valid = true;
    this.state.errorMessage = null;
  }

  static contextTypes = Object.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  componentWillMount() {
    if (super.componentWillMount) { super.componentWillMount(); }

    if (this.props.validations) {
      this.context.form.attachToForm(this);
    }
  }

  componentWillUnmount() {
    if (super.componentWillUnmount) { super.componentWillUnmount(); }

    if (this.props.validations) {
      if (!this.state.valid) {
        this.context.form.decrementErrorCount();
      }
      this.context.form.detachFromForm(this);
    }
  }

  validate = () => {
    var valid = false;

    if (this.props.validations) {
      this.props.validations.forEach((validation) => {
        var value = this.props.value || this.props.defaultValue;
        valid = validation.validate(value);

        if (!valid) {
          if (this.state.valid) {
            this.context.form.incrementErrorCount();
            this.setState({ errorMessage: validation.message(), valid: false });
          }
          return valid;
        }
      });
    } else {
      valid = true;
    }

    return valid;
  }

  handleBlur = () => {
    this.validate();
  }

  handleFocus = () => {
    if (!this.state.valid) {
      this.context.form.decrementErrorCount();
      this.setState({ errorMessage: null, valid: true });
    }
  }

  get errorMessageHTML() {
    if (this.state.errorMessage) {
      return (
        <div className="base-input__message base-input__message--error">
          { this.state.errorMessage }
        </div>
      );
    } else {
      return null;
    }
  }

  get errorIconHTML() {
    if (this.state.errorMessage) {
      return (
        <Icon type="error" className="base-input__icon base-input__icon--error" />
      );
    } else {
      return null;
    }
  }

  get mainClasses() {
    let classes = super.mainClasses || "";

    if (!this.state.valid) {
      classes += " base-input--error";
    }

    return classes;
  }

  get inputClasses() {
    let classes = super.inputClasses || "";

    if (!this.state.valid) {
      classes += " base-input__input--error";
    }

    return classes;
  }

  get inputProps() {
    var inputProps = (super.inputProps) ? super.inputProps : {};

    inputProps.onBlur = chainFunctions(this.handleBlur, inputProps.onBlur);
    inputProps.onFocus = chainFunctions(this.handleFocus, inputProps.onFocus);

    return inputProps;
  }

};

export default InputValidation;
