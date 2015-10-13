import React from 'react';

var ValidationClass = (ComposedComponent) => class extends React.Component {

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
      if (!this.props.valid) {
        this.context.form.decrementErrorCount()
      }
      this.context.form.detachFromForm(this);
    }
  }

  validate = () => {
    var valid = false;

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

  exposedMethods = () => {
    return {
      handleBlur: this.handleBlur,
      handleFocus: this.handleFocus,
      validate: this.validate
    };
  }

  state = {
    valid: true,
    errorMessage: null
  }

  render() {
    return (
      <ComposedComponent {...this.exposedMethods()} {...this.props} {...this.state} />
    );
  }

}

export default ValidationClass;
