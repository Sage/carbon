'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders content with a title and body text.
 *
 * @class Content
 * @constructor
 */
var Content = function (_React$Component) {
  _inherits(Content, _React$Component);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
  }

  _createClass(Content, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return this.props.children ? _react2.default.createElement(
        'div',
        { className: this.classes },
        _react2.default.createElement(
          'div',
          { className: 'carbon-content__title', style: this.titleStyle },
          this.props.title
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-content__body', style: this.bodyStyle },
          this.props.children
        )
      ) : null;
    }
  }, {
    key: 'classes',


    /**
     * Returns the HTML classes for the component.
     *
     * @method
     * @return {String}
     */
    get: function get() {
      return (0, _classnames2.default)("carbon-content", this.props.className, 'carbon-content--' + this.props.as, 'carbon-content--align-' + this.props.align, {
        "carbon-content--inline": this.props.inline,
        "carbon-content--body-full-width": this.props.bodyFullWidth
      });
    }

    /**
     * Returns styling for the title element.
     *
     * @method titleStyle
     * @return {Object}
     */

  }, {
    key: 'titleStyle',
    get: function get() {
      var style = {};

      if (this.props.titleWidth) {
        style.width = 'calc(' + this.props.titleWidth + '% - 30px)';
      }

      return style;
    }

    /**
     * Returns styling for the body element.
     *
     * @method bodyStyle
     * @return {Object}
     */

  }, {
    key: 'bodyStyle',
    get: function get() {
      var style = {};

      if (this.props.titleWidth) {
        style.width = 100 - Number(this.props.titleWidth) + '%';
      }

      if (this.props.bodyFullWidth) {
        style.width = "100%";
      }

      return style;
    }
  }]);

  return Content;
}(_react2.default.Component);

Content.propTypes = {
  /**
   * The body of the content component.
   *
   * @property children
   * @type {Object}
   */
  children: _react2.default.PropTypes.node,

  /**
   * The title of the content component.
   *
   * @property title
   * @type {String}
   */
  title: _react2.default.PropTypes.string,

  /**
   * Applies a theme to the Content
   * Value: primary, secondary
   *
   * @property as
   * @type {String}
   * @default primary
   */
  as: _react2.default.PropTypes.string,

  /**
   * Displays the content inline with it's title.
   *
   * @property inline
   * @type {Boolean}
   * @default false
   */
  inline: _react2.default.PropTypes.bool,

  /**
   * Aligns the content (left, center or right).
   *
   * @property align
   * @type {String}
   * @default left
   */
  align: _react2.default.PropTypes.string,

  /**
   * Sets a custom width for the title element.
   *
   * @property titleWidth
   * @type {String}
   */
  titleWidth: _react2.default.PropTypes.string,

  /**
   * Over-rides the calculation of body width based on titleWidth
   * Sometimes we need the body to be full width while keeping a title width similar to other widths
   *
   * @property bodyFullWidth
   * @type {Boolean}
   * @default false
   */
  bodyFullWidth: _react2.default.PropTypes.bool
};
Content.defaultProps = {
  align: "left",
  as: "primary",
  bodyFullWidth: false,
  inline: false
};
exports.default = Content;