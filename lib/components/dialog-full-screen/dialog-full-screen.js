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

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _modal = require('./../modal');

var _modal2 = _interopRequireDefault(_modal);

var _heading = require('./../heading');

var _heading2 = _interopRequireDefault(_heading);

var _appWrapper = require('./../app-wrapper');

var _appWrapper2 = _interopRequireDefault(_appWrapper);

var _fullScreenHeading = require('./full-screen-heading');

var _fullScreenHeading2 = _interopRequireDefault(_fullScreenHeading);

var _browser = require('./../../utils/helpers/browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DIALOG_OPEN_HTML_CLASS = 'carbon-dialog-full-screen--open';

/**
 * A DialogFullScreen widget.
 *
 * == How to use a DialogFullScreen in a component:
 *
 * In your file
 *
 *   import DialogFullScreen from 'carbon/lib/components/dialog-full-screen';
 *
 * To render a DialogFullScreen:
 *
 *   <DialogFullScreen onCancel={ customEventHandler } />
 *
 * The component rendering the DialogFullScreen must pass down a prop of 'open' in order to open the dialog.
 *
 * You need to provide a custom cancel event handler to handle a close event.
 *
 * @class DialogFullScreen
 * @constructor
 */

var DialogFullScreen = function (_Modal) {
  _inherits(DialogFullScreen, _Modal);

  function DialogFullScreen(props) {
    _classCallCheck(this, DialogFullScreen);

    /**
     * Caches a reference to the document.
     */
    var _this = _possibleConstructorReturn(this, (DialogFullScreen.__proto__ || Object.getPrototypeOf(DialogFullScreen)).call(this, props));

    _this.dialogTitle = function () {
      var title = _this.props.title;


      if (typeof title === 'string') {
        title = _react2.default.createElement(_heading2.default, {
          title: title,
          titleId: 'carbon-dialog-title',
          subheader: _this.props.subtitle,
          subtitleId: 'carbon-dialog-subtitle'
        });
      }

      return _react2.default.createElement(
        _fullScreenHeading2.default,
        null,
        _react2.default.createElement(_icon2.default, {
          className: 'carbon-dialog-full-screen__close',
          'data-element': 'close',
          onClick: _this.props.onCancel,
          type: 'close'
        }),
        title
      );
    };

    _this.document = _browser2.default.getDocument();
    return _this;
  }

  _createClass(DialogFullScreen, [{
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'dialog-full-screen',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
    }

    /**
     * Returns the computed HTML for the dialog.
     * @override
     *
     * @return {Object} JSX for dialog
     */

  }, {
    key: 'dialogClasses',


    /**
     * Returns classes for the dialog.
     *
     * @return {String} dialog className
     */
    get: function get() {
      return 'carbon-dialog-full-screen__dialog';
    }

    /**
     * Returns main classes for the component combined with
     * Dialog main classes.
     *
     * @return {String} Main className
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)(this.props.className, 'carbon-dialog-full-screen');
    }
  }, {
    key: 'modalHTML',
    get: function get() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(d) {
            _this2._dialog = d;
          },
          className: this.dialogClasses
        }, this.componentTags(this.props)),
        this.dialogTitle(),
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog-full-screen__content', 'data-element': 'content' },
          _react2.default.createElement(
            _appWrapper2.default,
            null,
            this.props.children
          )
        )
      );
    }

    /**
     * Overrides the original function to disable the document's scroll.
     */

  }, {
    key: 'onOpening',
    get: function get() {
      return this.document.documentElement.classList.add(DIALOG_OPEN_HTML_CLASS);
    }

    /**
     * Overrides the original function to enable the document's scroll.
     */

  }, {
    key: 'onClosing',
    get: function get() {
      return this.document.documentElement.classList.remove(DIALOG_OPEN_HTML_CLASS);
    }

    /**
     * Returns HTML and text for the dialog title.
     *
     * @method dialogTitle
     * @return {Object} title to display
     */

  }]);

  return DialogFullScreen;
}(_modal2.default);

DialogFullScreen.defaultProps = {
  open: false,
  enableBackgroundUI: true };
exports.default = DialogFullScreen;