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

var _colorOption2 = require('./color-option');

var _colorOption3 = _interopRequireDefault(_colorOption2);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component that displays squares with color samples that
 * you can choose from.
 *
 * == How to use a SimpleColorPicker in a component:
 *
 *   import SimpleColorPicker from 'carbon/lib/components/simple-color-picker';
 *
 *   <SimpleColorPicker
 *     availableColors={ ['transparent', '#ff0102', '#34ff01'] }
 *     selectedColor='#34ff01'
 *     name='settings[color_of_something]'
 *   />
 *
 */
var SimpleColorPicker = function (_React$Component) {
  _inherits(SimpleColorPicker, _React$Component);

  function SimpleColorPicker() {
    _classCallCheck(this, SimpleColorPicker);

    return _possibleConstructorReturn(this, (SimpleColorPicker.__proto__ || Object.getPrototypeOf(SimpleColorPicker)).apply(this, arguments));
  }

  _createClass(SimpleColorPicker, [{
    key: '_isOptionChecked',


    /**
     * Returns true if the color passed as argument is currently
     * checked.
     *
     * @method isOptionChecked
     * @private
     * @return {Boolean}
     */
    value: function _isOptionChecked(color) {
      return this.props.selectedColor === color;
    }

    /**
     * Returns a ColorOption component for a given color.
     *
     * @method colorOption
     * @private
     * @return {Object} JSX
     */

  }, {
    key: '_colorOption',
    value: function _colorOption(color) {
      var isChecked = this._isOptionChecked(color);

      return _react2.default.createElement(_colorOption3.default, {
        name: this.props.name,
        onChange: this.props.onChange,
        color: color,
        checked: isChecked,
        key: color
      });
    }

    /**
     * Returns ColorOption components for all available colors.
     *
     * @method colorOptions
     * @private
     * @return {Object} JSX
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: 'carbon-simple-color-picker' }, (0, _tags2.default)('simple-color-picker', this.props)),
        _react2.default.createElement(
          'ul',
          { className: 'carbon-simple-color-picker__color-options' },
          this._colorOptions
        )
      );
    }
  }, {
    key: '_colorOptions',
    get: function get() {
      var _this2 = this;

      return this.props.availableColors.map(function (color) {
        return _this2._colorOption(color);
      });
    }
  }]);

  return SimpleColorPicker;
}(_react2.default.Component);

SimpleColorPicker.propTypes = {
  /**
   * an array with all available colors that will be shown it the color picker.
   *
   * @property availableColors
   * @type {Array}
   */
  availableColors: _propTypes2.default.array,

  /**
   * the value of the currently selected color.
   *
   * @property selectedColor
   * @type {String}
   */
  selectedColor: _propTypes2.default.string,

  /**
   * the name of the input element.
   *
   * @property name
   * @type {String}
   */
  name: _propTypes2.default.string,

  /**
   * a callback when the user changes the selected color.
   *
   * @property onChange
   * @type {Function}
   */
  onChange: _propTypes2.default.func
};
SimpleColorPicker.defaultProps = {
  availableColors: [],
  selectedColor: '',
  name: '',
  onChange: null };
exports.default = SimpleColorPicker;