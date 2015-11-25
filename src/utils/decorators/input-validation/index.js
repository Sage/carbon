import React from 'react';
import Icon from './../../../components/icon';
import chainFunctions from './../../helpers/chain-functions';
import _ from 'lodash';

var InputValidation = (ComposedComponent) => class Component extends ComposedComponent {

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

  validate = () => {
    var valid = false;

    if (this.props.validations) {
      this.props.validations.forEach((validation) => {
        if (!this.props.value) {
          console.warn(`Validations require a value property to be set to work correctly. See the render for the input with name '${this.props.name}'.`);  // eslint-disable-line no-console
        }

        valid = validation.validate(this.props.value);

        if (!valid) {
          if (this.state.valid) {
            if (this.context.form) {
              this.context.form.incrementErrorCount();
            }
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
    var inputProps = (super.inputProps) ? super.inputProps : {};

    inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);
    inputProps.onFocus = chainFunctions(this._handleFocus, inputProps.onFocus);

    return inputProps;
  }

};

export default InputValidation;
