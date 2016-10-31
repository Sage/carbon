'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A link widget.
 *
 * == How to use a Link in a component:
 *
 * In your file:
 *
 *   import Link from 'carbon/lib/components/link';
 *
 * To render the Link:
 *
 *  <Link href='foo'>Main Page</Link>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Link
 * @constructor
 */
var _Link = function (_React$Component) {
  _inherits(_Link, _React$Component);

  function _Link() {
    _classCallCheck(this, _Link);

    return _possibleConstructorReturn(this, (_Link.__proto__ || Object.getPrototypeOf(_Link)).apply(this, arguments));
  }

  _createClass(_Link, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2.default.createElement(this.linkType.component, this.componentProps, _react2.default.createElement(
        'span',
        null,
        this.iconLeft,
        _react2.default.createElement(
          'span',
          { className: 'carbon-link__content' },
          this.props.children
        ),
        this.iconRight
      ));
    }
  }, {
    key: 'componentProps',


    /**
     * Getter for componet properties.
     *
     * @method componentProps
     * @return {Object} props
     */
    get: function get() {
      var props = _objectWithoutProperties(this.props, []);

      props.tabIndex = this.tabIndex;

      delete props.href;
      delete props.tabbable;
      delete props.to;

      props.className = this.componentClasses;
      props[this.linkType.prop] = this.url;

      return props;
    }

    /**
     * Getter for componet classes.
     *
     * @method componentClasses
     * @return {String} class names
     */

  }, {
    key: 'componentClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-link__anchor', this.props.className, { 'carbon-link__anchor--disabled': this.props.disabled });
    }

    /**
     * Returns the icon if enabled and aligned to the left.
     *
     * @method iconLeft
     * @return {Object} JSX
     */

  }, {
    key: 'iconLeft',
    get: function get() {
      if (!this.props.icon || this.props.iconAlign !== 'left') {
        return null;
      }
      return this.icon;
    }

    /**
     * Returns the icon if enabled and aligned to the right.
     *
     * @method iconRight
     * @return {Object} JSX
     */

  }, {
    key: 'iconRight',
    get: function get() {
      if (!this.props.icon || this.props.iconAlign !== 'right') {
        return null;
      }
      return this.icon;
    }

    /**
     * Returns the markup for the icon.
     *
     * @method icon
     * @return {Object} JSX
     */

  }, {
    key: 'icon',
    get: function get() {
      var classes = (0, _classnames2.default)("carbon-link__icon", 'carbon-link__icon--align-' + this.props.iconAlign);

      return _react2.default.createElement(_icon2.default, {
        type: this.props.icon,
        className: classes,
        tooltipMessage: this.props.tooltipMessage,
        tooltipAlign: this.props.tooltipAlign,
        tooltipPosition: this.props.tooltipPosition
      });
    }

    /**
     * Returns 0 or -1 for tabindex
     *
     * @method tabIndex
     * @return {String} 0 or -1
     */

  }, {
    key: 'tabIndex',
    get: function get() {
      return this.props.tabbable && !this.props.disabled ? '0' : '-1';
    }

    /**
     * Regex for finding 'href:' or 'to:',
     *
     * @method typeRegex
     * @return {Regex}
     */

  }, {
    key: 'typeRegex',
    get: function get() {
      return (/^href:|^to:/
      );
    }

    /**
     * A hash of the different link types.
     *
     * @method linkTypes
     * @return {Object}
     */

  }, {
    key: 'linkTypes',
    get: function get() {
      return {
        to: {
          prop: "to",
          component: _reactRouter.Link
        },
        href: {
          prop: "href",
          component: "a"
        }
      };
    }

    /**
     * Returns the correct link type based on the given props.
     *
     * @method linkType
     * @return {Object}
     */

  }, {
    key: 'linkType',
    get: function get() {
      var url = this.props.href || this.props.to,
          type = "href";

      if (url) {
        var match = url.match(this.typeRegex);

        if (match) {
          type = match[0].substr(0, match[0].length - 1);
        } else if (this.props.href) {
          type = "href";
        } else {
          type = "to";
        }
      }

      return this.linkTypes[type];
    }

    /**
     * Returns the parsed URL for the link.
     *
     * @method url
     * @return {String}
     */

  }, {
    key: 'url',
    get: function get() {
      var url = this.props.href || this.props.to;
      if (!url) {
        return null;
      }

      return url.replace(this.typeRegex, "");
    }
  }]);

  return _Link;
}(_react2.default.Component);

_Link.propTypes = {

  /**
   * Gives the link a disabled state.
   *
   * @property disabled
   * @type {Boolean}
   * @default undefined
   */
  disabled: _react2.default.PropTypes.bool,

  /**
   * Renders an icon inline with the link.
   *
   * @property icon
   * @type {String}
   * @default undefined
   */
  icon: _react2.default.PropTypes.string,

  /**
   * Configures the alignment of the icon (left or right).
   *
   * @property iconAlign
   * @type {String}
   * @default left
   */
  iconAlign: _react2.default.PropTypes.string,

  /**
   * Allows the <a> tag to be set in or out of the tab order of the page
   * Boolean is used as tabindex > 0 is not really necessary, HTML order should
   * take precedence
   *
   * @property tabbable
   * @type {Boolean}
   * @default true
   */
  tabbable: _react2.default.PropTypes.bool,

  /**
   * Use `to` to use the React Router link. You can also prefix your value
   * with `to:` or `href:` to override the prop type.
   *
   * @property to
   * @type {String}
   * @default undefined
   */
  to: _react2.default.PropTypes.string,

  /**
   * Use `href` to use a generic anchor. You can also prefix your value
   * with `to:` or `href:` to override the prop type.
   *
   * @property href
   * @type {String}
   * @default undefined
   */
  href: _react2.default.PropTypes.string
};
_Link.defaultProps = {
  iconAlign: 'left',
  tabbable: true
};
exports.default = _Link;