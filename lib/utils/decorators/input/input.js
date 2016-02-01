'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

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
 * @method Input
 * @param {Class} ComposedComponent class to decorate
 * @return {Object} Decorated Component
 */
var Input = function Input(ComposedComponent) {
  return (function (_ComposedComponent) {
    _inherits(Component, _ComposedComponent);

    function Component() {
      var _this = this;

      _classCallCheck(this, Component);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).apply(this, args);

      this._handleOnChange = function (ev) {
        if (_this.props.onChange) {
          // we also send the props so more information can be extracted by the action
          _this.props.onChange(ev, _this.props);
        }
      };
    }

    _createClass(Component, [{
      key: 'shouldComponentUpdate',

      /**
       * A lifecycle method to determine if the component should re-render for better performance.
       *
       * @method shouldComponentUpdate
       * @param {Object} nextProps the updated props
       * @param {Object} nextState the updated state
       * @return {Boolean} true if the component should update
       */
      value: function shouldComponentUpdate(nextProps, nextState) {
        // call super method if one is defined
        var changeDetected = _get(Object.getPrototypeOf(Component.prototype), 'shouldComponentUpdate', this) ? _get(Object.getPrototypeOf(Component.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState) : false;

        // determine if anything has changed that should result in a re-render
        if (changeDetected || !(0, _lodash.isEqual)(this.props, nextProps) || !(0, _lodash.isEqual)(this.state, nextState)) {
          return true;
        }

        return false;
      }

      /**
       * Calls the onChange event defined by the dev with more useful information.
       *
       * @method _handleChange
       * @param {Event} ev the change event
       * @returns {void}
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
        var classes = _get(Object.getPrototypeOf(Component.prototype), 'mainClasses', this) || "";

        if (this.props.readOnly) {
          classes += ' common-input--readonly';
        }

        if (this.props.className) {
          classes += ' ' + this.props.className;
        }

        if (this.props.align) {
          classes += ' common-input--align-' + this.props.align;
        }

        return classes + ' common-input';
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
        var classes = _get(Object.getPrototypeOf(Component.prototype), 'inputClasses', this) || "";
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
        var inputProps = _get(Object.getPrototypeOf(Component.prototype), 'inputProps', this) || {};

        // only thread the onChange event through the handler if the event is defined by the dev
        if (this.props.onChange === inputProps.onChange) {
          inputProps.onChange = this._handleOnChange;
        }

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
        var fieldProps = _get(Object.getPrototypeOf(Component.prototype), 'fieldProps', this) || {};

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
        return _get(Object.getPrototypeOf(Component.prototype), 'inputType', this) || 'input';
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
        return _get(Object.getPrototypeOf(Component.prototype), 'additionalInputContent', this) || null;
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
        // builds the input with a variable input type - see `inputType`
        var input = _react2['default'].createElement(this.inputType, _extends({}, this.inputProps));

        return _react2['default'].createElement(
          'div',
          this.fieldProps,
          input,
          this.additionalInputContent
        );
      }
    }], [{
      key: 'contextTypes',
      value: (0, _lodash.assign)({}, ComposedComponent.contextTypes, {
        form: _react2['default'].PropTypes.object
      }),
      enumerable: true
    }]);

    return Component;
  })(ComposedComponent);
};

exports['default'] = Input;
module.exports = exports['default'];