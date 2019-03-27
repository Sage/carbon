import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import I18n from 'i18n-js';
import Serialize from 'form-serialize';
import { kebabCase } from 'lodash';

import CancelButton from './cancel-button';
import FormSummary from './form-summary';
import SaveButton from './save-button';
import AppWrapper from '../app-wrapper';

import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import Browser from '../../utils/helpers/browser';

import { withValidations } from '../validations';
import ElementResize from '../../utils/helpers/element-resize';
import './form.scss';

class Form extends React.Component {
  static propTypes = {

    /**
     * Warning popup shown when trying to navigate away from an edited
     * form if true
     */
    unsavedWarning: PropTypes.bool,

    /**
     * Cancel button is shown if true
     */
    cancel: PropTypes.bool,

    /**
     * Custom function that is called immediately
     * after the form validates
     */
    afterFormValidation: PropTypes.func,

    /**
     * Custom function that is called immediately
     * before the form validates
     */
    beforeFormValidation: PropTypes.func,

    /**
     * Alignment of submit button
     */
    buttonAlign: PropTypes.string,

    /**
     * Determines if the form is in a saving state
     */
    saving: PropTypes.bool,

    /**
     * Enables the sticky footer.
     */
    stickyFooter: PropTypes.bool,

    /**
     * Applies additional padding to the sticky footer, useful to align buttons.
     */
    stickyFooterPadding: PropTypes.string,

    /**
     * If true, will validate the form on mount
     */
    validateOnMount: PropTypes.bool,

    /**
     * If true, will disable the savebutton when clicked
     */
    autoDisable: PropTypes.bool,

    /**
     * Text for the cancel button
     */
    cancelText: PropTypes.string,

    /**
     * Properties for the cancel button
     */
    cancelButtonProps: PropTypes.object,

    /**
     * Text for the save button
     */
    saveText: PropTypes.string,

    /**
     * Properties for the save button
     */
    saveButtonProps: PropTypes.object,

    /**
     * Custom function for Cancel button onClick
     */
    onCancel: PropTypes.func,

    /**
     * Hide or show the save button
     */
    save: PropTypes.bool,

    /**
     * Additional actions rendered next to the save and cancel buttons
     */
    additionalActions: PropTypes.node, // eslint-disable-line react/no-unused-prop-types

    /**
     * Additional actions rendered and aligned left to the save and cancel buttons
     */
    leftAlignedActions: PropTypes.node, // eslint-disable-line react/no-unused-prop-types

    /**
     * Additional actions rendered and aligned right to the save and cancel buttons
     */
    rightAlignedActions: PropTypes.node, // eslint-disable-line react/no-unused-prop-types

    /**
     * Custom callback for when form will submit
     */
    onSubmit: PropTypes.func,

    /**
     * Override Save Button
     */
    customSaveButton: PropTypes.node,

    /**
     * A custom class name for the component.
     */
    className: PropTypes.string,

    /**
     * Child elements
     */
    children: PropTypes.node,

    /**
     * Hide or show the summary
     */
    showSummary: PropTypes.bool
  }

  static defaultProps = {
    buttonAlign: 'right',
    cancel: true,
    unsavedWarning: true,
    save: true,
    saving: false,
    validateOnMount: false,
    customSaveButton: null,
    showSummary: true
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the form component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property form
     * @type {Object}
     */
    form: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object
  }

  state = {
    /**
     * Tracks if the form is clean or dirty, used by unsavedWarning
     *
     * @property isDirty
     * @type {Boolean}
     */
    isDirty: false,

    /**
     * Tracks if the saveButton should be disabled
     *
     * @property saveDisabled
     * @type {Boolean}
     */
    submitted: false

  }

  /**
   * Returns form object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext = () => {
    return {
      form: {
        getActiveInput: this.getActiveInput,
        setIsDirty: this.setIsDirty,
        resetIsDirty: this.resetIsDirty,
        setActiveInput: this.setActiveInput,
        validate: this.validate
      }
    };
  }

  /**
   * Runs once the component has mounted.
   *
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (this.props.stickyFooter) {
      this.addStickyFooterListeners();
    }

    if (this.props.unsavedWarning) {
      this.addUnsavedWarningListener();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stickyFooter && !this.props.stickyFooter) {
      this.addStickyFooterListeners();
    }

    if (!nextProps.stickyFooter && this.props.stickyFooter) {
      this.removeStickyFooterListeners();
    }

    if (nextProps.unsavedWarning && !this.props.unsavedWarning) {
      this.addUnsavedWarningListener();
    }

    if (!nextProps.unsavedWarning && this.props.unsavedWarning) {
      this.removeUnsavedWarningListener();
    }
  }

  componentWillUnmount() {
    if (this.props.stickyFooter) {
      this.removeStickyFooterListeners();
    }

    if (this.props.unsavedWarning) {
      this.removeUnsavedWarningListener();
    }
  }

  /**
   * Gets the current active input.
   *
   * @method getActiveInput
   * @return {Object} the currently active component
   */
  getActiveInput = () => {
    return this.activeInput;
  }

