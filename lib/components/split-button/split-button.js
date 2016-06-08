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

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

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

var SplitButton = (function (_React$Component) {
  _inherits(SplitButton, _React$Component);

  function SplitButton() {
    var _this = this;

    _classCallCheck(this, SplitButton);

    _get(Object.getPrototypeOf(SplitButton.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      /**
       * Tracks whether the additional buttons should be visible.
       *
       * @property showAdditionalButtons
       * @type {Boolean}
       * @default false
       */
      showAdditionalButtons: false
    };

    this.showButtons = function () {
      _this.setState({ showAdditionalButtons: true });
    };

    this.hideButtons = function () {
      _this.setState({ showAdditionalButtons: false });
    };
  }

  _createClass(SplitButton, [{
    key: 'render',

    /**
     * @method render
     * @return {Object}
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses, onMouseLeave: this.hideButtons },
        this.renderMainButton,
        this.state.showAdditionalButtons ? this.renderAdditionalButtons : null
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
      return (0, _classnames2['default'])('ui-split-button', this.props.className, {
        'ui-split-button--open': this.state.showAdditionalButtons
      });
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
        onClick: function onClick(ev) {
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
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          _button2['default'],
          this.mainButtonProps,
          this.props.text
        ),
        _react2['default'].createElement(
          _button2['default'],
          this.toggleButtonProps,
          _react2['default'].createElement(_icon2['default'], { type: 'dropdown' })
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
      return _react2['default'].createElement(
        'div',
        { className: this.additionalButtonsClasses },
        this.props.children
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Customizes the appearance, can be set to 'primary' or 'secondary'.
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
      disabled: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      as: 'secondary',
      disabled: false
    },
    enumerable: true
  }]);

  return SplitButton;
})(_react2['default'].Component);

exports['default'] = SplitButton;
module.exports = exports['default'];

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