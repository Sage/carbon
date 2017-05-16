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

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tags = require('../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Message: {
    displayName: 'Message'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/message/message.js',
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
var Message = _wrapComponent('Message')((_temp = _class = function (_React$Component) {
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
      return this.props.onDismiss ? _react3.default.createElement(_icon2.default, {
        className: 'carbon-message__close',
        'data-element': 'dismiss',
        onClick: this.props.onDismiss,
        type: 'close'
      }) : null;
    }

    /**
    * HTML for the title
    *
    * @method titleHTML
    */

  }, {
    key: 'titleHTML',
    get: function get() {
      return this.props.title ? _react3.default.createElement(
        'div',
        { className: 'carbon-message__title', 'data-element': 'title' },
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

      return this.props.open ? _react3.default.createElement(
        'div',
        _extends({ className: this.componentClasses }, (0, _tags.tagComponent)('message', this.props)),
        _react3.default.createElement(
          'div',
          { className: this.typeClasses },
          _react3.default.createElement(_icon2.default, { className: 'carbon-message__type-icon', type: this.props.as })
        ),
        _react3.default.createElement(
          'div',
          { className: 'carbon-message__content' },
          this.titleHTML,
          _react3.default.createElement(
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
}(_react3.default.Component), _class.propTypes = {

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
   * Determines if the message background is transparent or filled defined by the as property.
   *
   * @property transparent
   * @type {Boolean}
   * @default false
   */
  transparent: _propTypes2.default.bool,

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
   * Determines if a border is applied to the message
   *
   * @property border
   * @type {Boolean}
   * @default true
   */
  border: _propTypes2.default.bool
}, _class.defaultProps = {
  as: 'info',
  transparent: false,
  open: true,
  roundedCorners: true,
  border: true
}, _temp));

exports.default = Message;