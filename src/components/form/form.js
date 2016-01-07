import React from 'react';
import Button from './../button';
import I18n from "i18n-js";
import Serialize from "form-serialize";

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
    beforeFormValidation: React.PropTypes.func
  }

  static defaultProps = {
    cancel: true
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
    dialog: React.PropTypes.object
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
        decrementErrorCount: this.decrementErrorCount
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
     * Determines if the form is in a submitting state
     *
     * @property isSubmitting
     * @type {Boolean}
     */
    isSubmitting: false
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
   * Stores references to the tables in the form
   *
   * @property tables
   * @type {Object}
   */
  tables = {
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
   * Attaches child component to form.
   *
   * @method attachToForm
   * @param {Object} component Component to attach
   * @param {Object} options
   * @return {void}
   */
  attachToForm = (component, options = {}) => {
    let name = component.props.name;

    if (options.table) {
      this.tables[name] = component;
    } else {
      this.inputs[name] = component;
    }
  }

  /**
   * Detaches child component from form.
   *
   * @method detachFromFormToForm
   * @param {Object} component Component to detach
   * @param {Object} options
   * @return {void}
   */
  detachFromForm = (component, options = {}) => {
    let name = component.props.name;

    if (options.table) {
      delete this.tables[name];
    } else {
      delete this.inputs[name];
    }
  }

  /**
   * Handles submit, checks for required fields and updates validations.
   *
   * @method handleOnSubmit
   * @param {Object} ev event
   * @return {void}
   */
  handleOnSubmit = (ev) => {
    if (this.props.beforeFormValidation) {
      this.props.beforeFormValidation(ev);
    }

    let valid = true;
    let errors = 0;

    for (let key in this.inputs) {
      let input = this.inputs[key];

      if (!input.validate()) {
        valid = false;
        errors++;
      }
    }

    if (!valid) {
      ev.preventDefault();
      this.setState({ errorCount: errors });
    } else {
      this.setState({ isSubmitting: true });

      for (let tableKey in this.tables) {
        let table = this.tables[tableKey];
        table.setState({ placeholder: false });
      }
    }

    if (this.props.afterFormValidation) {
      this.props.afterFormValidation(ev, valid);
    }
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
    let { ...props } = this.props;
    props.className = this.mainClasses;
    return props;
  }

  /**
   * Redirects to the previous page; uses React Router history, or uses dialog cancel handler.
   *
   * @method cancelForm
   * @return {void}
   */
  cancelForm = () => {
    if (this.context.dialog) {
      this.context.dialog.cancelHandler();
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
    return 'ui-form';
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
        Cancel
      </Button>
    </div>);
  }

   /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX form
   */
  render() {
    let cancelButton,
        errorCount,
        saveClasses = "ui-form__save";

    if (this.state.errorCount) {
      // set error message (allow for HTML in the message - https://facebook.github.io/react/tips/dangerously-set-inner-html.html)
      errorCount = (
        <span className="ui-form__summary" dangerouslySetInnerHTML={ errorMessage(this.state.errorCount) } />
      );

      saveClasses += " ui-form__save--invalid";
    }

    if (this.props.cancel) {
      cancelButton = this.cancelButton;
    }

    return (
      <form onSubmit={ this.handleOnSubmit } { ...this.htmlProps() } ref="form">
        { generateCSRFToken(this._document) }

        { this.props.children }
        { cancelButton }
        <div className={ saveClasses }>
          { errorCount }
          <Button as="primary" disabled={ this.state.isSubmitting }>
            Save
          </Button>
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
 *  Constructs validations error message
 *
 * @private
 * @method errorMessage
 * @param {Integer} count number of errors
 * @return {Object} JSX Error message
 */
function errorMessage(count) {
  let errorMessage =  I18n.t("errors.messages.form_summary.errors", {
    defaultValue: {
      one: `There is ${ count } error`,
      other: `There are ${ count } errors`
    },
    count: count
  });

  return { __html: errorMessage };
}

export default Form;
