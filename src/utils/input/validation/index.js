import React from 'react';
import Icon from './../../icon';

var InputValidation = (ComposedComponent) => class extends React.Component {

  /**
   * Get form context to manage validation
   */
  static contextTypes = {
    form: React.PropTypes.object
  }

  static defaultProps = ComposedComponent.defaultProps

  componentWillMount = () => {
    if (this.props.validations) {
      this.context.form.attachToForm(this);
    }
  }

  componentWillUnmount = () => {
    if (this.props.validations) {
      if (!this.state.valid) {
        this.context.form.decrementErrorCount()
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
            this.context.form.incrementErrorCount()
            this.setState({ errorMessage: validation.message(), valid: false })
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
      this.context.form.decrementErrorCount()
      this.setState({ errorMessage: null, valid: true });
    }
  }

  errorMessageHTML = () => {
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

  errorIconHTML = () => {
    if (this.state.errorMessage) {
      return (
        <Icon type="error" className="base-input__icon base-input__icon--error" />
      );
    } else {
      return null;
    }
  }

  mainClasses = () => {
    var classes = "";

    if (!this.state.valid) {
      classes += " base-input--error";
    }

    return classes;
  }

  inputClasses = () => {
    var classes = "";

    if (!this.state.valid) {
      classes += " base-input__input--error";
    }

    return classes;
  }

  exposedMethods = () => {
    return {
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      validate: this.validate,
      mainClasses: this.mainClasses,
      inputClasses: this.inputClasses,
      errorMessageHTML: this.errorMessageHTML,
      errorIconHTML: this.errorIconHTML,
      ...this.state
    };
  }

  state = {
    valid: true,
    errorMessage: null
  }

  render() {
    return (
      <ComposedComponent validation={this.exposedMethods()} {...this.props} />
    );
  }

}

export default InputValidation;
