'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formSerialize = require('form-serialize');

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _lodash = require('lodash');

var _cancelButton = require('./cancel-button');

var _cancelButton2 = _interopRequireDefault(_cancelButton);

var _formSummary = require('./form-summary');

var _formSummary2 = _interopRequireDefault(_formSummary);

var _saveButton = require('./save-button');

var _saveButton2 = _interopRequireDefault(_saveButton);

var _appWrapper = require('./../app-wrapper');

var _appWrapper2 = _interopRequireDefault(_appWrapper);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _browser = require('./../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

var _elementResize = require('./../../utils/helpers/element-resize');

var _elementResize2 = _interopRequireDefault(_elementResize);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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

      /**
       * Returns form object to child components.
       *
       * @method getChildContext
       * @return {void}
       */
    }, _this.getChildContext = function () {
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
    }, _this.addStickyFooterListeners = function () {
      _this.checkStickyFooter();
      _elementResize2.default.addListener(_this._form, _this.checkStickyFooter);
      _this._window.addEventListener('resize', _this.checkStickyFooter);
      _this._window.addEventListener('scroll', _this.checkStickyFooter);
    }, _this.removeStickyFooterListeners = function () {
      _elementResize2.default.removeListener(_this._form, _this.checkStickyFooter);
      _this._window.removeEventListener('resize', _this.checkStickyFooter);
      _this._window.removeEventListener('scroll', _this.checkStickyFooter);
    }, _this.checkStickyFooter = function () {
      var offsetTop = 0,
          element = _this._form;

      while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }

      var formHeight = offsetTop + _this._form.offsetHeight - _this._window.pageYOffset;

      if (!_this.state.stickyFooter && formHeight > _this._window.innerHeight) {
        _this.setState({ stickyFooter: true });
      } else if (_this.state.stickyFooter && formHeight < _this._window.innerHeight) {
        _this.setState({ stickyFooter: false });
      }
    }, _this._document = _browser2.default.getDocument(), _this._window = _browser2.default.getWindow(), _this.activeInputExistsAndHasValidation = function () {
      return _this.activeInput && _this.activeInput.immediatelyHideMessage;
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
          errors += 1;
        }
      }

      if (!valid) {
        _this.setState({ errorCount: errors });
      }

      return valid;
    }, _this.serialize = function (opts) {
      return (0, _formSerialize2.default)(_this._form, opts);
    }, _this.htmlProps = function () {
      var _validProps = (0, _ether.validProps)(_this),
          props = _objectWithoutProperties(_validProps, []);

      delete props.activeInput;
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
    }, _this.cancelButton = function () {
      if (!_this.props.cancel) {
        return null;
      }

      var cancelProps = _extends({
        cancelText: _this.props.cancelText,
        cancelClick: _this.cancelForm
      }, _this.props.cancelButtonProps);

      return _react2.default.createElement(_cancelButton2.default, _extends({
        'data-element': 'cancel'
      }, cancelProps));
    }, _this.additionalActions = function (type) {
      if (!_this.props[type]) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'carbon-form__' + (0, _lodash.kebabCase)(type) },
        _this.props[type]
      );
    }, _this.defaultSaveButton = function () {
      return _react2.default.createElement(_saveButton2.default, {
        saveButtonProps: _this.props.saveButtonProps,
        saveText: _this.props.saveText,
        saving: _this.props.saving
      });
    }, _this.saveButton = function () {
      if (!_this.props.save) {
        return null;
      }

      return _this.props.customSaveButton ? _this.props.customSaveButton : _this.defaultSaveButton();
    }, _this.saveButtonWithSummary = function () {
      return _react2.default.createElement(
        _formSummary2.default,
        {
          className: 'carbon-form__summary',
          errors: _this.state.errorCount,
          warnings: _this.state.warningCount
        },
        _this.saveButton()
      );
    }, _this.formFooter = function () {
      var save = _this.props.showSummary ? _this.saveButtonWithSummary() : _this.saveButton();
      var padding = _this.props.stickyFooterPadding;

      if (padding && !padding.match(/px$/)) {
        padding = padding + 'px';
      }

      return _react2.default.createElement(
        'div',
        { className: 'carbon-form__footer-wrapper' },
        _react2.default.createElement(
          _appWrapper2.default,
          { className: _this.footerClasses, style: { borderWidth: padding } },
          _this.additionalActions('leftAlignedActions'),
          _this.additionalActions('rightAlignedActions'),
          save,
          _this.cancelButton(),
          _this.additionalActions('additionalActions')
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'componentDidMount',


    /**
     * Runs once the component has mounted.
     *
     * @method componentDidMount
     * @return {void}
     */
    value: function componentDidMount() {
      if (this.props.stickyFooter) {
        this.addStickyFooterListeners();
      }

      if (this.props.validateOnMount) {
        this.validate();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.stickyFooter && !this.props.stickyFooter) {
        this.addStickyFooterListeners();
      }

      if (!nextProps.stickyFooter && this.props.stickyFooter) {
        this.removeStickyFooterListeners();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.stickyFooter) {
        this.removeStickyFooterListeners();
      }
    }

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


    /**
     * Gets the cancel button for the form
     *
     * @method cancelButton
     * @return {Object} JSX cancel button
     */


    /**
     * Gets any additional actions passed into the form
     *
     * @method additionalActions
     * @return {Object} JSX
     */


    /**
     * The default Save button for the form
     *
     * @method defaultSaveButton
     * @return {Object} JSX
     */


    /**
     * Returns a custom save button if passed in
     * the default if not
     *
     * @method saveButton
     * @return {Object} JSX
     */


    /**
     * Returns a form summary
     *
     * @method saveButtonWithSummary
     * @return {Object} JSX
     */


    /**
     * Returns the footer for the form
     *
     * @method footer
     * @return {Object} JSX
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
      var _this2 = this;

      return _react2.default.createElement(
        'form',
        _extends({
          onSubmit: this.handleOnSubmit
        }, this.htmlProps(), {
          ref: function ref(form) {
            _this2._form = form;
          }
        }, (0, _tags2.default)('form', this.props)),
        generateCSRFToken(this._document),
        this.props.children,
        this.formFooter()
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
      return (0, _classnames2.default)('carbon-form', this.props.className, {
        'carbon-form--sticky-footer': this.state.stickyFooter
      });
    }

    /**
     * Button class getter
     *
     * @method buttonClasses
     * @return {String} Main className
     */

  }, {
    key: 'footerClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-form__buttons', 'carbon-form__buttons--' + this.props.buttonAlign);
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
   * Cancel button is shown if true
   *
   * @property cancel
   * @type {Boolean}
   * @default true
   */
  cancel: _propTypes2.default.bool,

  /**
   * Custom function that is called immediately
   * after the form validates
   *
   * @property afterFormValidation
   * @type {Function}
   */
  afterFormValidation: _propTypes2.default.func,

  /**
   * Custom function that is called immediately
   * before the form validates
   *
   * @property beforeFormValidation
   * @type {Function}
   */
  beforeFormValidation: _propTypes2.default.func,

  /**
   * Alignment of submit button
   * @ property
   * @type {String}
   */
  buttonAlign: _propTypes2.default.string,

  /**
   * Determines if the form is in a saving state
   *
   * @property saving
   * @type {Boolean}
   * @default false
   */
  saving: _propTypes2.default.bool,

  /**
   * Enables the sticky footer.
   *
   * @property stickyFooter
   * @type {Boolean}
   */
  stickyFooter: _propTypes2.default.bool,

  /**
   * Applies additional padding to the sticky footer, useful to align buttons.
   *
   * @property stickyFooterPadding
   * @type {String}
   */
  stickyFooterPadding: _propTypes2.default.string,

  /**
   * If true, will validate the form on mount
   *
   * @property validateOnMount
   * @type {Boolean}
   * @default false
   */
  validateOnMount: _propTypes2.default.bool,

  /**
   * Text for the cancel button
   *
   * @property cancelText
   * @type {String}
   * @default "Cancel"
   */
  cancelText: _propTypes2.default.string,

  /**
   * Properties for the cancel button
   *
   * @property cancelButtonProps
   * @type {Object}
   */
  cancelButtonProps: _propTypes2.default.object,

  /**
   * Text for the save button
   *
   * @property saveText
   * @type {String}
   * @default "Save"
   */
  saveText: _propTypes2.default.string,

  /**
   * Properties for the save button
   *
   * @property saveButtonProps
   * @type {Object}
   */
  saveButtonProps: _propTypes2.default.object,

  /**
   * Custom function for Cancel button onClick
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _propTypes2.default.func,

  /**
   * Hide or show the save button
   *
   * @property saveFalse
   * @type {Boolean}
   */
  save: _propTypes2.default.bool,

  /**
   * Additional actions rendered next to the save and cancel buttons
   *
   * @property additionalActions
   * @type {String|JSX}
   */
  additionalActions: _propTypes2.default.node, // eslint-disable-line react/no-unused-prop-types

  /**
   * Additional actions rendered and aligned left to the save and cancel buttons
   *
   * @property additionalActions
   * @type {String|JSX}
   */
  leftAlignedActions: _propTypes2.default.node, // eslint-disable-line react/no-unused-prop-types

  /**
   * Additional actions rendered and aligned right to the save and cancel buttons
   *
   * @property additionalActions
   * @type {String|JSX}
   */
  rightAlignedActions: _propTypes2.default.node, // eslint-disable-line react/no-unused-prop-types

  /**
   * Custom callback for when form will submit
   *
   * @property onSubmit
   * @type {Function}
   */
  onSubmit: _propTypes2.default.func,

  /**
   * Override Save Button
   *
   * @property customSaveButton
   * @type {Node}
   */
  customSaveButton: _propTypes2.default.node,

  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * Hide or show the summary
   *
   * @property showSummary
   * @type {Boolean}
   */
  showSummary: _propTypes2.default.bool
};
Form.defaultProps = {
  activeInput: null,
  buttonAlign: 'right',
  cancel: true,
  save: true,
  saving: false,
  validateOnMount: false,
  customSaveButton: null,
  showSummary: true
};
Form.childContextTypes = {
  /**
   * Defines a context object for child components of the form component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property form
   * @type {Object}
   */
  form: _propTypes2.default.object
};
Form.contextTypes = {
  modal: _propTypes2.default.object
};
function generateCSRFToken(doc) {
  var csrfParam = doc.querySelector('meta[name="csrf-param"]');
  var csrfToken = doc.querySelector('meta[name="csrf-token"]');

  var csrfAttr = csrfParam ? csrfParam.getAttribute('content') : '';
  var csrfValue = csrfToken ? csrfToken.getAttribute('content') : '';

  return _react2.default.createElement('input', { type: 'hidden', name: csrfAttr, value: csrfValue, readOnly: 'true' });
}

exports.default = Form;