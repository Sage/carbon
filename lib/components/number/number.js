/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_input = require('./../../utils/decorators/input');

/*istanbul ignore next*/
var _input2 = _interopRequireDefault(_input);

var /*istanbul ignore next*/_inputLabel = require('./../../utils/decorators/input-label');

/*istanbul ignore next*/
var _inputLabel2 = _interopRequireDefault(_inputLabel);

var /*istanbul ignore next*/_inputValidation = require('./../../utils/decorators/input-validation');

/*istanbul ignore next*/
var _inputValidation2 = _interopRequireDefault(_inputValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A number widget. It only allows entering of a whole number with an
 * optional minus sign.
 *
 * == How to use a Number in a component:
 *
 * In your file
 *
 *   import Number from 'carbon/lib/components/number';
 *
 * To render a Number:
 *
 *   <Number name="myNumber" />
 *
 * @class Number
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Number = /*istanbul ignore next*/(0, _input2.default)( /*istanbul ignore next*/(0, _inputLabel2.default)( /*istanbul ignore next*/(0, _inputValidation2.default)( /*istanbul ignore next*/function (_React$Component) {
  _inherits(Number, _React$Component);

  function Number() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Number);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Number)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleOnChange = function (ev) {
      if (isValidNumber(ev.target.value)) {
        /*istanbul ignore next*/_this._handleOnChange(ev);
      } else {
        // reset the value
        ev.target.value = /*istanbul ignore next*/_this.props.value || null;
        // reset the selection range
        ev.target.setSelectionRange( /*istanbul ignore next*/_this.selectionStart, /*istanbul ignore next*/_this.selectionEnd);
      }
    }, _this.handleKeyDown = function (ev) {
      // track the selection start and end
      /*istanbul ignore next*/_this.selectionStart = ev.target.selectionStart;
      /*istanbul ignore next*/_this.selectionEnd = ev.target.selectionEnd;

      if ( /*istanbul ignore next*/_this.props.onKeyDown) {
        // we also send the props so more information can be extracted by the action
        /*istanbul ignore next*/_this.props.onKeyDown(ev, /*istanbul ignore next*/_this.props);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Number, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.labelHTML,
          this.inputHTML,
          this.validationHTML,
          this.fieldHelpHTML
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-number', this.props.className)
      );
    }

    /**
     * Input class getter
     *
     * @method inputClasses
     * @return {String} Input className
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return 'ui-number__input';
    }

    /**
     * Handles Change to input field
     *
     * @method handleOnChange
     * @param {Object} ev event
     * @return {void}
     */


    /*
     * Triggers on key down of the input
     *
     * @method handleKeyDown
     * @param {Object} ev event
     * @return {void}
     */

  }, {
    key: 'inputProps',


    /**
     * A getter that combines props passed down from the input decorator with
     * number specific props.
     *
     * @method inputProps
     * @return {Object} props for the input
     */
    get: function get() {
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.inputClasses;
      props.onChange = this.handleOnChange;
      props.onKeyDown = this.handleKeyDown;
      return props;
    }
  }]);

  return Number;
}( /*istanbul ignore next*/_react2.default.Component))));

/**
 * Checks that the given value is valid number.
 *
 * @method isValidNumber
 * @private
 * @param {String} value number to check validity
 * @return {Boolean} true if value is valid number
 */
function isValidNumber(value) {
  var regex = /*istanbul ignore next*/void 0,
      result = /*istanbul ignore next*/void 0;
  regex = new RegExp('^[-]?[0-9]*$');
  result = regex.test(value);

  return result;
}

/*istanbul ignore next*/exports.default = Number;