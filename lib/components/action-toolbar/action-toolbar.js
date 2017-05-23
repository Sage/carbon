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

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _tags = require('../../utils/helpers/tags');

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
 * To render an ActionToolbar:
 *
 *   let actions = [{
 *     text: "Add Subscriptions",
 *     icon: "basket",
 *     onClick: onClickHandler() => {}
 *   }, {
 *     text: "Delete",
 *     icon: "bin",
 *     onClick: onClickHandler() => {}
 *   }];
 *
 *   <ActionToolbar total={ count } actions={ actions } />
 *
 *  Additional props for Link or Icon can be passed in the action object.
 *
 * @class ActionToolbar
 * @constructor
 */
var ActionToolbar = _wrapComponent('ActionToolbar')((_temp = _class = function (_React$Component) {
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
       * @type {Array}
       */
      selected: []
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
     * @method render
     * @return {Object} JSX
     */

  }, {
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses() }, (0, _tags.tagComponent)('action-toolbar', this.props)),
        _react3.default.createElement(
          'div',
          { className: 'carbon-action-toolbar__total' },
          _react3.default.createElement(
            'strong',
            { 'data-element': 'total' },
            this.state.total
          ),
          ' ',
          _i18nJs2.default.t('action_toolbar.selected', { defaultValue: 'Selected' })
        ),
        _react3.default.createElement(
          'div',
          { className: 'carbon-action-toolbar__actions' },
          this.actions()
        )
      );
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
     * @method isActive
     * @return {Boolean}
     */

  }, {
    key: 'isActive',
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

      className = (0, _classnames2.default)('carbon-action-toolbar__action', className);
      onClick = onClick ? onClick.bind(this, this.state.selected) : null;

      return _react3.default.createElement(
        _link2.default,
        _extends({
          className: className,
          'data-element': 'action',
          disabled: !this.isActive(),
          key: index,
          onClick: onClick
        }, props),
        text
      );
    }
  }]);

  return ActionToolbar;
}(_react3.default.Component), _class.propTypes = {
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
  className: _propTypes2.default.string
}, _class.contextTypes = {
  attachActionToolbar: _propTypes2.default.func, // tracks the action toolbar component
  detachActionToolbar: _propTypes2.default.func // tracks the action toolbar component
}, _temp));

exports.default = ActionToolbar;