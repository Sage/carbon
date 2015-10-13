import React from 'react';
import InputClass from './../../utils/input-class';
import Validations from './../../utils/validations';
import style from './style';

class Textbox extends InputClass {

  static contextTypes = {
    form: React.PropTypes.object
  }

  state = {
    valid: true,
    errorMessage: null
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
      var validator = Validations[validation];
      valid = validator.validate(this.props.value);

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

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div style={ style.base }>
        { this.labelHTML() }
        <input
          style={ style.input }
          onBlur={ this.handleBlur }
          onFocus={ this.handleFocus }
          { ...this.inputProps() }
        />
        { this.state.errorMessage }
      </div>
    );
  }

};

export default Textbox;
