'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _icon = require('./../../../components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _chainFunctions = require('./../../helpers/chain-functions');

var _chainFunctions2 = _interopRequireDefault(_chainFunctions);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var InputValidation = function InputValidation(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      var _ref;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // use the super components state, or create an empty object
      var _this = _possibleConstructorReturn(this, (_ref = Component.__proto__ || Object.getPrototypeOf(Component)).call.apply(_ref, [this].concat(args)));

      _this._window = window;

      _this.positionMessage = function () {
        if (!_this.state.valid || _this.state.warning) {
          // calculate the position for the message relative to the icon
          var icon = _reactDom2.default.findDOMNode(_this.refs.validationIcon),
              message = _this.refs.validationMessage;

          if (icon && message && message.offsetHeight) {
            var messagePositionLeft = icon.offsetLeft + icon.offsetWidth / 2,
                topOffset = icon.offsetTop - icon.offsetHeight;

            // set initial position for message
            message.style.left = messagePositionLeft + 'px';
            message.style.top = '-' + (message.offsetHeight - topOffset) + 'px';

            // figure out if the message is positioned offscreen
            var messageScreenPosition = message.getBoundingClientRect().left + message.offsetWidth;

            // change the position if it is offscreen
            if (messageScreenPosition > _this._window.innerWidth) {
              messagePositionLeft -= message.offsetWidth;
              message.style.left = messagePositionLeft + 'px';
              message.className += " common-input__message--flipped";
              _this.flipped = true;
            } else {
              message.classList.remove("common-input__message--flipped");
              _this.flipped = false;
            }
          }
        }
      };

      _this.warning = function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.value;

        var valid = true;
        // if there are no warnings or there is an error on the input, return truthy
        if (!_this.props.warnings || !_this.state.valid) {
          return true;
        }

        // iterate through each validation applied to the input
        for (var i = 0; i < _this.props.warnings.length; i++) {
          var warning = _this.props.warnings[i];

          // run this validation
          valid = warning.validate(value, _this.props, _this.updateWarning);
          _this.updateWarning(valid, value, warning);
          if (!valid) {
            break;
          }
        }

        // return the result of the validation
        return valid;
      };

      _this.updateWarning = function (valid, value, warning) {
        // if validation fails
        if (!valid) {
          // if input currently thinks it is valid
          if (!_this.state.warning) {
            // if input has a form
            if (_this.isAttachedToForm) {
              // increment the error count on the form
              _this.context.form.incrementWarningCount();
            }

            // if input has a tab
            if (_this.context.tab) {
              // Set the validity of the tab to true
              _this.context.tab.setWarning(true);
            }

            // tell the input it is invalid
            _this.setState({ warningMessage: warning.message(value, _this.props), warning: true });
          }
        }
      };

      _this.validate = function () {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.value;

        var valid = false;

        // if there are no validation, return truthy
        if (!_this._validations() || _this.props._placeholder) {
          return true;
        }

        // iterate through each validation applied to the input
        for (var i = 0; i < _this._validations().length; i++) {
          var validation = _this._validations()[i];

          // run this validation
          valid = validation.validate(value, _this.props, _this.updateValidation);
          _this.updateValidation(valid, value, validation);
          // if validation fails
          if (!valid) {
            // a validation has failed, so exit the loop at this point
            break;
          }
        }

        // return the result of the validation
        return valid;
      };

      _this.updateValidation = function (valid, value, validation) {
        // if validation fails
        if (!valid) {
          // if input currently thinks it is valid
          if (_this.state.valid) {
            // if input has a form
            if (_this.isAttachedToForm) {
              // increment the error count on the form
              _this.context.form.incrementErrorCount();
            }

            // if input has a tab
            if (_this.context.tab) {
              // Set the validity of the tab to false
              _this.context.tab.setValidity(false);
            }

            // tell the input it is invalid
            _this.setState({ errorMessage: validation.message(value, _this.props), valid: false });
          }
        }
      };

      _this._handleBlur = function () {
        if (!_this.blockBlur) {
          // use setTimeout to drop in the callstack to ensure value has time to be set
          setTimeout(function () {
            _this.validate();
            _this.warning();

            if (_this.state.messageLocked) {
              _this.setState({ messageLocked: false });
            }
          }, 0);
        }
      };

      _this._handleFocus = function () {
        if (!_this.state.valid || _this.state.warning) {
          _this.positionMessage();

          if (!_this.state.messageLocked) {
            _this.setState({ messageLocked: true });
          }
        }
      };

      _this._handleContentChange = function () {
        // if the field is in an invalid state
        if (!_this.state.valid || _this.state.warning) {
          // if there is a form, decrement the error count
          if (_this.isAttachedToForm) {
            if (!_this.state.valid) {
              _this.context.form.decrementErrorCount();
            }

            if (_this.state.warning) {
              _this.context.form.decrementWarningCount();
            }
          }

          // if there is tab, remove invalid state
          if (_this.context.tab) {
            _this.resetTab();
          }

          // reset the error state
          _this.setState({ errorMessage: null, valid: true, warning: false });
        }
      };

      _this.resetTab = function () {
        if (!_this.state.valid) {
          _this.context.tab.setValidity(true);
        }

        if (_this.state.warning) {
          _this.context.tab.setWarning(false);
        }
      };

      _this.messageExists = function () {
        return !_this.state.valid || _this.state.warning;
      };

      _this.showMessage = function () {
        if (_this.messageExists()) {
          _this.setState({
            messageShown: true,
            immediatelyHideMessage: false
          });

          if (_this.context.form) {
            _this.context.form.setActiveInput(_this);
          }
        }
      };

      _this.hideMessage = function () {
        if (_this.messageExists()) {
          _this.setState({
            messageShown: false
          });
        }
      };

      _this.immediatelyHideMessage = function () {
        _this.setState({
          messageShown: false,
          immediatelyHideMessage: true
        });
      };

      _this._isCurrentlyActiveInput = function () {
        return _this.context.form && _this.context.form.getActiveInput() === _this;
      };

      _this._validations = function () {
        var validations = (_this.props.validations || []).concat(_this.props.internalValidations || []);
        return validations.length ? validations : null;
      };

      _this.state = _this.state || {};

      /**
       * The inputs valid state.
       *
       * @property valid
       * @type {Boolean}
       * @default true
       */
      _this.state.valid = true;

      /**
       * The inputs warning state.
       * true: has warning
       * false: has no warning
       *
       * @property warning
       * @type {Boolean}
       * @default false
       */
      _this.state.warning = false;

      /**
       * The inputs error message.
       *
       * @property errorMessage
       * @type {String}
       * @default null
       */
      _this.state.errorMessage = null;

      /**
       * The inputs warning message.
       *
       * @property warningMessage
       * @type {String}
       * @default null
       */
      _this.state.warningMessage = null;

      /**
       * Determines if the message should always be visible.
       *
       * @property messageLocked
       * @type {Boolean}
       * @default false
       */
      _this.state.messageLocked = false;

      /**
       * toggles whether the message for validation is immediately hidden to force it to disappear instantly
       *
       * @property immediatelyHideMessage
       * @type {Boolean}
       */
      _this.state.immediatelyHideMessage = false;

      /**
       * toggles whether the message for validation is shown
       *
       * @property messageShown
       * @type {Boolean}
       */
      _this.state.messageShown = false;
      return _this;
    }

    _createClass(Component, [{
      key: 'componentWillReceiveProps',


      /**
       * A lifecycle method for when the component has re-rendered.
       *
       * @method componentWillReceiveProps
       * @return {void}
       */
      value: function componentWillReceiveProps(nextProps) {
        // call the components super method if it exists
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
        }

        // if disabling the field, reset the validation on it
        if (nextProps.disabled && this.messageExists()) {
          this._handleContentChange();
        }

        // if value changes and the input is currently invalid, re-assess its validity
        if (!this._isCurrentlyActiveInput()) {
          if (this.messageExists() && nextProps.value !== this.props.value) {
            var contentChanged = false;

            if (this.state.warning && !this.warning(nextProps.value)) {
              this.setState({ warning: false });
              contentChanged = true;
            }

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

    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        // call the components super method if it exists
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillMount', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillMount', this).call(this);
        }

        if (this.context.form && (this._validations() || this.props.warnings)) {
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

    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // call the components super method if it exists
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillUnmount', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentWillUnmount', this).call(this);
        }

        if (this._validations() || this.props.warnings) {
          this._handleContentChange();
          if (this.isAttachedToForm) {
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


      /**
       * Checks for validations and returns boolean defining if field valid.
       *
       * @method warning
       * @return {Boolean} if the field/fields is/are valid, this function returns true
       */


      /**
       * Provides a callback method for warning to support Ajax
       *
       * @method updateWarning
       * @return {void}
       */


      /**
       * Checks for validations and returns boolean defining if field valid.
       *
       * @method validate
       * @return {Boolean} if the field/fields is/are valid
       */


      /**
       * Provides a callback method for validate to support Ajax
       *
       * @method updateValidation
       * @return {Void}
       */


      /**
       * On blur of the input we want to validate the field.
       *
       * @method _handleBlur
       * @return {void}
       */


      /**
       * On focus of the input.
       *
       * @method _handleFocus
       * @return {void}
       */


      /**
       * On content change of the input when we want to reset the validation.
       *
       * @method _handleContentChange
       * @return {void}
       */


      /**
       * Resets tab error state
       *
       * @method resetTab
       * @return {Void}
       */


      /**
       * does a message exist based on the current state of the input
       *
       * @method messageExist
       * @return {Boolean} whether or not a message exists
       */


      /**
       * sets the state for showing the message
       *
       * @method showMessage
       * @return {void}
       */


      /**
       * sets the state for hiding the message
       *
       * @method hideMessage
       * @return {void}
       */


      /**
       * sets the state for immediately hiding the message
       *
       * @method immediatelyHideMessage
       * @return {void}
       */

    }, {
      key: 'isAttachedToForm',


      /**
       * Determines if the input is attached to a form.
       *
       * @method isAttachedToForm
       * @return {Boolean}
       */
      get: function get() {
        return this.context.form && this.context.form.inputs[this._guid];
      }

      /**
       * Returns the HTML for the validation, only if it is invalid.
       *
       * @method validationHTML
       * @return {HTML} Validation HTML including icon & message
       */

    }, {
      key: 'validationHTML',
      get: function get() {
        if (this.state.valid && !this.state.warning) {
          return null;
        }

        var type = !this.state.valid ? "error" : "warning";

        var messageClasses = 'common-input__message common-input__message--' + type,
            iconClasses = 'common-input__icon common-input__icon--' + type;

        // position icon relative to width of label
        var iconStyle = this.props.labelWidth ? _defineProperty({}, '' + this.props.align, 100 - this.props.labelWidth + '%') : null;

        if (this.state.messageLocked) {
          messageClasses += " common-input__message--locked";
        }
        if (this.flipped) {
          messageClasses += " common-input__message--flipped";
        }

        return [_react2.default.createElement(_icon2.default, { key: '0', ref: 'validationIcon', type: type, className: iconClasses, style: iconStyle }), _react2.default.createElement(
          'div',
          { key: '1', className: 'common-input__message-wrapper', onMouseOver: this.showMessage, onMouseOut: this.hideMessage },
          _react2.default.createElement(
            'div',
            { ref: 'validationMessage', className: messageClasses },
            this.state.errorMessage || this.state.warningMessage
          )
        )];
      }

      /**
       * Extends the main classes with any validation classes.
       *
       * @method mainClasses
       * @return {String} Main class names
       */

    }, {
      key: 'mainClasses',
      get: function get() {
        return (0, _classnames2.default)(_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'mainClasses', this), {
          'common-input--error': !this.state.valid,
          'common-input--warning': this.state.warning,
          'common-input--message-hidden': this.state.immediatelyHideMessage,
          'common-input--message-shown': this.state.messageShown
        });
      }

      /**
       * Extends the input classes with any validation classes.
       *
       * @method inputClasses
       * @return {String} Input class names
       */

    }, {
      key: 'inputClasses',
      get: function get() {
        return (0, _classnames2.default)(_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'inputClasses', this), {
          'common-input__input--error': !this.state.valid,
          'common-input__input--warning': this.state.warning
        });
      }

      /**
       * Extends the input props with onBlur and onFocus events.
       *
       * @method inputProps
       * @return {Object} Input props
       */

    }, {
      key: 'inputProps',
      get: function get() {
        var inputProps = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

        inputProps.onMouseOver = (0, _chainFunctions2.default)(this.positionMessage, inputProps.onMouseOver);
        inputProps.onFocus = (0, _chainFunctions2.default)(this._handleFocus, inputProps.onFocus);
        inputProps.onBlur = (0, _chainFunctions2.default)(this._handleBlur, inputProps.onBlur);
        inputProps.onKeyDown = (0, _chainFunctions2.default)(this._handleContentChange, inputProps.onKeyDown);
        inputProps.onPaste = (0, _chainFunctions2.default)(this._handleContentChange, inputProps.onKeyDown);

        return inputProps;
      }
    }, {
      key: 'fieldProps',
      get: function get() {
        var fieldProps = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'fieldProps', this) || {};

        fieldProps.onMouseOut = (0, _chainFunctions2.default)(this.hideMessage, fieldProps.onMouseOut);
        fieldProps.onMouseOver = (0, _chainFunctions2.default)(this.showMessage, fieldProps.onMouseOver);

        return fieldProps;
      }

      /**
       * Determines if the currently active input is this input.
       *
       * @method _isCurrentlyActiveInput
       * @return {Boolean}
       */


      /**
       * Merges passed prop validations with internal component validations
       *
       * @method _validations
       * @return {Array} validations
       */

    }]);

    return Component;
  }(ComposedComponent), _class.contextTypes = (0, _lodash.assign)({}, ComposedComponent.contextTypes, {
    form: _react2.default.PropTypes.object,
    tab: _react2.default.PropTypes.object
  }), _temp;
};

exports.default = InputValidation;