import React from 'react';
import Button from './../button';
import I18n from "i18n-js";
import Serialize from "form-serialize";
import classNames from 'classnames';

/**
 * A Form widget.
 *
 * == How to use a Form in a component:
 *
 * In your file
 *
 *   import Form from 'carbon/lib/components/form';
 *
 * To render a Form:
 *
 *   <Form>
 *     <Textbox />
 *     <Textbox />
 *     <Date />
 *   </Form>
 *
 * Form provides the ability to hook into the form handle submission method.
 * By passing afterFormValidation or beforeFormValidation you can add custom
 * validation logic and prevent the form submission using ev.preventDefault()
 *
 * @class Form
 * @constructor
 */
class Form extends React.Component {

  /**
   * stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */
  _document = document;

  /**
   * stores the window - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _window
   * @type {window}
   */
  _window = window;

  static propTypes = {

    /**
     * Cancel button is shown if true
     *
     * @property cancel
     * @type {Boolean}
     * @default true
     */
    cancel: React.PropTypes.bool,

    /**
     * Custom function that is called immediately
     * after the form validates
     *
     * @property afterFormValidation
     * @type {Function}
     */
    afterFormValidation: React.PropTypes.func,

    /**
     * Custom function that is called immediately
     * before the form validates
     *
     * @property beforeFormValidation
     * @type {Function}
     */
    beforeFormValidation: React.PropTypes.func,

    /**
     * Determines if the form is in a saving state
     *
     * @property saving
     * @type {Boolean}
     * @default false
     */
    saving: React.PropTypes.bool,

    /**
     * If true, will validate the form on mount
     *
     * @property validateOnMount
     * @type {Boolean}
     * @default false
     */
    validateOnMount: React.PropTypes.bool,

    /**
     * Text for the cancel button
     *
     * @property cancelText
     * @type {String}
     * @default "Cancel"
     */
    cancelText: React.PropTypes.string,

    /**
     * Text for the save button
     *
     * @property saveText
     * @type {String}
     * @default "Save"
     */
    saveText: React.PropTypes.string,

    /**
     * Custom function for Cancel button onClick
     *
     * @property onCancel
     * @type {Function}
     */
    onCancel: React.PropTypes.func,

    /**
     * Hide or show the save button
     *
     * @property saveFalse
     * @type {Boolean}
     */
    save: React.PropTypes.bool,

    /**
     * Additional actions rendered next to the save and cancel buttons
     *
     * @property additionalActions
     * @type {String|JSX}
     */
    additionalActions: React.PropTypes.node,

    /**
     * Custom callback for when form will submit
     *
     * @property onSubmit
     * @type {Function}
     */
    onSubmit: React.PropTypes.func
  }

  static defaultProps = {
    buttonAlign: 'right',
    cancel: true,
    save: true,
    saving: false,
    validateOnMount: false
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the form component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property form
     * @type {Object}
     */
    form: React.PropTypes.object
  }

