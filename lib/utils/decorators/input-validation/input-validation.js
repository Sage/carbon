/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_reactDom = require('react-dom');

/*istanbul ignore next*/
var _reactDom2 = _interopRequireDefault(_reactDom);

var /*istanbul ignore next*/_icon = require('./../../../components/icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_chainFunctions = require('./../../helpers/chain-functions');

/*istanbul ignore next*/
var _chainFunctions2 = _interopRequireDefault(_chainFunctions);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_lodash = require('lodash');

/*istanbul ignore next*/
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
var InputValidation = function InputValidation(ComposedComponent) /*istanbul ignore next*/{
  var _class, _temp;

  return _temp = _class = function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function /*istanbul ignore next*/Component() {
      /*istanbul ignore next*/
      var _Object$getPrototypeO;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /*istanbul ignore next*/

      // use the super components state, or create an empty object

      var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Component)).call.apply(_Object$getPrototypeO, [this].concat(args)));

      /*istanbul ignore next*/_this._window = window;
      /*istanbul ignore next*/
      _this.positionMessage = function () {
        if (! /*istanbul ignore next*/_this.state.valid || /*istanbul ignore next*/_this.state.warning) {
          // calculate the position for the message relative to the icon
          var icon = /*istanbul ignore next*/_reactDom2.default.findDOMNode( /*istanbul ignore next*/_this.refs.validationIcon),
              message = /*istanbul ignore next*/_this.refs.validationMessage;

          if (icon && message && message.offsetHeight) {
            var messagePositionLeft = icon.offsetLeft + icon.offsetWidth / 2,
                topOffset = icon.offsetTop - icon.offsetHeight;

            // set initial position for message
            message.style.left = /*istanbul ignore next*/messagePositionLeft + 'px';
            message.style.top = /*istanbul ignore next*/'-' + (message.offsetHeight - topOffset) + 'px';

            // figure out if the message is positioned offscreen
            var messageScreenPosition = message.getBoundingClientRect().left + message.offsetWidth;

            // change the position if it is offscreen
            if (messageScreenPosition > /*istanbul ignore next*/_this._window.innerWidth) {
              messagePositionLeft -= message.offsetWidth;
              message.style.left = /*istanbul ignore next*/messagePositionLeft + 'px';
              message.className += " common-input__message--flipped";
              /*istanbul ignore next*/_this.flipped = true;
            } else {
              message.classList.remove("common-input__message--flipped");
              /*istanbul ignore next*/_this.flipped = false;
            }
          }
        }
      };

      /*istanbul ignore next*/
      _this.warning = function () {
        /*istanbul ignore next*/var value = arguments.length <= 0 || arguments[0] === undefined ? /*istanbul ignore next*/_this.props.value : arguments[0];

        var valid = true;
        // if there are no warnings or there is an error on the input, return truthy
        if (! /*istanbul ignore next*/_this.props.warnings || ! /*istanbul ignore next*/_this.state.valid) {
          return true;
        }

        // iterate through each validation applied to the input
        for (var i = 0; i < /*istanbul ignore next*/_this.props.warnings.length; i++) {
          var warning = /*istanbul ignore next*/_this.props.warnings[i];

          // run this validation
          valid = warning.validate(value, /*istanbul ignore next*/_this.props, /*istanbul ignore next*/_this.updateWarning);
          /*istanbul ignore next*/_this.updateWarning(valid, value, warning);
          if (!valid) {
            break;
          }
        }

        // return the result of the validation
        return valid;
      };

      /*istanbul ignore next*/
      _this.updateWarning = function (valid, value, warning) {
        // if validation fails
        if (!valid) {
          // if input currently thinks it is valid
          if (! /*istanbul ignore next*/_this.state.warning) {
            // if input has a form
            if ( /*istanbul ignore next*/_this.isAttachedToForm) {
              // increment the error count on the form
              /*istanbul ignore next*/_this.context.form.incrementWarningCount();
            }

            // if input has a tab
            if ( /*istanbul ignore next*/_this.context.tab) {
              // Set the validity of the tab to false
              /*istanbul ignore next*/_this.context.tab.setWarning(true);
            }

            // tell the input it is invalid
            /*istanbul ignore next*/_this.setState({ warningMessage: warning.message(value, /*istanbul ignore next*/_this.props), warning: true });
          }
        }
      };

      /*istanbul ignore next*/
      _this.validate = function () {
        /*istanbul ignore next*/var value = arguments.length <= 0 || arguments[0] === undefined ? /*istanbul ignore next*/_this.props.value : arguments[0];

        var valid = false;

        // if there are no validation, return truthy
        if (! /*istanbul ignore next*/_this.props.validations || /*istanbul ignore next*/_this.props._placeholder) {
          return true;
        }

        // iterate through each validation applied to the input
        for (var i = 0; i < /*istanbul ignore next*/_this.props.validations.length; i++) {
          var validation = /*istanbul ignore next*/_this.props.validations[i];

          // run this validation
          valid = validation.validate(value, /*istanbul ignore next*/_this.props, /*istanbul ignore next*/_this.updateValidation);
          /*istanbul ignore next*/_this.updateValidation(valid, value, validation);
          // if validation fails
          if (!valid) {
            // a validation has failed, so exit the loop at this point
            break;
          }
        }

        // return the result of the validation
        return valid;
      };

      /*istanbul ignore next*/
      _this.updateValidation = function (valid, value, validation) {
        // if validation fails
        if (!valid) {
          // if input currently thinks it is valid
          if ( /*istanbul ignore next*/_this.state.valid) {
            // if input has a form
            if ( /*istanbul ignore next*/_this.isAttachedToForm) {
              // increment the error count on the form
              /*istanbul ignore next*/_this.context.form.incrementErrorCount();
            }

            // if input has a tab
            if ( /*istanbul ignore next*/_this.context.tab) {
              // Set the validity of the tab to false
              /*istanbul ignore next*/_this.context.tab.setValidity(false);
            }

            // tell the input it is invalid
            /*istanbul ignore next*/_this.setState({ errorMessage: validation.message(value, /*istanbul ignore next*/_this.props), valid: false });
          }
        }
      };

      /*istanbul ignore next*/
      _this._handleBlur = function () {
        if (! /*istanbul ignore next*/_this.blockBlur) {
          // use setTimeout to drop in the callstack to ensure value has time to be set
          setTimeout(function () {
            /*istanbul ignore next*/_this.validate();
            /*istanbul ignore next*/_this.warning();

            if ( /*istanbul ignore next*/_this.state.messageLocked) {
              /*istanbul ignore next*/_this.setState({ messageLocked: false });
            }
          }, 0);
        }
      };

      /*istanbul ignore next*/
      _this._handleFocus = function () {
        if (! /*istanbul ignore next*/_this.state.valid || /*istanbul ignore next*/_this.state.warning) {
          /*istanbul ignore next*/_this.positionMessage();

          if (! /*istanbul ignore next*/_this.state.messageLocked) {
            /*istanbul ignore next*/_this.setState({ messageLocked: true });
          }
        }
      };

      /*istanbul ignore next*/
      _this._handleContentChange = function () {
        // if the field is in an invalid state
        if (! /*istanbul ignore next*/_this.state.valid || /*istanbul ignore next*/_this.state.warning) {
          // if there is a form, decrement the error count
          if ( /*istanbul ignore next*/_this.isAttachedToForm) {
            if (! /*istanbul ignore next*/_this.state.valid) {
              /*istanbul ignore next*/_this.context.form.decrementErrorCount();
            }

            if ( /*istanbul ignore next*/_this.state.warning) {
              /*istanbul ignore next*/_this.context.form.decrementWarningCount();
            }
          }

          // if there is tab, remove invalid state
          if ( /*istanbul ignore next*/_this.context.tab) {
            if (! /*istanbul ignore next*/_this.state.valid) {
              /*istanbul ignore next*/_this.context.tab.setValidity(true);
            }

            if ( /*istanbul ignore next*/_this.state.warning) {
              /*istanbul ignore next*/_this.context.tab.setWarning(false);
            }
          }

          // reset the error state
          /*istanbul ignore next*/_this.setState({ errorMessage: null, valid: true, warning: false });
        }
      };

      /*istanbul ignore next*/_this.state = /*istanbul ignore next*/_this.state || {};

      /**
       * The inputs valid state.
       *
       * @property valid
       * @type {Boolean}
       * @default true
       */
      /*istanbul ignore next*/_this.state.valid = true;

      /**
       * The inputs warning state.
       * true: has warning
       * false: has no warning
       *
       * @property warning
       * @type {Boolean}
       * @default false
       */
      /*istanbul ignore next*/_this.state.warning = false;

      /**
       * The inputs error message.
       *
       * @property errorMessage
       * @type {String}
       * @default null
       */
      /*istanbul ignore next*/_this.state.errorMessage = null;

      /**
       * The inputs warning message.
       *
       * @property warningMessage
       * @type {String}
       * @default null
       */
      /*istanbul ignore next*/_this.state.warningMessage = null;

      /**
       * Determines if the message should always be visible.
       *
       * @property messageLocked
       * @type {Boolean}
       * @default false
       */
      /*istanbul ignore next*/_this.state.messageLocked = false;
      /*istanbul ignore next*/return _this;
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
        if ( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this)) {
          /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
        }

        // if disabling the field, reset the validation on it
        if (nextProps.disabled && (!this.state.valid || this.state.warning)) {
          this.setState({ valid: true, warning: false });
        }

        // if value changes and the input is currently invalid, re-assess its validity
        if (!this.state.valid && nextProps.value != this.props.value) {
          if (this.warning(nextProps.value)) {
            this.setState({ warning: false });
          }

          if (this.validate(nextProps.value)) {
            this.setState({ valid: true });
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
        if ( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillMount', this)) {
          /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillMount', this).call(this);
        }

        if (this.context.form && (this.props.validations || this.props.warnings)) {
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
        if ( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillUnmount', this)) {
          /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'componentWillUnmount', this).call(this);
        }

        if (this.isAttachedToForm && (this.props.validations || this.props.warnings)) {
          if (!this.state.valid) {
            // decrement the forms error count if the input is removed
            this.context.form.decrementErrorCount();
          }

          if (this.state.warning) {
            // decrement the forms error count if the input is removed
            this.context.form.decrementWarningCount();
          }

          // detach the input to the form so the form
          this.context.form.detachFromForm(this);
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
        if (this.state.valid && !this.state.warning) {
          return null;
        }

        var type = !this.state.valid ? "error" : "warning";

        var messageClasses = /*istanbul ignore next*/'common-input__message common-input__message--' + type,
            iconClasses = /*istanbul ignore next*/'common-input__icon common-input__icon--' + type;

        // position icon relative to width of label
        var iconStyle = this.props.labelWidth ? /*istanbul ignore next*/_defineProperty({}, '' + this.props.align, 100 - this.props.labelWidth + '%') : null;

        if (this.state.messageLocked) {
          messageClasses += " common-input__message--locked";
        }
        if (this.flipped) {
          messageClasses += " common-input__message--flipped";
        }

        return [/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ key: '0', ref: 'validationIcon', type: type, className: iconClasses, style: iconStyle }), /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ key: '1', className: 'common-input__message-wrapper' },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ ref: 'validationMessage', className: messageClasses },
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
        return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'mainClasses', this), {
            'common-input--error': !this.state.valid,
            'common-input--warning': this.state.warning
          })
        );
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
        return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'inputClasses', this), {
            'common-input__input--error': !this.state.valid,
            'common-input__input--warning': this.state.warning
          })
        );
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
        var inputProps = /*istanbul ignore next*/_get(Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

        inputProps.onMouseOver = /*istanbul ignore next*/(0, _chainFunctions2.default)(this.positionMessage, inputProps.onMouseOver);
        inputProps.onFocus = /*istanbul ignore next*/(0, _chainFunctions2.default)(this._handleFocus, inputProps.onFocus);
        inputProps.onBlur = /*istanbul ignore next*/(0, _chainFunctions2.default)(this._handleBlur, inputProps.onBlur);
        inputProps.onKeyDown = /*istanbul ignore next*/(0, _chainFunctions2.default)(this._handleContentChange, inputProps.onKeyDown);
        inputProps.onPaste = /*istanbul ignore next*/(0, _chainFunctions2.default)(this._handleContentChange, inputProps.onKeyDown);

        return inputProps;
      }
    }]);

    return Component;
  }(ComposedComponent), _class.contextTypes = /*istanbul ignore next*/(0, _lodash.assign)({}, ComposedComponent.contextTypes, {
    form: /*istanbul ignore next*/_react2.default.PropTypes.object,
    tab: /*istanbul ignore next*/_react2.default.PropTypes.object
  }), _temp;
};

/*istanbul ignore next*/exports.default = InputValidation;