'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _link = require('../link');

var _link2 = _interopRequireDefault(_link);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./button.scss');

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
 *   import Button from 'carbon-react/lib/components/button';
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
    var _ref;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args)));

    _this.element = _this.element.bind(_this);
    return _this;
  }

  /**
   * Creates the child object for the button
   *
   * @return {Object} JSX
   */


  _createClass(Button, [{
    key: 'buildChildren',
    value: function buildChildren() {
      var children = this.props.children;


      if (this.props.subtext.length > 0 && this.props.size === 'large') {
        children = _react2.default.createElement(
          'span',
          { className: 'carbon-button__internal-wrapper' },
          _react2.default.createElement(
            'span',
            {
              className: 'carbon-button__main-text',
              'data-element': 'main-text',
              key: 'children'
            },
            this.props.children
          ),
          _react2.default.createElement(
            'span',
            {
              className: 'carbon-button__subtext',
              'data-element': 'subtext',
              key: 'subtext'
            },
            this.props.subtext
          )
        );
      }

      return children;
    }

    /**
     * Build the element to render.
     *
     * @method element
     * @return {Object} JSX
     */

  }, {
    key: 'element',
    value: function element() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);
      // if props.href then render an anchor instead


      var el = props.href || props.to ? _link2.default : 'button';

      props.className = (0, _classnames2.default)('carbon-button', 'carbon-button--' + this.props.as, 'carbon-button--' + this.props.theme, 'carbon-button--' + this.props.size, props.className, {
        'carbon-button--disabled': this.props.disabled,
        'carbon-button--subtext': this.props.subtext.length > 0
      });

      props = (0, _lodash.assign)({}, props, (0, _tags2.default)('button', this.props));

      return _react2.default.createElement(el, props, this.buildChildren());
    }

    /**
     * Renders the component with props.
     *
     * @method render
     * @return {Object} JSX
     */

  }, {
    key: 'render',
    value: function render() {
      return this.element();
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
  as: _propTypes2.default.string,

  /**
   * A required prop. This is what the button will display.
   *
   * @property children
   * @type {Multiple}
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * Gives the button a disabled state.
   *
   * @property disabled
   * @type {Boolean}
   * @default false
   */
  disabled: _propTypes2.default.bool,

  /**
   * Gives the button a color.
   *
   * @property theme
   * @type {String}
   * @default blue
   */
  theme: _propTypes2.default.string,

  /**
   * Determines size of button.
   *
   * @property size
   * @type {String}
   * @default medium
   */
  size: _propTypes2.default.string,

  /**
   * Sets a second bit of text under the main text, fainter and smaller.
   * Currently only available on a large button
   *
   * @property subtext
   * @type {String}
   */
  subtext: function subtext(props) {
    if (props.subtext.length > 0 && props.size !== 'large') {
      throw new Error('subtext prop has no effect unless the button is large');
    } else {
      return null;
    }
  }
};
Button.safeProps = ['disabled'];
Button.defaultProps = {
  as: 'secondary',
  size: 'medium',
  theme: 'blue',
  disabled: false,
  subtext: ''
};
exports.default = Button;