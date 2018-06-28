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

var _help = require('./../help');

var _help2 = _interopRequireDefault(_help);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * UI for a heading header.
 */
var Heading = function (_React$Component) {
  _inherits(Heading, _React$Component);

  function Heading() {
    _classCallCheck(this, Heading);

    return _possibleConstructorReturn(this, (Heading.__proto__ || Object.getPrototypeOf(Heading)).apply(this, arguments));
  }

  _createClass(Heading, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      if (!this.props.title) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: this.classes }, (0, _tags2.default)('heading', this.props)),
        _react2.default.createElement(
          'div',
          { className: 'carbon-heading__header' },
          this.back,
          _react2.default.createElement(
            'div',
            { className: 'carbon-heading__headers' },
            _react2.default.createElement(
              'div',
              { className: 'carbon-heading__main-header' },
              _react2.default.createElement(
                'h1',
                {
                  className: 'carbon-heading__title', 'data-element': 'title',
                  id: this.props.titleId
                },
                this.props.title
              ),
              this.help
            ),
            this.separator,
            this.subheader
          )
        ),
        this.props.children
      );
    }
  }, {
    key: 'help',


    /**
     * Returns the help component.
     *
     * @method help
     * @return {Object} JSX
     */
    get: function get() {
      if (!this.props.help && !this.props.helpLink) {
        return null;
      }

      return _react2.default.createElement(
        _help2.default,
        {
          className: 'carbon-heading__help',
          'data-element': 'help',
          tooltipAlign: 'center',
          tooltipPosition: 'right',
          href: this.props.helpLink
        },
        this.props.help
      );
    }

    /**
     * Returns the back button.
     *
     * @method back
     * @return {Object} JSX
     */

  }, {
    key: 'back',
    get: function get() {
      if (!this.props.backLink) {
        return null;
      }

      var props = void 0;

      if (typeof this.props.backLink === 'string') {
        props = { href: this.props.backLink };
      } else {
        props = { onClick: this.props.backLink };
      }

      return _react2.default.createElement(
        _link2.default,
        _extends({
          className: 'carbon-heading__back',
          'data-element': 'back'
        }, props),
        _react2.default.createElement(_icon2.default, { type: 'chevron_left' })
      );
    }

    /**
     * Returns the subheader.
     *
     * @method subheader
     * @return {Object} JSX
     */

  }, {
    key: 'subheader',
    get: function get() {
      if (!this.props.subheader) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        {
          className: 'carbon-heading__subheader', 'data-element': 'subtitle',
          id: this.props.subtitleId
        },
        this.props.subheader
      );
    }

    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */

  }, {
    key: 'classes',
    get: function get() {
      return (0, _classnames2.default)('carbon-heading', this.props.className, {
        'carbon-heading--has-subheader': this.props.subheader,
        'carbon-heading--has-back': this.props.backLink,
        'carbon-heading--has-divider': this.props.divider
      });
    }

    /**
     * Returns the separator if enabled and needed.
     *
     * @method separator
     * @return {Object} JSX
     */

  }, {
    key: 'separator',
    get: function get() {
      return this.props.separator ? _react2.default.createElement('hr', { className: 'carbon-heading__separator' }) : null;
    }
  }]);

  return Heading;
}(_react2.default.Component);

Heading.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
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
   * Defines the title for the heading.
   *
   * @property title
   * @type {String|Object}
   */
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * Defines the title id for the heading.
   *
   * @property titleId
   * @type {String}
   */
  titleId: _propTypes2.default.string,

  /**
   * Defines the subheader for the heading.
   *
   * @property subheader
   * @type {String|Object}
   */
  subheader: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * Defines the subtitle id for the heading.
   *
   * @property subtitleId
   * @type {String}
   */
  subtitleId: _propTypes2.default.string,

  /**
   * Defines the help text for the heading.
   *
   * @property help
   * @type {String}
   */
  help: _propTypes2.default.string,

  /**
   * Defines the help link for the heading.
   *
   * @property helpLink
   * @type {String}
   */
  helpLink: _propTypes2.default.string,

  /**
   * Defines the a href for the back link.
   *
   * @property backLink
   * @type {String}
   */
  backLink: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  /**
   * Adds a divider below the heading and the content.
   *
   * @property divider
   * @type {Boolean}
   * @default true
   */
  divider: _propTypes2.default.bool,

  /**
   * Adds a separator between the title and the subheader.
   *
   * @property separator
   * @type {Boolean}
   * @default false
   */
  separator: _propTypes2.default.bool
};
Heading.defaultProps = {
  divider: true,
  separator: false };
exports.default = Heading;