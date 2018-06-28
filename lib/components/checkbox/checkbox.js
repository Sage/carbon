'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _input = require('./../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _inputLabel = require('./../../utils/decorators/input-label');

var _inputLabel2 = _interopRequireDefault(_inputLabel);

var _inputValidation = require('./../../utils/decorators/input-validation');

var _inputValidation2 = _interopRequireDefault(_inputValidation);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _ether = require('../../utils/ether');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Checkbox widget.
 *
 * == How to use a Checkbox in a component:
 *
 * In your file:
 *
 *   import Checkbox from 'carbon/lib/components/checkbox';
 *
 * To render the Checkbox:
 *
 *   <Checkbox name='myCheckbox' />
 *
 * @class Checkbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
var Checkbox = (0, _input2.default)((0, _inputLabel2.default)((0, _inputValidation2.default)((_temp2 = _class = function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnChange = function (ev) {
      // we handle the change event manually here, as we pass the checked param
      // instead of value
      _this._handleOnChange({ target: { value: ev.target.checked } });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Sets the value of the checkbox [true | false]
   *
   * @method handleOnChange
   * @param {Object} ev event
   * @return {void}
   */


  _createClass(Checkbox, [{
    key: 'render',


    /**
     * Renders the component with props.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var labelRight = void 0,
          labelLeft = void 0,
          fieldHelpLeft = void 0,
          fieldHelpRight = this.fieldHelpHTML;

      if (this.props.reverse) {
        labelLeft = this.labelHTML;

        if (this.props.fieldHelpInline) {
          fieldHelpLeft = this.fieldHelpHTML;
          fieldHelpRight = null;
        }
      } else {
        labelRight = this.labelHTML;
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, (0, _tags2.default)('checkbox', this.props)),
        labelLeft,
        fieldHelpLeft,
        _react2.default.createElement('input', this.hiddenInputProps),
        this.inputHTML,
        labelRight,
        fieldHelpRight,
        this.validationHTML
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Uses the mainClasses method provided by the decorator to add additional classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return 'carbon-checkbox';
    }

    /**
     * Uses the inputClasses method provided by the decorator to add additional classes.
     *
     * @method inputClasses
     * @return {String} input className
     */

  }, {
    key: 'inputClasses',
    get: function get() {
      return 'carbon-checkbox__input';
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * checkbox specific props.
     *
     * @method inputProps
     * @return {Object} Props to be applied to the input
     */

  }, {
    key: 'inputProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);
      // React uses checked instead of value to define the state of a checkbox


      props.checked = this.props.checked !== undefined ? this.props.checked : this.props.value;
      props.className = this.inputClasses;
      props.onChange = this.handleOnChange;
      props.type = 'checkbox';
      props.value = '1';
      return props;
    }

    /**
     * A getter for hidden input props.
     *
     * @method hiddenInputProps
     * @return {Object} Props to be applied to the hidden input
     */

  }, {
    key: 'hiddenInputProps',
    get: function get() {
      var props = {
        name: this.inputProps.name,
        readOnly: true,
        ref: 'hidden',
        type: 'hidden',
        value: '0',
        'data-element': 'hidden-input'
      };

      return props;
    }

    /**
     * Return the svg image for the checkbox
     *
     * @return {Object} JSX svg
     */

  }, {
    key: 'checkboxSprite',
    get: function get() {
      return _react2.default.createElement(
        'svg',
        {
          width: '15', height: '15',
          viewBox: '0 0 15 15'
        },
        _react2.default.createElement('rect', {
          className: 'checkbox-outline', fill: '#AFAFAF',
          x: '0', y: '0',
          width: '15', height: '15'
        }),
        _react2.default.createElement('rect', {
          className: 'checkbox-fill', fill: '#FFFFFF',
          x: '1', y: '1',
          width: '13', height: '13'
        }),
        _react2.default.createElement('path', {
          d: 'M5.06079081,11.805307 L2.2548404,9.4508351 C1.95287351,9.19745479 1.91372172,' + '8.74748731 2.16708208,8.44554418 L3.08395978,7.35285189 C3.3376225,7.05054844 3.78738919,' + '7.01144632 4.08921714,7.26471004 L6.46118447,9.25502694 L11.4959248,3.25485701 C11.7492184,' + '2.95299356 12.1993451,2.91365198 12.5012882,3.16701234 L13.5939805,4.08389004 C13.896284,' + '4.33755276 13.9353536,4.78735811 13.6820499,5.08923375 L8.30934217,11.4921775 C8.28333213,' + '11.5485068 8.24949267,11.6023543 8.20769039,11.6521724 L7.2908127,12.7448647 C7.12011041,' + '12.9482997 6.86060017,13.032541 6.61713008,12.9887006 C6.48855215,12.9709764 6.36324771,' + '12.9179844 6.25647356,12.8283903 L5.16378128,11.9115126 C5.12512704,11.8790778 5.09077658,' + '11.8434362 5.06079081,11.805307 L5.06079081,11.805307 Z', className: 'checkbox-check',
          fill: '#FFFFFF'
        })
      );
    }

    /**
     * Extends the input content to include the checkbox sprite
     *
     * @method additionalInputContent
     * @return {Object} JSX additional content inline with input
     */

  }, {
    key: 'additionalInputContent',
    get: function get() {
      return this.checkboxSprite;
    }

    /**
     * Returns classes for field help.
     *
     * @method fieldHelpClasses
     * @return {String}
     */

  }, {
    key: 'fieldHelpClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-checkbox__help-text', {
        'carbon-checkbox__help-text--reverse': this.props.reverse,
        'carbon-checkbox__help-text--inline': this.props.fieldHelpInline
      });
    }
  }]);

  return Checkbox;
}(_react2.default.Component), _class.propTypes = {
  /**
   * Set the value of the checkbox
   *
   * @property checked
   * @type {Boolean}
   */
  checked: _propTypes2.default.bool,

  /**
   * Displays fieldHelp inline with the checkbox
   *
   * @property fieldHelpInline
   * @type {Boolean}
   */
  fieldHelpInline: _propTypes2.default.bool,

  /**
   * Reverses label and checkbox display
   *
   * @property reverse
   * @type {Boolean}
   * @default false
   */
  reverse: _propTypes2.default.bool,

  /**
   * Set the value of the checkbox
   *
   * @property value
   * @type {Boolean}
   */
  value: _propTypes2.default.bool
}, _class.defaultProps = {
  reverse: false }, _temp2))));

exports.default = Checkbox;