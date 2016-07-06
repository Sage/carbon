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
      // if using `to` - use React Router Link - otherwise use generic anchor
      var element = this.props.to ? /*istanbul ignore next*/_reactRouter.Link : "a";

      return (/*istanbul ignore next*/_react2.default.createElement(element, this.componentProps, /*istanbul ignore next*/_react2.default.createElement(
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
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(this.props, []);

      props.className = this.componentClasses;

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
      if (this.props.icon) {
        return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: this.props.icon, className: 'ui-link__icon' })
        );
      } else {
        return null;
      }
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
   * Use `to` to use the React Router link.
   *
   * @property to
   * @type {String}
   * @default undefined
   */
  to: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Use `href` to use a generic anchor.
   *
   * @property href
   * @type {String}
   * @default undefined
   */
  href: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/exports.default = _Link;