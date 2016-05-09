'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _i18nJs = require("i18n-js");

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _formSerialize = require("form-serialize");

var _formSerialize2 = _interopRequireDefault(_formSerialize);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _this = this;

    _classCallCheck(this, Form);

    _get(Object.getPrototypeOf(Form.prototype), 'constructor', this).apply(this, arguments);

    this._document = document;
    this._window = window;

    this.getChildContext = function () {
      return {
        form: {
          attachToForm: _this.attachToForm,
          detachFromForm: _this.detachFromForm,
          incrementErrorCount: _this.incrementErrorCount,
          decrementErrorCount: _this.decrementErrorCount,
          inputs: _this.inputs,
          validate: _this.validate
        }
      };
    };

    this.state = {
      /**
       * Tracks the number of errors in the form
       *
       * @property errorCount
       * @type {Number}
       */
      errorCount: 0
    };
    this.inputs = {};

    this.incrementErrorCount = function () {
      _this.setState({ errorCount: _this.state.errorCount + 1 });
    };

    this.decrementErrorCount = function () {
      _this.setState({ errorCount: _this.state.errorCount - 1 });
    };

    this.attachToForm = function (component) {
      _this.inputs[component._guid] = component;
    };

    this.detachFromForm = function (component) {
      delete _this.inputs[component._guid];
    };

    this.handleOnSubmit = function (ev) {
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
    };

    this.validate = function () {
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
    };

    this.serialize = function (opts) {
      return (0, _formSerialize2['default'])(_this.refs.form, opts);
    };

    this.htmlProps = function () {
      var props = _objectWithoutProperties(_this.props, []);

      props.className = _this.mainClasses;
      return props;
    };

    this.cancelForm = function () {
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
    };
  }

  /**
   * Creates and returns CSRF token for input field
   *
   * @private
   * @method generateCSRFToken
   * @param {Object} doc DOM object
   * @return {Object} JSX hidden CSRF token
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
  }, {
    key: 'render',

    /**
    * Renders the component.
    *
    * @method render
    * @return {Object} JSX form
    */
    value: function render() {
      var cancelButton = undefined,
          errorCount = undefined,
          saveClasses = "ui-form__save";

      if (this.state.errorCount) {
        // set error message (allow for HTML in the message - https://facebook.github.io/react/tips/dangerously-set-inner-html.html)
        errorCount = _react2['default'].createElement('span', { className: 'ui-form__summary', dangerouslySetInnerHTML: errorMessage(this.state.errorCount) });

        saveClasses += " ui-form__save--invalid";
      }

      if (this.props.cancel) {
        cancelButton = this.cancelButton;
      }

      return _react2['default'].createElement(
        'form',
        _extends({ onSubmit: this.handleOnSubmit }, this.htmlProps(), { ref: 'form' }),
        generateCSRFToken(this._document),
        this.props.children,
        _react2['default'].createElement(
          'div',
          { className: 'ui-form__buttons' },
          _react2['default'].createElement(
            'div',
            { className: saveClasses },
            errorCount,
            _react2['default'].createElement(
              _button2['default'],
              { as: 'primary', disabled: this.props.saving },
              this.props.saveText
            )
          ),
          cancelButton
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
      return (0, _classnames2['default'])('ui-form', this.props.className);
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

      return _react2['default'].createElement(
        'div',
        { className: cancelClasses },
        _react2['default'].createElement(
          _button2['default'],
          { type: 'button', onClick: this.cancelForm },
          this.props.cancelText
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Cancel button is shown if true
       *
       * @property cancel
       * @type {Boolean}
       * @default true
       */
      cancel: _react2['default'].PropTypes.bool,

      /**
       * Custom function that is called immediately
       * after the form validates
       *
       * @property afterFormValidation
       * @type {Function}
       */
      afterFormValidation: _react2['default'].PropTypes.func,

      /**
       * Custom function that is called immediately
       * before the form validates
       *
       * @property beforeFormValidation
       * @type {Function}
       */
      beforeFormValidation: _react2['default'].PropTypes.func,

      /**
       * Determines if the form is in a saving state
       *
       * @property saving
       * @type {Boolean}
       * @default false
       */
      saving: _react2['default'].PropTypes.bool,

      /**
       * If true, will validate the form on mount
       *
       * @property validateOnMount
       * @type {Boolean}
       * @default false
       */
      validateOnMount: _react2['default'].PropTypes.bool,

      /**
       * Text for the cancel button
       *
       * @property cancelText
       * @type {String}
       * @default "Cancel"
       */
      cancelText: _react2['default'].PropTypes.string,

      /**
       * Text for the save button
       *
       * @property saveText
       * @type {String}
       * @default "Save"
       */
      saveText: _react2['default'].PropTypes.string,

      /**
       * Custom function for Cancel button onClick
       *
       * @property onCancel
       * @type {Function}
       */
      onCancel: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      cancelText: _i18nJs2['default'].t('actions.cancel', { defaultValue: 'Cancel' }),
      cancel: true,
      saveText: _i18nJs2['default'].t('actions.save', { defaultValue: 'Save' }),
      saving: false,
      validateOnMount: false
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      /**
       * Defines a context object for child components of the form component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property form
       * @type {Object}
       */
      form: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      modal: _react2['default'].PropTypes.object
    },

    /**
     * Returns form object to child components.
     *
     * @method getChildContext
     * @return {void}
     */
    enumerable: true
  }]);

  return Form;
})(_react2['default'].Component);

function generateCSRFToken(doc) {
  var meta = doc.getElementsByTagName('meta'),
      csrfAttr = undefined,
      csrfValue = undefined;

  for (var i = 0; i < meta.length; i++) {
    var item = meta[i];

    if (item.getAttribute('name') === 'csrf-param') {
      csrfAttr = item.getAttribute('content');
    } else if (item.getAttribute('name') === 'csrf-token') {
      csrfValue = item.getAttribute('content');
    }
  }

  return _react2['default'].createElement('input', { type: 'hidden', name: csrfAttr, value: csrfValue, readOnly: 'true' });
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
  var errorMessage = _i18nJs2['default'].t("errors.messages.form_summary.errors", {
    defaultValue: {
      one: 'There is ' + count + ' error',
      other: 'There are ' + count + ' errors'
    },
    count: count
  });

  return { __html: errorMessage };
}

exports['default'] = Form;
module.exports = exports['default'];

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
 * Stores references to the inputs in the form
 *
 * @property inputs
 * @type {Object}
 */

/**
 * Decreases the current error count in state by 1.
 *
 * @method decrementErrorCount
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