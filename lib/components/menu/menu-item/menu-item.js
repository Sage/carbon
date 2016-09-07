'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _link = require('./../../link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders a menu item for the menu component.
 */
var MenuItem = function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem() {
    _classCallCheck(this, MenuItem);

    return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
  }

  _createClass(MenuItem, [{
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      var component = this.props.submenu ? "div" : _link2.default;

      return _react2.default.createElement(component, {
        className: this.classes,
        href: this.props.href,
        to: this.props.to,
        target: this.props.target
      }, this.content);
    }
  }, {
    key: 'content',


    /**
     * Determines what content will be rendered for the menu item.
     *
     * @return {Object} JSX
     */
    get: function get() {
      // if does not have a submenu, just render the children
      if (!this.props.submenu) {
        return this.props.children;
      }

      // if it does have a submenu, render the following:
      var submenuClasses = (0, _classnames2.default)("carbon-menu-item__submenu", 'carbon-menu-item__submenu--' + this.props.submenuDirection);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          MenuItem,
          { className: 'carbon-menu-item__submenu-title', href: this.props.href, to: this.props.to },
          this.props.submenu
        ),
        _react2.default.createElement(
          'div',
          { className: submenuClasses },
          this.props.children
        )
      );
    }

    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */

  }, {
    key: 'classes',
    get: function get() {
      var _classNames;

      return (0, _classnames2.default)("carbon-menu-item", this.props.className, (_classNames = {}, _defineProperty(_classNames, "carbon-menu-item--has-link", this.props.href || this.props.to), _defineProperty(_classNames, "carbon-menu-item--has-submenu", this.props.submenu), _defineProperty(_classNames, "carbon-menu-item--selected", this.props.selected), _defineProperty(_classNames, "carbon-menu-item--divide", this.props.divide), _classNames));
    }
  }]);

  return MenuItem;
}(_react2.default.Component);

MenuItem.propTypes = {
  /**
   * Defines which direction the submenu will hang eg. left/right
   *
   * @property submenuDirection
   * @type {String}
   */
  submenuDirection: _react2.default.PropTypes.string,

  /**
   * Is the menu item the currently selected item.
   *
   * @property selected
   * @type {Boolean}
   */
  selected: _react2.default.PropTypes.bool,

  /**
   * (for submenus) renders with a divide between items.
   *
   * @property divide
   * @type {Boolean}
   */
  divide: _react2.default.PropTypes.bool,

  /**
   * A title for the menu item that has a submenu.
   *
   * @property submenu
   * @type {String | Object}
   */
  submenu: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),

  /**
   * The href to use for the menu item.
   *
   * @property href
   * @type {String}
   */
  href: _react2.default.PropTypes.string,

  /**
   * The to link to use for the menu item.
   *
   * @property to
   * @type {String}
   */
  to: _react2.default.PropTypes.string,

  /**
   * The target to use for the menu item.
   *
   * @property target
   * @type {String}
   */
  target: _react2.default.PropTypes.string
};
MenuItem.defaultProps = {
  submenuDirection: "right"
};
exports.default = MenuItem;