'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _lodash = require('lodash');

var _shouldComponentUpdate2 = require('./../../utils/helpers/should-component-update');

var _shouldComponentUpdate3 = _interopRequireDefault(_shouldComponentUpdate2);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _alert = require('./../alert');

var _alert2 = _interopRequireDefault(_alert);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Flash widget.
 *
 * The flash is rendered in two sections: a ventral message 'flash', and a
 * dorsal coloured, expanding 'slider'.
 *
 * == How to use an Flash in a component:
 *
 * In your file
 *
 *   import Flash from 'carbon/lib/components/flash';
 *
 * To render a Flash, setup open and cancel handlers in your view to trigger
 * the message on and off:
 *
 *  <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' />
 *
 * By default, the flash renders with a clickable close icon that hooks up with the onDismiss function.
 *
 * To instead have the flash disappear after a given time period, pass a prop of timeout in milliseconds.
 *
 *  <Flash open={ openStatus } onDismiss={ myOnDismiss } message='Alert!' timeout={ 2000 }/>
 *
 * The flash message can be formatted in the following ways:
 *
 *  * A string: "Alert"
 *  * An array: ["Message One", "Message Two"]
 *  * An object with description: { description: "My description" }
 *  * An object of key/value pairs: { first_name: "is required", last_name: "is required" }
 *  * An object with description with nested key/value pairs:
 *    { description: { first_name: "is required", last_name: "is required" } }
 *
 * If a message is too long, it can be proxied to a dialog by adding `::more::` in your description.
 *
 *  let message = "This is too long ::more:: This sentence is proxied to a dialog."
 *
 * @class Flash
 * @constructor
 */
