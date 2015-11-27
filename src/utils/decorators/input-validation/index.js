import React from 'react';
import Icon from './../../../components/icon';
import chainFunctions from './../../helpers/chain-functions';
import _ from 'lodash';

/**
 * InputValidation decorator.
 *
 * This decorator provides functionality and HTML for validation on inputs.
 *
 * == How to use InputValidation decorator in a component:
 *
 * In your file:
 *
 *   import InputValidation from 'carbon/lib/utils/decorators/input-validation';
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = InputValidation(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * In the render method for your component, you can now output the HTML:
 *
 *   render() {
 *     return (
 *       <div>
 *         <input />
 *         { this.validationHTML() }
 *       </div>
 *     );
 *   }
 *
 * @method InputValidation
 */
let InputValidation = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);

    // use the super components state, or create an empty object
    this.state = this.state || {};

    /**
     * The inputs valid state.
     *
     * @property valid
     * @type {Boolean}
     * @default true
     */
    this.state.valid = true;

    /**
     * The inputs error message.
     *
     * @property errorMessage
     * @type {String}
     * @default null
     */
    this.state.errorMessage = null;
  }

  static contextTypes = _.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  /**
   * A lifecycle method for when the component is added to the page.
   *
   * @method componentWillMount
   */
  componentWillMount() {
    // call the components super method if it exists
    if (super.componentWillMount) { super.componentWillMount(); }

    if (this.context.form && this.props.validations) {
      // attach the input to the form so the form can track what it needs to validate on submit
      this.context.form.attachToForm(this);
    }
  }

  /**
   * A lifecycle method for when the component is removed from the page.
   *
   * @method componentWillUnmount
   */
  componentWillUnmount() {
    // call the components super method if it exists
    if (super.componentWillUnmount) { super.componentWillUnmount(); }

    if (this.context.form && this.props.validations) {
      if (!this.state.valid) {
        // decrement the forms error count if the input is removed
        this.context.form.decrementErrorCount();
      }

      // detach the input to the form so the form
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
      if (this.props.value === undefined) {
        console.warn(`Validations require a value property to be set to work correctly. See the render for the input with name '${this.props.name}'.`);  // eslint-disable-line no-console
      }

      // run this validation
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

  /**
   * On blur of the input we want to validate the field.
   *
   * @method _handleBlur
   */
  _handleBlur = () => {
    this.validate();
  }

  /**
   * On focus of the input we want to reset validation of the field.
   *
   * @method _handleFocus
   */
  _handleFocus = () => {
    // if the field is in an invalid state
    if (!this.state.valid) {
      // if there is a form, decrement the error count
      if (this.context.form) { this.context.form.decrementErrorCount(); }
      // reset the error state
      this.setState({ errorMessage: null, valid: true });
    }
  }

  /**
   * Returns the HTML for the validation, only if it is invalid.
   *
   * @method validationHTML
   */
  get validationHTML() {
    if (!this.state.errorMessage) { return null; }

    return [
      <Icon key="0" type="error" className="base-input__icon base-input__icon--error" />,
      <div key="1" className="base-input__message base-input__message--error">
        { this.state.errorMessage }
      </div>
    ];
  }

  /**
   * Extends the main classes with any validation classes.
   *
   * @method mainClasses
   */
  get mainClasses() {
    let classes = super.mainClasses || "";

    if (!this.state.valid) {
      classes += " base-input--error";
    }

    return classes;
  }

  /**
   * Extends the input classes with any validation classes.
   *
   * @method inputClasses
   */
  get inputClasses() {
    let classes = super.inputClasses || "";

    if (!this.state.valid) {
      classes += " base-input__input--error";
    }

    return classes;
  }

  /**
   * Extends the input props with onBlur and onFocus events.
   *
   * @method inputProps
   */
  get inputProps() {
    let inputProps = super.inputProps || {};

    inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);
    inputProps.onFocus = chainFunctions(this._handleFocus, inputProps.onFocus);

    return inputProps;
  }

};

export default InputValidation;
