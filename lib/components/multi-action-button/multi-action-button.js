/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_button = require('./../button');

/*istanbul ignore next*/
var _button2 = _interopRequireDefault(_button);

var /*istanbul ignore next*/_splitButton = require('./../split-button');

/*istanbul ignore next*/
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MultiActionButton).apply(this, arguments));
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
      return (/*istanbul ignore next*/(0, _classnames2.default)( /*istanbul ignore next*/_get(Object.getPrototypeOf(MultiActionButton.prototype), 'mainClasses', this), 'ui-multi-action-button', {
          'ui-multi-action-button--open': this.state.showAdditionalButtons,
          'ui-multi-action-button--align-right': this.props.align === "right"
        })
      );
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
      return (/*istanbul ignore next*/_get(Object.getPrototypeOf(MultiActionButton.prototype), 'additionalButtonsClasses', this) + ' ui-multi-action-button__additional-buttons' + ' ui-multi-action-button__additional-buttons--' + this.props.as
      );
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
      return (/*istanbul ignore next*/_get(Object.getPrototypeOf(MultiActionButton.prototype), 'toggleButtonClasses', this) + ' ui-multi-action-button__toggle' + ' ui-multi-action-button__toggle--' + this.props.as
      );
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_button2.default,
          this.toggleButtonProps,
          this.props.text,
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'dropdown' })
        )
      );
    }
  }]);

  return MultiActionButton;
}(_splitButton2.default);

/*istanbul ignore next*/MultiActionButton.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary', 'secondary' or 'transparent'.
   *
   * @property as
   * @type {String}
   * @default 'secondary'
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The text to be displayed in the SplitButton.
   *
   * @property text
   * @type {String}
   */
  text: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * Gives the button a disabled state.
   *
   * @property boolean
   * @type {Boolean}
   * @default false
   */
  disabled: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Aligns the button's options, can be set to `right`.
   *
   * @property align
   * @type {String}
   */
  align: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/exports.default = MultiActionButton;