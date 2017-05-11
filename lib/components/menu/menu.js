'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmenuBlock = exports.MenuItem = exports.Menu = undefined;

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _menuItem = require('./menu-item');

var _menuItem2 = _interopRequireDefault(_menuItem);

var _submenuBlock = require('./submenu-block');

var _submenuBlock2 = _interopRequireDefault(_submenuBlock);

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Menu: {
    displayName: 'Menu'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/menu/menu.js',
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
 * Renders a menu component, with menu items.
 */
var Menu = _wrapComponent('Menu')((_temp = _class = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      return _react3.default.createElement(
        'div',
        _extends({ className: this.classes }, (0, _tags.tagComponent)('menu', this.props)),
        this.props.children
      );
    }
  }, {
    key: 'classes',


    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */
    get: function get() {
      return (0, _classnames2.default)("carbon-menu", this.props.className, 'carbon-menu--' + this.props.as);
    }
  }]);

  return Menu;
}(_react3.default.Component), _class.propTypes = {
  as: _propTypes2.default.string // defines the style of the component eg. primary/secondary
}, _class.defaultProps = {
  as: "primary"
}, _temp));

exports.Menu = Menu;
exports.MenuItem = _menuItem2.default;
exports.SubmenuBlock = _submenuBlock2.default;