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

var _form = require('./../form');

var _form2 = _interopRequireDefault(_form);

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class Filter
 * @constructor
 */
var Filter = function (_Form) {
  _inherits(Filter, _Form);

  function Filter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function (ev) {
      ev.preventDefault();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Handles the submission of the form.
   *
   * @method handleSubmit
   * @param {Object}
   */


  _createClass(Filter, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'form',
        _extends({ className: this.classes, onSubmit: this.handleSubmit }, (0, _tags.tagComponent)('filter', this.props)),
        this.props.children
      );
    }
  }, {
    key: 'classes',


    /**
     * Returns the classes for the filter.
     *
     * @method classes
     * @return {String}
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-filter', this.props.className, 'carbon-filter--align-' + this.props.align);
    }
  }]);

  return Filter;
}(_form2.default);

Filter.propTypes = {
  /**
   * Aligns the children in the filter.
   *
   * @property align
   * @type {String}
   * @default left
   */
  align: _propTypes2.default.string
};
Filter.defaultProps = {
  align: 'left'
};
exports.default = Filter;