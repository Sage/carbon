'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _date = require('./../date');

var _date2 = _interopRequireDefault(_date);

var _dateRange = require('./../../utils/validations/date-range');

var _dateRange2 = _interopRequireDefault(_dateRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateRange);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateRange.__proto__ || Object.getPrototypeOf(DateRange)).call.apply(_ref, [this].concat(args))), _this), _this._onChange = function (changedDate, ev) {
      var newValue = ev.target.value;

      if (changedDate === 'startDate') {
        _this.props.onChange([newValue, _this.endDate]);
        // resets validations on opposing field
        _this._endDate._handleContentChange();
      }

      if (changedDate === 'endDate') {
        _this.props.onChange([_this.startDate, newValue]);
        // resets validations on opposing field
        _this._startDate._handleContentChange();
      }

      // Triggers validations on both fields
      _this._startDate._handleBlur();
      _this._endDate._handleBlur();
    }, _this.focusStart = function () {
      _this._endDate.closeDatePicker();
    }, _this.focusEnd = function () {
      _this._startDate.closeDatePicker();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * onChange function -triggers validations on both fields and updates opposing field when one changed.
   *
   * @property _onChange
   * @type {func}
   * @param{String} the date field that has changedDate
   * @param{Object} ev the event containing the new date value
   */


  _createClass(DateRange, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_date2.default, {
          className: 'carbon-date-range carbon-date-range__start',
          label: this.props.startLabel,
          labelInline: this.props.labelsInline,
          onChange: this._onChange.bind(null, 'startDate'),
          onFocus: this.focusStart,
          ref: function ref(c) {
            _this2._startDate = c;
          },
          validations: [new _dateRange2.default({
            endDate: this.endDate,
            messageText: this.startMessage
          })],
          value: this.startDate
        }),
        _react2.default.createElement(_date2.default, {
          className: 'carbon-date-range',
          label: this.props.endLabel,
          labelInline: this.props.labelsInline,
          onChange: this._onChange.bind(null, 'endDate'),
          onFocus: this.focusEnd,
          ref: function ref(c) {
            _this2._endDate = c;
          },
          validations: [new _dateRange2.default({
            startDate: this.startDate,
            messageText: this.endMessage
          })],
          value: this.endDate
        })
      );
    }
  }, {
    key: 'startDate',


    /**
     * The startDate value
     *
     * @method startDate
     * @return {String} the value of the start date
     */
    get: function get() {
      return this.props.value[0];
    }

    /**
     * The endDate value
     *
     * @method endDate
     * @return {String} the value of the end date
     */

  }, {
    key: 'endDate',
    get: function get() {
      return this.props.value[1];
    }

    /**
     * The error message for the start message.
     *
     * @method startMessage
     * @return {String}
     */

  }, {
    key: 'startMessage',
    get: function get() {
      return this.props.startMessage || _i18nJs2.default.t('errors.messages.date_range', { defaultValue: 'Start date must not be later than the end date' });
    }

    /**
     * The error message for the end message.
     *
     * @method endMessage
     * @return {String}
     */

  }, {
    key: 'endMessage',
    get: function get() {
      return this.props.endMessage || _i18nJs2.default.t('errors.messages.date_range', { defaultValue: 'End date cannot be earlier than the start date' });
    }

    /**
     * Handle focus on start date field
     *
     * @method focusStart
     * @return {Void}
     */


    /**
     * Handle focus on end date field
     *
     * @method focusEnd
     * @return {Void}
     */

  }]);

  return DateRange;
}(_react2.default.Component);

DateRange.propTypes = {

  /**
   * Custom callback - receives array of startDate and endDate
   *
   * @property onChange
   * @type {Func}
   */
  onChange: _react.PropTypes.func.isRequired,

  /**
   * An array containing the value of startDate and endDate
   *
   * @property value
   * @type {Array}
   */
  value: _react.PropTypes.array.isRequired,

  /**
   * Optional label for startDate field
   *
   * @property startLabel
   * @type {String}
   */
  startLabel: _react.PropTypes.string,

  /**
   * Optional label for endDate field
   *
   * @property endDate
   * @type {String}
   */
  endLabel: _react.PropTypes.string,

  /**
   * Custom message for startDate field
   *
   * @property startDate
   * @type {String}
   */
  startMessage: _react.PropTypes.string,

  /**
   * Custom message for endDate field
   *
   * @property endDate
   * @type {String}
   */
  endMessage: _react.PropTypes.string,

  /**
   * Display labels inline
   *
   * @property labelsInline
   * @type {Boolean}
   */
  labelsInline: _react.PropTypes.bool
};
exports.default = DateRange;