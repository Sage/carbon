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

var /*istanbul ignore next*/_link = require('./../../link');

/*istanbul ignore next*/
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuItem).apply(this, arguments));
  }

  _createClass(MenuItem, [{
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      var component = this.props.submenu ? "div" : /*istanbul ignore next*/_link2.default;

      return (/*istanbul ignore next*/_react2.default.createElement(component, {
          className: this.classes,
          href: this.props.href,
          to: this.props.to,
          target: this.props.target
        }, this.content)
      );
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
      var submenuClasses = /*istanbul ignore next*/(0, _classnames2.default)("ui-menu-item__submenu", /*istanbul ignore next*/'ui-menu-item__submenu--' + this.props.submenuDirection);

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/null,
          /*istanbul ignore next*/_react2.default.createElement(
            MenuItem,
            /*istanbul ignore next*/{ className: 'ui-menu-item__submenu-title', href: this.props.href, to: this.props.to },
            this.props.submenu
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: submenuClasses },
            this.props.children
          )
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
      /*istanbul ignore next*/
      var _classNames;

      return (/*istanbul ignore next*/(0, _classnames2.default)("ui-menu-item", this.props.className, /*istanbul ignore next*/(_classNames = {}, _defineProperty(_classNames, "ui-menu-item--has-link", this.props.href || this.props.to), _defineProperty(_classNames, "ui-menu-item--has-submenu", this.props.submenu), _defineProperty(_classNames, "ui-menu-item--selected", this.props.selected), _defineProperty(_classNames, "ui-menu-item--divide", this.props.divide), _classNames))
      );
    }
  }]);

  return MenuItem;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/MenuItem.propTypes = {
  /**
   * Defines which direction the submenu will hang eg. left/right
   *
   * @property submenuDirection
   * @type {String}
   */
  submenuDirection: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Is the menu item the currently selected item.
   *
   * @property selected
   * @type {Boolean}
   */
  selected: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * (for submenus) renders with a divide between items.
   *
   * @property divide
   * @type {Boolean}
   */
  divide: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * A title for the menu item that has a submenu.
   *
   * @property submenu
   * @type {String | Object}
   */
  submenu: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.object]),

  /**
   * The href to use for the menu item.
   *
   * @property href
   * @type {String}
   */
  href: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The to link to use for the menu item.
   *
   * @property to
   * @type {String}
   */
  to: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The target to use for the menu item.
   *
   * @property target
   * @type {String}
   */
  target: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/MenuItem.defaultProps = {
  submenuDirection: "right"
};
/*istanbul ignore next*/exports.default = MenuItem;