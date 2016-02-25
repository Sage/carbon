'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsIcon = require('./../../../components/icon');

var _componentsIcon2 = _interopRequireDefault(_componentsIcon);

var _helpersChainFunctions = require('./../../helpers/chain-functions');

var _helpersChainFunctions2 = _interopRequireDefault(_helpersChainFunctions);

var _lodash = require('lodash');

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
  return (function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      var _this = this;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, args);

      // use the super components state, or create an empty object
      this._window = window;

      this.validate = function () {
        var value = arguments.length <= 0 || arguments[0] === undefined ? _this.props.value : arguments[0];

        var valid = false;

        // if there are no validation, return truthy
        if (!_this.props.validations || _this.props._placeholder) {
          return true;
        }

        // iterate through each validation applied to the input
        for (var i = 0; i < _this.props.validations.length; i++) {
          var validation = _this.props.validations[i];

          // run this validation
          valid = validation.validate(value, _this.props);

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

            // a validation has failed, so exit the loop at this point
            break;
          }
        }

        // return the result of the validation
        return valid;
      };

      this._handleBlur = function () {
        if (!_this.blockBlur) {
          _this.validate();

          if (_this.state.messageLocked) {
            _this.setState({ messageLocked: false });
          }
        }
      };

      this._handleFocus = function () {
        if (!_this.state.valid && !_this.state.messageLocked) {
          _this.setState({ messageLocked: true });
        }
      };

      this._handleContentChange = function () {
        // if the field is in an invalid state
        if (!_this.state.valid) {
          // if there is a form, decrement the error count
          if (_this.isAttachedToForm) {
            _this.context.form.decrementErrorCount();
          }

          // if there is tab, remove invalid state
          if (_this.context.tab) {
            _this.context.tab.setValidity(true);
          }

          // reset the error state
          _this.setState({ errorMessage: null, valid: true });
        }
      };

      this.state = this.state || {};

      /**
       * The inputs valid state.
       *
       * @property valid
       * @type {Boolean}
       * @default true
       */
      this.state.valid = true;

      /**
       * The inputs error message.
       *
       * @property errorMessage
       * @type {String}
       * @default null
       */
      this.state.errorMessage = null;

      /**
       * Determines if the message should always be visible.
       *
       * @property messageLocked
       * @type {Boolean}
       * @default false
       */
      this.state.messageLocked = false;
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
        if (_get(Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this)) {
          _get(Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
        }

        // if disabling the field, reset the validation on it
        if (nextProps.disabled && !this.state.valid) {
          this.setState({ valid: true });
        }

        // if value changes and the input is currently invalid, re-assess its validity
        if (!this.state.valid && nextProps.value != this.props.value) {
          if (this.validate(nextProps.value)) {
            this.setState({ valid: true });
          }
        }
      }

      /**
       * A lifecycle method for when the component has re-rendered.
       *
       * @method componentDidUpdate
       * @return {void}
       */
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        // call the components super method if it exists
        if (_get(Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this)) {
          _get(Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
        }

        if (!this.state.valid) {
          // calculate the position for the message relative to the icon
          var icon = _reactDom2['default'].findDOMNode(this.refs.validationIcon),
              message = this.refs.validationMessage;

          if (icon && message && message.offsetHeight) {
            var messagePositionLeft = icon.offsetLeft + icon.offsetWidth / 2,
                topOffset = icon.offsetTop - icon.offsetHeight;

            // set initial position for message
            message.style.left = messagePositionLeft + 'px';
            message.style.top = '-' + (message.offsetHeight - topOffset) + 'px';

            // figure out if the message is positioned offscreen
            var messageScreenPosition = message.getBoundingClientRect().left + message.offsetWidth;

            // change the position if it is offscreen
            if (messageScreenPosition > this._window.innerWidth) {
              messagePositionLeft -= message.offsetWidth;
              message.style.left = messagePositionLeft + 'px';
              message.className += " common-input__message--flipped";
            }

            // hide the message
            message.className += " common-input__message--hidden";
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
        if (_get(Object.getPrototypeOf(Component.prototype), 'componentWillMount', this)) {
          _get(Object.getPrototypeOf(Component.prototype), 'componentWillMount', this).call(this);
        }

        if (this.context.form && this.props.validations) {
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
        if (_get(Object.getPrototypeOf(Component.prototype), 'componentWillUnmount', this)) {
          _get(Object.getPrototypeOf(Component.prototype), 'componentWillUnmount', this).call(this);
        }

        if (this.isAttachedToForm && this.props.validations) {
          if (!this.state.valid) {
            // decrement the forms error count if the input is removed
            this.context.form.decrementErrorCount();
          }

          // detach the input to the form so the form
          this.context.form.detachFromForm(this);
        }
      }

      /**
       * Checks for validations and returns boolean defining if field valid.
       *
       * @method validate
       * @return {Boolean} if the field/fields is/are valid
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
        if (this.context.form && this.context.form.inputs[this._guid]) {
          return true;
        } else {
          return false;
        }
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
        if (!this.state.errorMessage || this.state.valid) {
          return null;
        }

        var messageClasses = "common-input__message common-input__message--error",
            iconClasses = "common-input__icon common-input__icon--error";

        if (this.state.messageLocked) {
          messageClasses += " common-input__message--locked";
        }

        return [_react2['default'].createElement(_componentsIcon2['default'], { key: '0', ref: 'validationIcon', type: 'error', className: iconClasses }), _react2['default'].createElement(
          'div',
          { key: '1', className: 'common-input__message-wrapper' },
          _react2['default'].createElement(
            'div',
            { ref: 'validationMessage', className: messageClasses },
            this.state.errorMessage
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
        var classes = _get(Object.getPrototypeOf(Component.prototype), 'mainClasses', this) || "";

        if (!this.state.valid) {
          classes += " common-input--error";
        }

        return classes;
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
        var classes = _get(Object.getPrototypeOf(Component.prototype), 'inputClasses', this) || "";

        if (!this.state.valid) {
          classes += " common-input__input--error";
        }

        return classes;
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
        var inputProps = _get(Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

        inputProps.onFocus = (0, _helpersChainFunctions2['default'])(this._handleFocus, inputProps.onFocus);
        inputProps.onBlur = (0, _helpersChainFunctions2['default'])(this._handleBlur, inputProps.onBlur);
        inputProps.onKeyDown = (0, _helpersChainFunctions2['default'])(this._handleContentChange, inputProps.onKeyDown);
        inputProps.onPaste = (0, _helpersChainFunctions2['default'])(this._handleContentChange, inputProps.onKeyDown);

        return inputProps;
      }
    }], [{
      key: 'contextTypes',
      value: (0, _lodash.assign)({}, ComposedComponent.contextTypes, {
        form: _react2['default'].PropTypes.object,
        tab: _react2['default'].PropTypes.object
      }),
      enumerable: true
    }]);

    return Component;
  })(ComposedComponent);
};

exports['default'] = InputValidation;
module.exports = exports['default'];

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