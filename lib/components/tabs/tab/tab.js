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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Tab widget.
 *
 * == How to use a Tab Widget in a component:
 *  See Tabs component
 *
 * @class Tab
 * @constructor
 */
var Tab = function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.setValidity = function (valid) {
      _this.context.tabs.changeValidity(_this.props.tabId, valid);
    }, _this.setWarning = function (warning) {
      _this.context.tabs.changeWarning(_this.props.tabId, warning);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tab, [{
    key: 'getChildContext',


    /**
     * Returns tab object to context children.
     *
     * @method getChildContext
     */
    value: function getChildContext() {
      return {
        tab: {
          setValidity: this.setValidity,
          setWarning: this.setWarning
        }
      };
    }

    /**
     * Classes to be applied to the single tab component
     *
     * @method mainClasses Main Class getter
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          'aria-labelledby': this.props['aria-labelledby'],
          className: this.mainClasses,
          role: this.props.role
        },
        this.props.children
      );
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-tab', this.props.className);
    }

    /**
     * Sets valid state to passed param
     * It notifies the parent context of the change
     * and sets the current valid state to the new value
     *
     * @method setValidity
     * @param {Boolean} valid updates validity of this tab
     */


    /**
     * Sets warning state to passed param
     * It notifies the parent context of the change
     * and sets the current warning state to the new value
     *
     * @method setWarning
     * @param {Boolean} warning updates warning of this tab
     */

  }]);

  return Tab;
}(_react2.default.Component);

Tab.propTypes = {
  /**
   * The id of the corresponding control that must be activated to show the tab
   *
   * @property aria-labelledby
   * @type {String}
   *
   */
  'aria-labelledby': _propTypes2.default.string,

  /**
   * The role of the component
   *
   * @property role
   * @type {String}
   *
   */
  role: _propTypes2.default.string,

  /**
   * Visible title in tabs header
   * Consumed within tabs component
   *
   * @property title
   * @type {String}
   *
   */
  title: _propTypes2.default.string.isRequired, // eslint-disable-line react/no-unused-prop-types

  /**
   * id to identify the tab within the component
   * used when validating and switching tabs
   *
   * @property tabId
   * @type {String}
   */
  tabId: _propTypes2.default.string.isRequired,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node
};
Tab.defaultProps = {
  className: '',
  children: null,
  role: 'tabPanel'
};
Tab.contextTypes = {

  /**
   * Defines what contexts are available to this tab componenet
   * https://facebook.github.io/react/docs/context.html
   *
   * @property tabs
   * @type {Object}
   */
  tabs: _propTypes2.default.object
};
Tab.childContextTypes = {

  /**
   * Defines a context object for context children of this tab component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property tab
   * @type {Object}
   */
  tab: _propTypes2.default.object };
exports.default = Tab;