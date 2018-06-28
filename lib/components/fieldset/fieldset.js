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

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Fieldset component.
 *
 * This component will stack inputs together.
 */
var Fieldset = function (_React$Component) {
  _inherits(Fieldset, _React$Component);

  function Fieldset() {
    _classCallCheck(this, Fieldset);

    return _possibleConstructorReturn(this, (Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).apply(this, arguments));
  }

  _createClass(Fieldset, [{
    key: 'render',


    /**
     * @method render
     */
    value: function render() {
      var _validProps = (0, _ether.validProps)(this),
          className = _validProps.className,
          props = _objectWithoutProperties(_validProps, ['className']);

      var classes = (0, _classnames2.default)('carbon-fieldset', className);

      return _react2.default.createElement(
        'fieldset',
        _extends({
          className: classes }, props, (0, _tags2.default)('fieldset', this.props)),
        this.legend,
        this.props.children
      );
    }
  }, {
    key: 'legend',


    /**
     * Returns the legend if on is defined.
     *
     * @method legend
     * @return {Object} JSX
     */
    get: function get() {
      if (!this.props.legend) {
        return null;
      }

      return _react2.default.createElement(
        'legend',
        { className: 'carbon-fieldset__legend common-input__label', 'data-element': 'legend' },
        this.props.legend
      );
    }
  }]);

  return Fieldset;
}(_react2.default.Component);

Fieldset.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * A label for the fieldset.
   *
   * @property legend
   * @type {String}
   */
  legend: _propTypes2.default.string
};
exports.default = Fieldset;