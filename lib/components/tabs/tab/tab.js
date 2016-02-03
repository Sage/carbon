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

/**
 * A Tab widget.
 *
 * == How to use a Tab Widget in a component:
 *  See Tabs component
 *
 * @class Tab
 * @constructor
 */

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    var _this = this;

    _classCallCheck(this, Tab);

    _get(Object.getPrototypeOf(Tab.prototype), 'constructor', this).apply(this, arguments);

    this.state = {

      /**
       * Tracks if the tab is a valid state
       *
       * @property isValid
       * @type {Boolean}
       */
      isValid: true
    };

    this.setValidity = function (valid) {
      _this.context.tabs.changeValidity(_this.props.tabId, valid);
      _this.setState({ isValid: valid });
    };
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
          setValidity: this.setValidity
        }
      };
    }
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
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
      var classes = this.props.className || '';

      if (!this.state.isValid) {
        classes += ' ui-tab--errors';
      }

      return 'ui-tab ' + classes;
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Visible title in tabs header
       * Consumed within tabs component
       *
       * @property title
       * @type {String}
       *
       */
      title: _react2['default'].PropTypes.string.isRequired,

      /**
       * id to identify the tab within the component
       * used when validating and switching tabs
       *
       * @property tabId
       * @type {String}
       */
      tabId: _react2['default'].PropTypes.string.isRequired
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {

      /**
       * Defines what contexts are available to this tab componenet
       * https://facebook.github.io/react/docs/context.html
       *
       * @property tabs
       * @type {Object}
       */
      tabs: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {

      /**
       * Defines a context object for context children of this tab component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property tab
       * @type {Object}
       */
      tab: _react2['default'].PropTypes.object
    },
    enumerable: true
  }]);

  return Tab;
})(_react2['default'].Component);

exports['default'] = Tab;
module.exports = exports['default'];

/**
 * Sets valid state to passed param
 * It notifies the parent context of the change
 * and sets the current valid state to the new value
 *
 * @method setValidity
 * @param {Boolean} valid updates validity of this tab
 */