var Flash = function (_React$Component) {
  _inherits(Flash, _React$Component);

  function Flash() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Flash);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Flash.__proto__ || Object.getPrototypeOf(Flash)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      /**
       * Keeps track on the open state of each dialog
       *
       * @property dialogs
       * @type {Object}
       */
      dialogs: {}

      /**
       * Resets the dialog open states if flash is opened/closed.
       *
       * @method componentWillReceiveProps
       * @return(Void)
       */
    }, _this.dialogs = [], _this.timeout = null, _this.startTimeout = function () {
      _this.stopTimeout();

      if (_this.shouldStartTimeout()) {
        _this.timeout = setTimeout(function () {
          _this.props.onDismiss();
        }, _this.props.timeout);
      }
    }, _this.shouldStartTimeout = function () {
      if (!_this.props.timeout || !_this.props.open) {
        return false;
      }

      var shouldStartTimeout = true;

      for (var key in _this.state.dialogs) {
        if (_this.state.dialogs[key]) {
          shouldStartTimeout = false;
        }
      }

      return shouldStartTimeout;
    }, _this.stopTimeout = function () {
      clearTimeout(_this.timeout);
    }, _this.toggleDialog = function (key) {
      return function (ev) {
        if (ev) {
          ev.preventDefault();
        }

        var state = _this.state.dialogs[key];
        // open/close the dialog
        _this.setState({ dialogs: _defineProperty({}, key, !state) });

        // start/stop the timer if the dialog opens or closes
        if (state) {
          _this.startTimeout();
        } else {
          _this.stopTimeout();
        }
      };
    }, _this.formatDescription = function (description) {
      var object = (0, _lodash.isObject)(description),
          array = (0, _lodash.isArray)(description);

      _this.dialogs = [];

      if (array || object) {
        var items = [];

        // iterate through the object or array
        (0, _lodash.forEach)(description, function (value, key) {
          var itemValue = void 0;

          // pass the value through the find more parser
          var text = _this.findMore(value);

          if (!array && !/(^base|\.base)$/.test(key)) {
            // if object, apply key to each item
            itemValue = _react2.default.createElement(
              'span',
              null,
              key,
              ': ',
              text
            );
          } else {
            // otherwise just set value
            itemValue = text;
          }

          // add item to list
          items.push(_react2.default.createElement(
            'li',
            { key: key },
            itemValue
          ));
        });

        return _react2.default.createElement(
          'ul',
          null,
          items
        );
      }
      // if just a string, pass it through the find more parser
      return _this.findMore(description);
    }, _this.findMore = function (text) {
      var value = text;
      if (typeof text !== 'string') {
        return value;
      }

      // detect any instances of "::more::" in the text
      var parts = text.split('::more::');

      if (parts.length > 1) {
        var title = parts[0].trim(),
            desc = parts[1].trim(),
            info = _i18nJs2.default.t('notifications.more_info', { defaultValue: 'More Information' });

        // create dialog for additional content
        _this.dialogs.push(_react2.default.createElement(
          _alert2.default,
          {
            'data-element': 'info-dialog',
            key: title,
            title: title,
            open: _this.state.dialogs[title] || false,
            onCancel: _this.toggleDialog(title)
          },
          desc
        ));

        // create text for item
        value = _react2.default.createElement(
          'span',
          null,
          title,
          '\xA0',
          _react2.default.createElement(
            _link2.default,
            {
              onClick: _this.toggleDialog(title),
              className: 'carbon-flash__link',
              'data-element': 'more-info'
            },
            info
          )
        );
      }

      return value;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Flash, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(prevProps) {
      if (prevProps.open !== this.props.open) {
        this.setState({ dialogs: {} });
      }
    }

    /**
     * Determines if the component should be updated or not. Required for this component
     * as it determines if the timeout should be reset or not.
     *
     * @method shouldComponentUpdate
     * @return {Boolean}
     */

  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _shouldComponentUpdate3.default)(this, nextProps, nextState);
    }

    /**
     * Conditionally triggers close action after flash displayed.
     *
     * @method componentDidUpdate
     * @return(Void)
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // reset dialogs to render
      this.dialogs = [];
      this.startTimeout();
    }

    /**
     * Keeps track of additional dialogs to render for "more info" links
     *
     * @property dialogs
     * @type {Array}
     */


    /**
     * A timeout for when a flash should auto-dismiss
     *
     * @property timeout
     * @type {Timer}
     */


    /**
     * Starts the timer to auto dismiss flash messages.
     *
     * @method startTimeout
     * @return(Void)
     */


    /**
     * Determines if the timeout should be started.
     *
     * @method shouldStartTimeout
     * @return {Boolean}
     */


    /**
     * Stops the timer to auto dismiss flash messages.
     *
     * @method stopTimeout
     * @return(Void)
     */


    /**
     * Opens/closes the dialog for the given key.
     *
     * @method toggleDialog
     * @param {String} key
     * @param {Object} ev
     * @return(Void)
     */


    /**
     * Given a description, format it accordingly.
     *
     * @method toggleDialog
     * @param {String} description
     * @return {HTML}
     */


    /**
     * Splits the string and sets additional content inside a dialog.
     *
     * @method findMore
     * @param {String} text
     * @return {HTML}
     */

  }, {
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var flashHTML = void 0,
          sliderHTML = void 0;

      if (this.props.open) {
        flashHTML = this.flashHTML;
        sliderHTML = this.sliderHTML;
      }

      return _react2.default.createElement(
        'div',
        (0, _tags2.default)('flash', this.props),
        _react2.default.createElement(
          'div',
          { className: this.classes },
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              transitionName: 'carbon-flash__slider',
              transitionEnterTimeout: 600,
              transitionLeaveTimeout: 600
            },
            sliderHTML,
            _react2.default.createElement(
              _CSSTransitionGroup2.default,
              {
                transitionName: 'carbon-flash__content',
                transitionEnterTimeout: 800,
                transitionLeaveTimeout: 500
              },
              flashHTML
            )
          )
        ),
        this.dialogs
      );
    }
  }, {
    key: 'iconType',


    /**
     * Returns the icon to display depending on type
     *
     * @method iconType
     * @return {String}
     */
    get: function get() {
      var icon = void 0;

      switch (this.props.as) {
        case 'success':
          icon = 'tick';
          break;
        default:
          icon = this.props.as;
          break;
      }
      return icon;
    }

    /**
     * Parses the message object to get the appropriate description
     *
     * @method description
     * @return {String}
     */

  }, {
    key: 'description',
    get: function get() {
      var message = this.props.message;

      if ((0, _lodash.isObject)(message) && message.description) {
        // if defined, return description
        return message.description;
      }

      // otherwise, just return itself
      return message;
    }

    /**
     * Returns the computed HTML for the flash.
     *
     * @method flashHTML
     * @return {Object} JSX for flash
     */

  }, {
    key: 'flashHTML',
    get: function get() {
      var contents = [];

      // add icon
      contents.push(_react2.default.createElement(_icon2.default, { className: 'carbon-flash__icon', type: this.iconType, key: 'icon' }));

      // add message content
      contents.push(_react2.default.createElement(
        'div',
        { className: 'carbon-flash__message', key: 'message', 'data-element': 'message' },
        this.formatDescription(this.description)
      ));

      // if auto-dismiss is not enabled, add a close icon
      if (!this.props.timeout) {
        contents.push(_react2.default.createElement(_icon2.default, {
          className: 'carbon-flash__close',
          'data-element': 'close',
          key: 'close',
          onClick: this.props.onDismiss,
          type: 'close'
        }));
      }

      return _react2.default.createElement(
        'div',
        { className: 'carbon-flash__content' },
        contents
      );
    }

    /**
     * Returns the computed HTML for the slider.
     *
     * @method flashHTML
     * @return {Object} JSX for flash
     */

  }, {
    key: 'sliderHTML',
    get: function get() {
      return _react2.default.createElement('div', { className: 'carbon-flash__slider', key: 'slider' });
    }

    /**
     * Returns the classes for the component.
     *
     * @method classes
     * @return {String}
     */

  }, {
    key: 'classes',
    get: function get() {
      return (0, _classnames2.default)('carbon-flash', this.props.className, 'carbon-flash--' + this.props.as);
    }
  }]);

  return Flash;
}(_react2.default.Component);

Flash.propTypes = {

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * A custom close event handler
   *
   * @property onDismiss
   * @type {Function}
   */
  onDismiss: _propTypes2.default.func.isRequired,

  /**
   * Sets the open state of the flash.
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: _propTypes2.default.bool.isRequired,

  /**
   * Type of notification.
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'success'
   */
  as: _propTypes2.default.string,

  /**
   * Contents of message.
   *
   * @property message
   * @type {String|Object|Array}
   */
  message: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.array]).isRequired,

  /**
   * Time for flash to remain on screen
   *
   * @property timeout
   * @type {Number} in milliseconds
   */
  timeout: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
Flash.defaultProps = {
  as: 'success',
  className: '',
  timeout: 0
};
exports.default = Flash;