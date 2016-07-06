/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_css = require('./../../utils/css');

/*istanbul ignore next*/
var _css2 = _interopRequireDefault(_css);

var /*istanbul ignore next*/_input = require('./../../utils/decorators/input');

/*istanbul ignore next*/
var _input2 = _interopRequireDefault(_input);

var /*istanbul ignore next*/_inputLabel = require('./../../utils/decorators/input-label');

/*istanbul ignore next*/
var _inputLabel2 = _interopRequireDefault(_inputLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonToggle = /*istanbul ignore next*/(0, _input2.default)( /*istanbul ignore next*/(0, _inputLabel2.default)( /*istanbul ignore next*/(_temp = _class = function (_React$Component) {
  _inherits(ButtonToggle, _React$Component);

  function ButtonToggle() {
    _classCallCheck(this, ButtonToggle);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonToggle).apply(this, arguments));
  }

  _createClass(ButtonToggle, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.inputHTML
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {void}
     */
    get: function get() {
      return 'ui-button-toggle';
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-button-toggle__input', /*istanbul ignore next*/_css2.default.hidden)
      );
    }

    /**
     * Returns the markup for the icon.
     *
     * @method icon
     * @return {Object} JSX
     */

  }, {
    key: 'icon',
    get: function get() {
      if (!this.props.icon) {
        return null;
      }

      var classes = /*istanbul ignore next*/(0, _classnames2.default)("ui-button-toggle__icon", /*istanbul ignore next*/_defineProperty({}, "ui-button-toggle__icon--large", this.props.iconSize === "large"));

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: classes },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: this.props.icon })
        )
      );
    }

    /**
     * A getter that combines props passed down from the input decorator with
     * textbox specific props.
     *
     * @method inputProps
     * @return {Object} props for the input
     */

  }, {
    key: 'inputProps',
    get: function get() {
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var children = _props.children;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['children']);

      props.className = this.inputClasses;
      props.type = "radio";
      return props;
    }

    /**
     * Returns additional content to sit inline with the input.
     *
     * @method additionalInputContent
     * @return {Object} JSX
     */

  }, {
    key: 'additionalInputContent',
    get: function get() {
      var classes = /*istanbul ignore next*/(0, _classnames2.default)("ui-button-toggle__label", /*istanbul ignore next*/_defineProperty({}, "ui-button-toggle__label--disabled", this.props.disabled));

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'label',
          /*istanbul ignore next*/{ htmlFor: this.inputProps.id, className: classes },
          this.icon,
          this.props.children
        )
      );
    }
  }]);

  return ButtonToggle;
}( /*istanbul ignore next*/_react2.default.Component), _class.propTypes = {
  /**
   * Which icon the button should render.
   *
   * @property icon
   * @type {String}
   */
  icon: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Sets the size of the icon (eg. large)
   *
   * @property iconSize
   * @type {String}
   */
  iconSize: /*istanbul ignore next*/_react2.default.PropTypes.string
}, _temp)));

/*istanbul ignore next*/exports.default = ButtonToggle;