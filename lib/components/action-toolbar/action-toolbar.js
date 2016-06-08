'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

/**
 * A ActionToolbar widget.
 *
 * == How to use a ActionToolbar in a component:
 *
 * In your file
 *
 *   import ActionToolbar from 'carbon/lib/components/action-toolbar';
 *
 * To render a ActionToolbar:
 *
 *   let actions = [{
 *     text: "Add Subscriptions",
 *     icon: "basket"
 *   }, {
 *     text: "Delete",
 *     icon: "bin"
 *   }];
 *
 *   <ActionToolbar total={ count } actions={ actions } />
 *
 * @class ActionToolbar
 * @constructor
 */

var ActionToolbar = (function (_React$Component) {
  _inherits(ActionToolbar, _React$Component);

  function ActionToolbar() {
    var _this = this;

    _classCallCheck(this, ActionToolbar);

    _get(Object.getPrototypeOf(ActionToolbar.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      /**
       * @property total
       * @type {Number}
       */
      total: 0,

      /**
       * @property selected
       * @type {Array}
       */
      selected: []
    };

    this.buildAction = function (action, index) {
      var onClick = action.onClick;
      var text = action.text;
      var className = action.className;

      var props = _objectWithoutProperties(action, ['onClick', 'text', 'className']);

      className = (0, _classnames2['default'])("ui-action-toolbar__action", className);
      onClick = onClick ? onClick.bind(_this, _this.state.selected) : null;

      return _react2['default'].createElement(
        _link2['default'],
        _extends({
          className: className,
          disabled: !_this.isActive,
          key: index,
          onClick: onClick
        }, props),
        text
      );
    };
  }

  _createClass(ActionToolbar, [{
    key: 'componentWillMount',
    // tracks the action toolbar component

    /**
     * @method componentWillMount
     * @return {Void}
     */
    value: function componentWillMount() {
      if (this.context.attachActionToolbar) {
        this.context.attachActionToolbar(this);
      }
    }

    /**
     * @method componentWillUnmount
     * @return {Void}
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context.detachActionToolbar) {
        this.context.detachActionToolbar(this);
      }
    }
  }, {
    key: 'render',

    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        _react2['default'].createElement(
          'div',
          { className: 'ui-action-toolbar__total' },
          _react2['default'].createElement(
            'strong',
            null,
            this.state.total
          ),
          ' ',
          _i18nJs2['default'].t("action_toolbar.selected", { defaultValue: "Selected" })
        ),
        _react2['default'].createElement(
          'div',
          { className: 'ui-action-toolbar__actions' },
          this.actions
        )
      );
    }
  }, {
    key: 'actions',

    /**
     * @method actions
     * @return {Array}
     */
    get: function get() {
      var actions = [];

      for (var key in this.props.actions) {
        var action = this.props.actions[key];
        actions.push(this.buildAction(action, key));
      }

      return actions;
    }

    /**
     * @method isActive
     * @return {Boolean}
     */
  }, {
    key: 'isActive',
    get: function get() {
      return this.state.total > 0;
    }

    /**
     * @method mainClasses
     * @return {String}
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2['default'])("ui-action-toolbar", this.props.className);
    }
  }], [{
    key: 'contextTypes',
    value: {
      attachActionToolbar: _react2['default'].PropTypes.func, // tracks the action toolbar component
      detachActionToolbar: _react2['default'].PropTypes.func },
    enumerable: true
  }]);

  return ActionToolbar;
})(_react2['default'].Component);

exports['default'] = ActionToolbar;
module.exports = exports['default'];

/**
 * @method buildAction
 * @return {Object} JSX
 */