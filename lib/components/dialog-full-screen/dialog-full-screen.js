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
    _classCallCheck(this, DialogFullScreen);

    return _possibleConstructorReturn(this, (DialogFullScreen.__proto__ || Object.getPrototypeOf(DialogFullScreen)).apply(this, arguments));
  }

  _createClass(DialogFullScreen, [{
    key: 'dialogClasses',


    /**
     * Returns classes for the dialog.
     *
     * @method dialogClasses
     * @return {String} dialog className
     */
    get: function get() {
      return 'carbon-dialog-full-screen__dialog';
    }

    /**
     * Returns main classes for the component combined with
     * Dialog main classes.
     *
     * @method mainClasses
     * @return {String} Main className
     */

  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2.default)(this.props.className, 'carbon-dialog-full-screen');
    }

    /**
     * Returns the computed HTML for the dialog.
     * @override
     *
     * @method modalHTML
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
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog-full-screen__header' },
          _react2.default.createElement(
            'h2',
            { className: 'carbon-dialog-full-screen__title' },
            this.props.title
          ),
          _react2.default.createElement(_icon2.default, { className: 'carbon-dialog-full-screen__close', type: 'close', onClick: this.props.onCancel })
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-dialog-full-screen__content' },
          this.props.children
        )
      );
    }
  }]);

  return DialogFullScreen;
}(_modal2.default);

DialogFullScreen.defaultProps = {
  open: false,
  enableBackgroundUI: true
};
exports.default = DialogFullScreen;