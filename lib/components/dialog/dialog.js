'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _modal = require('./../modal');

var _modal2 = _interopRequireDefault(_modal);

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Dialog widget.
 *
 * == How to use a Dialog in a component:
 *
 * In your file
 *
 *   import Dialog from 'carbon/lib/components/dialog';
 *
 * To render a Dialog:
 *
 *   <Dialog onCancel={ customEventHandler } />
 *
 * The component rendering the Dialog must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class Dialog
 * @constructor
 */
var Dialog = function (_Modal) {
  _inherits(Dialog, _Modal);

  function Dialog() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call.apply(_ref, [this].concat(args))), _this), _this.centerDialog = function () {
      var height = _this._dialog.offsetHeight / 2,
          width = _this._dialog.offsetWidth / 2,
          midPointY = window.innerHeight / 2 + window.pageYOffset,
          midPointX = window.innerWidth / 2 + window.pageXOffset;

      midPointY = midPointY - height;
      midPointX = midPointX - width;

      if (midPointY < 20) {
        midPointY = 20;
      } else if (_bowser2.default.ios) {
        midPointY -= window.pageYOffset;
      }

      if (midPointX < 20) {
        midPointX = 20;
      }

      _this._dialog.style.top = midPointY + "px";
      _this._dialog.style.left = midPointX + "px";
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dialog, [{
    key: 'componentDidMount',


    /**
     * A lifecycle method to update the component on initialize
     *
     * @method componentDidMount
     * @return {void}
     */
    value: function componentDidMount() {
      if (this.props.open) {
        this.centerDialog();
      }
    }

    /**
     * Called by ComponentDidUpdate when
     * Dialog is opened
     * @override
     *
     * @method onOpening
     * @return {Void}
     */

  }, {
    key: 'onOpening',
    get: function get() {
      this.centerDialog();
      window.addEventListener('resize', this.centerDialog);
    }

    /**
     * Called by ComponentDidUpdate when
     * Dialog is closed
     * @override
     *
     * @method onClosing
     * @return {Void}
     */

  }, {
    key: 'onClosing',
    get: function get() {
      window.removeEventListener('resize', this.centerDialog);
    }

    /**
     * Centers dialog relative to window
     *
     * @method centerDialog
     * @return {void}
     */

  }, {
    key: 'dialogTitle',


    /**
     * Returns HTML and text for the dialog title.
     *
     * @method dialogTitle
     * @return {String} title to display
     */
    get: function get() {
      if (this.props.title) {
        return _react2.default.createElement(
          'h2',
          { className: this.dialogTitleClasses },
          this.props.title
        );
      }

      return null;
    }

    /**
     * Returns HTML and text for the dialog subtitle.
     *
     * @method dialogSubtitle
     * @return {String} subtitle to display
     */

  }, {
    key: 'dialogSubtitle',
    get: function get() {
      if (this.props.subtitle) {
        return _react2.default.createElement(
          'p',
          { className: this.dialogSubtitleClasses },
          this.props.subtitle
        );
      }

      return null;
    }

    /**
     * Returns classes for the dialog title.
     *
     * @method dialogTitleClasses
     */

  }, {
    key: 'dialogTitleClasses',
    get: function get() {
      return 'carbon-dialog__title';
    }

    /**
     * Returns classes for the dialog title.
     *
     * @method dialogTitleClasses
     */

  }, {
    key: 'dialogSubtitleClasses',
    get: function get() {
      return 'carbon-dialog__subtitle';
    }

    /**
     * Returns classes for the component.
     * @override
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-dialog', this.props.className);
    }

    /**
     * Returns classes for the dialog.
     * @override
     *
     * @method dialogClasses
     * @return {String} dialog className
     */

  }, {
    key: 'dialogClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-dialog__dialog', _defineProperty({}, 'carbon-dialog__dialog--' + this.props.size, typeof this.props.size !== 'undefined'));
    }
  }, {
    key: 'closeIcon',
    get: function get() {
      if (this.props.showCloseIcon) {
        return _react2.default.createElement(_icon2.default, { className: 'carbon-dialog__close', type: 'close', onClick: this.props.onCancel });
      }
    }

    /**
     * Returns the computed HTML for the dialog.
     *
     * @method dialogHTML
     * @return {Object} JSX for dialog
     */

  }, {
    key: 'modalHTML',
    get: function get() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { ref: function ref(d) {
            return _this2._dialog = d;
          }, className: this.dialogClasses },
        this.dialogTitle,
        this.dialogSubtitle,
        this.closeIcon,
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog__content' },
          this.props.children
        )
      );
    }
  }]);

  return Dialog;
}(_modal2.default);

Dialog.propTypes = {
  /**
   * A custom close event handler
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: _react2.default.PropTypes.func.isRequired,

  /**
   * Sets the open state of the dialog
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: _react2.default.PropTypes.bool.isRequired,

  /**
   * Title displayed at top of dialog
   *
   * @property title
   * @type {Object}
   */
  title: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object]),

  /**
   * Subtitle displayed at top of dialog
   *
   * @property subtitle
   * @type {String}
   */
  subtitle: _react2.default.PropTypes.string,

  /**
   * Determines if the background is disabled
   * when the dialog is open
   *
   * @property enableBackgroundUI
   * @type {Boolean}
   * @default true
   */
  enableBackgroundUI: _react2.default.PropTypes.bool,

  /**
   * Size of dialog, default size is 750px
   *
   * @property size
   * @type {String}
   * @default med
   */
  size: _react2.default.PropTypes.string,

  /**
   * Determins if the close icon is shown
   *
   * @property showCloseIcon
   * @type {Boolean}
   * @default true
   */
  showCloseIcon: _react2.default.PropTypes.bool
};
Dialog.defaultProps = {
  size: 'medium',
  showCloseIcon: true
};
exports.default = Dialog;