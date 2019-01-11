'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./message.scss');

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
 *   import Message from 'carbon-react/lib/components/message';
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
      var onDismiss = this.props.onDismiss;

      if (onDismiss) {
        return _react2.default.createElement(_icon2.default, {
          className: 'carbon-message__close',
          'data-element': 'dismiss',
          onClick: onDismiss,
          type: 'close'
        });
      }
      return null;
    }

    /**
    * HTML for the title
    *
    * @method titleHTML
    */

  }, {
    key: 'titleHTML',
    get: function get() {
      var title = this.props.title;

      if (title) {
        return _react2.default.createElement(
          'div',
          { className: 'carbon-message__title', 'data-element': 'title' },
          title
        );
      }
      return null;
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
      var open = this.props.open;

      if (open) {
        return _react2.default.createElement(
          'div',
          _extends({ className: this.componentClasses }, (0, _tags2.default)('message', this.props)),
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
        );
      }
      return null;
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
  as: _propTypes2.default.string,

  /**
   * Determines if a border is applied to the message
   *
   * @property border
   * @type {Boolean}
   * @default true
   */
  border: _propTypes2.default.bool,

  /**
   * The body of the message content
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * Add classes to the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Determines if the message is open.
   *
   * @property open
   * @type {Boolean}
   * @default true
   */
  open: _propTypes2.default.bool,

  /**
   * Callback for when dismissed.
   *
   * @property onDismiss
   * @type {Function}
   */
  onDismiss: _propTypes2.default.func,

  /**
   * Determines if the corners of the message are rounded
   *
   * @property roundedCorners
   * @type {Boolean}
   * @default true
   */
  roundedCorners: _propTypes2.default.bool,

  /**
   * Add a title to this component
   *
   * @property title
   * @type {Node}
   */
  title: _propTypes2.default.node,

  /**
   * Determines if the message background is transparent or filled defined by the as property.
   *
   * @property transparent
   * @type {Boolean}
   * @default false
   */
  transparent: _propTypes2.default.bool
};
Message.defaultProps = {
  as: 'info',
  transparent: false,
  open: true,
  roundedCorners: true,
  border: true };
exports.default = Message;