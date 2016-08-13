/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_date = require('./../date');

/*istanbul ignore next*/
var _date2 = _interopRequireDefault(_date);

var /*istanbul ignore next*/_dateRange = require('./../../utils/validations/date-range');

/*istanbul ignore next*/
var _dateRange2 = _interopRequireDefault(_dateRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateRange = function (_React$Component) {
  _inherits(DateRange, _React$Component);

  function DateRange() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, DateRange);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(DateRange)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._onChange = function (changedDate, ev) {
      var newValue = ev.target.value;

      if (changedDate === 'startDate') {
        /*istanbul ignore next*/_this.props.onChange([newValue, /*istanbul ignore next*/_this.endDate]);
        // resets validations on opposing field
        /*istanbul ignore next*/_this._endDate._handleContentChange();
      }

      if (changedDate === 'endDate') {
        /*istanbul ignore next*/_this.props.onChange([/*istanbul ignore next*/_this.startDate, newValue]);
        // resets validations on opposing field
        /*istanbul ignore next*/_this._startDate._handleContentChange();
      }

      // Triggers validations on both fields
      /*istanbul ignore next*/_this._startDate._handleBlur();
      /*istanbul ignore next*/_this._endDate._handleBlur();
    }, _this.focusStart = function () {
      /*istanbul ignore next*/_this._endDate.closeDatePicker();
    }, _this.focusEnd = function () {
      /*istanbul ignore next*/_this._startDate.closeDatePicker();
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
      /*istanbul ignore next*/
      var _this2 = this;

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/null,
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_date2.default, /*istanbul ignore next*/{
            className: 'ui-date-range ui-date-range__start',
            label: this.props.startLabel,
            labelInline: this.props.labelsInline,
            onChange: this._onChange.bind(null, 'startDate'),
            onFocus: this.focusStart,
            ref: function /*istanbul ignore next*/ref(c) {
              /*istanbul ignore next*/_this2._startDate = c;
            },
            validations: [new /*istanbul ignore next*/_dateRange2.default({
              endDate: this.endDate,
              messageText: this.startMessage
            })],
            value: this.startDate
          }),
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_date2.default, /*istanbul ignore next*/{
            className: 'ui-date-range',
            label: this.props.endLabel,
            labelInline: this.props.labelsInline,
            onChange: this._onChange.bind(null, 'endDate'),
            onFocus: this.focusEnd,
            ref: function /*istanbul ignore next*/ref(c) {
              /*istanbul ignore next*/_this2._endDate = c;
            },
            validations: [new /*istanbul ignore next*/_dateRange2.default({
              startDate: this.startDate,
              messageText: this.endMessage
            })],
            value: this.endDate
          })
        )
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
      return this.props.startMessage || /*istanbul ignore next*/_i18nJs2.default.t('errors.messages.date_range', { defaultValue: 'Start date must not be later than the end date' });
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
      return this.props.endMessage || /*istanbul ignore next*/_i18nJs2.default.t('errors.messages.date_range', { defaultValue: 'End date cannot be earlier than the start date' });
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
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/DateRange.propTypes = {

  /**
   * Custom callback - receives array of startDate and endDate
   *
   * @property onChange
   * @type {Func}
   */
  onChange: /*istanbul ignore next*/_react.PropTypes.func.isRequired,

  /**
   * An array containing the value of startDate and endDate
   *
   * @property value
   * @type {Array}
   */
  value: /*istanbul ignore next*/_react.PropTypes.array.isRequired,

  /**
   * Optional label for startDate field
   *
   * @property startLabel
   * @type {String}
   */
  startLabel: /*istanbul ignore next*/_react.PropTypes.string,

  /**
   * Optional label for endDate field
   *
   * @property endDate
   * @type {String}
   */
  endLabel: /*istanbul ignore next*/_react.PropTypes.string,

  /**
   * Custom message for startDate field
   *
   * @property startDate
   * @type {String}
   */
  startMessage: /*istanbul ignore next*/_react.PropTypes.string,

  /**
   * Custom message for endDate field
   *
   * @property endDate
   * @type {String}
   */
  endMessage: /*istanbul ignore next*/_react.PropTypes.string,

  /**
   * Display labels inline
   *
   * @property labelsInline
   * @type {Boolean}
   */
  labelsInline: /*istanbul ignore next*/_react.PropTypes.bool
};
/*istanbul ignore next*/exports.default = DateRange;