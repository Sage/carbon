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

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _splitButton = require('./../split-button');

var _splitButton2 = _interopRequireDefault(_splitButton);

/**
 * A MultiActionButton widget.
 *
 * == How to use a MultiActionButton in a component:
 *
 * In your file
 *
 *   import MultiActionButton from 'components/multi-action-button';
 *
 * To render a MultiActionButton (developer can add any buttons to dropdown):
 *
 *   <MultiActionButton text="Main Text">
 *     <Button onClick="buttonClickHandler1">Button name 1</Button>
 *     <Button onClick="buttonClickHandler2">Button name 2</Button>
 *   </MultiActionButton>
 *
 * @class MultiActionButton
 * @constructor
 */

var MultiActionButton = (function (_SplitButton) {
  _inherits(MultiActionButton, _SplitButton);

  function MultiActionButton() {
    _classCallCheck(this, MultiActionButton);

    _get(Object.getPrototypeOf(MultiActionButton.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MultiActionButton, [{
    key: 'mainClasses',

    /**
     * Returns classes for the component.
     * @override
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2['default'])(_get(Object.getPrototypeOf(MultiActionButton.prototype), 'mainClasses', this), 'ui-multi-action-button', {
        'ui-multi-action-button--open': this.state.showAdditionalButtons,
        'ui-multi-action-button--align-right': this.props.align === "right"
      });
    }

    /**
     * Returns classes for the additional actions.
     * @override
     *
     * @method mainClasses
     * @return {String} Main className
     */
  }, {
    key: 'additionalButtonsClasses',
    get: function get() {
      return _get(Object.getPrototypeOf(MultiActionButton.prototype), 'additionalButtonsClasses', this) + ' ui-multi-action-button__additional-buttons' + ' ui-multi-action-button__additional-buttons--' + this.props.as;
    }

    /**
     * Returns classes for the main button.
     * @override
     *
     * @method mainClasses
     * @return {String} Main className
     */
  }, {
    key: 'toggleButtonClasses',
    get: function get() {
      return _get(Object.getPrototypeOf(MultiActionButton.prototype), 'toggleButtonClasses', this) + ' ui-multi-action-button__toggle' + ' ui-multi-action-button__toggle--' + this.props.as;
    }

    /**
     * Returns the HTML for the main button.
     * @override
     *
     * @method renderMainButton
     * @return {Object}
     */
  }, {
    key: 'renderMainButton',
    get: function get() {
      return _react2['default'].createElement(
        _button2['default'],
        this.toggleButtonProps,
        this.props.text,
        _react2['default'].createElement(_icon2['default'], { type: 'dropdown' })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'.
       *
       * @property as
       * @type {String}
       * @default 'secondary'
       */
      as: _react2['default'].PropTypes.string,

      /**
       * The text to be displayed in the SplitButton.
       *
       * @property text
       * @type {String}
       */
      text: _react2['default'].PropTypes.string.isRequired,

      /**
       * Gives the button a disabled state.
       *
       * @property boolean
       * @type {Boolean}
       * @default false
       */
      disabled: _react2['default'].PropTypes.bool,

      /**
       * Aligns the button's options, can be set to `right`.
       *
       * @property align
       * @type {String}
       */
      align: _react2['default'].PropTypes.string
    },
    enumerable: true
  }]);

  return MultiActionButton;
})(_splitButton2['default']);

exports['default'] = MultiActionButton;
module.exports = exports['default'];