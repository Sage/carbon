'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _lodash = require('lodash');

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Button: {
    displayName: 'Button'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/button/button.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var Button = _wrapComponent('Button')((_temp = _class = function (_React$Component) {
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
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */


  _createClass(Button, [{
    key: 'render',
    value: function render() {
      return this.element();
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
        'carbon-button--disabled': this.props.disabled
      });

      props = (0, _lodash.assign)({}, props, (0, _tags.tagComponent)('button', this.props));

      return _react3.default.createElement(el, props, this.props.children);
    }
  }]);

  return Button;
}(_react3.default.Component), _class.propTypes = {
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
  size: _propTypes2.default.string
}, _class.safeProps = ['disabled'], _class.defaultProps = {
  as: 'secondary',
  size: 'medium',
  theme: 'blue',
  disabled: false
}, _temp));

exports.default = Button;