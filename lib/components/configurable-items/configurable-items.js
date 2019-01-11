'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurableItemRow = exports.ConfigurableItems = undefined;

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

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _dragAndDrop = require('../drag-and-drop');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _configurableItemRow = require('./configurable-item-row');

var _configurableItemRow2 = _interopRequireDefault(_configurableItemRow);

var _form = require('../form');

var _form2 = _interopRequireDefault(_form);

require('./configurable-items.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigurableItems = function (_React$Component) {
  _inherits(ConfigurableItems, _React$Component);

  function ConfigurableItems() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ConfigurableItems);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfigurableItems.__proto__ || Object.getPrototypeOf(ConfigurableItems)).call.apply(_ref, [this].concat(args))), _this), _this.onReset = function (event) {
      event.preventDefault();
      _this.props.onReset();
    }, _this.additionalActions = function () {
      if (!_this.props.onReset) {
        return null;
      }
      return _react2.default.createElement(
        _button2.default,
        { onClick: _this.onReset, className: 'carbon-button--reset' },
        _i18nJs2.default.t('actions.reset', { defaultValue: 'Reset' })
      );
    }, _this.rows = function () {
      return _react2.default.createElement(
        'ol',
        { className: 'carbon-configurable-items__items-wrapper' },
        _this.props.children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ConfigurableItems, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: this.classes }, (0, _tags2.default)('configurable-items', this.props)),
        _react2.default.createElement(
          _dragAndDrop.DraggableContext,
          { onDrag: this.props.onDrag },
          _react2.default.createElement(
            _form2.default,
            {
              leftAlignedActions: this.additionalActions(),
              onSubmit: this.props.onSave,
              onCancel: this.props.onCancel
            },
            this.rows()
          )
        )
      );
    }
  }, {
    key: 'classes',
    get: function get() {
      return (0, _classnames2.default)('carbon-configurable-items', this.props.className);
    }
  }]);

  return ConfigurableItems;
}(_react2.default.Component);

ConfigurableItems.propTypes = {
  /**
   * Children elements.
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Callback triggered when the form is canceled.
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _propTypes2.default.func.isRequired,

  /**
   * Callback triggered when an item is dragged.
   *
   * @property onDrag
   * @type {Function}
   */
  onDrag: _propTypes2.default.func.isRequired,

  /**
   * Callback triggered when when the reset button is pressed.
   *
   * @property onReset
   * @type {Function}
   */
  onReset: _propTypes2.default.func,

  /**
   * Callback triggered when the form is saved.
   *
   * @property onSave
   * @type {Function}
   */
  onSave: _propTypes2.default.func.isRequired
};
exports.ConfigurableItems = ConfigurableItems;
exports.ConfigurableItemRow = _configurableItemRow2.default;