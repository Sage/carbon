'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _splitButton = require('./../split-button');

var _splitButton2 = _interopRequireDefault(_splitButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var MultiActionButton = function (_SplitButton) {
  _inherits(MultiActionButton, _SplitButton);

  function MultiActionButton() {
    _classCallCheck(this, MultiActionButton);

    return _possibleConstructorReturn(this, (MultiActionButton.__proto__ || Object.getPrototypeOf(MultiActionButton)).apply(this, arguments));
  }

  _createClass(MultiActionButton, [{
    key: 'componentTags',
    value: function componentTags() {
      return {
        'data-component': 'multi-action-button',
        'data-element': this.props['data-element'],
        'data-role': this.props['data-role']
      };
    }
  }, {
    key: 'mainClasses',


    /**
     * Returns classes for the component.
     * @override
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (0, _classnames2.default)(_get(MultiActionButton.prototype.__proto__ || Object.getPrototypeOf(MultiActionButton.prototype), 'mainClasses', this), 'carbon-multi-action-button', {
        'carbon-multi-action-button--open': this.state.showAdditionalButtons,
        'carbon-multi-action-button--align-right': this.props.align === "right"
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
      return _get(MultiActionButton.prototype.__proto__ || Object.getPrototypeOf(MultiActionButton.prototype), 'additionalButtonsClasses', this) + ' carbon-multi-action-button__additional-buttons' + ' carbon-multi-action-button__additional-buttons--' + this.props.as;
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
      return _get(MultiActionButton.prototype.__proto__ || Object.getPrototypeOf(MultiActionButton.prototype), 'toggleButtonClasses', this) + ' carbon-multi-action-button__toggle' + ' carbon-multi-action-button__toggle--' + this.props.as;
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
      return _react2.default.createElement(
        _button2.default,
        _extends({}, this.toggleButtonProps, { 'data-element': 'main-button' }),
        this.props.text,
        _react2.default.createElement(_icon2.default, { type: 'dropdown' })
      );
    }
  }]);

  return MultiActionButton;
}(_splitButton2.default);

MultiActionButton.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'.
   *
   * @property as
   * @type {String}
   * @default 'secondary'
   */
  as: _propTypes2.default.string,

  /**
   * The text to be displayed in the SplitButton.
   *
   * @property text
   * @type {String}
   */
  text: _propTypes2.default.string.isRequired,

  /**
   * Gives the button a disabled state.
   *
   * @property boolean
   * @type {Boolean}
   * @default false
   */
  disabled: _propTypes2.default.bool,

  /**
   * Aligns the button's options, can be set to `right`.
   *
   * @property align
   * @type {String}
   */
  align: _propTypes2.default.string
};
exports.default = MultiActionButton;