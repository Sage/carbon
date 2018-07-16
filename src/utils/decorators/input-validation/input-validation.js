import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { assign } from 'lodash';
import Browser from './../../helpers/browser';
import Icon from './../../../components/icon';
import chainFunctions from './../../helpers/chain-functions';
import Portal from './../../../components/portal';

const window = Browser.getWindow();
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
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */

const InputValidation = (ComposedComponent) => {
  class Component extends ComposedComponent {
    constructor(...args) {
      super(...args);

      this._window = Browser.getWindow();

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

      this.state.activeValidations = [];

      /**
       * The inputs error message.
       *
       * @property errorMessage
       * @type {String}
       * @default null
       */
      this.state.errorMessage = null;

      /**
       * Determines if the message should always be visible.
       *
       * @property messageLocked
       * @type {Boolean}
       * @default false
       */
      this.state.messageLocked = false;

      /**
       * toggles whether the message for validation is immediately hidden to force it to disappear instantly
       *
       * @property immediatelyHideMessage
       * @type {Boolean}
       */
      this.state.immediatelyHideMessage = false;

      /**
       * toggles whether the message for validation is shown
       *
       * @property messageShown
       * @type {Boolean}
       */
      this.state.messageShown = false;
      /**
       * toggles whether the message css is flipped
       *
       * @property flipped
       * @type {Boolean}
       */
      this.state.flipped = false;
    }

    static contextTypes = assign({}, ComposedComponent.contextTypes, {
      form: PropTypes.object,
      tab: PropTypes.object,
      modal: PropTypes.object
    });

    static propTypes = assign({}, ComposedComponent.propTypes, {

      /**
       * Array of validations to apply to this input
       *
       * @property
       * @type {Array}
       */
      validations: PropTypes.array
    });

    /**
     * A lifecycle method for when the component has re-rendered.
     *
     * @method componentWillReceiveProps
     * @return {void}
     */
    componentWillReceiveProps(nextProps) {
      // call the components super method if it exists
      if (super.componentWillReceiveProps) { super.componentWillReceiveProps(nextProps); }

      // if disabling the field, reset the validation on it
      if (nextProps.disabled && this.messageExists()) {
        this._handleContentChange();
      }

      // if value changes and the input is currently invalid, re-assess its validity
      if (!this._isCurrentlyActiveInput()) {
        if (this.messageExists() && (nextProps.value !== this.props.value)) {
          let contentChanged = false;

          if (!this.state.valid && this.validate(nextProps.value)) {
            this.setState({ valid: true });
            contentChanged = true;
          }

          if (contentChanged) {
            this._handleContentChange();
          }
        }
      }
    }

    /**
     * A lifecycle method for when the component is added to the page.
     *
     * @method componentWillMount
     * @return {void}
     */
    componentWillMount() {
      // call the components super method if it exists
      /* istanbul ignore else */
      if (super.componentWillMount) { super.componentWillMount(); }

      if (this.context.form && this._validations()) {
        // attach the input to the form so the form can track what it needs to validate on submit
        this.context.form.attachToForm(this);
      }
    }

    /**
     * A lifecycle method for when the component is removed from the page.
     *
     * @method componentWillUnmount
     * @return {void}
     */
    componentWillUnmount() {
      // call the components super method if it exists
      /* istanbul ignore else */
      if (super.componentWillUnmount) { super.componentWillUnmount(); }

      if (this._validations()) {
        this._handleContentChange();
        if (this.isAttachedToForm) {
          this.context.form.detachFromForm(this);
        }
      }
    }

    /**
     * Positions the message relative to the icon.
     *
     * @method positionMessage
     * @return {Void}
     */
    positionMessage = () => {
      if (!this.state.valid) {
        // calculate the position for the message relative to the icon
        const icon = this.validationIcon && this.validationIcon._target,
            message = this.validationMessage;

        if (icon && message) {
          message.style.top = `${((icon.getBoundingClientRect().top - message.getBoundingClientRect().height)
                                  + window.pageYOffset)
                                  - (icon.getBoundingClientRect().height)}px`;

          // figure out if the message is positioned offscreen
          const messageScreenPosition = icon.getBoundingClientRect().left + message.getBoundingClientRect().width;
          // change the position if it is offscreen
          const shouldFlip = (Browser.getWindow().innerWidth < messageScreenPosition);
          if (shouldFlip) {
            this.setState({ flipped: true });
            message.style.left = `${(icon.getBoundingClientRect().left - message.getBoundingClientRect().width)
                                    + (icon.getBoundingClientRect().width / 2)}px`;
          } else {
            this.setState({ flipped: false });
            message.style.left = `${icon.getBoundingClientRect().left + (icon.getBoundingClientRect().width / 2)}px`;
          }
        }
      }
    }

    /**
     * Checks for validations and returns boolean defining if field valid.
     *
     * @method validate
     * @return {Boolean} if the field/fields is/are valid
     */
    validate = (value = this.props.value) => {
      let valid = false;

      // if there are no validation, return truthy
      if (!this._validations() || this.props._placeholder) {
        return true;
      }

      // iterate through each validation applied to the input
      for (let i = 0; i < this._validations().length; i++) {
        const validation = this._validations()[i];

        // run this validation
        valid = validation.validate(value, this.props, this.updateValidation);
        this.updateValidation(valid, value, validation);
        // if validation fails
        if (!valid) {
          // a validation has failed, so exit the loop at this point
          break;
        }
      }

      // return the result of the validation
      return valid;
    }

    /**
     * Provides a callback method for validate to support Ajax
     *
     * @method updateValidation
     * @return {Void}
     */
    updateValidation = (valid, value, validation) => {
      debugger
      // if validation fails
      if (!valid) {
        // if input currently thinks it is valid
        if (this.state.valid) {
          // Add validation state to containers e.g. form, tab
          this.addValidationState(valid, validation)
          // tell the input it is invalid
          this.setState({
            errorMessage: validation.message(value, this.props),
            validationType: validation.type,
            valid: false,
          });
        }
      }
    }

    addValidationState = (valid, validation) => {
      for (var key in this.context) {
        const validationContext = this.context[key];
        // Add specific validation attached logic. e.g. isAttachedToForm
        if (validationContext && validationContext.addValidationState) {
          validationContext.addValidationState(valid, validation)
        }
      }
    }

    /**
     * On blur of the input we want to validate the field.
     *
     * @method _handleBlur
     * @return {void}
     */
    _handleBlur = () => {
      if (!this.blockBlur) {
        // use setTimeout to drop in the callstack to ensure value has time to be set
        setTimeout(() => {
          this.validate();

          if (this.state.messageLocked) {
            this.setState({ messageLocked: false });
          }
        }, 0);
      }
    }

    /**
     * On focus of the input.
     *
     * @method _handleFocus
     * @return {void}
     */
    _handleFocus = () => {
      if (!this.state.valid) {
        this.positionMessage();

        if (!this.state.messageLocked) {
          if (this.context.form) {
            this.context.form.setActiveInput(this);
          }
          this.setState({ messageLocked: true });
        }
      }
    }

    /**
     * On content change of the input when we want to reset the validation.
     *
     * @method _handleContentChange
     * @return {void}
     */
    _handleContentChange = () => {
      // if the field is in an invalid state
      if (!this.state.valid) {
        // if there is a form, decrement the error count
        if (this.isAttachedToForm) {
          if (!this.state.valid) {
            this.context.form.decrementErrorCount();
          }
        }

        // if there is tab, remove invalid state
        if (this.context.tab) {
          this.resetTab();
        }

        // reset the error state
        this.setState({
          errorMessage: null, messageShown: false, valid: true
        });
      }
    }


    /**
     * Resets tab error state
     *
     * @method resetTab
     * @return {Void}
     */
    resetTab = () => {
      if (!this.state.valid) {
        this.context.tab.setValidity(true);
      }
    }

    /**
     * does a message exist based on the current state of the input
     *
     * @method messageExist
     * @return {Boolean} whether or not a message exists
     */
    messageExists = () => {
      return !this.state.valid;
    }

    /**
     * sets the state for showing the message
     *
     * @method showMessage
     * @return {void}
     */
    showMessage = () => {
      if (this.messageExists()) {
        this.setState({
          messageShown: true,
          immediatelyHideMessage: false
        }, this.positionMessage);

        if (this.context.form) {
          this.context.form.setActiveInput(this);
        }
      }
    }

    /**
     * sets the state for hiding the message
     *
     * @method hideMessage
     * @return {void}
     */
    hideMessage = () => {
      if (this.messageExists()) {
        this.setState({
          messageShown: false
        });
      }
    }

    /**
     * sets the state for immediately hiding the message
     *
     * @method immediatelyHideMessage
     * @return {void}
     */
    immediatelyHideMessage = () => {
      this.setState({
        messageShown: false,
        immediatelyHideMessage: true
      });
    }

    /**
     * Determines if the input is attached to a form.
     *
     * @method isAttachedToForm
     * @return {Boolean}
     */
    get isAttachedToForm() {
      return this.context.form && this.context.form.inputs[this._guid];
    }

    /**
     * Returns the HTML for the validation, only if it is invalid.
     *
     * @method validationHTML
     * @return {HTML} Validation HTML including icon & message
     */
    get validationHTML() {
      let type = '';
      if (this.state.valid) { return null; }

      debugger
      if (!this.state.valid) {
        type = 'error';
      }

      const iconClasses = `common-input__icon common-input__icon--${type}`;
      const messageClasses = classNames(`common-input__message common-input__message--${type}`, {
        'common-input__message--shown': (this.state.messageLocked || this.state.messageShown),
        'common-input__message--fade': (!this.state.messageLocked && !this.state.messageShown),
        'common-input__message--flipped': this.state.flipped
      });

      // position icon relative to width of label
      let iconStyle = {};

      if (this.props.labelWidth) {
        iconStyle = { [`${this.props.align}`]: `${100 - this.props.labelWidth}%` };
      }

      const errorMessage = (!this.state.immediatelyHideMessage || this.state.messageLocked) && (
        <Portal key='1' onReposition={ this.positionMessage }>
          <div className='common-input__message-wrapper'>
            <div
              ref={ (validationMessage) => {
                this.validationMessage = validationMessage;
              } }
              className={ messageClasses }
            >
              { this.state.errorMessage }
            </div>
          </div>
        </Portal>
      );

      return [
        <Icon
          key='0'
          ref={ (validationIcon) => { this.validationIcon = validationIcon; } }
          type={ type }
          className={ iconClasses }
          style={ iconStyle }
        />,
        errorMessage
      ];
    }

    /**
     * Extends the main classes with any validation classes.
     *
     * @method mainClasses
     * @return {String} Main class names
     */
    get mainClasses() {
      return classNames(super.mainClasses, {
        'common-input--error': !this.state.valid
      });
    }

    /**
     * Extends the input classes with any validation classes.
     *
     * @method inputClasses
     * @return {String} Input class names
     */
    get inputClasses() {
      return classNames(super.inputClasses, {
        'common-input__input--error': !this.state.valid
      });
    }

    /**
     * Extends the input props with onBlur and onFocus events.
     *
     * @method inputProps
     * @return {Object} Input props
     */
    get inputProps() {
      const inputProps = super.inputProps || {};

      inputProps.onFocus = chainFunctions(this._handleFocus, inputProps.onFocus);
      inputProps.onBlur = chainFunctions(this._handleBlur, inputProps.onBlur);
      inputProps.onKeyDown = chainFunctions(this._handleContentChange, inputProps.onKeyDown);
      inputProps.onPaste = chainFunctions(this._handleContentChange, inputProps.onKeyDown);

      return inputProps;
    }

    get fieldProps() {
      const fieldProps = super.fieldProps || {};

      fieldProps.onMouseOut = chainFunctions(this.hideMessage, fieldProps.onMouseOut);
      fieldProps.onMouseOver = chainFunctions(this.showMessage, fieldProps.onMouseOver);

      return fieldProps;
    }

    /**
     * Determines if the currently active input is this input.
     *
     * @method _isCurrentlyActiveInput
     * @return {Boolean}
     */
    _isCurrentlyActiveInput = () => {
      return this.context.form && (this.context.form.getActiveInput() === this);
    }

    /**
     * Merges passed prop validations with internal component validations
     *
     * @method _validations
     * @return {Array} validations
     */
    _validations = () => {
      const validations = (this.props.validations || []).concat(this.props.internalValidations || []);
      return validations.length ? validations : null;
    }
  }

  Component.displayName = ComposedComponent.displayName || ComposedComponent.name;
  return Component;
};

export default InputValidation;