  /**
   * Sets the active input, calling the hide method if the input is
   * different from the last (so as to instantly) switch.
   *
   * @method setActiveInput
   * @param {Input} input sends itself through
   * @return {void}
   */
  setActiveInput = (input) => {
    this.activeInput = input;
  }

  /**
   * Sets the form to Dirty
   *
   * @method setIsDirty
   * @return {void}
   */
  setIsDirty = () => {
    if (!this.state.isDirty) {
      this.setState({ isDirty: true });
    }
  }

  /**
   * Sets the form to Clean
   *
   * @method resetIsDirty
   * @return {void}
   */
  resetIsDirty = () => {
    if (this.state.isDirty) {
      this.setState({ isDirty: false });
    }
  }

  addStickyFooterListeners = () => {
    this.checkStickyFooter();
    ElementResize.addListener(this._form, this.checkStickyFooter);
    this._window.addEventListener('resize', this.checkStickyFooter);
    this._window.addEventListener('scroll', this.checkStickyFooter);
  }

  removeStickyFooterListeners = () => {
    ElementResize.removeListener(this._form, this.checkStickyFooter);
    this._window.removeEventListener('resize', this.checkStickyFooter);
    this._window.removeEventListener('scroll', this.checkStickyFooter);
  }

  checkStickyFooter = () => {
    if (!this._form) { return; }

    let offsetTop = 0,
        element = this._form;

    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }

    const formHeight = (offsetTop + this._form.offsetHeight) - this._window.pageYOffset;

