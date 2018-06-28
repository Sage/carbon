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

var _tags = require('./../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _dragAndDrop = require('./../../drag-and-drop');

var _checkbox = require('./../../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigurableItemRow = function (_React$Component) {
  _inherits(ConfigurableItemRow, _React$Component);

  function ConfigurableItemRow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ConfigurableItemRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ConfigurableItemRow.__proto__ || Object.getPrototypeOf(ConfigurableItemRow)).call.apply(_ref, [this].concat(args))), _this), _this.classes = function (dragAndDropActiveIndex, index) {
      return (0, _classnames2.default)('configurable-item-row', _this.props.className, {
        'configurable-item-row--dragged': _this.dragged(dragAndDropActiveIndex, index),
        'configurable-item-row--dragging': _this.draggingIsOccurring(dragAndDropActiveIndex)
      });
    }, _this.listItemHTML = function () {
      var _this$props = _this.props,
          rowIndex = _this$props.rowIndex,
          enabled = _this$props.enabled,
          locked = _this$props.locked,
          name = _this$props.name,
          onChange = _this$props.onChange;

      return _react2.default.createElement(
        'li',
        {
          className: _this.classes(_this.context.dragAndDropActiveIndex, rowIndex),
          ref: function ref(node) {
            _this._listItem = node;
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'configurable-item-row__content-wrapper' },
          _this.icon(),
          _this.checkbox(enabled, locked, name, onChange)
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ConfigurableItemRow, [{
    key: 'checkbox',
    value: function checkbox(enabled, locked, name, onChange) {
      return _react2.default.createElement(_checkbox2.default, {
        value: enabled,
        disabled: locked,
        label: name,
        onChange: onChange
      });
    }
  }, {
    key: 'iconHTML',
    value: function iconHTML() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_icon2.default, {
          className: 'configurable-item-row__icon',
          type: 'drag_vertical'
        })
      );
    }
  }, {
    key: 'icon',
    value: function icon() {
      var _this2 = this;

      return _react2.default.createElement(
        _dragAndDrop.WithDrag,
        { draggableNode: function draggableNode() {
            return _this2._listItem;
          } },
        this.iconHTML()
      );
    }
  }, {
    key: 'dragged',


    /**
     * Determines if the item has been dragged.
     *
     * @method dragged
     * @return {Boolean}
     */
    value: function dragged(dragAndDropActiveIndex, index) {
      return this.draggingIsOccurring(dragAndDropActiveIndex) && dragAndDropActiveIndex === index;
    }

    /**
     * Determines if dragging is occurring within the current draggable context.
     *
     * @method draggingIsOccurring
     * @return {Boolean}
     */

  }, {
    key: 'draggingIsOccurring',
    value: function draggingIsOccurring(dragAndDropActiveIndex) {
      return typeof dragAndDropActiveIndex === 'number';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _dragAndDrop.WithDrop,
        _extends({ index: this.props.rowIndex }, (0, _tags2.default)('configurable-item-row', this.props)),
        this.listItemHTML()
      );
    }
  }]);

  return ConfigurableItemRow;
}(_react2.default.Component);

ConfigurableItemRow.propTypes = {
  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The checked value for the checkbox.
   *
   * @property enabled
   * @type {Boolean}
   */
  enabled: _propTypes2.default.bool,

  /**
   * The disabled value for the checkbox.
   *
   * @property locked
   * @type {Boolean}
   */
  locked: _propTypes2.default.bool,

  /**
   * The label for the row.
   *
   * @property name
   * @type {String}
   */
  name: _propTypes2.default.string,

  /**
   * Callback triggered when the checkbox checked value is updated.
   *
   * @property onChange
   * @type {Function}
   */
  onChange: _propTypes2.default.func,

  /**
   * The unique index for the row.
   *
   * @property rowIndex
   * @type {Number}
   */
  rowIndex: _propTypes2.default.number
};
ConfigurableItemRow.contextTypes = {
  dragDropManager: _propTypes2.default.object, // the React DND DragDropManager
  dragAndDropActiveIndex: _propTypes2.default.number // tracks the currently active index
};
exports.default = ConfigurableItemRow;