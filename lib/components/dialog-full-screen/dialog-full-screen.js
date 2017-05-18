'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _modal = require('./../modal');

var _modal2 = _interopRequireDefault(_modal);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

  function DialogFullScreen() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DialogFullScreen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DialogFullScreen.__proto__ || Object.getPrototypeOf(DialogFullScreen)).call.apply(_ref, [this].concat(args))), _this), _this.renderTitle = function () {
      if (typeof _this.props.title === 'string' || _this.props.title instanceof String) {
        return _react2.default.createElement(
          'h2',
          { className: 'carbon-dialog-full-screen__title', 'data-element': 'title' },
          _this.props.title
        );
      } else {
        return _this.props.title;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
            return _this2._dialog = d;
          },
          className: this.dialogClasses
        }, this.componentTags(this.props)),
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog-full-screen__header' },
          this.renderTitle(),
          _react2.default.createElement(_icon2.default, {
            className: 'carbon-dialog-full-screen__close',
            'data-element': 'close',
            onClick: this.props.onCancel,
            type: 'close'
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog-full-screen__content', 'data-element': 'content' },
          this.props.children
        )
      );
    }

    /**
     * Returns title prop wrapped in <h2> if title is a string otherwise returns the title prop directly.
     * Dialog main classes.
     *
     * @return {Object} JSX
     */

  }]);

  return DialogFullScreen;
}(_modal2.default);

DialogFullScreen.defaultProps = {
  open: false,
  enableBackgroundUI: true
};
exports.default = DialogFullScreen;