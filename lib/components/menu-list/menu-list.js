'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuList = exports.MenuListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _escapeStringRegexp = require('escape-string-regexp');

var _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _textbox = require('./../textbox');

var _textbox2 = _interopRequireDefault(_textbox);

var _menuListItem = require('./menu-list-item');

var _menuListItem2 = _interopRequireDefault(_menuListItem);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

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

      /** Actions * */
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
    key: 'onSearch',
    value: function onSearch(ev) {
      this.setState({ filter: ev.target.value, open: true });
    }
  }, {
    key: 'toggleChildren',
    value: function toggleChildren() {
      this.setState({ open: !this.state.open });
    }

    /** Helpers * */

  }, {
    key: 'showMenuItems',
    value: function showMenuItems() {
      return !this.props.title || !this.props.collapsible || this.state.open;
    }

    /** Markup * */

  }, {
    key: 'filterHTML',
    value: function filterHTML() {
      if (!this.props.filter) {
        return null;
      }

      return _react2.default.createElement(
        _menuListItem2.default,
        { key: 'filter' },
        _react2.default.createElement(_textbox2.default, {
          onChange: this.onSearch,
          value: this.state.filter || '',
          autoFocus: true,
          icon: 'search',
          placeholder: this.props.filterPlaceholder
        })
      );
    }
  }, {
    key: 'mainClasses',
    value: function mainClasses() {
      return (0, _classnames2.default)('carbon-menu-list', this.props.className);
    }
  }, {
    key: 'menuItems',
    value: function menuItems() {
      if (this.showMenuItems()) {
        var items = this.props.children;

        if (this.props.filter && this.state.filter) {
          var regex = new RegExp((0, _escapeStringRegexp2.default)(this.state.filter), 'i');
          items = items.filter(function (child) {
            return child.props.name.search(regex) > -1;
          });
        }

        return [this.filterHTML(), items];
      }
      return null;
    }
  }, {
    key: 'menuTitle',
    value: function menuTitle() {
      if (!this.props.title) {
        return null;
      }

      return _react2.default.createElement(
        _link2.default,
        {
          className: 'carbon-menu-list__title',
          'data-element': 'title',
          onClick: this.toggleChildren
        },
        this.props.title
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses() }, (0, _tags2.default)('menu-list', this.props)),
        this.menuTitle(),
        _react2.default.createElement(
          'ul',
          { className: 'carbon-menu-list__list' },
          this.menuItems()
        )
      );
    }
  }]);

  return MenuList;
}(_react2.default.Component);

MenuList.propTypes = {
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
   * Allow the menu to be collapsed
   *
   * @property collapsible
   * @type {Boolean}
   */
  collapsible: _propTypes2.default.bool,

  /**
   * Allow the menu to be filtered
   *
   * @property filter
   * @type {Boolean}
   */
  filter: _propTypes2.default.bool,

  /**
   * Placeholder text for the filter
   *
   * @property filterPlaceholder
   * @type {String}
   */
  filterPlaceholder: _propTypes2.default.string,

  /**
   * Set the menu open on mount
   *
   * @property initiallyOpen
   * @type {Boolean}
   */
  initiallyOpen: _propTypes2.default.bool,

  /**
   * The menu title
   *
   * @property title
   * @type {String}
   */
  title: _propTypes2.default.string
};
MenuList.defaultProps = {
  filter: false,
  collapsible: true
};
exports.MenuListItem = _menuListItem2.default;
exports.MenuList = MenuList;