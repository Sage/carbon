'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('./../button');

var _button2 = _interopRequireDefault(_button);

var _ether = require('../../utils/ether');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  SplitButton: {
    displayName: 'SplitButton'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/split-button/split-button.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var SplitButton = _wrapComponent('SplitButton')((_temp = _class = function (_React$Component) {
  _inherits(SplitButton, _React$Component);

  function SplitButton(args) {
    _classCallCheck(this, SplitButton);

    var _this = _possibleConstructorReturn(this, (SplitButton.__proto__ || Object.getPrototypeOf(SplitButton)).call(this, args));

    _this.state = {
      /**
       * Tracks whether the additional buttons should be visible.
       *
       * @property showAdditionalButtons
       * @type {Boolean}
       * @default false
       */
      showAdditionalButtons: false
    };

    _this.showButtons = function () {
      _this.setState({ showAdditionalButtons: true });
    };

    _this.hideButtons = function () {
      _this.setState({ showAdditionalButtons: false });
    };

    _this.componentTags = _this.componentTags.bind(_this);
    return _this;
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
      return _react3.default.createElement(
        'div',
        _extends({ className: this.mainClasses, onMouseLeave: this.hideButtons }, this.componentTags()),
        this.renderMainButton,
        this.renderAdditionalButtons
      );
    }
  }, {
    key: 'componentTags',
    value: function componentTags() {
      return {
        'data-component': 'split-button',
        'data-element': this.props['data-element'],
        'data-role': this.props['data-role']
      };
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
      return (0, _classnames2.default)('carbon-split-button', this.props.className, {
        'carbon-split-button--open': this.state.showAdditionalButtons
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
      return (0, _classnames2.default)('carbon-split-button__additional-buttons', {
        'carbon-split-button__additional-buttons--hidden': !this.state.showAdditionalButtons
      });
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
      return 'carbon-split-button__toggle';
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
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.onMouseEnter = this.hideButtons;
      props.className = "carbon-split-button__main-button";
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
      return _react3.default.createElement(
        'div',
        null,
        _react3.default.createElement(
          _button2.default,
          _extends({}, this.mainButtonProps, { 'data-element': 'main-button' }),
          this.props.text
        ),
        _react3.default.createElement(
          _button2.default,
          _extends({}, this.toggleButtonProps, { 'data-element': 'open' }),
          _react3.default.createElement(_icon2.default, { type: 'dropdown' })
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
      return _react3.default.createElement(
        'div',
        { className: this.additionalButtonsClasses, 'data-element': 'additional-buttons' },
        this.props.children
      );
    }
  }]);

  return SplitButton;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Customizes the appearance, can be set to 'primary' or 'secondary'.
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
  disabled: _propTypes2.default.bool
}, _class.defaultProps = {
  as: 'secondary',
  disabled: false
}, _class.safeProps = ['disabled', 'as'], _temp));

exports.default = SplitButton;