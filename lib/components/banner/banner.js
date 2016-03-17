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

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

/**
 * A Banner widget.
 *
 * == How to use a Banner in a component:
 *
 * In your file:
 *
 *   import Banner from 'carbon/lib/components/banner';
 *
 * To render the Banner:
 *
 *   <Banner
 *      title="This is a title"
 *      message="This is my message."
 *      buttonAction={ this.handleButtonClick } />
 *
 * Additionally you can pass optional props to the Banner component
 *
 *   as: Customizes the appearence of the banner changing the colour
 *       (see the 'iconColorSets' for possible values).
 *
 *   buttonText: allows you to customize the button text.
 *
 * @class Banner
 * @constructor
 */

var Banner = (function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner() {
    _classCallCheck(this, Banner);

    _get(Object.getPrototypeOf(Banner.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Banner, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        _react2['default'].createElement(
          'div',
          { className: 'ui-banner__content' },
          _react2['default'].createElement(_icon2['default'], { className: 'ui-banner__icon', type: this.props.as }),
          _react2['default'].createElement(
            'div',
            { className: 'ui-banner__info' },
            _react2['default'].createElement(
              'div',
              { className: 'ui-banner__title' },
              this.props.title
            ),
            _react2['default'].createElement(
              'div',
              { className: 'ui-banner__message' },
              this.props.message
            )
          ),
          _react2['default'].createElement(
            _button2['default'],
            { onClick: this.props.buttonAction, className: this.buttonClasses },
            this.props.buttonText
          )
        )
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Classes for the banner
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2['default'])('ui-banner', 'ui-banner--' + this.props.as, this.props.className);
    }

    /**
     * Classes for the button action
     *
     * @method buttonClasses
     * @return {String} classNames for button
     */
  }, {
    key: 'buttonClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-banner__action', 'ui-banner__action--' + this.props.as);
    }
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Customizes the appearance through icon and colour
       * (see the 'iconColorSets' for possible values)
       *
       * @property as
       * @type {String}
       * @default 'info'
       */
      as: _react2['default'].PropTypes.string,

      /**
       * Title to be displayed.
       *
       * @property title
       * @type {String}
       */
      title: _react2['default'].PropTypes.string.isRequired,

      /**
       * Message to be displayed.
       *
       * @property message
       * @type {String}
       */
      message: _react2['default'].PropTypes.string.isRequired,

      /**
       * Text to display on button.
       *
       * @property buttonText
       * @type {String}
       * @default 'Got it!'
       */
      buttonText: _react2['default'].PropTypes.string,

      /**
       * The action to trigger on click.
       *
       * @property buttonAction
       * @type {func}
       */
      buttonAction: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      as: 'info',
      buttonText: 'Got it!'
    },
    enumerable: true
  }]);

  return Banner;
})(_react2['default'].Component);

exports['default'] = Banner;
module.exports = exports['default'];