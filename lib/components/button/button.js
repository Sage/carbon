/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_link = require('./../link');

/*istanbul ignore next*/
var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
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
      var /*istanbul ignore next*/props = _objectWithoutProperties(this.props, []);
      // if props.href then render an anchor instead
      var /*istanbul ignore next*/el = props.href || props.to ? /*istanbul ignore next*/_link2.default : 'button';
      var /*istanbul ignore next*/as = this.props.as;

      if (as.constructor === Array) {
        as = as.map(function (klass) {
          return (/*istanbul ignore next*/'ui-button--' + klass
          );
        });
      } else {
        as = [/*istanbul ignore next*/'ui-button--' + as];
      }

      props.className = /*istanbul ignore next*/_classnames2.default.apply( /*istanbul ignore next*/undefined, /*istanbul ignore next*/['ui-button'].concat(_toConsumableArray(as), [props.className, {
        'ui-button--disabled': this.props.disabled
      }]));

      return (/*istanbul ignore next*/_react2.default.createElement(el, props, this.props.children)
      );
    }
  }]);

  return Button;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Button.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary' or 'secondary'.
   *
   * @property as
   * @type {String|Array}
   * @default 'secondary'
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.array]),

  /**
   * A required prop. This is what the button will display.
   *
   * @property children
   * @type {Multiple}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.node.isRequired,

  /**
   * Gives the button a disabled state.
   *
   * @property boolean
   * @type {Boolean}
   * @default false
   */
  disabled: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/Button.defaultProps = {
  as: 'secondary',
  disabled: false
};
/*istanbul ignore next*/exports.default = Button;