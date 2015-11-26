import React from 'react';
import Icon from './../../../components/icon';
import chainFunctions from './../../helpers/chain-functions';
import _ from 'lodash';

let InputValidation = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
    this.state = this.state || {};
    this.state.valid = true;
    this.state.errorMessage = null;
  }

  static contextTypes = _.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  componentWillMount() {
    if (super.componentWillMount) { super.componentWillMount(); }

    if (this.context.form && this.props.validations) {
      this.context.form.attachToForm(this);
    }
  }

  componentWillUnmount() {
    if (super.componentWillUnmount) { super.componentWillUnmount(); }

    if (this.context.form && this.props.validations) {
      if (!this.state.valid) {
        this.context.form.decrementErrorCount();
      }
      this.context.form.detachFromForm(this);
    }
  }

  /**
   * Checks for validations and returns boolean defining if field valid.
   *
   * @method validate
   */
  validate = () => {
    let valid = false;

    // if there are no validation, return truthy
    if (!this.props.validations) {
      return true;
    }

    // iterate through each validation applied to the input
    this.props.validations.forEach((validation) => {
      if (!this.props.value) {
        console.warn(`Validations require a value property to be set to work correctly. See the render for the input with name '${this.props.name}'.`);  // eslint-disable-line no-console
      }

      valid = validation.validate(this.props.value);

      // if validation fails
      if (!valid) {
        // if input currently thinks it is valid
        if (this.state.valid) {
          // if input has a form
          if (this.context.form) {
            // increment the error count on the form
            this.context.form.incrementErrorCount();
          }
          // tell the input it is invalid
          this.setState({ errorMessage: validation.message(), valid: false });
        }

        // a validation has failed, so exit the loop at this point
        return valid;
      }
    });

    // return the result of the validation
    return valid;
  }

  _handleBlur = () => {
    this.validate();
  }

  _handleFocus = () => {
    if (!this.state.valid) {
      if (this.context.form) {
        this.context.form.decrementErrorCount();
      }
      this.setState({ errorMessage: null, valid: true });
    }
  }

  get validationHTML() {
    if (this.state.errorMessage) {
      var html = [
        <Icon key="0" type="error" className="base-input__icon base-input__icon--error" />,
        <div key="1" className="base-input__message base-input__message--error">
          { this.state.errorMessage }
        </div>
      ];
      return html;
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
    let inputProps = (super.inputProps) ? super.inputProps : {};

    inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);
    inputProps.onFocus = chainFunctions(this._handleFocus, inputProps.onFocus);

    return inputProps;
  }

};

export default InputValidation;
