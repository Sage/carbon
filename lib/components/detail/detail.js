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

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Detail = function (_React$Component) {
  _inherits(Detail, _React$Component);

  function Detail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.icon = function () {
      if (!_this.props.icon) {
        return null;
      }

      return _react2.default.createElement(_icon2.default, {
        className: 'carbon-detail__icon', type: _this.props.icon,
        'data-element': 'icon'
      });
    }, _this.footnote = function () {
      if (!_this.props.footnote) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'carbon-detail__footnote', 'data-element': 'footnote' },
        _this.props.footnote
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Detail, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        _extends({ className: this.classes }, (0, _tags2.default)('detail', this.props)),
        this.icon(),
        _react2.default.createElement(
          'div',
          { className: 'carbon-detail__content' },
          this.props.children
        ),
        this.footnote()
      );
    }
  }, {
    key: 'classes',


    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-detail', this.props.className, {
        'carbon-detail--has-icon': this.props.icon
      });
    }

    /**
     * Returns the markup for the icon if one if specified.
     *
     * @method icon
     * @return {Object} JSX
     */


    /**
     * Returns the markup for the footnote if one if specified.
     *
     * @method footnote
     * @return {Object} JSX
     */

  }]);

  return Detail;
}(_react2.default.Component);

Detail.propTypes = {
  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * The type of icon to use.
   *
   * @property icon
   * @type {Object}
   */
  icon: _propTypes2.default.string,

  /**
   * A small detail to display under the main content.
   *
   * @property footnote
   * @type {String}
   */
  footnote: _propTypes2.default.string,

  /**
   * The rendered children of the component.
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node };
exports.default = Detail;