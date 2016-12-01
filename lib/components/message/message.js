'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Message widget.
 *
 * == How to use a Message in a component:
 *
 * In your file:
 *
 *   import Message from 'carbon/lib/components/message';
 *
 * To render the Message:
 *
 *   <Message title="This is a title" open={ true }>
 *     My message content
 *   </Message>
 *
 * Additionally you can pass optional props to the Message component
 *
 *   as: Customizes the appearence of the message changing the colour
 *       (see the 'iconColorSets' for possible values).
 *
 * @class Message
 * @constructor
 */
var Message = function (_React$Component) {
  _inherits(Message, _React$Component);

  function Message() {
    _classCallCheck(this, Message);

    return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
  }

  _createClass(Message, [{
    key: 'render',
    value: function render() {
      return this.messageContent;
    }
  }, {
    key: 'componentClasses',


    /**
     * Classes to be applied to the component.
     *
     * @method componentClasses
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-message', this.props.className, 'carbon-message--' + this.props.as, {
        'carbon-message--rounded': this.props.roundedCorners,
        'carbon-message--border': this.props.border,
        'carbon-message--transparent': this.props.transparent,
        'carbon-message--dismissable': this.props.onDismiss
      });
    }

    /**
     * Content rendered for dismiss X
     *
     * @method dismissIcon
     */

  }, {
    key: 'dismissIcon',
    get: function get() {
      return this.props.onDismiss ? _react2.default.createElement(_icon2.default, { className: 'carbon-message__close', type: 'close', onClick: this.props.onDismiss }) : null;
    }

    /**
    * HTML for the title
    *
    * @method titleHTML
    */

  }, {
    key: 'titleHTML',
    get: function get() {
      return this.props.title ? _react2.default.createElement(
        'div',
        { className: 'carbon-message__title' },
        this.props.title
      ) : null;
    }

    /**
     * Classes to be applied to type background.
     *
     * @method componentClasses
     */

  }, {
    key: 'typeClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-message__type', {
        'carbon-message__type--rounded': this.props.roundedCorners
      });
    }

    /**
    * Content rendered for the message.
    *
    * @method messageContent
    */

  }, {
    key: 'messageContent',
    get: function get() {

      return this.props.open ? _react2.default.createElement(
        'div',
        { className: this.componentClasses },
        _react2.default.createElement(
          'div',
          { className: this.typeClasses },
          _react2.default.createElement(_icon2.default, { className: 'carbon-message__type-icon', type: this.props.as })
        ),
        _react2.default.createElement(
          'div',
          { className: 'carbon-message__content' },
          this.titleHTML,
          _react2.default.createElement(
            'div',
            { className: 'carbon-message__body' },
            this.props.children
          )
        ),
        this.dismissIcon
      ) : null;
    }
  }]);

  return Message;
}(_react2.default.Component);

Message.propTypes = {

  /**
   * Sets the theme for the component.
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'info'
   */
  as: _react2.default.PropTypes.string,

  /**
   * Determines if the message background is transparent or filled defined by the as property.
   *
   * @property transparent
   * @type {Boolean}
   * @default false
   */
  transparent: _react2.default.PropTypes.bool,

  /**
   * Determines if the message is open.
   *
   * @property open
   * @type {Boolean}
   * @default true
   */
  open: _react2.default.PropTypes.bool,

  /**
   * Callback for when dismissed.
   *
   * @property onDismiss
   * @type {Function}
   */
  onDismiss: _react2.default.PropTypes.func,

  /**
   * Determines if the corners of the message are rounded
   *
   * @property roundedCorners
   * @type {Boolean}
   * @default true
   */
  roundedCorners: _react2.default.PropTypes.bool,

  /**
   * Determines if a border is applied to the message
   *
   * @property border
   * @type {Boolean}
   * @default true
   */
  border: _react2.default.PropTypes.bool
};
Message.defaultProps = {
  as: 'info',
  transparent: false,
  open: true,
  roundedCorners: true,
  border: true
};
exports.default = Message;