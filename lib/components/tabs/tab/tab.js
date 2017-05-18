'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Tab: {
    displayName: 'Tab'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/tabs/tab/tab.js',
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
 * A Tab widget.
 *
 * == How to use a Tab Widget in a component:
 *  See Tabs component
 *
 * @class Tab
 * @constructor
 */
var Tab = _wrapComponent('Tab')((_temp2 = _class = function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tab);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tab.__proto__ || Object.getPrototypeOf(Tab)).call.apply(_ref, [this].concat(args))), _this), _this.state = {

      /**
       * Tracks if the tab is a valid state
       *
       * @property isValid
       * @type {Boolean}
       */
      isValid: true,

      /**
       * Tracks if the tab is a warning state
       *
       * @property isWarning
       * @type {Boolean}
       */
      isWarning: false
    }, _this.setValidity = function (valid) {
      _this.context.tabs.changeValidity(_this.props.tabId, valid);
      _this.setState({ isValid: valid });
    }, _this.setWarning = function (warning) {
      _this.context.tabs.changeWarning(_this.props.tabId, warning);
      _this.setState({ isWarning: warning });
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

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react3.default.createElement(
        'div',
        { className: this.mainClasses },
        this.props.children
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Classes to be applied to the single tab component
     *
     * @method mainClasses Main Class getter
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-tab', this.props.className);
    }
  }]);

  return Tab;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Visible title in tabs header
   * Consumed within tabs component
   *
   * @property title
   * @type {String}
   *
   */
  title: _propTypes2.default.string.isRequired,

  /**
   * id to identify the tab within the component
   * used when validating and switching tabs
   *
   * @property tabId
   * @type {String}
   */
  tabId: _propTypes2.default.string.isRequired
}, _class.contextTypes = {

  /**
   * Defines what contexts are available to this tab componenet
   * https://facebook.github.io/react/docs/context.html
   *
   * @property tabs
   * @type {Object}
   */
  tabs: _propTypes2.default.object
}, _class.childContextTypes = {

  /**
   * Defines a context object for context children of this tab component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property tab
   * @type {Object}
   */
  tab: _propTypes2.default.object
}, _temp2));

exports.default = Tab;