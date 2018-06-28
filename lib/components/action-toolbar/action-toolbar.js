'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A ActionToolbar widget.
 *
 * == How to use a ActionToolbar in a component:
 *
 * In your file
 *
 *   import ActionToolbar from 'carbon/lib/components/action-toolbar';
 *
 * To render an ActionToolbar:
 *
 *   let actions = {
 *     subscription: {
 *       text: "Add Subscriptions",
 *       icon: "basket",
 *       onClick: onClickHandler(event, selected) => {}
 *     },
 *     delete: {
 *       text: "Delete",
 *       icon: "bin",
 *       onClick: onClickHandler(event, selected) => {}
 *     }
 *   };
 *
 *   <ActionToolbar total={ count } actions={ actions } />
 *
 *  Additional props for Link or Icon can be passed in the action object.
 *
 * @class ActionToolbar
 * @constructor
 */
var ActionToolbar = function (_React$Component) {
  _inherits(ActionToolbar, _React$Component);

  // TODO This component needs to be freestanding - we need to provide an api that allows it be used independently.
  // https://github.com/Sage/carbon/issues/1070

  function ActionToolbar() {
    var _ref;

    _classCallCheck(this, ActionToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ActionToolbar.__proto__ || Object.getPrototypeOf(ActionToolbar)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      /**
       * @property total
       * @type {Number}
       */
      total: 0,

      /**
       * @property selected
       * @type {Object}
       */
      selected: {}
    };

    _this.handleOnClick = function (onClick, selected) {
      if (!onClick) {
        return null;
      }
      return function (event) {
        return onClick(selected, event);
      };
    };

    _this.propsForChildren = function () {
      return {
        disabled: !_this.isActive(),
        selected: _this.state.selected,
        total: _this.state.total
      };
    };

    _this.actions = _this.actions.bind(_this);
    _this.isActive = _this.isActive.bind(_this);
    _this.mainClasses = _this.mainClasses.bind(_this);
    _this.buildAction = _this.buildAction.bind(_this);
    return _this;
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
     * @method actions
     * @return {Array}
     */

  }, {
    key: 'actions',
    value: function actions() {
      var actions = [];

      for (var key in this.props.actions) {
        var action = this.props.actions[key];
        actions.push(this.buildAction(action, key));
      }

      return actions;
    }

    /**
     * @method handleOnClick
     * @return {Function}
     */

  }, {
    key: 'isActive',


    /**
     * @method isActive
     * @return {Boolean}
     */
    value: function isActive() {
      return this.state.total > 0;
    }

    /**
     * @method mainClasses
     * @return {String}
     */

  }, {
    key: 'mainClasses',
    value: function mainClasses() {
      return (0, _classnames2.default)('carbon-action-toolbar', this.props.className);
    }

    /**
     * @method linkClasses
     * @return {String}
     */

  }, {
    key: 'linkClasses',
    value: function linkClasses(className) {
      return (0, _classnames2.default)('carbon-action-toolbar__action', className);
    }

    /**
     * @method buildAction
     * @return {Object} JSX
     */

  }, {
    key: 'buildAction',
    value: function buildAction(action, index) {
      var onClick = action.onClick,
          className = action.className,
          text = action.text,
          props = _objectWithoutProperties(action, ['onClick', 'className', 'text']);

      return _react2.default.createElement(
        _link2.default,
        _extends({
          className: this.linkClasses(className),
          'data-element': 'action',
          disabled: !this.isActive(),
          key: index,
          onClick: this.handleOnClick(onClick, this.state.selected)
        }, props),
        text
      );
    }
  }, {
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses() }, (0, _tags2.default)('action-toolbar', this.props)),
        _react2.default.createElement(
          'div',
          { className: 'carbon-action-toolbar__total' },
          _react2.default.createElement(
            'strong',
            { 'data-element': 'total' },
            this.state.total
          ),
          '\xA0',
          _i18nJs2.default.t('action_toolbar.selected', { defaultValue: 'Selected' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-action-toolbar__actions' },
          this.actions(),
          this.props.children && this.props.children(this.propsForChildren())
        )
      );
    }
  }]);

  return ActionToolbar;
}(_react2.default.Component);

ActionToolbar.propTypes = {
  /**
   * The actions to display in the toolbar
   *
   * @property actions - each action is object with the action attributes
   * @type {Array}
   */
  actions: _propTypes2.default.object.isRequired,

  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * A function to return child components for the action toolbar.
   *
   * @property children
   * @type {Function}
   */
  children: _propTypes2.default.func
};
ActionToolbar.contextTypes = {
  attachActionToolbar: _propTypes2.default.func, // tracks the action toolbar component
  detachActionToolbar: _propTypes2.default.func // tracks the action toolbar component
};
exports.default = ActionToolbar;