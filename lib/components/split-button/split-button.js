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

var /*istanbul ignore next*/_button = require('./../button');

/*istanbul ignore next*/
var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A SplitButton widget.
 *
 * == How to use a SplitButton in a component:
 *
 * In your file
 *
 *   import SplitButton from 'components/split-button';
 *
 * To render a SplitButton (developer can add any buttons to dropdown):
 *
 *   <SplitButton text="Main Button" onClick={clickHandler}>
 *     <Button onClick="buttonClickHandler1">Button name 1</Button>
 *     <Button onClick="buttonClickHandler2">Button name 2</Button>
 *   </SplitButton>
 *
 * @class SplitButton
 * @constructor
 */

var SplitButton = function (_React$Component) {
  _inherits(SplitButton, _React$Component);

  function SplitButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SplitButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SplitButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      /**
       * Tracks whether the additional buttons should be visible.
       *
       * @property showAdditionalButtons
       * @type {Boolean}
       * @default false
       */
      showAdditionalButtons: false
    }, _this.showButtons = function () {
      /*istanbul ignore next*/_this.setState({ showAdditionalButtons: true });
    }, _this.hideButtons = function () {
      /*istanbul ignore next*/_this.setState({ showAdditionalButtons: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Shows the additional buttons.
   *
   * @method showButtons
   */


  /**
   * Hides additional buttons.
   *
   * @method hideButtons
   */


  _createClass(SplitButton, [{
    key: 'render',


    /**
     * @method render
     * @return {Object}
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses, onMouseLeave: this.hideButtons },
          this.renderMainButton,
          this.state.showAdditionalButtons ? this.renderAdditionalButtons : null
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Returns classes for the component.
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-split-button', this.props.className, {
          'ui-split-button--open': this.state.showAdditionalButtons
        })
      );
    }

    /**
     * Returns classes for the additional actions.
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'additionalButtonsClasses',
    get: function get() {
      return 'ui-split-button__additional-buttons';
    }

    /**
     * Returns classes for toggle button.
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'toggleButtonClasses',
    get: function get() {
      return 'ui-split-button__toggle';
    }

    /**
     * Returns props for the main button.
     *
     * @method mainButtonProps
     * @return {Object}
     */

  }, {
    key: 'mainButtonProps',
    get: function get() {
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(this.props, []);

      props.onMouseEnter = this.hideButtons;
      props.className = "ui-split-button__main-button";
      return props;
    }

    /**
     * Returns props for the toggle.
     *
     * @method toggleButtonProps
     * @return {Object}
     */

  }, {
    key: 'toggleButtonProps',
    get: function get() {
      var opts = {
        disabled: this.props.disabled,
        as: this.props.as,
        onClick: function /*istanbul ignore next*/onClick(ev) {
          ev.preventDefault();
        },
        className: this.toggleButtonClasses
      };

      if (!this.props.disabled) {
        opts.onMouseEnter = this.showButtons;
      }

      return opts;
    }

    /**
     * Returns the HTML for the main button.
     *
     * @method renderMainButton
     * @return {Object}
     */

  }, {
    key: 'renderMainButton',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/null,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            this.mainButtonProps,
            this.props.text
          ),
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_button2.default,
            this.toggleButtonProps,
            /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'dropdown' })
          )
        )
      );
    }

    /**
     * Returns the HTML for the additional buttons.
     *
     * @method renderAdditionalButtons
     * @return {Object}
     */

  }, {
    key: 'renderAdditionalButtons',
    get: function get() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.additionalButtonsClasses },
          this.props.children
        )
      );
    }
  }]);

  return SplitButton;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/SplitButton.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary' or 'secondary'.
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
  disabled: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/SplitButton.defaultProps = {
  as: 'secondary',
  disabled: false
};
/*istanbul ignore next*/exports.default = SplitButton;