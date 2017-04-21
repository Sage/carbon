'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _formSerialize = require('form-serialize');

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _formSummary = require('./form-summary');

var _formSummary2 = _interopRequireDefault(_formSummary);

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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this._document = document, _this._window = window, _this.getChildContext = function () {
      return {
        form: {
          attachToForm: _this.attachToForm,
          detachFromForm: _this.detachFromForm,
          getActiveInput: _this.getActiveInput,
          incrementErrorCount: _this.incrementErrorCount,
          decrementErrorCount: _this.decrementErrorCount,
          incrementWarningCount: _this.incrementWarningCount,
          decrementWarningCount: _this.decrementWarningCount,
          inputs: _this.inputs,
          setActiveInput: _this.setActiveInput,
          validate: _this.validate
        }
      };
    }, _this.getActiveInput = function () {
      return _this.activeInput;
    }, _this.setActiveInput = function (input) {
      if (input !== _this.activeInput && _this.activeInputExistsAndHasValidation()) {
        _this.activeInput.immediatelyHideMessage();
      }
      _this.activeInput = input;
    }, _this.activeInputExistsAndHasValidation = function () {
      return _this.activeInput && _this.activeInput.immediatelyHideMessage;
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
    }, _this.inputs = {}, _this.errorCount = 0, _this.warningCount = 0, _this.incrementErrorCount = function () {
      _this.errorCount += 1;
      _this.setState({ errorCount: _this.errorCount });
    }, _this.decrementErrorCount = function () {
      _this.errorCount -= 1;
      _this.setState({ errorCount: _this.errorCount });
    }, _this.incrementWarningCount = function () {
      _this.warningCount += 1;
      _this.setState({ warningCount: _this.warningCount });
    }, _this.decrementWarningCount = function () {
      _this.warningCount -= 1;
      _this.setState({ warningCount: _this.warningCount });
    }, _this.attachToForm = function (component) {
      _this.inputs[component._guid] = component;
    }, _this.detachFromForm = function (component) {
      delete _this.inputs[component._guid];
    }, _this.handleOnSubmit = function (ev) {
      if (_this.props.beforeFormValidation) {
        _this.props.beforeFormValidation(ev);
      }

      var valid = _this.validate();

      if (!valid) {
        ev.preventDefault();
      }

      if (_this.props.afterFormValidation) {
        _this.props.afterFormValidation(ev, valid);
      }

      if (valid && _this.props.onSubmit) {
        _this.props.onSubmit(ev);
      }
    }, _this.validate = function () {
      var valid = true,
          errors = 0;

      for (var key in _this.inputs) {
        var input = _this.inputs[key];

        if (!input.props.disabled && !input.validate()) {
          valid = false;
          errors++;
        }
      }

      if (!valid) {
        _this.setState({ errorCount: errors });
      }

      return valid;
    }, _this.serialize = function (opts) {
      return (0, _formSerialize2.default)(_this.refs.form, opts);
    }, _this.htmlProps = function () {
      var props = _objectWithoutProperties(_this.props, []);

      delete props.onSubmit;
      props.className = _this.mainClasses;
      return props;
    }, _this.cancelForm = function () {
      if (_this.props.onCancel) {
        _this.props.onCancel();
      } else if (_this.context.modal) {
        _this.context.modal.onCancel();
      } else {
        // history comes from react router
        if (!_this._window.history) {
          throw new Error('History is not defined. This is normally configured by the react router');
        }
        _this._window.history.back();
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
   * Gets the current active input.
   *
   * @method getActiveInput
   * @return {Object} the currently active component
   */


  /**
   * Sets the active input, calling the hide method if the input is
   * different from the last (so as to instantly) switch.
   *
   * @method setActiveInput
   * @param {Input} input sends itself through
   * @return {void}
   */


  /**
   * @method activeInputHasValidation
   * @param {}
   * @return {Boolean} active input exists and is decorated with validation
   */


  /**
   * Stores references to the inputs in the form
   *
   * @property inputs
   * @type {Object}
   */


  /**
   * Tracks current errorCount
   * Need to track separately from state due to async nature of setState
   *
   * @property errorCount
   * @type {Number}
   */


  /**
   * Tracks current warningCount
   * Need to track separately from state due to async nature of setState
   *
   * @property errorCount
   * @type {Number}
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
      var cancelButton = void 0,
          saveButton = void 0;

      if (this.props.cancel) {
        cancelButton = this.cancelButton;
      }

      if (this.props.save) {
        saveButton = this.saveButton;
      }

      return _react2.default.createElement(
        'form',
        _extends({ onSubmit: this.handleOnSubmit }, this.htmlProps(), { ref: 'form' }),
        generateCSRFToken(this._document),
        this.props.children,
        _react2.default.createElement(
          'div',
          { className: this.buttonClasses },
          saveButton,
          cancelButton,
          this.additionalActions
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
      return (0, _classnames2.default)('carbon-form', this.props.className);
    }
  }, {
    key: 'buttonClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-form__buttons', 'carbon-form__buttons--' + this.props.buttonAlign);
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
      var cancelClasses = "carbon-form__cancel",
          cancelProps = (0, _lodash.assign)({}, this.props.cancelButtonProps, { type: 'button', onClick: this.cancelForm });

      return _react2.default.createElement(
        'div',
        { className: cancelClasses },
        _react2.default.createElement(
          _button2.default,
          cancelProps,
          this.props.cancelText || _i18nJs2.default.t('actions.cancel', { defaultValue: 'Cancel' })
        )
      );
    }
  }, {
    key: 'additionalActions',
    get: function get() {
      if (!this.props.additionalActions) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'carbon-form__additional-actions' },
        this.props.additionalActions
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
      var saveClasses = (0, _classnames2.default)("carbon-form__save", {
        "carbon-form__save--invalid": this.state.errorCount || this.state.warningCount
      }),
          saveProps = (0, _lodash.assign)({}, this.props.saveButtonProps, { as: 'primary', disabled: this.props.saving });

      return _react2.default.createElement(
        'div',
        { className: saveClasses },
        _react2.default.createElement(_formSummary2.default, { errors: this.state.errorCount, warnings: this.state.warningCount }),
        _react2.default.createElement(
          _button2.default,
          saveProps,
          this.props.saveText || _i18nJs2.default.t('actions.save', { defaultValue: 'Save' })
        )
      );
    }
  }]);

  return Form;
}(_react2.default.Component);

/**
 * Creates and returns CSRF token for input field
 *
 * @private
 * @method generateCSRFToken
 * @param {Object} doc DOM object
 * @return {Object} JSX hidden CSRF token
 */


Form.propTypes = {
  /**
   * currently active input which is used to track which error message to show on the form
   *
   * @property activeInput
   * @type {Input}
   * @default null
   */
  activeInput: _react2.default.PropTypes.element,

  /**
   * Cancel button is shown if true
   *
   * @property cancel
   * @type {Boolean}
   * @default true
   */
  cancel: _react2.default.PropTypes.bool,

  /**
   * Custom function that is called immediately
   * after the form validates
   *
   * @property afterFormValidation
   * @type {Function}
   */
  afterFormValidation: _react2.default.PropTypes.func,

  /**
   * Custom function that is called immediately
   * before the form validates
   *
   * @property beforeFormValidation
   * @type {Function}
   */
  beforeFormValidation: _react2.default.PropTypes.func,

  /**
   * Determines if the form is in a saving state
   *
   * @property saving
   * @type {Boolean}
   * @default false
   */
  saving: _react2.default.PropTypes.bool,

  /**
   * If true, will validate the form on mount
   *
   * @property validateOnMount
   * @type {Boolean}
   * @default false
   */
  validateOnMount: _react2.default.PropTypes.bool,

  /**
   * Text for the cancel button
   *
   * @property cancelText
   * @type {String}
   * @default "Cancel"
   */
  cancelText: _react2.default.PropTypes.string,

  /**
   * Properties for the cancel button
   *
   * @property cancelButtonProps
   * @type {Object}
   */
  cancelButtonProps: _react2.default.PropTypes.object,

  /**
   * Text for the save button
   *
   * @property saveText
   * @type {String}
   * @default "Save"
   */
  saveText: _react2.default.PropTypes.string,

  /**
   * Properties for the save button
   *
   * @property saveButtonProps
   * @type {Object}
   */
  saveButtonProps: _react2.default.PropTypes.object,

  /**
   * Custom function for Cancel button onClick
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _react2.default.PropTypes.func,

  /**
   * Hide or show the save button
   *
   * @property saveFalse
   * @type {Boolean}
   */
  save: _react2.default.PropTypes.bool,

  /**
   * Additional actions rendered next to the save and cancel buttons
   *
   * @property additionalActions
   * @type {String|JSX}
   */
  additionalActions: _react2.default.PropTypes.node,

  /**
   * Custom callback for when form will submit
   *
   * @property onSubmit
   * @type {Function}
   */
  onSubmit: _react2.default.PropTypes.func
};
Form.defaultProps = {
  activeInput: null,
  buttonAlign: 'right',
  cancel: true,
  save: true,
  saving: false,
  validateOnMount: false
};
Form.childContextTypes = {
  /**
   * Defines a context object for child components of the form component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property form
   * @type {Object}
   */
  form: _react2.default.PropTypes.object
};
Form.contextTypes = {
  modal: _react2.default.PropTypes.object
};
function generateCSRFToken(doc) {
  var meta = doc.getElementsByTagName('meta'),
      csrfAttr = void 0,
      csrfValue = void 0;

  for (var i = 0; i < meta.length; i++) {
    var item = meta[i];

    if (item.getAttribute('name') === 'csrf-param') {
      csrfAttr = item.getAttribute('content');
    } else if (item.getAttribute('name') === 'csrf-token') {
      csrfValue = item.getAttribute('content');
    }
  }

  return _react2.default.createElement('input', { type: 'hidden', name: csrfAttr, value: csrfValue, readOnly: 'true' });
}

exports.default = Form;