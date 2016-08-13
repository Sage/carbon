/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubmenuBlock = exports.MenuItem = exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_menuItem = require('./menu-item');

/*istanbul ignore next*/
var _menuItem2 = _interopRequireDefault(_menuItem);

var /*istanbul ignore next*/_submenuBlock = require('./submenu-block');

/*istanbul ignore next*/
var _submenuBlock2 = _interopRequireDefault(_submenuBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders a menu component, with menu items.
 */

var Menu = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
  }

  _createClass(Menu, [{
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.classes },
          this.props.children
        )
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
      return (/*istanbul ignore next*/(0, _classnames2.default)("ui-menu", this.props.className, /*istanbul ignore next*/'ui-menu--' + this.props.as)
      );
    }
  }]);

  return Menu;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Menu.propTypes = {
  as: /*istanbul ignore next*/_react2.default.PropTypes.string // defines the style of the component eg. primary/secondary
};
/*istanbul ignore next*/Menu.defaultProps = {
  as: "primary"
};
/*istanbul ignore next*/exports.Menu = Menu;
/*istanbul ignore next*/exports.MenuItem = _menuItem2.default;
/*istanbul ignore next*/exports.SubmenuBlock = _submenuBlock2.default;