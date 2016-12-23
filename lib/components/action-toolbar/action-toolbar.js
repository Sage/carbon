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

var _class, _temp2;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ActionToolbar: {
    displayName: 'ActionToolbar'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/action-toolbar/action-toolbar.js',
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
var ActionToolbar = _wrapComponent('ActionToolbar')((_temp2 = _class = function (_React$Component) {
  _inherits(ActionToolbar, _React$Component);

  function ActionToolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ActionToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ActionToolbar.__proto__ || Object.getPrototypeOf(ActionToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
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
    }, _this.buildAction = function (action, index) {
      var onClick = action.onClick,
          text = action.text,
          className = action.className,
          props = _objectWithoutProperties(action, ['onClick', 'text', 'className']);

      className = (0, _classnames2.default)("carbon-action-toolbar__action", className);
      onClick = onClick ? onClick.bind(_this, _this.state.selected) : null;

      return _react3.default.createElement(
        _link2.default,
        _extends({
          className: className,
          disabled: !_this.isActive,
          key: index,
          onClick: onClick
        }, props),
        text
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ActionToolbar, [{
    key: 'componentWillMount',


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

    /**
     * @method buildAction
     * @return {Object} JSX
     */

  }, {
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react3.default.createElement(
        'div',
        { className: this.mainClasses },
        _react3.default.createElement(
          'div',
          { className: 'carbon-action-toolbar__total' },
          _react3.default.createElement(
            'strong',
            null,
            this.state.total
          ),
          ' ',
          _i18nJs2.default.t("action_toolbar.selected", { defaultValue: "Selected" })
        ),
        _react3.default.createElement(
          'div',
          { className: 'carbon-action-toolbar__actions' },
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
      return (0, _classnames2.default)("carbon-action-toolbar", this.props.className);
    }
  }]);

  return ActionToolbar;
}(_react3.default.Component), _class.contextTypes = {
  attachActionToolbar: _react3.default.PropTypes.func, // tracks the action toolbar component
  detachActionToolbar: _react3.default.PropTypes.func // tracks the action toolbar component
}, _temp2));

exports.default = ActionToolbar;