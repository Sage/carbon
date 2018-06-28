'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _css = require('./../../css');

var _css2 = _interopRequireDefault(_css);

var _shouldComponentUpdate2 = require('./../../helpers/should-component-update');

var _shouldComponentUpdate3 = _interopRequireDefault(_shouldComponentUpdate2);

var _guid = require('./../../helpers/guid');

var _guid2 = _interopRequireDefault(_guid);

var _icon = require('./../../../components/icon');

var _icon2 = _interopRequireDefault(_icon);

var _help = require('./../../../components/help');

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Input decorator.
 *
 * This decorator provides useful base operators for a typical input.
 *
 * == How to use Input decorator in a component:
 *
 * In your file:
 *
 *   import Input from 'carbon/lib/utils/decorators/input;
 *
 * To use the decorator, wrap your component with it:
 *
 *   const MyComponent = Input(
 *   class MyComponent extends React.Component {
 *     ...
 *   })
 *
 * This decorator provides methods you can use in your component class:
 *
 *  * `mainClasses` - classes to apply to the main component element
 *  * `inputClasses` - classes to apply to the input element
 *  * `inputProps` - props to apply to the input element
 *  * `inputHTML` - the html for the actual input
 *  * `additionalInputContent` - extension point to add additional content
 *  alongside the input
 *
 * You can also change the default input type from `input` to something else,
 * for example `textarea`, by defining a `inputType` getter method in your
 * components class.
 *
 * Inputs also accept a prop of `prefix` which outputs a prefix to the input:
 *
 *   <Textbox prefix='foo' />
 *
 * Inputs also accept a prop of `icon` which outputs an icon inside the input:
 *
 *   <Textbox icon='foo' />
 *
 * @method Input
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var Input = function Input(ComposedComponent) {
  var Component = function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      var _ref;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      /**
       * A unique identifier for the input.
       *
       * @prop _guid
       * @return {String}
       */
      var _this = _possibleConstructorReturn(this, (_ref = Component.__proto__ || Object.getPrototypeOf(Component)).call.apply(_ref, [this].concat(args)));

      _this._handleOnChange = function (ev) {
        // If input is in a form, set the form to dirty
        if (_this.isInForm) {
          _this.context.form.setIsDirty();
        }

        if (_this.props.onChange) {
          _this._handleDeferred(ev);

          // we also send the props so more information can be extracted by the action
          _this.props.onChange(ev, _this.props);
        }
      };

      _this._handleDeferred = function (ev) {
        if (_this.props.onChangeDeferred) {
          clearTimeout(_this.deferredTimeout);
          _this.deferredTimeout = setTimeout(function () {
            _this.props.onChangeDeferred(ev);
          }, _this.props.deferTimeout || 750);
        }
      };

      _this.setTextIndentation = function () {
        if (_this._input) {
          if (_this._prefix) {
            _this._input.style.paddingLeft = _this._prefix.offsetWidth + 11 + 'px';
          } else {
            _this._input.style.paddingLeft = '';
          }
        }
      };

      _this._guid = (0, _guid2.default)();
      return _this;
    }

    // common safeprops


    _createClass(Component, [{
      key: 'componentDidMount',


      /**
       * A lifecycle method for when the component has rendered.
       *
       * @method componentWillReceiveProps
       * @return {void}
       */
      value: function componentDidMount() {
        // call the components super method if it exists
        /* istanbul ignore else */
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentDidMount', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentDidMount', this).call(this);
        }

        if (this.props.prefix) {
          this.setTextIndentation();
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
        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this)) {
          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'componentDidUpdate', this).call(this, prevProps, prevState);
        }

        if (this.props.prefix !== prevProps.prefix || this.props.icon !== prevProps.icon) {
          this.setTextIndentation();
        }
      }

      /**
       * A lifecycle method to determine if the component should re-render for better performance.
       *
       * @method shouldComponentUpdate
       * @param {Object} nextProps the updated props
       * @param {Object} nextState the updated state
       * @return {Boolean} true if the component should update
       */

    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        // call super method if one is defined
        var changeDetected = false;

        if (_get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'shouldComponentUpdate', this)) {
          changeDetected = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState);
        }

        // determine if anything has changed that should result in a re-render
        if (changeDetected || (0, _shouldComponentUpdate3.default)(this, nextProps, nextState)) {
          return true;
        }

        return false;
      }

      /**
       * Determines if the input is part of a form.
       *
       * @method isInForm
       * @return {Boolean}
       */

    }, {
      key: 'isInForm',
      get: function get() {
        return this.context.form && typeof this.context.form !== 'undefined';
      }

      /**
       * Calls the onChange event defined by the dev with more useful information.
       *
       * @method _handleChange
       * @param {Event} ev the change event
       * @returns {void}
       */


      /**
       * Delay calls to the onChangeDeferred event defined by the dev
       *
       * @method _handleDeferred
       * @param {Event} ev the onChange event
       * @returns {void}
       */


      /**
       * Sets indentation of input value based on prefix width.
       *
       * @method setTextIndentation
       * @return {void}
       */

    }, {
      key: 'mainClasses',


      /**
       * Extends main classes to add ones for the input.
       *
       * @method mainClasses
       * @return {String} Main class names
       */
      get: function get() {
        var _classNames;

        var classes = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'mainClasses', this);

        return (0, _classnames2.default)(classes, this.props.className, _css2.default.input, (_classNames = {}, _defineProperty(_classNames, _css2.default.input + '--readonly', this.props.readOnly), _defineProperty(_classNames, _css2.default.input + '--align-' + this.props.align, this.props.align), _defineProperty(_classNames, _css2.default.input + '--with-prefix', this.props.prefix), _defineProperty(_classNames, _css2.default.input + '--with-input-help', this.props.inputHelp), _defineProperty(_classNames, _css2.default.input + '--disabled', this.props.disabled), _classNames));
      }

      /**
       * Extends input classes to add ones for the input.
       *
       * @method inputClasses
       * @return {String} Input class names
       */

    }, {
      key: 'inputClasses',
      get: function get() {
        var classes = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'inputClasses', this) || '';
        return classes + ' common-input__input';
      }

      /**
       * Extends input props add additional properties for the input.
       *
       * @method inputProps
       * @return {Object} Input props
       */

    }, {
      key: 'inputProps',
      get: function get() {
        var _this2 = this;

        var inputProps = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

        // store ref to input
        inputProps.ref = function (c) {
          _this2._input = c;
        };

        // disable autoComplete (causes performance issues in IE)
        inputProps.autoComplete = this.props.autoComplete || 'off';

        // only thread the onChange event through the handler if the event is defined by the dev
        if (this.props.onChange === inputProps.onChange) {
          inputProps.onChange = this._handleOnChange;
        }

        // Pass onPaste action to input element
        inputProps.onPaste = this.props.onPaste;

        // Adds data tag for automation
        inputProps['data-element'] = 'input';

        // Remove data-role as this should be applied on the top level element
        delete inputProps['data-role'];

        return inputProps;
      }

      /**
       * Extends field props add additional properties for the containing field.
       *
       * @method fieldProps
       * @return {Object} Field props
       */

    }, {
      key: 'fieldProps',
      get: function get() {
        var fieldProps = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'fieldProps', this) || {};

        fieldProps.className = 'common-input__field';

        return fieldProps;
      }

      /**
       * Defaults to `input`, but a developer can override it in their own class
       * to something different.
       *
       * @method inputType
       * @return {String} HTML input type
       */

    }, {
      key: 'inputType',
      get: function get() {
        return _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'inputType', this) || 'input';
      }

      /**
       * Extension point to add additional content to the input
       *
       * @method additionalInputContent
       * @return {Object | HTML | String | Number} additional content from composed class
       */

    }, {
      key: 'additionalInputContent',
      get: function get() {
        return _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'additionalInputContent', this) || null;
      }

      /**
       * Adds a prefix if it is defined
       *
       * @method prefixHTML
       * @return {Object}
       */

    }, {
      key: 'prefixHTML',
      get: function get() {
        var _this3 = this;

        if (!this.props.prefix) {
          return null;
        }

        return _react2.default.createElement(
          'div',
          { ref: function ref(c) {
              _this3._prefix = c;
            }, className: 'common-input__prefix' },
          this.props.prefix
        );
      }

      /**
       * Adds an icon if it is defined
       *
       * @method iconHTML
       * @return {Object}
       */

    }, {
      key: 'iconHTML',
      get: function get() {
        if (!this.props.icon) {
          return null;
        }

        return _react2.default.createElement(
          'div',
          { className: 'common-input__input-icon' },
          _react2.default.createElement(_icon2.default, { type: this.props.icon })
        );
      }

      /**
       * Supplies the HTML for inputHelp component
       *
       * @method inputHelpHTML
       * @return {Object} JSX for help
       */

    }, {
      key: 'inputHelpHTML',
      get: function get() {
        if (!this.props.inputHelp) {
          return null;
        }
        return _react2.default.createElement(
          _help2.default,
          {
            className: 'common-input__input-help',
            tooltipPosition: this.props.inputHelpPosition,
            tooltipAlign: this.props.inputHelpAlign,
            href: this.props.inputHelpHref
          },
          this.props.inputHelp
        );
      }

      /**
       * Returns HTML for the input.
       *
       * @method inputHTML
       * @return {HTML} HTML for input
       */

    }, {
      key: 'inputHTML',
      get: function get() {
        var input = void 0;
        if (this.props.fakeInput) {
          // renders a fake input - useful for screens with lots of inputs
          var classes = (0, _classnames2.default)(this.inputProps.className, 'common-input__input--fake');
          input = _react2.default.createElement(
            'div',
            { className: classes, onMouseOver: this.inputProps.onMouseOver },
            this.inputProps.value || this.inputProps.placeholder
          );
        } else {
          // builds the input with a variable input type - see `inputType`
          input = _react2.default.createElement(this.inputType, _extends({}, this.inputProps));
        }

        return _react2.default.createElement(
          'div',
          this.fieldProps,
          this.iconHTML,
          this.prefixHTML,
          input,
          this.additionalInputContent,
          this.inputHelpHTML
        );
      }
    }]);

    return Component;
  }(ComposedComponent);

  Component.contextTypes = (0, _lodash.assign)({}, ComposedComponent.contextTypes, {
    form: _propTypes2.default.object
  });
  Component.propTypes = (0, _lodash.assign)({}, ComposedComponent.propTypes, {
    /**
     * Integer to determine timeout for defered callback. Default: 750
     *
     * @property
     * @type {Number}
     */
    deferTimeout: _propTypes2.default.number,

    /**
     * Defered callback called after onChange event
     *
     * @property
     * @type {Boolean}
     */
    onChangeDeferred: _propTypes2.default.func
  });
  Component.safeProps = (0, _lodash.union)([], ComposedComponent.safeProps, ['value']);


  Component.displayName = ComposedComponent.displayName || ComposedComponent.name;
  return Component;
};

exports.default = Input;