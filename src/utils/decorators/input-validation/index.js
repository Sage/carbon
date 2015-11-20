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
   *  Checks for validations and returns boolean defining if field valid.
   *
   * @method validate
   */
  validate = () => {
    let _valid = false;

    // If validations have been set on the
    if (this.props.validations) {
      let validations = this.props.validations;

      // If a string reference to the validation is passed.
      if(typeof validations === 'string') {
        this.runValidations(validations, _valid);
      }

      // If an array containing validations is passed.
      else {
        validations.forEach((validation) => { this.runValidations(validation, _valid); });
      }
    }
    // If no validations have been set on the input, default valid to true
    else {
      _valid = true;
    }

    return _valid;
  }

  /**
   *  Adjusts error count, sets error message and checks with validations for validity.
   *
   * @method runValidations
   * @param {String | Array} references to validations set on input
   * @param {Boolean }_valid
   */
  runValidations = (validation, _valid) => {
    if (!this.props.value) {
      console.warn(`Validations require a value property to be set to work correctly. See the render for the input with name '${this.props.name}'.`);  // eslint-disable-line no-console
    }

    // Calls the the provided validation's validate method
    _valid = validation.validate(this.props.value);

    // If field invalid, update ComposedComponent state
    if (!_valid) {
      if (this.state.valid) {
        this.context.form.incrementErrorCount();
        this.setState({ errorMessage: validation.message(), _valid: false });
      }
      return _valid;
    }
  }

  _handleBlur = () => {
    this.validate();
  }

  _handleFocus = () => {
    if (!this.state.valid) {
      this.context.form.decrementErrorCount();
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
