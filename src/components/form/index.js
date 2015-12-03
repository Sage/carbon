import React from 'react';
import Button from './../button';
import I18n from "i18n-js";

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
 * Optionally, you can pass a model name to the form. The form will use this name
 * to modify its inputs names. For example, a form with a model name of 'foo' and
 * an input with a name of 'bar', the inputs name will get modified to be 'foo[bar]'.
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
     * The model name from the database (this will be used to manipulate input names in the form)
     *
     * @property model
     * @type {String}
     */
    model: React.PropTypes.string,

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
   */
  getChildContext = () => {
    return {
      form: {
        attachToForm: this.attachToForm,
        detachFromForm: this.detachFromForm,
        incrementErrorCount: this.incrementErrorCount,
        decrementErrorCount: this.decrementErrorCount,
        model: this.props.model
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
    errorCount: 0
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
   */
  incrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount + 1 });
  }

  /**
   * Decreases the current error count in state by 1.
   *
   * @method decrementErrorCount
   */
  decrementErrorCount = () => {
    this.setState({ errorCount: this.state.errorCount - 1 });
  }

  /**
   * Attaches child component to form.
   *
   * @method attachToForm
   * @param {Object} component
   */
  attachToForm = (component) => {
    let namespace = component.props.namespace;
    let row_id    = component.props.row_id;
    let name      = component.props.name;

    if (component.constructor.name === "InputGrid") {
      this.tables[name] = component;
    } else if (namespace && row_id) {
      if (!this.inputs[namespace]) {
        this.inputs[namespace] = {};
      }

      if (!this.inputs[namespace][row_id]) {
        this.inputs[namespace][row_id] = {};
      }

      this.inputs[namespace][row_id][name] = component;
    } else {
      this.inputs[name] = component;
    }
  }

  /**
   * Detaches child component from form.
   *
   * @method detachFromFormToForm
   * @param {Object} component
   */
  detachFromForm = (component) => {
    let namespace = component.props.namespace;
    let row_id    = component.props.row_id;
    let name      = component.props.name;

    if (component.constructor.name === "InputGrid") {
      delete this.tables[name];
    } else if (namespace && row_id) {
      delete this.inputs[namespace][row_id][name];
    } else {
      delete this.inputs[name];
    }
  }

  /**
   * Handles submit, checks for required fields and updates validations.
   *
   * @method handleOnSubmit
   * @param {Object} ev event
   */
  handleOnSubmit = (ev) => {
    if (this.props.beforeFormValidation) {
      this.props.beforeFormValidation(ev);
    }

    let valid = true;
    let errors = 0;

    for (let key in this.inputs) {
      let input = this.inputs[key];

      if (typeof input.props !== 'undefined') {
        if (!input.validate()) {
          valid = false;
          errors++;
        }
      } else {
        for (let id in input) {
          let row = input[id];

          for (let rowField in row) {
            let rowInput = row[rowField];

            if (rowInput.props._placeholder) {
              continue;
            }

            if (!rowInput.validate()) {
              valid = false;
              errors++;
            }
          }
        }
      }
    }

    this.setState({ errorCount: errors });

    if (!valid) {
      ev.preventDefault();
    } else {
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
   * Separates and returns HTML specific props
   *
   * @method htmlProps
   */
  htmlProps = () => {
    let { model, ...props } = this.props;
    props.className = this.mainClasses;
    return props;
  }

  /**
   * Redirects to the previous page; uses React Router history, or uses dialog cancel handler.
   *
   * @method cancelForm
   */
  cancelForm = () => {
    if (this.context.dialog) {
      this.context.dialog.cancelDialogHandler();
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
   */
  get mainClasses() {
    return 'ui-form';
  }

  /**
   * Gets the cancel button for the form
   *
   * @method cancelButton
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
   */
  render() {
    let cancelButton,
        errorCount,
        saveClasses = "ui-form__save";

    if (this.state.errorCount) {
      errorCount = (
        <span className="ui-form__summary">
          { errorMessage(this.state.errorCount) }
        </span>
      );

      saveClasses += " ui-form__save--invalid";
    }

    if (this.props.cancel) {
      cancelButton = this.cancelButton;
    }

    return (
      <form onSubmit={ this.handleOnSubmit } { ...this.htmlProps() }>
        { generateCSRFToken(this._document) }

        { this.props.children }
        { cancelButton }
        <div className={ saveClasses }>
          { errorCount }
          <Button as="primary">
            Save
          </Button>
        </div>
      </form>
    );
  }
}

export default Form;

/**
 * Creates and returns CSRF token for input field
 *
 * @private
 * @method generateCSRFToken
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
 */
function errorMessage(count) {
  let errorMessage =  I18n.t("errors.messages.form_summary.errors", {
    defaultValue: {
      one: `There is ${ count } error`,
      other: `There are ${ count } errors`
    },
    count: count
  });

  return errorMessage;
}
