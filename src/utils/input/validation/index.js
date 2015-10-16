import React from 'react';

var InputValidation = (ComposedComponent) => class extends React.Component {

  /**
   * Get form context to manage validation
   */
  static contextTypes = {
    form: React.PropTypes.object
  }

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
        valid = validation.validate(this.props.value);

        if (!valid) {
          if (this.state.valid) {
            this.context.form.incrementErrorCount()
            this.setState({ errorMessage: "error!", valid: false })
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
