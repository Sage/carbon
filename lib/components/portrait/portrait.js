'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _cryptoJsMd5 = require('crypto-js/md5');

var _cryptoJsMd52 = _interopRequireDefault(_cryptoJsMd5);

/**
 * A Portrait Widget.
 *
 * == How to use a Portrait in a component
 *
 * In your file
 *
 *   import Portrait from 'carbon/lib/components/portrait';
 *
 * To render the Portrait
 *
 *   <Portrait src='/my-image' alt='my image' />
 *
 * To render a gravatar portrait
 *
 *   <Portrait gravatar='mygrav@email.com' />
 *
 * You can pass a 'size' property to adjust the size of the portrait
 *    The default is lmed
 *    options: small, smed, lmed, large
 *
 * For additional properties specific to this component, see propTypes.
 */

var Portrait = (function (_React$Component) {
  _inherits(Portrait, _React$Component);

  function Portrait() {
    _classCallCheck(this, Portrait);

    _get(Object.getPrototypeOf(Portrait.prototype), 'constructor', this).apply(this, arguments);

    this.memoizeInitials = null;
  }

  _createClass(Portrait, [{
    key: 'componentWillReceiveProps',

    /**
     * @method componentWillReceiveProps
     * @param {Object}
     * @return {Void}
     */
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.initials != nextProps.initials || this.props.size != nextProps.size) {
        this.memoizeInitials = null;
      }
    }

    /**
     * Props for the HTML Img
     *
     * @method imgSrc
     * @return {String}
     */
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        this.initialsImage,
        this.avatarImage
      );
    }
  }, {
    key: 'imgSrc',
    get: function get() {
      if (this.props.gravatar) {
        return this.gravatarSrc;
      }
      return this.props.src;
    }

    /**
     * Gets src url based on passed gravatar email
     *
     * @method gravatarSrc
     * @return {String}
     */
  }, {
    key: 'gravatarSrc',
    get: function get() {
      var base = 'http://www.gravatar.com/avatar/',
          hash = (0, _cryptoJsMd52['default'])(this.props.gravatar.toLowerCase()),
          size = this.numericSizes[this.props.size];

      return '' + base + hash + '?s=' + size + '&d=blank';
    }

    /**
     * Generates a graphic with initials.
     *
     * @method generateInitials
     * @return {String}
     */
  }, {
    key: 'generateInitials',
    get: function get() {
      if (this.memoizeInitials) {
        return this.memoizeInitials;
      }

      var canvas = document.createElement('canvas'),
          context = canvas.getContext("2d"),
          size = this.numericSizes[this.props.size],
          letters = this.props.initials || "",
          color = "#9DA0A7";

      // Set canvas with & height
      canvas.width = size;
      canvas.height = size;

      // Select a font family to support different language characters
      // like Arial
      context.font = Math.round(canvas.width / 2) + "px Arial";
      context.textAlign = "center";

      // Setup background and front color
      context.fillStyle = color;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#FFF";
      context.fillText(letters, size / 2, size / 1.5);

      // Set image representation in default format (png)
      var dataURI = canvas.toDataURL();

      // Dispose canvas element
      canvas = null;

      this.memoizeInitials = dataURI;

      return this.memoizeInitials;
    }

    /**
     * Maps size to width/height value
     *
     * @method numericSizes
     * @return {Object}
     */
  }, {
    key: 'numericSizes',
    get: function get() {
      return {
        small: '25',
        smed: '50',
        lmed: '70',
        large: '100'
      };
    }

    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-portrait', 'ui-portrait--image', 'ui-portrait--' + this.props.size, 'ui-portrait--' + this.props.shape, this.props.className);
    }

    /**
     * Return the html for the initials image.
     *
     * @method initialsImage
     * @return {Object}
     */
  }, {
    key: 'initialsImage',
    get: function get() {
      // if not using src, generate initials for potential fallback
      if (this.props.src) {
        return null;
      }

      return _react2['default'].createElement('img', {
        className: 'ui-portrait__img ui-portrait__initials',
        src: this.generateInitials,
        alt: this.props.alt
      });
    }

    /**
     * Return the html for the avatar image.
     *
     * @method avatarImage
     * @return {Object}
     */
  }, {
    key: 'avatarImage',
    get: function get() {
      return _react2['default'].createElement('img', {
        className: 'ui-portrait__img ui-portrait__avatar',
        src: this.imgSrc,
        alt: this.props.alt
      });
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Size of the img
       * Options: small, smed, lmed, large
       *
       * @property size
       * @type {String}
       */
      size: _react2['default'].PropTypes.string,

      /**
       * Source of the image
       *
       * @property src
       * @type {String}
       */
      src: function src(props) {
        if (!props.gravatar && !props.src) {
          throw new Error('Portrait requires a prop of \'src\' OR a prop of \'gravatar\'');
        } else if (props.gravatar && props.src) {
          throw new Error('Portrait requires a prop of \'src\' OR a prop of \'gravatar\' but not both');
        }
      },

      /**
       * Gravatar email
       *
       * @property src
       * @type {String}
       */
      gravatar: _react2['default'].PropTypes.string,

      /**
       * Alternate text for image
       *
       * @property src
       * @type {String}
       */
      alt: _react2['default'].PropTypes.string,

      /**
       * Shape of the portrait
       * Options - standard, circle, leaf
       *
       * @property shape
       * @type {String}
       */
      shape: _react2['default'].PropTypes.string,

      /**
       * Initials to display as image
       *
       * @property initials
       * @type {String}
       * @default 'U'
       */
      initials: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      size: 'lmed',
      shape: 'standard'
    },

    /**
     * Cache the initials graphic.
     *
     * @param memoizeInitials
     * @type {String}
     */
    enumerable: true
  }]);

  return Portrait;
})(_react2['default'].Component);

exports['default'] = Portrait;
module.exports = exports['default'];