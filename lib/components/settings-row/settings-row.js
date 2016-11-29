'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _heading = require('./../heading');

var _heading2 = _interopRequireDefault(_heading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UI for a settings page row
 */
var SettingsRow = function (_React$Component) {
  _inherits(SettingsRow, _React$Component);

  function SettingsRow() {
    _classCallCheck(this, SettingsRow);

    return _possibleConstructorReturn(this, (SettingsRow.__proto__ || Object.getPrototypeOf(SettingsRow)).apply(this, arguments));
  }

  _createClass(SettingsRow, [{
    key: 'render',


    /**
     * Render settings page row
     *
     * @method  render
     * @return  {Object}  JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.classes },
        _react2.default.createElement(
          'div',
          { className: 'carbon-settings-row__header' },
          _react2.default.createElement(_heading2.default, {
            title: this.props.title,
            subheader: this.props.description,
            separator: true,
            divider: false
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-settings-row__input' },
          this.props.children
        )
      );
    }
  }, {
    key: 'classes',


    /**
     * Return class names
     *
     * @method  classes
     * @return  {String}
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-settings-row', { 'carbon-settings-row--has-divider': this.props.divider }, this.props.className);
    }
  }]);

  return SettingsRow;
}(_react2.default.Component);

SettingsRow.propTypes = {
  /**
   * Component children
   *
   * @property  children
   * @type      {Object}
   */
  children: _react2.default.PropTypes.node,

  /**
   * Heading title
   *
   * @property  title
   * @type      {String}
   */
  title: _react2.default.PropTypes.string.isRequired,

  /**
   * Heading description
   *
   * @property  description
   * @type      {String, Node}
   */
  description: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.node]),

  /**
   * Row divider
   *
   * @property  divider
   * @type      {Boolean}
   * @default   true
   */
  divider: _react2.default.PropTypes.bool
};
SettingsRow.defaultProps = {
  divider: true
};
exports.default = SettingsRow;