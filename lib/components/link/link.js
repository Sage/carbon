/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_reactRouter = require('react-router');

/*istanbul ignore next*/
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Link).apply(this, arguments));
  }

  _createClass(_Link, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(this.linkType.component, this.componentProps, /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'span',
          /*istanbul ignore next*/null,
          this.icon,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'span',
            /*istanbul ignore next*/{ className: 'ui-link__content' },
            this.props.children
          )
        ))
      );
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
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var href = _props.href;
      /*istanbul ignore next*/var to = _props.to;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['href', 'to']);

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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-link__anchor', this.props.className, { 'ui-link__anchor--disabled': this.props.disabled })
      );
    }
  }, {
    key: 'icon',
    get: function get() {
      if (!this.props.icon) {
        return null;
      }
      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: this.props.icon, className: 'ui-link__icon' })
      );
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
      return (/^href:|to:/
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
          component: /*istanbul ignore next*/_reactRouter.Link
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
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/_Link.propTypes = {

  /**
   * Gives the link a disabled state.
   *
   * @property disabled
   * @type {Boolean}
   * @default undefined
   */
  disabled: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Renders an icon inline with the link.
   *
   * @property icon
   * @type {String}
   * @default undefined
   */
  icon: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Use `to` to use the React Router link. You can also prefix your value
   * with `to:` or `href:` to override the prop type.
   *
   * @property to
   * @type {String}
   * @default undefined
   */
  to: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Use `href` to use a generic anchor. You can also prefix your value
   * with `to:` or `href:` to override the prop type.
   *
   * @property href
   * @type {String}
   * @default undefined
   */
  href: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/exports.default = _Link;