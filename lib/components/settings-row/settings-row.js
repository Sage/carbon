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

var _heading = require('../heading');

var _heading2 = _interopRequireDefault(_heading);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./settings-row.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UI for a settings page row
 *
 * SettingsRow implements our UX design for settings pages. It accepts a `title` string to be displayed at the top left
 * of the row. The `description` property accepts a string or JSX object to support flexible layout of elements
 * (e.g. Links, bolded text, paragraphs) in the header column under the title. The default divider line at the bottom
 * of the row may be disabled by setting `divider={ false }`. All children are rendered in the input column to the
 * right of the header column.
 *
 *
 * == How to use a SettingsRow in a component:
 *
 * In your file:
 *
 *    import SettingsRow from 'carbon-react/lib/components/settings-row';
 *
 * To render the SettingsRow:
 *
 *    <SettingsRow title='My Setting' description='My description'>
 *      <Checkbox label='Enable my setting' />
 *      <span>Other content to go with input</span>
 *    </SettingsRow>
 *
 * @class SettingsRow
 * @constructor
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
        _extends({ className: this.classes }, (0, _tags2.default)('settings-row', this.props)),
        _react2.default.createElement(
          'div',
          { className: 'carbon-settings-row__header' },
          this.heading
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

    /**
     * Return heading
     *
     * @method  heading
     * @return  {Object}  JSX
     */

  }, {
    key: 'heading',
    get: function get() {
      if (!this.props.title) return null;

      return _react2.default.createElement(_heading2.default, {
        title: this.props.title,
        subheader: this.props.description,
        separator: this.props.description !== undefined,
        divider: false
      });
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
  children: _propTypes2.default.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Heading title
   *
   * @property  title
   * @type      {String}
   */
  title: _propTypes2.default.string,

  /**
   * Heading description
   *
   * @property  description
   * @type      {Node}
   */
  description: _propTypes2.default.node,

  /**
   * Row divider
   *
   * @property  divider
   * @type      {Boolean}
   * @default   true
   */
  divider: _propTypes2.default.bool
};
SettingsRow.defaultProps = {
  divider: true
};
exports.default = SettingsRow;