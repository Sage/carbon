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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var SidebarHeader = function (_React$Component) {
  _inherits(SidebarHeader, _React$Component);

  function SidebarHeader() {
    _classCallCheck(this, SidebarHeader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SidebarHeader).apply(this, arguments));
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.props.children
        )
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-sidebar-header', this.props.className)
      );
    }
  }]);

  return SidebarHeader;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/SidebarHeader.propTypes = {

  /**
   * Required prop which will be the content
   * of the sidebar header
   *
   * @property children
   * @type {Multiple}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.node
};
/*istanbul ignore next*/exports.default = SidebarHeader;