  static contextTypes = {
    modal: React.PropTypes.object
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
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        incrementErrorCount: this.incrementErrorCount,
        decrementErrorCount: this.decrementErrorCount,
        incrementWarningCount: this.incrementWarningCount,
        decrementWarningCount: this.decrementWarningCount,
        inputs: this.inputs,
        validate: this.validate
      }
    };
  }

  state = {
    /**
     * Tracks the number of errors in the form
     *
     * @property errorCount
     * @type {Number}
     */
    errorCount: 0,

    /**
     * Tracks the number of warnings in the form
     *
     * @property warningCount
     * @type {Number}
     */
    warningCount: 0
  }

  /**
   * Stores references to the inputs in the form
   *
   * @property inputs
   * @type {Object}
   */
  inputs = {
  }

  /**
   * Runs once the component has mounted.
   *
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (this.props.validateOnMount) {
      this.validate();
    }
  }

  /**
   * Increase current error count in state by 1.
   *
   * @method incrementErrorCount
   * @return {void}
   */
  incrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount + 1 });
  }

  /**
   * Decreases the current error count in state by 1.
   *
   * @method decrementErrorCount
   * @return {void}
   */
  decrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount - 1 });
  }

  /**
   * Increase current warning count in state by 1.
   *
   * @method incrementWarningCount
   * @return {void}
   */
  incrementWarningCount = () => {
    this.setState({ warningCount: this.state.warningCount + 1 });
  }

  /**
   * Decreases the current warning count in state by 1.
   *
   * @method decrementWarningCount
   * @return {void}
   */
  decrementWarningCount = () => {
    this.setState({ warningCount: this.state.warningCount - 1 });
  }

  /**
   * Attaches child component to form.
   *
   * @method attachToForm
   * @param {Object} component Component to attach
   * @return {void}
   */
  attachToForm = (component) => {
    this.inputs[component._guid] = component;
  }

  /**
   * Detaches child component from form.
   *
   * @method detachFromFormToForm
   * @param {Object} component Component to detach
   * @return {void}
   */
  detachFromForm = (component) => {
    delete this.inputs[component._guid];
  }

  /**
   * Handles submit and runs validation.
   *
   * @method handleOnSubmit
   * @param {Object} ev event
   * @return {void}
   */
  handleOnSubmit = (ev) => {
    if (this.props.beforeFormValidation) {
      this.props.beforeFormValidation(ev);
    }

    let valid = this.validate();

    if (!valid) { ev.preventDefault(); }

    if (this.props.afterFormValidation) {
      this.props.afterFormValidation(ev, valid);
    }

    if (valid && this.props.onSubmit) {
      this.props.onSubmit(ev);
    }
  }

  /**
   * Validates any inputs in the form which have validations.
   *
   * @method validate
   * @return {Boolean} valid status
   */
  validate = () => {
    let valid = true,
        errors = 0;

    for (let key in this.inputs) {
      let input = this.inputs[key];

      if (!input.props.disabled && !input.validate()) {
        valid = false;
        errors++;
      }
    }

    if (!valid) { this.setState({ errorCount: errors }); }

    return valid;
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
    return Serialize(this.refs.form, opts);
  }

  /**
   * Separates and returns HTML specific props
   *
   * @method htmlProps
   * @return {Object} props for form element
   */
  htmlProps = () => {
    let { onSubmit, ...props } = this.props;
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
   * Main class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'ui-form',
      this.props.className
    );
  }

  get buttonClasses() {
    return classNames(
      'ui-form__buttons',
      `ui-form__buttons--${ this.props.buttonAlign }`
    );
  }

  /**
   * Gets the cancel button for the form
   *
   * @method cancelButton
   * @return {Object} JSX cancel button
   */
  get cancelButton() {
    let cancelClasses = "ui-form__cancel";

    return (<div className={ cancelClasses }>
      <Button type='button' onClick={ this.cancelForm } >
        { this.props.cancelText || I18n.t('actions.cancel', { defaultValue: 'Cancel' }) }
      </Button>
    </div>);
  }

  get additionalActions() {
    return (
      <div className='ui-form__additional-actions' >
        { this.props.additionalActions }
      </div>
    );
  }

  /**
   * Gets the save button for the form
   * @method saveButton
   * @return {Object} JSX save button
   */
  get saveButton() {
    let errorCount;

    let saveClasses = classNames(
      "ui-form__save",
        {
          "ui-form__save--invalid": this.state.errorCount || this.state.warningCount
        }
    );

    if (this.state.errorCount || this.state.warningCount) {
      // set error message (allow for HTML in the message - https://facebook.github.io/react/tips/dangerously-set-inner-html.html)
      errorCount = (
        <span
          className="ui-form__summary"
          dangerouslySetInnerHTML={ renderMessage(this.state.errorCount, this.state.warningCount) }
        />
      );
    }

    return (
      <div className={ saveClasses }>
        { errorCount }
        <Button as="primary" disabled={ this.props.saving }>
          { this.props.saveText || I18n.t('actions.save', { defaultValue: 'Save' }) }
        </Button>
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX form
   */
  render() {
    let cancelButton, saveButton;

    if (this.props.cancel) {
      cancelButton = this.cancelButton;
    }

    if (this.props.save) {
      saveButton = this.saveButton;
    }

    return (
      <form onSubmit={ this.handleOnSubmit } { ...this.htmlProps() } ref="form">
        { generateCSRFToken(this._document) }

        { this.props.children }

        <div className={ this.buttonClasses }>
          { saveButton }
          { cancelButton }
          { this.additionalActions }
        </div>
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
  let meta = doc.getElementsByTagName('meta'),
      csrfAttr,
      csrfValue;

  for (var i = 0; i < meta.length; i++) {
    var item = meta[i];

    if (item.getAttribute('name') === 'csrf-param') {
      csrfAttr = item.getAttribute('content');
    } else if (item.getAttribute('name') === 'csrf-token') {
      csrfValue = item.getAttribute('content');
    }
  }

  return <input type="hidden" name={ csrfAttr } value={ csrfValue } readOnly="true" />;
}

/**
 * Constructs validations error message
 *
 * @private
 * @method renderMessage
 * @param {Integer} count number of errors
 * @param {Integer} count number of warnings
 * @return {Object} JSX Error message
 */
function renderMessage(errors, warnings) {
  let message;

  if (errors) {
    message =  I18n.t("errors.messages.form_summary.errors", {
      defaultValue: {
        one: `There is ${ errors } error`,
        other: `There are ${ errors } errors`
      },
      count: errors
    });
  }

  if (errors && warnings) {
    message +=  I18n.t("errors.messages.form_summary.errors_and_warnings", {
      defaultValue: {
        one: ` and ${ warnings } warning`,
        other: ` and ${ warnings } warnings`
      },
      count: warnings
    });
  } else if (warnings) {
    message =  I18n.t("errors.messages.form_summary.warnings", {
      defaultValue: {
        one: `There is ${ warnings } warning`,
        other: `There are ${ warnings } warnings`
      },
      count: warnings
    });
  }

  return { __html: message };
}

export default Form;
