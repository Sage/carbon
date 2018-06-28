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

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _lodash = require('lodash');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _date = require('./../date');

var _date2 = _interopRequireDefault(_date);

var _dateRange = require('./../../utils/validations/date-range');

var _dateRange2 = _interopRequireDefault(_dateRange);

var _date3 = require('./../../utils/helpers/date');

var _date4 = _interopRequireDefault(_date3);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

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
        if (_date4.default.isValidDate(_this.endDate)) {
          // resets validations on opposing field. This is a code smell
          _this._endDate._handleContentChange();
        }
      }

      if (changedDate === 'endDate') {
        _this.props.onChange([_this.startDate, newValue]);
        if (_date4.default.isValidDate(_this.startDate)) {
          // resets validations on opposing field. This is a code smell
          _this._startDate._handleContentChange();
        }
      }

      // Triggers validations on both fields
      if (_date4.default.isValidDate(newValue)) {
        _this._startDate._handleBlur();
        _this._endDate._handleBlur();
      }
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
    key: 'startDateProps',


    /**
     * The startDate props
     *
     * @method startDateProps
     * @return {Object} the props that are applied to the child start Date component
     */
    value: function startDateProps() {
      return this.dateProps('start', [new _dateRange2.default({
        endDate: this.endDate,
        messageText: this.startMessage
      })]);
    }

    /**
     * The endDate props
     *
     * @method endDateProps
     * @return {Object} the props that are applied to the child end Date component
     */

  }, {
    key: 'endDateProps',
    value: function endDateProps() {
      return this.dateProps('end', [new _dateRange2.default({
        startDate: this.startDate,
        messageText: this.endMessage
      })]);
    }

    /**
     * The startDate/endDate props
     *
     * @method dateProps
     * @return {Object} the props that are applied to the child Date components
     */

  }, {
    key: 'dateProps',
    value: function dateProps(propsKey, defaultValidations) {
      var _this2 = this;

      var dateProps = this.props[propsKey + 'DateProps'] || {};

      var props = (0, _lodash.assign)({}, {
        label: this.props[propsKey + 'Label'],
        labelInline: this.props.labelsInline,
        onChange: this._onChange.bind(null, propsKey + 'Date'),
        ref: function ref(c) {
          _this2['_' + propsKey + 'Date'] = c;
        },
        value: this[propsKey + 'Date']
      }, dateProps);

      props.className = (0, _classnames2.default)('carbon-date-range', 'carbon-date-range__' + propsKey, dateProps.className);

      props.validations = defaultValidations.concat(dateProps.validations || []);
      return props;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        (0, _tags2.default)('date-range', this.props),
        _react2.default.createElement(_date2.default, _extends({}, this.startDateProps(), { onFocus: this.focusStart,
          'data-element': 'start-date'
        })),
        _react2.default.createElement(_date2.default, _extends({}, this.endDateProps(), { onFocus: this.focusEnd,
          'data-element': 'end-date'
        }))
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
      if (this.props.startDateProps && this.props.startDateProps.value) {
        return this.props.startDateProps.value;
      }
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
      if (this.props.endDateProps && this.props.endDateProps.value) {
        return this.props.endDateProps.value;
      }
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
   * Optional label for endDate field
   * eslint is disabled because the prop is used to determine the label in the dateProps function
   *
   * @property endDate
   * @type {String}
   */
  endLabel: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types

  /**
   * Custom callback - receives array of startDate and endDate
   *
   * @property onChange
   * @type {Func}
   */
  onChange: _propTypes2.default.func.isRequired,

  /**
   * An array containing the value of startDate and endDate
   *
   * @property value
   * @type {Array}
   */
  value: _propTypes2.default.array.isRequired,

  /**
   * Optional label for startDate field
   * eslint is disabled because the prop is used to determine the label in the dateProps function
   *
   * @property startLabel
   * @type {String}
   */
  startLabel: _propTypes2.default.string, // eslint-disable-line react/no-unused-prop-types

  /**
   * Custom message for startDate field
   *
   * @property startDate
   * @type {String}
   */
  startMessage: _propTypes2.default.string,

  /**
   * Custom message for endDate field
   *
   * @property endDate
   * @type {String}
   */
  endMessage: _propTypes2.default.string,

  /**
   * Display labels inline
   *
   * @property labelsInline
   * @type {Boolean}
   */
  labelsInline: _propTypes2.default.bool,

  /**
   * Props for the child start Date component
   *
   * @property startDateProps
   * @type {Object}
   */
  startDateProps: _propTypes2.default.object,

  /**
   * Props for the child end Date component
   *
   * @property endDateProps
   * @type {Object}
   */
  endDateProps: _propTypes2.default.object
};
exports.default = DateRange;