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

var _link = require('../../link');

var _link2 = _interopRequireDefault(_link);

var _tags = require('../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./menu-item.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var component = this.props.submenu ? 'div' : _link2.default;
      var props = {
        className: this.classes,
        href: this.props.href,
        to: this.props.to,
        target: this.props.target,
        onClick: this.props.onClick,
        icon: this.props.icon
      };

      props = (0, _lodash.assign)({}, props, (0, _tags2.default)('menu-item', this.props));

      return _react2.default.createElement(component, props, this.content);
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
      var submenuClasses = (0, _classnames2.default)('carbon-menu-item__submenu', 'carbon-menu-item__submenu--' + this.props.submenuDirection);

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          MenuItem,
          {
            className: 'carbon-menu-item__submenu-title', href: this.props.href,
            to: this.props.to
          },
          this.props.submenu
        ),
        _react2.default.createElement(
          'ul',
          { className: submenuClasses },
          _react2.default.Children.map(this.props.children, function (child) {
            return _react2.default.createElement(
              'li',
              { className: 'carbon-menu-item__submenu-item' },
              child
            );
          })
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
      return (0, _classnames2.default)('carbon-menu-item', this.props.className, {
        'carbon-menu-item--divide': this.props.divide,
        'carbon-menu-item--has-link': this.props.href || this.props.to || this.props.onClick,
        'carbon-menu-item--has-submenu': this.props.submenu,
        'carbon-menu-item--selected': this.props.selected
      });
    }
  }]);

  return MenuItem;
}(_react2.default.Component);

MenuItem.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node.isRequired,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * onClick handler
   *
   * @property onClick
   * @type {Function}
   */
  onClick: _propTypes2.default.func,

  /**
   * Adds an icon to the menu item.
   *
   * @property icon
   * @type {String}
   */
  icon: _propTypes2.default.string,

  /**
   * Defines which direction the submenu will hang eg. left/right
   *
   * @property submenuDirection
   * @type {String}
   */
  submenuDirection: _propTypes2.default.string,

  /**
   * Is the menu item the currently selected item.
   *
   * @property selected
   * @type {Boolean}
   */
  selected: _propTypes2.default.bool,

  /**
   * (for submenus) renders with a divide between items.
   *
   * @property divide
   * @type {Boolean}
   */
  divide: _propTypes2.default.bool,

  /**
   * A title for the menu item that has a submenu.
   *
   * @property submenu
   * @type {String | Object}
   */
  submenu: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * The href to use for the menu item.
   *
   * @property href
   * @type {String}
   */
  href: _propTypes2.default.string,

  /**
   * The to link to use for the menu item.
   *
   * @property to
   * @type {String}
   */
  to: _propTypes2.default.string,

  /**
   * The target to use for the menu item.
   *
   * @property target
   * @type {String}
   */
  target: _propTypes2.default.string
};
MenuItem.defaultProps = {
  submenuDirection: 'right' };
exports.default = MenuItem;