    if (!this.state.stickyFooter && formHeight > this._window.innerHeight) {
      this.setState({ stickyFooter: true });
    } else if (this.state.stickyFooter && formHeight < this._window.innerHeight) {
      this.setState({ stickyFooter: false });
    }
  }

  addUnsavedWarningListener = () => {
    this._window.addEventListener('beforeunload', this.checkIsFormDirty);
  }

  removeUnsavedWarningListener = () => {
    this._window.removeEventListener('beforeunload', this.checkIsFormDirty);
  }

  // This must return undefined for IE and Safari if we don't want a warning
  /* eslint-disable consistent-return */
  checkIsFormDirty = (ev) => {
    if (this.state.isDirty) {
      // Confirmation message is usually overridden by browsers with a similar message
      const confirmationMessage = I18n.t('form.save_prompt',
        { defaultValue: 'Do you want to leave this page? Changes that you made may not be saved.' });
      ev.returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    }
  }
  /* eslint-enable consistent-return */

  /**
   * stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */
  _document = Browser.getDocument();

  /**
   * stores the window - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _window
   * @type {window}
   */
  _window = Browser.getWindow();

  /**
   * Handles submit and runs validation.
   *
   * @method handleOnSubmit
   * @param {Object} ev event
   * @return {void}
   */
  handleOnSubmit = async (ev) => {
    ev.preventDefault();

    if (this.props.autoDisable) {
      this.setState({ submitted: true });
    }

    if (this.props.beforeFormValidation) {
      this.props.beforeFormValidation(ev);
    }

    const valid = await this.props.validate();

    if (this.props.afterFormValidation) {
      this.props.afterFormValidation(ev, valid, this.enableForm);
    }

    if (valid) {
      this.resetIsDirty();
      this.triggerSubmit(ev, valid);
    } else {
      this.setState({ submitted: false });
    }
  }

  triggerSubmit(ev, valid) {
    if (this.props.onSubmit) {
      this.props.onSubmit(ev, valid, this.enableForm);
    } else {
      this._form.submit();
    }
  }

  /**
   * enables a form which has been disabled after being submitted.
   *
   * @method enableForm
   * @return {void}
   */
  enableForm = () => {
    this.setState({ submitted: false });
  }

  /**
   * Serializes the inputs in the form ready for submission via AJAX
   * https://www.npmjs.com/package/form-serialize
   *
   * @method serialize
   * @param {Object} opts options to pass to serialize
   * @return {Object} Serialized object of fields
   */
  serialize = (opts) => {
    return Serialize(this._form, opts);
  }

  /**
   * Separates and returns HTML specific props
   *
   * @method htmlProps
   * @return {Object} props for form element
   */
  htmlProps = () => {
    const { ...props } = validProps(this);
    delete props.onSubmit;
    delete props.isValidating;
    delete props.errorCount;
    delete props.warningCount;
    delete props.infoCount;
    delete props.validate;
    props.className = this.mainClasses;
    return props;
  }

  /**
   * Redirects to the previous page; uses React Router history, or uses modalcancel handler.
   *
   * @method cancelForm
   * @return {void}
   */
  cancelForm = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    } else if (this.context.modal) {
      this.context.modal.onCancel();
    } else {
      // history comes from react router
      if (!this._window.history) {
        throw new Error('History is not defined. This is normally configured by the react router');
      }
      this._window.history.back();
    }
  }

  /**
   * Gets the cancel button for the form
   *
   * @method cancelButton
   * @return {Object} JSX cancel button
   */
  cancelButton = () => {
    if (!this.props.cancel) { return null; }

    const cancelProps = {
      cancelText: this.props.cancelText,
      cancelClick: this.cancelForm,
      ...this.props.cancelButtonProps
    };

    return (
      <CancelButton
        data-element='cancel'
        { ...cancelProps }
      />
    );
  }

  /**
   * Gets any additional actions passed into the form
   *
   * @method additionalActions
   * @return {Object} JSX
   */
  additionalActions = (type) => {
    if (!this.props[type]) { return null; }

    return (
      <div className={ `carbon-form__${kebabCase(type)}` }>
        { this.props[type] }
      </div>
    );
  }

  /**
   * The default Save button for the form
   *
   * @method defaultSaveButton
   * @return {Object} JSX
   */
  defaultSaveButton = () => {
    return (
      <SaveButton
        saveButtonProps={ this.props.saveButtonProps }
        saveText={ this.props.saveText }
        saving={ this.props.isValidating || this.props.saving || this.state.submitted }
      />
    );
  }

  /**
   * Returns a custom save button if passed in
   * the default if not
   *
   * @method saveButton
   * @return {Object} JSX
   */
  saveButton = () => {
    if (!this.props.save) { return null; }

    return this.props.customSaveButton ? this.props.customSaveButton : this.defaultSaveButton();
  }

  /**
   * Returns a form summary
   *
   * @method saveButtonWithSummary
   * @return {Object} JSX
   */
  saveButtonWithSummary = () => {
    return (
      <FormSummary
        className='carbon-form__summary'
        errors={ this.props.errorCount }
        warnings={ this.props.warningCount }
      >
        { this.saveButton() }
      </FormSummary>
    );
  }

  /**
   * Returns the footer for the form
   *
   * @method footer
   * @return {Object} JSX
   */
  formFooter = () => {
    const save = this.props.showSummary ? this.saveButtonWithSummary() : this.saveButton();
    let padding = this.props.stickyFooterPadding;

    if (padding && !padding.match(/px$/)) {
      padding = `${padding}px`;
    }

    return (
      <div className='carbon-form__footer-wrapper'>
        <AppWrapper className={ this.footerClasses } style={ { borderWidth: padding } }>
          { this.additionalActions('leftAlignedActions') }
          { this.additionalActions('rightAlignedActions') }
          { save }
          { this.cancelButton() }
          { this.additionalActions('additionalActions') }
        </AppWrapper>
      </div>
    );
  }

  /**
   * Main class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-form',
      this.props.className, {
        'carbon-form--sticky-footer': this.state.stickyFooter
      }
    );
  }

  /**
   * Button class getter
   *
   * @method buttonClasses
   * @return {String} Main className
   */
  get footerClasses() {
    return classNames(
      'carbon-form__buttons',
      `carbon-form__buttons--${this.props.buttonAlign}`
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX form
   */
  render() {
    return (
      <form
        onSubmit={ this.handleOnSubmit }
        { ...this.htmlProps() }
        ref={ (form) => { this._form = form; } }
        { ...tagComponent('form', this.props) }
      >
        { generateCSRFToken(this._document) }

        { this.props.children }

        { this.formFooter() }
      </form>
    );
  }
}

/**
 * Creates and returns CSRF token for input field
 *
 * @private
 * @method generateCSRFToken
 * @param {Object} doc DOM object
 * @return {Object} JSX hidden CSRF token
 */
function generateCSRFToken(doc) {
  const csrfParam = doc.querySelector('meta[name="csrf-param"]');
  const csrfToken = doc.querySelector('meta[name="csrf-token"]');

  const csrfAttr = csrfParam ? csrfParam.getAttribute('content') : '';
  const csrfValue = csrfToken ? csrfToken.getAttribute('content') : '';

  return (
    <input
      type='hidden' name={ csrfAttr }
      value={ csrfValue } readOnly
    />
  );
}

export default withValidations(Form);
