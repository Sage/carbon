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

var _flux = require('./../../utils/flux');

var _tags = require('./../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _dialog = require('./../../components/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _configurableItemsContent = require('./configurable-items-content');

var _configurableItemsContent2 = _interopRequireDefault(_configurableItemsContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigurableItemsPattern = function (_React$Component) {
  _inherits(ConfigurableItemsPattern, _React$Component);

  function ConfigurableItemsPattern() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ConfigurableItemsPattern);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfigurableItemsPattern.__proto__ || Object.getPrototypeOf(ConfigurableItemsPattern)).call.apply(_ref, [this].concat(args))), _this), _this.onCancel = function (event) {
      _actions2.default.toggleDialogOpen();
      if (_this.props.onCancel) {
        _this.props.onCancel(event);
      }
    }, _this.onChange = function (rowIndex) {
      _actions2.default.updateItem(rowIndex);
    }, _this.onDrag = function (dragIndex, hoverIndex) {
      _actions2.default.reorderItems(dragIndex, hoverIndex);
    }, _this.onReset = function (event) {
      _actions2.default.toggleDialogOpen();
      if (_this.props.onReset) {
        _this.props.onReset(event);
      }
    }, _this.onSave = function (event) {
      _this.props.onSave(event, _this.itemsData);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ConfigurableItemsPattern, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.itemsData && this.open && this.open !== prevState.configurableItemsStore.get('open')) {
        _actions2.default.updateData(this.props.itemsData);
      }
    }
  }, {
    key: 'content',
    value: function content() {
      if (this.itemsData.size === 0) {
        return null;
      }
      return _react2.default.createElement(_configurableItemsContent2.default, {
        itemsData: this.itemsData,
        onCancel: this.onCancel,
        onChange: this.onChange,
        onDrag: this.onDrag,
        onReset: this.onReset,
        onSave: this.onSave
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _dialog2.default,
        _extends({}, (0, _tags2.default)('configurable-items-pattern', this.props), {
          className: this.mainClasses,
          onCancel: this.onCancel,
          open: this.isDialogOpen,
          title: this.props.title,
          stickyFormFooter: true
        }),
        this.content()
      );
    }
  }, {
    key: 'itemsData',
    get: function get() {
      return this.state.configurableItemsStore.get('items_data');
    }
  }, {
    key: 'open',
    get: function get() {
      return this.state.configurableItemsStore.get('open');
    }

    /**
     * Determines if the dialog is open
     *
     * The dialog is only considered open once the content has loaded. Otherwise the central
     * positioning of the dialog is based on incorrect content height.
     *
     * @method isDialogOpen
     * @return {Boolean}
     */

  }, {
    key: 'isDialogOpen',
    get: function get() {
      return this.open && this.itemsData.size !== 0;
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('configurable-items-pattern', this.props.className);
    }
  }]);

  return ConfigurableItemsPattern;
}(_react2.default.Component);

ConfigurableItemsPattern.propTypes = {
  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The configurable data.
   *
   * @property itemsData
   * @type {Object}
   */
  itemsData: _propTypes2.default.object,

  /**
   * Callback triggered when the form is cancelled.
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _propTypes2.default.func,

  /**
   * Callback triggered when the form reset button is pressed.
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
  onSave: _propTypes2.default.func.isRequired,

  /**
   * The title for the dialog.
   *
   * @property title
   * @type {Object}
   */
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
exports.default = (0, _flux.connect)(ConfigurableItemsPattern, _store2.default);