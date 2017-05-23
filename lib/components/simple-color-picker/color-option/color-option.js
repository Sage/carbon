'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require('./../../../utils/decorators/input');

var _input2 = _interopRequireDefault(_input);

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _tags = require('../../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  ColorOption: {
    displayName: 'ColorOption'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/simple-color-picker/color-option/color-option.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

/**
 * A single square with a color, implemented as a radio button.
 */
var ColorOption = (0, _input2.default)(_wrapComponent('ColorOption')((_temp = _class = function (_React$Component) {
  _inherits(ColorOption, _React$Component);

  function ColorOption() {
    _classCallCheck(this, ColorOption);

    return _possibleConstructorReturn(this, (ColorOption.__proto__ || Object.getPrototypeOf(ColorOption)).apply(this, arguments));
  }

  _createClass(ColorOption, [{
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'li',
        _extends({ className: this.mainClasses }, (0, _tags.tagComponent)('color-option', this.props)),
        this.inputHTML
      );
    }
  }, {
    key: 'inputProps',


    /**
     * The props used by the Input decorator when creating the input element.
     */
    get: function get() {
      return {
        className: this.inputClasses,
        onChange: this.props.onChange,
        checked: this.props.checked,
        name: this.props.name,
        type: "radio",
        value: this.props.color
      };
    }
  }, {
    key: 'additionalInputContent',
    get: function get() {
      return this.colorSampleBox;
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
      return 'carbon-color-option__radio-button-input';
    }
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-color-option', this.props.className);
    }
  }, {
    key: '_colorSampleClasses',
    get: function get() {
      var color = (0, _lodash.trim)(this.props.color, '#');
      return (0, _classnames2.default)('carbon-color-option__color-sample', 'carbon-color-option__color-sample--' + color);
    }
  }, {
    key: '_tickedIcon',
    get: function get() {
      return _react3.default.createElement(_icon2.default, { type: 'tick', className: 'carbon-color-option__tick' });
    }
  }, {
    key: '_colorSampleStyle',
    get: function get() {
      return (0, _lodash.startsWith)(this.props.color, '#') ? { backgroundColor: this.props.color } : {};
    }
  }, {
    key: 'colorSampleBox',
    get: function get() {
      return _react3.default.createElement(
        'div',
        { className: this._colorSampleClasses, style: this._colorSampleStyle },
        this._tickedIcon
      );
    }
  }]);

  return ColorOption;
}(_react3.default.Component), _class.propTypes = {
  /**
   * the value of the color that is represented by this ColorOption.
   *
   * @property color
   * @type {String}
   */
  color: _propTypes2.default.string,

  /**
   * the input name.
   *
   * @property name
   * @type {String}
   */
  name: _propTypes2.default.string,

  /**
   * called when the user selects or deselects this color option.
   *
   * @property onChange
   * @type {Function}
   */
  onChange: _propTypes2.default.func,

  /**
   * determines if this color option is selected or unselected.
   *
   * @property checked
   * @type {Boolean}
   */
  checked: _propTypes2.default.bool
}, _temp)));

exports.default = ColorOption;