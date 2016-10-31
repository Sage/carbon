'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuList = exports.MenuListItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('components/link');

var _link2 = _interopRequireDefault(_link);

var _textbox = require('components/textbox');

var _textbox2 = _interopRequireDefault(_textbox);

var _menuListItem = require('./menu-list-item');

var _menuListItem2 = _interopRequireDefault(_menuListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

 *
 * == How to use a MenuList in a component:
 *
 * In your file:
 *
 *   import { MenuList, MenuListItem } from 'carbon/lib/components/menu-list';
 *
 * To render the Link:
 *
 *  <MenuList href='foo'>
 *    <MenuListItem>foo</MenuListItem>
 *    <MenuListItem>bar</MenuListItem>
 *    <MenuListItem>
 *      <MenuList>
 *        I'm nestable
 *      </MenuList>
 *    </MenuListItem>
 *  </MenuList>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class MenuList
 * @constructor
 */
var MenuList = function (_React$Component) {
  _inherits(MenuList, _React$Component);

  function MenuList() {
    var _ref;

    _classCallCheck(this, MenuList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = MenuList.__proto__ || Object.getPrototypeOf(MenuList)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      filter: null,
      open: _this.props.initiallyOpen || false
    };


    _this.filterHTML = _this.filterHTML.bind(_this);
    _this.mainClasses = _this.mainClasses.bind(_this);
    _this.menuItems = _this.menuItems.bind(_this);
    _this.menuTitle = _this.menuTitle.bind(_this);
    _this.onSearch = _this.onSearch.bind(_this);
    _this.showMenuItems = _this.showMenuItems.bind(_this);
    _this.toggleChildren = _this.toggleChildren.bind(_this);
    return _this;
  }

  _createClass(MenuList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.menuTitle(),
        _react2.default.createElement(
          'ul',
          { className: this.mainClasses() },
          this.menuItems()
        )
      );
    }

    /** Actions **/

  }, {
    key: 'onSearch',
    value: function onSearch(ev) {
      this.setState({ filter: ev.target.value, open: true });
    }
  }, {
    key: 'toggleChildren',
    value: function toggleChildren() {
      this.setState({ open: !this.state.open });
    }

    /** Helpers **/

  }, {
    key: 'showMenuItems',
    value: function showMenuItems() {
      return !this.props.title || !this.props.collapsible || this.state.open;
    }

    /** Markup **/

  }, {
    key: 'filterHTML',
    value: function filterHTML() {
      if (!this.props.filter) {
        return null;
      }

      return _react2.default.createElement(
        _menuListItem2.default,
        { key: 'filter' },
        _react2.default.createElement(_textbox2.default, { onChange: this.onSearch, value: this.state.filter })
      );
    }
  }, {
    key: 'mainClasses',
    value: function mainClasses() {
      return (0, _classnames2.default)("carbon-menu-list", this.props.className);
    }
  }, {
    key: 'menuItems',
    value: function menuItems() {
      var _this2 = this;

      if (this.showMenuItems()) {
        var items = this.props.children;

        if (this.props.filter && this.state.filter) {
          (function () {
            var regex = new RegExp((0, _escapeStringRegexp2.default)(_this2.state.filter), 'i');
            items = items.filter(function (child) {
              return child.props.name.search(regex) > -1;
            });
          })();
        }

        return [this.filterHTML(), items];
      }
    }
  }, {
    key: 'menuTitle',
    value: function menuTitle() {
      if (!this.props.title) {
        return null;
      }

      return _react2.default.createElement(
        _link2.default,
        { className: 'carbon-menu-list__title', onClick: this.toggleChildren },
        this.props.title
      );
    }
  }]);

  return MenuList;
}(_react2.default.Component);

MenuList.propTypes = {
  children: _react.PropTypes.array.isRequired,
  className: _react.PropTypes.string,
  filter: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  collapsible: _react.PropTypes.bool
};
MenuList.defaultProps = {
  filter: false,
  collapsible: true
};
exports.MenuListItem = _menuListItem2.default;
exports.MenuList = MenuList;