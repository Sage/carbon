'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Sidebar = (function (_Modal) {
  _inherits(Sidebar, _Modal);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    _get(Object.getPrototypeOf(Sidebar.prototype), 'constructor', this).apply(this, arguments);
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
      return (0, _classnames2['default'])('ui-sidebar', this.props.className);
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
      return (0, _classnames2['default'])('ui-sidebar__sidebar', 'ui-sidebar__sidebar--' + this.props.position);
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
      return _react2['default'].createElement(
        'div',
        { className: this.sidebarClasses },
        _react2['default'].createElement(
          'span',
          { className: 'ui-sidebar__close' },
          _react2['default'].createElement(_icon2['default'], { className: 'ui-sidebar__close-icon', type: 'close', onClick: this.props.onCancel })
        ),
        this.props.children
      );
    }
  }, {
    key: 'transitionName',
    get: function get() {
      return 'sidebar--' + this.props.position;
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * A custom close event handler
       *
       * @property onCancel
       * @type {Function}
       */
      onCancel: _react2['default'].PropTypes.func.isRequired,

      /**
       * Sets the open state of the sidebar
       *
       * @property open
       * @type {Boolean}
       * @default false
       */
      open: _react2['default'].PropTypes.bool,

      /**
       * Determines if the user can interact with
       * the background ui when the sidebar is open
       *
       * @property enableBackgroundUI
       * @type {Boolean}
       * @default false
       */
      enableBackgroundUI: _react2['default'].PropTypes.bool,

      /**
       * Determines the position of the sidebar
       * 'left' or 'right'
       *
       * @property position
       * @type {String}
       * @default 'right'
       */
      position: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      position: 'right'
    },
    enumerable: true
  }]);

  return Sidebar;
})(_modal2['default']);

exports.Sidebar = Sidebar;
exports.SidebarHeader = _sidebarHeader2['default'];