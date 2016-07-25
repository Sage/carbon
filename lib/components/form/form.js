/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_button = require('./../button');

/*istanbul ignore next*/
var _button2 = _interopRequireDefault(_button);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_formSerialize = require('form-serialize');

/*istanbul ignore next*/
var _formSerialize2 = _interopRequireDefault(_formSerialize);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Form)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._document = document, _this._window = window, _this.getChildContext = function () {
      return {
        form: {
          attachToForm: /*istanbul ignore next*/_this.attachToForm,
          detachFromForm: /*istanbul ignore next*/_this.detachFromForm,
          incrementErrorCount: /*istanbul ignore next*/_this.incrementErrorCount,
          decrementErrorCount: /*istanbul ignore next*/_this.decrementErrorCount,
          incrementWarningCount: /*istanbul ignore next*/_this.incrementWarningCount,
          decrementWarningCount: /*istanbul ignore next*/_this.decrementWarningCount,
          inputs: /*istanbul ignore next*/_this.inputs,
          validate: /*istanbul ignore next*/_this.validate
        }
      };
    }, _this.state = {
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
    }, _this.inputs = {}, _this.incrementErrorCount = function () {
      /*istanbul ignore next*/_this.setState({ errorCount: /*istanbul ignore next*/_this.state.errorCount + 1 });
    }, _this.decrementErrorCount = function () {
      /*istanbul ignore next*/_this.setState({ errorCount: /*istanbul ignore next*/_this.state.errorCount - 1 });
    }, _this.incrementWarningCount = function () {
      /*istanbul ignore next*/_this.setState({ warningCount: /*istanbul ignore next*/_this.state.warningCount + 1 });
    }, _this.decrementWarningCount = function () {
      /*istanbul ignore next*/_this.setState({ warningCount: /*istanbul ignore next*/_this.state.warningCount - 1 });
    }, _this.attachToForm = function (component) {
      /*istanbul ignore next*/_this.inputs[component._guid] = component;
    }, _this.detachFromForm = function (component) {
      delete /*istanbul ignore next*/_this.inputs[component._guid];
    }, _this.handleOnSubmit = function (ev) {
      if ( /*istanbul ignore next*/_this.props.beforeFormValidation) {
        /*istanbul ignore next*/_this.props.beforeFormValidation(ev);
      }

      var valid = /*istanbul ignore next*/_this.validate();

      if (!valid) {
        ev.preventDefault();
      }

      if ( /*istanbul ignore next*/_this.props.afterFormValidation) {
        /*istanbul ignore next*/_this.props.afterFormValidation(ev, valid);
      }
    }, _this.validate = function () {
      var valid = true,
          errors = 0;

      for (var key in /*istanbul ignore next*/_this.inputs) {
        var input = /*istanbul ignore next*/_this.inputs[key];

        if (!input.props.disabled && !input.validate()) {
          valid = false;
          errors++;
        }
      }

      if (!valid) {
        /*istanbul ignore next*/_this.setState({ errorCount: errors });
      }

      return valid;
    }, _this.serialize = function (opts) {
      return (/*istanbul ignore next*/(0, _formSerialize2.default)( /*istanbul ignore next*/_this.refs.form, opts)
      );
    }, _this.htmlProps = function () {
      /*istanbul ignore next*/
      var props = _objectWithoutProperties( /*istanbul ignore next*/_this.props, []);

      props.className = /*istanbul ignore next*/_this.mainClasses;
      return props;
    }, _this.cancelForm = function () {
      if ( /*istanbul ignore next*/_this.props.onCancel) {
        /*istanbul ignore next*/_this.props.onCancel();
      } else if ( /*istanbul ignore next*/_this.context.modal) {
        /*istanbul ignore next*/_this.context.modal.onCancel();
      } else {
        // history comes from react router
        if (! /*istanbul ignore next*/_this._window.history) {
          throw new Error('History is not defined. This is normally configured by the react router');
        }
        /*istanbul ignore next*/_this._window.history.back();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */


  /**
   * stores the window - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _window
   * @type {window}
   */


  /**
   * Returns form object to child components.
   *
   * @method getChildContext
   * @return {void}
   */


  /**
   * Stores references to the inputs in the form
   *
   * @property inputs
   * @type {Object}
   */


  _createClass(Form, [{
    key: 'componentDidMount',


    /**
     * Runs once the component has mounted.
     *
     * @method componentDidMount
     * @return {void}
     */
    value: function componentDidMount() {
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


    /**
     * Decreases the current error count in state by 1.
     *
     * @method decrementErrorCount
     * @return {void}
     */


    /**
     * Increase current warning count in state by 1.
     *
     * @method incrementWarningCount
     * @return {void}
     */


    /**
     * Decreases the current warning count in state by 1.
     *
     * @method decrementWarningCount
     * @return {void}
     */


    /**
     * Attaches child component to form.
     *
     * @method attachToForm
     * @param {Object} component Component to attach
     * @return {void}
     */


    /**
     * Detaches child component from form.
     *
     * @method detachFromFormToForm
     * @param {Object} component Component to detach
     * @return {void}
     */


    /**
     * Handles submit and runs validation.
     *
     * @method handleOnSubmit
     * @param {Object} ev event
     * @return {void}
     */


    /**
     * Validates any inputs in the form which have validations.
     *
     * @method validate
     * @return {Boolean} valid status
     */


    /**
     * Serializes the inputs in the form ready for submission via AJAX
     * https://www.npmjs.com/package/form-serialize
     *
     * @method serialize
     * @param {Object} opts options to pass to serialize
     * @return {Object} Serialized object of fields
     */


    /**
     * Separates and returns HTML specific props
     *
     * @method htmlProps
     * @return {Object} props for form element
     */


    /**
     * Redirects to the previous page; uses React Router history, or uses modalcancel handler.
     *
     * @method cancelForm
     * @return {void}
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX form
     */
    value: function render() {
      var cancelButton = /*istanbul ignore next*/void 0,
          saveButton = /*istanbul ignore next*/void 0;

      if (this.props.cancel) {
        cancelButton = this.cancelButton;
      }

      if (this.props.save) {
        saveButton = this.saveButton;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'form',
          /*istanbul ignore next*/_extends({ onSubmit: this.handleOnSubmit }, this.htmlProps(), { ref: 'form' }),
          generateCSRFToken(this._document),
          this.props.children,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: this.buttonClasses },
            saveButton,
            cancelButton,
            this.additionalActions
          )
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Main class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-form', this.props.className)
      );
    }
  }, {
    key: 'buttonClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-form__buttons', /*istanbul ignore next*/'ui-form__buttons--' + this.props.buttonAlign)
      );
    }

    /**
     * Gets the cancel button for the form
     *
     * @method cancelButton
     * @return {Object} JSX cancel button
     */

  }, {
    key: 'cancelButton',
    get: function get() {
      var cancelClasses = "ui-form__cancel";

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: cancelClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            /*istanbul ignore next*/{ type: 'button', onClick: this.cancelForm },
            this.props.cancelText || /*istanbul ignore next*/_i18nJs2.default.t('actions.cancel', { defaultValue: 'Cancel' })
          )
        )
      );
    }
  }, {
    key: 'additionalActions',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-form__additional-actions' },
          this.props.additionalActions
        )
      );
    }

    /**
     * Gets the save button for the form
     * @method saveButton
     * @return {Object} JSX save button
     */

  }, {
    key: 'saveButton',
    get: function get() {
      var errorCount = /*istanbul ignore next*/void 0;

      var saveClasses = /*istanbul ignore next*/(0, _classnames2.default)("ui-form__save", {
        "ui-form__save--invalid": this.state.errorCount || this.state.warningCount
      });

      if (this.state.errorCount || this.state.warningCount) {
        // set error message (allow for HTML in the message - https://facebook.github.io/react/tips/dangerously-set-inner-html.html)
        errorCount = /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'span', /*istanbul ignore next*/{
          className: 'ui-form__summary',
          dangerouslySetInnerHTML: renderMessage(this.state.errorCount, this.state.warningCount)
        });
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: saveClasses },
          errorCount,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            /*istanbul ignore next*/{ as: 'primary', disabled: this.props.saving },
            this.props.saveText || /*istanbul ignore next*/_i18nJs2.default.t('actions.save', { defaultValue: 'Save' })
          )
        )
      );
    }
  }]);

  return Form;
}( /*istanbul ignore next*/_react2.default.Component);

