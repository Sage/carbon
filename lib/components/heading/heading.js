'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _help = require('./../help');

var _help2 = _interopRequireDefault(_help);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Heading: {
    displayName: 'Heading'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/heading/heading.js',
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
 * UI for a heading header.
 */
var Heading = _wrapComponent('Heading')((_temp = _class = function (_React$Component) {
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

      return _react3.default.createElement(
        'div',
        { className: this.classes },
        _react3.default.createElement(
          'div',
          { className: 'carbon-heading__header' },
          this.back,
          _react3.default.createElement(
            'div',
            { className: 'carbon-heading__headers' },
            _react3.default.createElement(
              'div',
              { className: 'carbon-heading__main-header' },
              _react3.default.createElement(
                'h1',
                { className: 'carbon-heading__title' },
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

      return _react3.default.createElement(
        _help2.default,
        {
          className: 'carbon-heading__help',
          tooltipAlign: 'left',
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

      return _react3.default.createElement(
        _link2.default,
        {
          className: 'carbon-heading__back',
          href: this.props.backLink
        },
        _react3.default.createElement(_icon2.default, { type: 'chevron' })
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

      return _react3.default.createElement(
        'div',
        { className: 'carbon-heading__subheader' },
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
      var _classNames;

      return (0, _classnames2.default)("carbon-heading", this.props.className, (_classNames = {}, _defineProperty(_classNames, "carbon-heading--has-subheader", this.props.subheader), _defineProperty(_classNames, "carbon-heading--has-back", this.props.backLink), _defineProperty(_classNames, "carbon-heading--has-divider", this.props.divider), _classNames));
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
      return this.props.separator ? _react3.default.createElement('hr', { className: 'carbon-heading__separator' }) : null;
    }
  }]);

  return Heading;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Defines the title for the heading.
   *
   * @property title
   * @type {String|Object}
   */
  title: _react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string, _react3.default.PropTypes.object]),

  /**
   * Defines the subheader for the heading.
   *
   * @property subheader
   * @type {String|Object}
   */
  subheader: _react3.default.PropTypes.oneOfType([_react3.default.PropTypes.string, _react3.default.PropTypes.object]),

  /**
   * Defines the help text for the heading.
   *
   * @property help
   * @type {String}
   */
  help: _react3.default.PropTypes.string,

  /**
   * Defines the help link for the heading.
   *
   * @property helpLink
   * @type {String}
   */
  helpLink: _react3.default.PropTypes.string,

  /**
   * Defines the a href for the back link.
   *
   * @property backLink
   * @type {String}
   */
  backLink: _react3.default.PropTypes.string,

  /**
   * Adds a divider below the heading and the content.
   *
   * @property divider
   * @type {Boolean}
   * @default true
   */
  divider: _react3.default.PropTypes.bool,

  /**
   * Adds a separator between the title and the subheader.
   *
   * @property separator
   * @type {Boolean}
   * @default false
   */
  separator: _react3.default.PropTypes.bool
}, _class.defaultProps = {
  divider: true,
  separator: false
}, _temp));

exports.default = Heading;