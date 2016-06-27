'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

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

var Link = (function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link() {
    _classCallCheck(this, Link);

    _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Link, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        'a',
        this.componentProps,
        this.icon,
        _react2['default'].createElement(
          'span',
          { className: 'ui-link__content' },
          this.props.children
        )
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
      return (0, _classnames2['default'])('ui-link__anchor', this.props.className, { 'ui-link__anchor--disabled': this.props.disabled });
    }
  }, {
    key: 'icon',
    get: function get() {
      if (this.props.icon) {
        return _react2['default'].createElement(_icon2['default'], { type: this.props.icon, className: 'ui-link__icon' });
      } else {
        return null;
      }
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Gives the link a disabled state.
       *
       * @property disabled
       * @type {Boolean}
       * @default undefined
       */
      disabled: _react2['default'].PropTypes.bool,

      /**
       * Renders an icon inline with the link.
       *
       * @property icon
       * @type {String}
       * @default undefined
       */
      icon: _react2['default'].PropTypes.string
    },
    enumerable: true
  }]);

  return Link;
})(_react2['default'].Component);

exports['default'] = Link;
module.exports = exports['default'];