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
 *  import Form from 'carbon/lib/components/form';
 *
 * Form requires a prop of 'model'. It renders any children components of input type passed to it.
 *
 * In the render method:
 *
 *  <Form model='foo'>
 *    <Textbox />
 *    <Textbox />
 *    <Date />
 *  </Form>
 *
 * @class Form
 * @constructor
 */
class Form extends React.Component {

  static propTypes = {
    /**
     * The model name from the database
     *
     * @property model
     * @type {String}
     */
    model: React.PropTypes.string.isRequired
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

  // Private State for tracking errors
  state = {
    errorCount: 0
  }

  // Object to hold form inputs
  inputs = {
  }

  // Object to hold input grids
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
   * Redirects to the previous page; uses React Router history.
   *
   * @method cancelForm
   */
  cancelForm = () => {
    // history comes from react router
    if (window.history) {
      window.history.back();
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
   * Renders the component.
   *
   * @method render
   */
  render() {
    let errorCount,
        saveClasses = "ui-form__save", cancelClasses = "ui-form__cancel";

    if (this.state.errorCount) {
      errorCount = (
        <span className="ui-form__summary">
          { errors(this.state.errorCount) }
        </span>
      );

      saveClasses += " ui-form__save--invalid";
    }

    return (
      <form onSubmit={ this.handleOnSubmit } { ...this.htmlProps() }>
        { generateCSRFToken() }

        { this.props.children }
        <div className= { cancelClasses }>
          <Button type='button'
            onClick={ this.cancelForm } >
            Cancel
          </Button>
        </div>
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
function generateCSRFToken() {
  let meta = document.getElementsByTagName('meta'),
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
 * @method errors
 */
function errors(count) {
  let errorMessage =  I18n.t("errors.messages.form_summary.errors", {
    defaultValue: {
      one: `There is ${ count } error`,
      other: `There are ${ count } errors`
    },
    count: count
  });

  return errorMessage;
}
