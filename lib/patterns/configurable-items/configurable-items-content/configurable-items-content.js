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

var _configurableItems = require('../../../components/configurable-items');

var _tags = require('../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigurableItemsContent = function (_React$Component) {
  _inherits(ConfigurableItemsContent, _React$Component);

  function ConfigurableItemsContent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ConfigurableItemsContent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfigurableItemsContent.__proto__ || Object.getPrototypeOf(ConfigurableItemsContent)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (rowId) {
      return function () {
        _this.props.onChange(rowId);
      };
    }, _this.rows = function (itemsData) {
      return itemsData.map(function (item, rowIndex) {
        return _react2.default.createElement(_configurableItems.ConfigurableItemRow, {
          enabled: item.get('enabled'),
          key: rowIndex,
          locked: item.get('locked'),
          name: item.get('name'),
          rowIndex: rowIndex,
          onChange: _this.onChange(rowIndex)
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ConfigurableItemsContent, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          itemsData = _props.itemsData,
          configurableItemsProps = _objectWithoutProperties(_props, ['itemsData']);

      return _react2.default.createElement(
        _configurableItems.ConfigurableItems,
        _extends({}, configurableItemsProps, (0, _tags2.default)('configurable-items-content', this.props)),
        this.rows(itemsData)
      );
    }
  }]);

  return ConfigurableItemsContent;
}(_react2.default.Component);

ConfigurableItemsContent.propTypes = {
  /**
   * The configurable item data.
   *
   * @property itemsData
   * @type {Object}
   */
  itemsData: _propTypes2.default.object,

  /**
   * Callback triggered when the form is canceled.
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _propTypes2.default.func.isRequired,

  /**
   * Callback triggered when the checkbox checked value is updated.
   *
   * @property onChange
   * @type {Function}
   */
  onChange: _propTypes2.default.func.isRequired,

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
exports.default = ConfigurableItemsContent;