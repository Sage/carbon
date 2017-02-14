'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tooltipDecorator = require('./../../utils/decorators/tooltip-decorator');

var _tooltipDecorator2 = _interopRequireDefault(_tooltipDecorator);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Icon: {
    displayName: 'Icon'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/icon/icon.js',
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
 * An Icon widget.
 *
 * == How to use an Icon in a component:
 *
 * In your file
 *
 *   import Icon from 'carbon/lib/components/icon';
 *
 * To render an Icon:
 *
 *   <Icon type='foo' />
 *
 * 'type' is a required prop
 *
 * This widget follows this pattern: https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 *
 * For information on how to use the Tooltip Decorator see the decorator docs.
 *
 * @class Icon
 * @constructor
 */
var Icon = (0, _tooltipDecorator2.default)(_wrapComponent('Icon')((_temp2 = _class = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Icon);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Icon.__proto__ || Object.getPrototypeOf(Icon)).call.apply(_ref, [this].concat(args))), _this), _this.iconSvgHTML = function () {
      if (_this.renderIcon) {
        return _react3.default.createElement('span', { className: 'carbon-icon__svg-icon', dangerouslySetInnerHTML: _this.renderIcon });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Icon, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var _this2 = this;

      return _react3.default.createElement(
        'span',
        _extends({
          className: this.mainClasses
        }, this.componentProps, {
          ref: function ref(comp) {
            return _this2._target = comp;
          }
        }),
        this.iconSvgHTML(),
        this.tooltipHTML
      );
    }
  }, {
    key: 'renderIcon',


    /**
     * Checks if we have an SVG available, otherwise will fall back
     * to using the icon font.
     *
     * @method renderIcon
     * @return {HTML}
     */
    get: function get() {
      return _icons2.default[this.type];
    }

    /**
     * Return component props
     *
     * @method componentProps
     * @return {Object} props
     */

  }, {
    key: 'componentProps',
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      delete props.className;
      delete props.bgSize;
      delete props.bgShape;
      delete props.bgTheme;
      props.type = this.type;

      return props;
    }

    /**
     * Return component classes
     *
     * @method mainClasses
     * @return {String} classes
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      var _classNames2;

      var icon = this.renderIcon,
          hasShape = this.props.bgShape || this.props.bgTheme;

      var classes = (0, _classnames2.default)('carbon-icon', this.props.className, _defineProperty({}, 'icon-' + this.type, !icon), (_classNames2 = {
        'carbon-icon--shape': hasShape
      }, _defineProperty(_classNames2, 'carbon-icon--' + this.props.bgSize, hasShape), _defineProperty(_classNames2, 'carbon-icon--' + this.props.bgShape, this.props.bgShape), _defineProperty(_classNames2, 'carbon-icon--' + this.props.bgTheme, this.props.bgTheme), _classNames2));
      return classes;
    }

    /**
     * Return Icon type with overrides
     *
     * @method type
     * @return {String} icon type
     */

  }, {
    key: 'type',
    get: function get() {
      // switch tweaks icon names for actual icons in the set
      switch (this.props.type) {
        case 'help':
          return 'question';
        case 'maintenance':
          return 'settings';
        case 'new':
          return 'gift';
        case 'success':
          return 'tick';
        default:
          return this.props.type;
      }
    }
  }]);

  return Icon;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Icon type
   *
   * @property  type
   * @type      {String}
   */
  type: _react3.default.PropTypes.string.isRequired,

  /**
   * Background size
   *
   * @property  bgSize
   * @type      {String}
   * @default   'small'
   */
  bgSize: _react3.default.PropTypes.oneOf(['small', 'medium', 'large']),

  /**
   * Background shape
   *
   * @property  bgShape
   * @type      {String}
   */
  bgShape: _react3.default.PropTypes.oneOf(['square', 'rounded-rect', 'circle']),

  /**
   * Background color theme
   *
   * @property  bgTheme
   * @type      {String}
   */
  bgTheme: _react3.default.PropTypes.string
}, _class.defaultProps = {
  bgSize: 'small'
}, _temp2)));

exports.default = Icon;