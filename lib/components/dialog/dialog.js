'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _browser = require('../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _modal = require('../modal');

var _modal2 = _interopRequireDefault(_modal);

var _heading = require('../heading');

var _heading2 = _interopRequireDefault(_heading);

var _elementResize = require('../../utils/helpers/element-resize');

var _elementResize2 = _interopRequireDefault(_elementResize);

require('./dialog.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIALOG_OPEN_HTML_CLASS = 'carbon-dialog--open';

/**
 * A Dialog widget.
 *
 * == How to use a Dialog in a component:
 *
 * In your file
 *
 *   import Dialog from 'carbon-react/lib/components/dialog';
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

  function Dialog(args) {
    _classCallCheck(this, Dialog);

    var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, args));

    _this.centerDialog = function (animating) {
      if (!_this._dialog) {
        return;
      }
      var height = _this._dialog.offsetHeight / 2,
          width = _this._dialog.offsetWidth / 2,
          win = _this.window;

      var midPointY = win.innerHeight / 2,
          midPointX = win.innerWidth / 2;

      midPointY -= height;
      midPointX -= width;

      if (midPointY < 20) {
        midPointY = 20;
      }

      if (midPointX < 20) {
        midPointX = 20;
      }

      if (_this._content) {
        // apply height to content based on height of title
        var titleHeight = _this._title ? _this._title.offsetHeight : '0';
        _this._content.style.height = 'calc(100% - ' + titleHeight + 'px)';
      }

      _this._dialog.style.top = midPointY + 'px';
      _this._dialog.style.left = midPointX + 'px';

      if (animating === true) {
        // cause timeout to accommodate dialog animating in
        setTimeout(function () {
          _this.applyFixedBottom();
        }, 500);
      } else {
        _this.applyFixedBottom();
      }
    };

    _this.applyFixedBottom = function () {
      if (!_this.appliedFixedBottom && _this.shouldHaveFixedBottom()) {
        _this.appliedFixedBottom = true;
        _this.forceUpdate();
      } else if (_this.appliedFixedBottom && !_this.shouldHaveFixedBottom()) {
        _this.appliedFixedBottom = false;
        _this.forceUpdate();
      }
    };

    _this.shouldHaveFixedBottom = function () {
      if (!_this._innerContent) {
        return false;
      }

      var contentHeight = _this._innerContent.offsetHeight + _this._innerContent.offsetTop,
          windowHeight = _this.window.innerHeight - _this._dialog.offsetTop - 1;

      return contentHeight > windowHeight;
    };

    _this.componentTags = _this.componentTags.bind(_this);
    _this.onDialogBlur = _this.onDialogBlur.bind(_this);
    _this.onCloseIconBlur = _this.onCloseIconBlur.bind(_this);
    _this.document = _browser2.default.getDocument();
    _this.window = _browser2.default.getWindow();
    return _this;
  }

  /**
   * A lifecycle method to update the component on initialize
   *
   * @method componentDidMount
   * @return {void}
   */


  _createClass(Dialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.open) {
        this.centerDialog();
        if (this.props.autoFocus) {
          this.focusDialog();
        }
      }
    }

    /**
     * Event handler to handle keyboard
     * focus leaving the dialog element.
     */

  }, {
    key: 'onDialogBlur',
    value: function onDialogBlur(ev) {} // eslint-disable-line no-unused-vars

    /**
     * Event handler for when the close icon
     * loses keyboard focus.
     *
     * As the close icon is the last element in the dialog
     * source, when the keyboard focus leaves the close
     * icon return the focus to the dialog itself.
     *
     * @return {Void}
     */

  }, {
    key: 'onCloseIconBlur',
    value: function onCloseIconBlur(ev) {
      ev.preventDefault();
      this.focusDialog();
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
    key: 'focusDialog',
    value: function focusDialog() {
      if (!this._dialog) {
        return;
      }
      this._dialog.focus();
    }

    /**
     * Determines if the dialog should have a fixed bottom.
     *
     * @method shouldHaveFixedBottom
     * @return {Boolean}
     */

  }, {
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'dialog',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }
  }, {
    key: 'additionalContent',
    value: function additionalContent() {
      return null;
    }

    /**
     * Returns the computed HTML for the dialog.
     *
     * @method dialogHTML
     * @return {Object} JSX for dialog
     */

  }, {
    key: 'onOpening',
    get: function get() {
      this.document.documentElement.classList.add(DIALOG_OPEN_HTML_CLASS);
      this.centerDialog(true);
      _elementResize2.default.addListener(this._innerContent, this.applyFixedBottom);
      this.window.addEventListener('resize', this.centerDialog);

      if (this.props.autoFocus) {
        return this.focusDialog();
      }

      return null;
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
      this.appliedFixedBottom = false;
      this.document.documentElement.classList.remove(DIALOG_OPEN_HTML_CLASS);
      this.window.removeEventListener('resize', this.centerDialog);
      return _elementResize2.default.removeListener(this._innerContent, this.applyFixedBottom);
    }

    /**
     * Centers dialog relative to window
     *
     * @method centerDialog
     * @param {Boolean} notRender - declares that the method was called not as part of the component lifecycle
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
      var _this2 = this;

      if (!this.props.title) {
        return null;
      }

      var title = this.props.title;

      var classes = (0, _classnames2.default)('carbon-dialog__title', {
        'carbon-dialog__title--has-subheader': this.props.subtitle
      });

      if (typeof title === 'string') {
        title = _react2.default.createElement(_heading2.default, {
          title: title,
          titleId: 'carbon-dialog-title',
          subheader: this.props.subtitle,
          subtitleId: 'carbon-dialog-subtitle'
        });
      }

      return _react2.default.createElement(
        'div',
        { className: classes, ref: function ref(c) {
            _this2._title = c;
          } },
        title
      );
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
      var _classNames;

      return (0, _classnames2.default)('carbon-dialog__dialog', (_classNames = {}, _defineProperty(_classNames, 'carbon-dialog__dialog--' + this.props.size, typeof this.props.size !== 'undefined'), _defineProperty(_classNames, 'carbon-dialog__dialog--fixed-bottom', this.appliedFixedBottom), _defineProperty(_classNames, 'carbon-dialog__dialog--has-height', this.props.height), _defineProperty(_classNames, 'carbon-dialog__dialog--sticky-form-footer', this.props.stickyFormFooter), _classNames));
    }
  }, {
    key: 'closeIcon',
    get: function get() {
      if (this.props.showCloseIcon) {
        return _react2.default.createElement(_icon2.default, {
          className: 'carbon-dialog__close',
          'data-element': 'close',
          onClick: this.props.onCancel,
          type: 'close',
          tabIndex: '0',
          onBlur: this.onCloseIconBlur
        });
      }
      return null;
    }
  }, {
    key: 'modalHTML',
    get: function get() {
      var _this3 = this;

      var height = this.props.height;


      if (height && !height.match(/px$/)) {
        height = height + 'px';
      }

      var dialogProps = {
        className: this.dialogClasses,
        tabIndex: 0,
        style: {
          minHeight: height
        }
      };

      var style = {};

      if (this.props.ariaRole) {
        dialogProps.role = this.props.ariaRole;
      }

      if (this.props.title) {
        dialogProps['aria-labelledby'] = 'carbon-dialog-title';
      }

      if (this.props.subtitle) {
        dialogProps['aria-describedby'] = 'carbon-dialog-subtitle';
      }

      if (this.props.height) {
        style.minHeight = 'calc(' + height + ' - 40px)';
      }

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(d) {
            _this3._dialog = d;
          }
        }, dialogProps, this.componentTags(this.props), {
          onBlur: this.onDialogBlur
        }),
        this.dialogTitle,
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog__content', ref: function ref(c) {
              _this3._content = c;
            } },
          _react2.default.createElement(
            'div',
            {
              className: 'carbon-dialog__inner-content', ref: function ref(c) {
                _this3._innerContent = c;
              },
              style: style
            },
            this.props.children,
            this.additionalContent()
          )
        ),
        this.closeIcon
      );
    }
  }]);

  return Dialog;
}(_modal2.default);

Dialog.propTypes = (0, _lodash.assign)({}, _modal2.default.propTypes, {
  /**
   * Allows developers to specify a specific height for the dialog.
   *
   * @property height
   * @type {String}
   */
  height: _propTypes2.default.string,

  /**
   * Title displayed at top of dialog
   *
   * @property title
   * @type {Object}
   */
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

  /**
   * Subtitle displayed at top of dialog
   *
   * @property subtitle
   * @type {String}
   */
  subtitle: _propTypes2.default.string,

  /**
   * Size of dialog, default size is 750px
   *
   * @property size
   * @type {String}
   * @default med
   */
  size: _propTypes2.default.string,

  /**
   * Determines if the close icon is shown
   *
   * @property showCloseIcon
   * @type {Boolean}
   * @default true
   */
  showCloseIcon: _propTypes2.default.bool,

  /**
   * If true then the dialog receives focus
   * when it opens
   *
   * @property autoFocus
   * @type {Boolean}
   * @default false
   */
  autoFocus: _propTypes2.default.bool,

  stickyFormFooter: _propTypes2.default.bool
});
Dialog.defaultProps = {
  autoFocus: true,
  size: 'medium',
  showCloseIcon: true,
  ariaRole: 'dialog'
};
exports.default = Dialog;