/**
 * Creates and returns CSRF token for input field
 *
 * @private
 * @method generateCSRFToken
 * @param {Object} doc DOM object
 * @return {Object} JSX hidden CSRF token
 */


/*istanbul ignore next*/Form.propTypes = {

  /**
   * Cancel button is shown if true
   *
   * @property cancel
   * @type {Boolean}
   * @default true
   */
  cancel: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Custom function that is called immediately
   * after the form validates
   *
   * @property afterFormValidation
   * @type {Function}
   */
  afterFormValidation: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Custom function that is called immediately
   * before the form validates
   *
   * @property beforeFormValidation
   * @type {Function}
   */
  beforeFormValidation: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Determines if the form is in a saving state
   *
   * @property saving
   * @type {Boolean}
   * @default false
   */
  saving: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * If true, will validate the form on mount
   *
   * @property validateOnMount
   * @type {Boolean}
   * @default false
   */
  validateOnMount: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Text for the cancel button
   *
   * @property cancelText
   * @type {String}
   * @default "Cancel"
   */
  cancelText: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Text for the save button
   *
   * @property saveText
   * @type {String}
   * @default "Save"
   */
  saveText: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Custom function for Cancel button onClick
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Hide or show the save button
   *
   * @property saveFalse
   * @type {Boolean}
   */
  save: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /* Additional actions rendered next to the save and cancel buttons
  *
  * @property additionalActions
  * @type {String|JSX}
  */
  additionalActions: /*istanbul ignore next*/_react2.default.PropTypes.node
};
/*istanbul ignore next*/Form.defaultProps = {
  buttonAlign: 'right',
  cancel: true,
  save: true,
  saving: false,
  validateOnMount: false
};
/*istanbul ignore next*/Form.childContextTypes = {
  /**
   * Defines a context object for child components of the form component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property form
   * @type {Object}
   */
  form: /*istanbul ignore next*/_react2.default.PropTypes.object
};
/*istanbul ignore next*/Form.contextTypes = {
  modal: /*istanbul ignore next*/_react2.default.PropTypes.object
};
function generateCSRFToken(doc) {
  var meta = doc.getElementsByTagName('meta'),
      csrfAttr = /*istanbul ignore next*/void 0,
      csrfValue = /*istanbul ignore next*/void 0;

  for (var i = 0; i < meta.length; i++) {
    var item = meta[i];

    if (item.getAttribute('name') === 'csrf-param') {
      csrfAttr = item.getAttribute('content');
    } else if (item.getAttribute('name') === 'csrf-token') {
      csrfValue = item.getAttribute('content');
    }
  }

  return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'input', /*istanbul ignore next*/{ type: 'hidden', name: csrfAttr, value: csrfValue, readOnly: 'true' })
  );
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
  var message = /*istanbul ignore next*/void 0;

  if (errors) {
    message = /*istanbul ignore next*/_i18nJs2.default.t("errors.messages.form_summary.errors", {
      defaultValue: {
        one: /*istanbul ignore next*/'There is ' + errors + ' error',
        other: /*istanbul ignore next*/'There are ' + errors + ' errors'
      },
      count: errors
    });
  }

  if (errors && warnings) {
    message += /*istanbul ignore next*/_i18nJs2.default.t("errors.messages.form_summary.errors_and_warnings", {
      defaultValue: {
        one: /*istanbul ignore next*/' and ' + warnings + ' warning',
        other: /*istanbul ignore next*/' and ' + warnings + ' warnings'
      },
      count: warnings
    });
  } else if (warnings) {
    message = /*istanbul ignore next*/_i18nJs2.default.t("errors.messages.form_summary.warnings", {
      defaultValue: {
        one: /*istanbul ignore next*/'There is ' + warnings + ' warning',
        other: /*istanbul ignore next*/'There are ' + warnings + ' warnings'
      },
      count: warnings
    });
  }

  return { __html: message };
}

/*istanbul ignore next*/exports.default = Form;