'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * A button widget.
 *
 * == How to use a Button in a component:
 *
 * In your file:
 *
 *   import Button from 'carbon/lib/components/button';
 *
 * To render the Button:
 *
 *   <Button>Save</Button>
 *
 * For additional properties specific to this component, see propTypes and defaultProps.
 *
 * @class Button
 * @constructor
 */

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    _get(Object.getPrototypeOf(Button.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Button, [{
    key: 'render',

    /**
     * Renders the component with props.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return this.element;
    }
  }, {
    key: 'element',

    /**
     * Build the element to render.
     *
     * @method element
     * @return {Object} JSX
     */
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);
      // if props.href then render an anchor instead
      var el = props.href ? 'a' : 'button';
      var as = this.props.as;

      if (as.constructor === Array) {
        as = as.map(function (klass) {
          return 'ui-button--' + klass;
        });
      } else {
        as = ['ui-button--' + as];
      }

      props.className = _classnames2['default'].apply(undefined, ['ui-button'].concat(_toConsumableArray(as), [props.className, {
        'ui-button--disabled': this.props.disabled
      }]));

      return _react2['default'].createElement(el, props, this.props.children);
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Customizes the appearance, can be set to 'primary' or 'secondary'.
       *
       * @property as
       * @type {String|Array}
       * @default 'secondary'
       */
      as: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.array]),

      /**
       * A required prop. This is what the button will display.
       *
       * @property children
       * @type {Multiple}
       */
      children: _react2['default'].PropTypes.node.isRequired,

      /**
       * Gives the button a disabled state.
       *
       * @property boolean
       * @type {Boolean}
       * @default false
       */
      disabled: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      as: 'secondary',
      disabled: false
    },
    enumerable: true
  }]);

  return Button;
})(_react2['default'].Component);

exports['default'] = Button;
module.exports = exports['default'];