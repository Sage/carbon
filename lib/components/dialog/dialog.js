/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_modal = require('./../modal');

/*istanbul ignore next*/
var _modal2 = _interopRequireDefault(_modal);

var /*istanbul ignore next*/_bowser = require('bowser');

/*istanbul ignore next*/
var _bowser2 = _interopRequireDefault(_bowser);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
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
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Dialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Dialog)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.centerDialog = function () {
      var height = /*istanbul ignore next*/_this._dialog.offsetHeight / 2,
          width = /*istanbul ignore next*/_this._dialog.offsetWidth / 2,
          midPointY = window.innerHeight / 2 + window.pageYOffset,
          midPointX = window.innerWidth / 2 + window.pageXOffset;

      midPointY = midPointY - height;
      midPointX = midPointX - width;

      if (midPointY < 20) {
        midPointY = 20;
      } else if ( /*istanbul ignore next*/_bowser2.default.ios) {
        midPointY -= window.pageYOffset;
      }

      if (midPointX < 20) {
        midPointX = 20;
      }

      /*istanbul ignore next*/_this._dialog.style.top = midPointY + "px";
      /*istanbul ignore next*/_this._dialog.style.left = midPointX + "px";
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
      return this.props.title ? /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'h2',
        /*istanbul ignore next*/{ className: this.dialogTitleClasses },
        this.props.title
      ) : null;
    }

    /**
     * Returns classes for the dialog title.
     *
     * @method dialogTitleClasses
     */

  }, {
    key: 'dialogTitleClasses',
    get: function get() {
      return 'ui-dialog__title';
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-dialog', this.props.className)
      );
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-dialog__dialog', /*istanbul ignore next*/_defineProperty({}, 'ui-dialog__dialog--' + this.props.size, typeof this.props.size !== 'undefined'))
      );
    }
  }, {
    key: 'closeIcon',
    get: function get() {
      if (this.props.showCloseIcon) {
        return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-dialog__close', type: 'close', onClick: this.props.onCancel })
        );
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
      /*istanbul ignore next*/
      var _this2 = this;

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ ref: function /*istanbul ignore next*/ref(d) /*istanbul ignore next*/{
              return (/*istanbul ignore next*/_this2._dialog = d
              );
            }, className: this.dialogClasses },
          this.dialogTitle,
          this.closeIcon,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-dialog__content' },
            this.props.children
          )
        )
      );
    }
  }]);

  return Dialog;
}(_modal2.default);

/*istanbul ignore next*/Dialog.propTypes = {
  /**
   * A custom close event handler
   *
   * @property onCancel
   * @type {Function}
   */
  onCancel: /*istanbul ignore next*/_react2.default.PropTypes.func.isRequired,

  /**
   * Sets the open state of the dialog
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: /*istanbul ignore next*/_react2.default.PropTypes.bool.isRequired,

  /**
   * Title displayed at top of dialog
   *
   * @property title
   * @type {Object}
   */
  title: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.object]),

  /**
   * Determines if the background is disabled
   * when the dialog is open
   *
   * @property enableBackgroundUI
   * @type {Boolean}
   * @default true
   */
  enableBackgroundUI: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Size of dialog, default size is 750px
   *
   * @property size
   * @type {String}
   * @default med
   */
  size: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Determins if the close icon is shown
   *
   * @property showCloseIcon
   * @type {Boolean}
   * @default true
   */
  showCloseIcon: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/Dialog.defaultProps = {
  size: 'medium',
  showCloseIcon: true
};
/*istanbul ignore next*/exports.default = Dialog;