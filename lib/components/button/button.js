'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 *  ### Themes
 *
 *  Currently available button themese are blue(default), green, red, magenta, grey & white.
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

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
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
      var props = _objectWithoutProperties(this.props, []),
          el = props.href || props.to ? _link2.default : 'button';


      props.className = (0, _classnames2.default)('carbon-button', 'carbon-button--' + this.props.as, 'carbon-button--' + this.props.theme, 'carbon-button--' + this.props.size, props.className, {
        'carbon-button--disabled': this.props.disabled
      });

      return _react2.default.createElement(el, props, this.props.children);
    }
  }]);

  return Button;
}(_react2.default.Component);

Button.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary' or 'secondary'.
   *
   * @property as
   * @type {String|Array}
   * @default 'secondary'
   */
  as: _react2.default.PropTypes.string,

  /**
   * A required prop. This is what the button will display.
   *
   * @property children
   * @type {Multiple}
   */
  children: _react2.default.PropTypes.node.isRequired,

  /**
   * Gives the button a disabled state.
   *
   * @property disabled
   * @type {Boolean}
   * @default false
   */
  disabled: _react2.default.PropTypes.bool,

  /**
   * Gives the button a color.
   *
   * @property theme
   * @type {String}
   * @default blue
   */
  theme: _react2.default.PropTypes.string,

  /**
   * Determines size of button.
   *
   * @property size
   * @type {String}
   * @default medium
   */
  size: _react2.default.PropTypes.string
};
Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  theme: 'blue',
  disabled: false
};
exports.default = Button;