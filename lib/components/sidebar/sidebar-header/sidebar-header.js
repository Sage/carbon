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

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tags = require('../../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  SidebarHeader: {
    displayName: 'SidebarHeader'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/sidebar/sidebar-header/sidebar-header.js',
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
 * A Sidebar Header widget.
 *
 * Sidebar header can be used as a first child of the Sidebar component
 *
 * == How to use a Sidebar Header in a component:
 *
 * In your file
 *
 *   import { Sidebar, SidebarHeader } from 'carbon/lib/components/sidebar';
 *
 * To render the Sidebar Header:
 *
 *   <Sidebar
 *     onClose={ closeSidebar }
 *     open={ true }
 *   >
 *   <SidebarHeader />
 *   </Sidebar>
 *
 * @class SidebarHeader
 * @constructor
 */
var SidebarHeader = _wrapComponent('SidebarHeader')((_temp = _class = function (_React$Component) {
  _inherits(SidebarHeader, _React$Component);

  function SidebarHeader() {
    _classCallCheck(this, SidebarHeader);

    return _possibleConstructorReturn(this, (SidebarHeader.__proto__ || Object.getPrototypeOf(SidebarHeader)).apply(this, arguments));
  }

  _createClass(SidebarHeader, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags.tagComponent)('sidebar-header', this.props)),
        this.props.children
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Returns classes for the component.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-sidebar-header', this.props.className);
    }
  }]);

  return SidebarHeader;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Required prop which will be the content
   * of the sidebar header
   *
   * @property children
   * @type {Multiple}
   */
  children: _propTypes2.default.node
}, _temp));

exports.default = SidebarHeader;