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

      /**
       * The properties of the current validation
       * Populated when the input is in a invalid state
       *
       * @property validationProperties
       * @type {Object}
       * @default null
       */
      this.state.validationProperties = null;

      /**
       * The inputs validation message.
       *
       * @property validationMessage
       * @type {String}
       * @default null
       */
      this.state.validationMessage = null;

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
        if (this.context.form && this.context.form.validationAttached(this._guid)) {
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
     * Checks for blocking validations and returns boolean defining if field valid.
     * Blocking validations would for example stop the saving of a form
     *
     * @method validate
     * @return {Boolean} if the field/fields is/are valid
     */
    validateBlockingValidations = () => {
      // if there are no validation, return truthy
      if (!this._validations() || this.props._placeholder) {
        return true;
      }

      const validations = this._validations().reduce((accum, validation) => {
        if (validation.properties.blocking) { accum.push(validation); }
        return accum;
      }, []);

      // If there are not blocking validations, return truthy
      if (validations.length < 1) { return true; }
      return this.validate(this.props.value, validations);
    }

    /**
     * Checks for validations and returns boolean defining if field valid.
     *
     * @method validate
     * @return {Boolean} if the field/fields is/are valid
     */
    validate = (value = this.props.value, validations = this._validations()) => {
      let valid = false;

      // if there are no validation, return truthy
      if (!validations || this.props._placeholder) {
        return true;
      }

      // iterate through each validation applied to the input
      for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];

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
      // if validation fails
      if (!valid) {
        // if input currently thinks it is valid
        if (this.state.valid) {
          // Add validation state to containers e.g. form, tab
          this.addValidationState(valid, validation.properties)
          // tell the input it is invalid
          this.setState({
            validationMessage: validation.message(value, this.props),
            validationProperties: validation.properties,
            valid: false,
          });
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
      // Always remove validation state when content changes.
      // Individual context can decide what to do in a particular valid/invalid state
      this.removeValidationState(this.state.valid, this.state.validationProperties);

      // if the field is in an invalid state
      if (!this.state.valid) {
        // reset the validation state
        this.setState({
          validationMessage: null,
          messageShown: false,
          validationProperties: null,
          valid: true
        });
      }
    }

    addValidationState = (valid, validation) => {
      this.handleValidationStateChange((context) => {
        context.addValidationState(valid, validation)
      })
    }

    removeValidationState = (valid, validationProperties) => {
      this.handleValidationStateChange((context) => {
        context.removeValidationState(valid, validationProperties)
      })
    }

    handleValidationStateChange = (action) => {
      for (var key in this.context) {
        const validationContext = this.context[key];
        if (validationContext && validationContext.validationAttached(this._guid)) {
          action(validationContext)
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
     * Returns the HTML for the validation, only if it is invalid.
     *
     * @method validationHTML
     * @return {HTML} Validation HTML including icon & message
     */
    get validationHTML() {
      let type = '';
      if (this.state.valid) { return null; }

      type = this.state.validationProperties.key

      const baseIconClass = `common-input__icon`;
      const iconClasses = classNames(`${baseIconClass} ${baseIconClass}--${type}`, {
        [`${baseIconClass}--${this.state.validationProperties.classModifier}`]: this.state.validationProperties.className
      });

      const baseMessageClass = 'common-input__message';
      const messageClasses = classNames(`${baseMessageClass} ${baseMessageClass}--${type}`, {
        [`${baseMessageClass}--shown`]: (this.state.messageLocked || this.state.messageShown),
        [`${baseMessageClass}--fade`]: (!this.state.messageLocked && !this.state.messageShown),
        [`${baseMessageClass}--flipped`]: this.state.flipped,
        [`${baseMessageClass}--${this.state.validationProperties.classModifier}`]: this.state.validationProperties.className
      });

      // position icon relative to width of label
      let iconStyle = {};

      if (this.props.labelWidth) {
        iconStyle = { [`${this.props.align}`]: `${100 - this.props.labelWidth}%` };
      }

      const validationMessage = (!this.state.immediatelyHideMessage || this.state.messageLocked) && (
        <Portal key='1' onReposition={ this.positionMessage }>
          <div className='common-input__message-wrapper'>
            <div
              ref={ (validationMessage) => {
                this.validationMessage = validationMessage;
              } }
              className={ messageClasses }
            >
              { this.state.validationMessage }
            </div>
          </div>
        </Portal>
      );

      return [
        <Icon
          key='0'
          ref={ (validationIcon) => { this.validationIcon = validationIcon; } }
          type={ this.state.validationProperties.icon }
          className={ iconClasses }
          style={ iconStyle }
        />,
        validationMessage
      ];
    }

    /**
     * Extends the main classes with any validation classes.
     *
     * @method mainClasses
     * @return {String} Main class names
     */
    get mainClasses() {
      const validationProperties = this.state.validationProperties ? this.state.validationProperties.key : 'error'
      return classNames(super.mainClasses, {
        [`common-input--${ validationProperties }`]: !this.state.valid
      });
    }

    /**
     * Extends the input classes with any validation classes.
     *
     * @method inputClasses
     * @return {String} Input class names
     */
    get inputClasses() {
      const validationProperties = this.state.validationProperties ? this.state.validationProperties.key : 'error'
      return classNames(super.inputClasses, {
        [`common-input__input--${ validationProperties }`]: !this.state.valid
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
