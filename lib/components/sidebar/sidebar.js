'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidebarHeader = exports.Sidebar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sidebarHeader = require('./sidebar-header');

var _sidebarHeader2 = _interopRequireDefault(_sidebarHeader);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _modal = require('./../modal');

var _modal2 = _interopRequireDefault(_modal);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Sidebar widget.
 *
 * == How to use a Sidebar in a component:
 *
 * In your file
 *
 *   import { Sidebar } from 'carbon/lib/components/sidebar';
 *
 * To render the Sidebar:
 *
 *   <Sidebar
 *     onCancel={ closeSidebar }
 *     open={ true }
 *   />
 *
 * Side bar is positioned on the right hand screen of the window by default.
 * To position the sidebar on the left hand side pass `position='left'` to the component.
 *
 * The background behind the sidebar is disabled by default. To allow the user to interact
 * with all the UI pass `enableBackgroundUI={ true}` to the component
 *
 * @class Sidebar
 * @constructor
 */
var Sidebar = function (_Modal) {
  _inherits(Sidebar, _Modal);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'mainClasses',


    /**
     * Returns classes for the component.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-sidebar', this.props.className);
    }

    /**
     * Returns classes for the sidebar.
     *
     * @method sidebarClasses
     * @return {String} sidebar className
     */

  }, {
    key: 'sidebarClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-sidebar__sidebar', 'carbon-sidebar__sidebar--' + this.props.position, 'carbon-sidebar__sidebar--' + this.props.size);
    }

    /**
     * Returns the markup for the close icon.
     *
     * @method closeButton
     * @return {Object} JSX
     */

  }, {
    key: 'closeButton',
    get: function get() {
      if (this.props.onCancel) {
        return _react2.default.createElement(
          'span',
          { className: 'carbon-sidebar__close' },
          _react2.default.createElement(_icon2.default, { className: 'carbon-sidebar__close-icon', type: 'close', onClick: this.props.onCancel })
        );
      }
    }

    /**
     * Returns the computed HTML for the sidebar.
     *
     * @method sidebarHTML
     * @return {Object} JSX for sidebar
     */

  }, {
    key: 'modalHTML',
    get: function get() {
      return _react2.default.createElement(
        'div',
        { className: this.sidebarClasses },
        this.closeButton,
        this.props.children
      );
    }
  }, {
    key: 'transitionName',
    get: function get() {
      return 'sidebar--' + this.props.position;
    }
  }]);

  return Sidebar;
}(_modal2.default);

Sidebar.propTypes = {

  /**
   * A custom close event handler
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _react2.default.PropTypes.func,

  /**
   * Sets the open state of the sidebar
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: _react2.default.PropTypes.bool,

  /**
   * Determines if the user can interact with
   * the background ui when the sidebar is open
   *
   * @property enableBackgroundUI
   * @type {Boolean}
   * @default false
   */
  enableBackgroundUI: _react2.default.PropTypes.bool,

  /**
   * Determines the position of the sidebar
   * 'left' or 'right'
   *
   * @property position
   * @type {String}
   * @default 'right'
   */
  position: _react2.default.PropTypes.string,

  /**
   * Size of dialog, default size is 450px
   *
   * @property size
   * @type {String}
   * @default medium
   */
  size: _react2.default.PropTypes.string
};
Sidebar.defaultProps = {
  position: 'right',
  size: 'medium'
};
exports.Sidebar = Sidebar;
exports.SidebarHeader = _sidebarHeader2.default;