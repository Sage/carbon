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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

/**
 * A Flash widget.
 *
 * The flash is rendered in two sections: a ventral message 'flash', and a
 * dorsal coloured, expanding 'slider'.
 *
 * == How to use an Flash in a component:
 *
 * In your file
 *
 *   import Flash from 'carbon/lib/components/flash';
 *
 * To render a Flash, setup open and cancel handlers in your view to trigger
 * the message on and off:
 *
 *  <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' />
 *
 * By default, the flash renders with a clickable close icon that hooks up with the onDismiss function.
 * To instead have the flash disappear after a given time period, pass a prop of timeout in milliseconds.
 *
 *  <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' timeout={ 2000 }/>
 *
 * @class Flash
 * @constructor
 */

var Flash = (function (_React$Component) {
  _inherits(Flash, _React$Component);

  function Flash() {
    _classCallCheck(this, Flash);

    _get(Object.getPrototypeOf(Flash.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Flash, [{
    key: 'componentDidUpdate',

    /**
     *  Conditionally triggers close action after flash displayed.
     *
     * @method componentDidUpdate
     * @return(Void)
     */
    value: function componentDidUpdate(prevProps) {
      var _this = this;

      if (this.props.timeout && this.props.open === true) {
        if (prevProps.open != this.props.open) {
          setTimeout(function () {
            _this.props.onDismiss();
          }, this.props.timeout);
        }
      }
    }

    /**
     * Returns the icon to display depending on type
     *
     * @method iconType
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
      var flashHTML = undefined,
          sliderHTML = undefined,
          mainClasses = undefined;

      mainClasses = (0, _classnames2['default'])('ui-flash', this.props.className, 'ui-flash--' + this.props.type);

      if (this.props.open) {
        flashHTML = this.flashHTML;
        sliderHTML = this.sliderHTML;
      }

      return _react2['default'].createElement(
        'div',
        { className: mainClasses },
        _react2['default'].createElement(
          _reactAddonsCssTransitionGroup2['default'],
          {
            transitionName: 'ui-flash__slider',
            transitionEnterTimeout: 600,
            transitionLeaveTimeout: 600 },
          sliderHTML,
          _react2['default'].createElement(
            _reactAddonsCssTransitionGroup2['default'],
            {
              transitionName: 'ui-flash__content',
              transitionEnterTimeout: 800,
              transitionLeaveTimeout: 500 },
            flashHTML
          )
        )
      );
    }
  }, {
    key: 'iconType',
    get: function get() {
      var icon = undefined;

      switch (this.props.type) {
        case 'success':
          icon = 'tick';
          break;
        case 'error':
          icon = 'warning';
          break;
        case 'alert':
          icon = 'warning';
          break;
        default:
          icon = this.props.type;
          break;
      }
      return icon;
    }

    /**
     * Returns the computed HTML for the flash.
     *
     * @method flashHTML
     * @return {Object} JSX for flash
     */
  }, {
    key: 'flashHTML',
    get: function get() {
      var contents = [];

      contents.push(_react2['default'].createElement(_icon2['default'], { className: 'ui-flash__icon', type: this.iconType, key: 'icon' }));

      contents.push(_react2['default'].createElement(
        'div',
        { className: 'ui-flash__message', key: 'message' },
        this.props.message
      ));

      if (!this.props.timeout) {
        contents.push(_react2['default'].createElement(
          'div',
          { className: 'ui-flash__close-icon', onClick: this.props.onDismiss, key: 'close' },
          _react2['default'].createElement(_icon2['default'], { type: 'close' })
        ));
      }

      return _react2['default'].createElement(
        'div',
        { className: 'ui-flash__content' },
        contents
      );
    }

    /**
     * Returns the computed HTML for the slider.
     *
     * @method flashHTML
     * @return {Object} JSX for flash
     */
  }, {
    key: 'sliderHTML',
    get: function get() {
      return _react2['default'].createElement('div', { className: 'ui-flash__slider', key: 'slider' });
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * A custom close event handler
       *
       * @property onDismiss
       * @type {Function}
       */
      onDismiss: _react2['default'].PropTypes.func.isRequired,

      /**
       * Sets the open state of the flash.
       *
       * @property open
       * @type {Boolean}
       * @default false
       */
      open: _react2['default'].PropTypes.bool.isRequired,

      /**
       * Type of notification.
       *
       * @property type
       * @type {String}
       */
      type: _react2['default'].PropTypes.string,

      /**
       * Contents of message.
       *
       * @property message
       * @type {String}
       */
      message: _react2['default'].PropTypes.string.isRequired,

      /**
       * Time for flash to remain on screen
       *
       * @property timeout
       * @type {Number} in milliseconds
       */
      timeout: _react2['default'].PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      type: 'alert'
    },
    enumerable: true
  }]);

  return Flash;
})(_react2['default'].Component);

exports['default'] = Flash;
module.exports = exports['default'];