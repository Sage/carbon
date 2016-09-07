/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_alert = require('./../alert');

/*istanbul ignore next*/
var _alert2 = _interopRequireDefault(_alert);

var /*istanbul ignore next*/_link = require('./../link');

/*istanbul ignore next*/
var _link2 = _interopRequireDefault(_link);

var /*istanbul ignore next*/_lodash = require('lodash');

/*istanbul ignore next*/
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
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Flash);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Flash)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.timeout = null, _this.dialogs = [], _this.state = {
      /**
       * Keeps track on the open state of each dialog
       *
       * @property dialogs
       * @type {Object}
       */
      dialogs: {}
    }, _this.startTimeout = function () {
      if ( /*istanbul ignore next*/_this.props.timeout && /*istanbul ignore next*/_this.props.open === true) {
        /*istanbul ignore next*/_this.timeout = setTimeout(function () {
          /*istanbul ignore next*/_this.props.onDismiss();
        }, /*istanbul ignore next*/_this.props.timeout);
      }
    }, _this.stopTimeout = function () {
      clearTimeout( /*istanbul ignore next*/_this.timeout);
    }, _this.toggleDialog = function (key, ev) {
      if (ev) {
        ev.preventDefault();
      }

      var state = /*istanbul ignore next*/_this.state.dialogs[key];
      // open/close the dialog
      /*istanbul ignore next*/_this.setState({ dialogs: /*istanbul ignore next*/_defineProperty({}, key, !state) });

      // start/stop the timer if the dialog opens or closes
      if (state) {
        /*istanbul ignore next*/_this.startTimeout();
      } else {
        /*istanbul ignore next*/_this.stopTimeout();
      }
    }, _this.formatDescription = function (description) {
      var object = /*istanbul ignore next*/(0, _lodash.isObject)(description),
          array = /*istanbul ignore next*/(0, _lodash.isArray)(description);

      /*istanbul ignore next*/_this.dialogs = [];

      if (array || object) {
        /*istanbul ignore next*/
        var _ret2 = function () {
          var items = [];

          // iterate through the object or array
          /*istanbul ignore next*/(0, _lodash.forEach)(description, function (value, key) {
            var itemValue = /*istanbul ignore next*/void 0;

            // pass the value through the find more parser
            value = /*istanbul ignore next*/_this.findMore(value);

            if (!array && !/(^base|\.base)$/.test(key)) {
              // if object, apply key to each item
              itemValue = /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'span',
                /*istanbul ignore next*/null,
                key,
                /*istanbul ignore next*/': ',
                value
              );
            } else {
              // otherwise just set value
              itemValue = value;
            }

            // add item to list
            items.push( /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'li',
              /*istanbul ignore next*/{ key: key },
              itemValue
            ));
          });

          return (/*istanbul ignore next*/{
              v: /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'ul',
                /*istanbul ignore next*/null,
                items
              )
            }
          );
        }();

        /*istanbul ignore next*/if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        // if just a string, pass it through the find more parser
        return (/*istanbul ignore next*/_this.findMore(description)
        );
      }
    }, _this.findMore = function (text) {
      if (typeof text != 'string') {
        return text;
      }

      // detect any instances of "::more::" in the text
      var parts = text.split('::more::');

      if (parts.length > 1) {
        var title = parts[0].trim(),
            desc = parts[1].trim(),
            info = /*istanbul ignore next*/_i18nJs2.default.t('notifications.more_info', { defaultValue: "More Information" });

        // create dialog for additional content
        /*istanbul ignore next*/_this.dialogs.push( /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_alert2.default,
          /*istanbul ignore next*/{
            key: title,
            title: title,
            open: /*istanbul ignore next*/_this.state.dialogs[title] || false,
            onCancel: /*istanbul ignore next*/_this.toggleDialog.bind( /*istanbul ignore next*/_this, title)
          },
          desc
        ));

        // create text for item
        text = /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'span',
          /*istanbul ignore next*/null,
          title,
          /*istanbul ignore next*/' ',
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_link2.default,
            /*istanbul ignore next*/{ onClick: /*istanbul ignore next*/_this.toggleDialog.bind( /*istanbul ignore next*/_this, title), className: 'carbon-flash__link' },
            info
          )
        );
      }

      return text;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * A timeout for when a flash should auto-dismiss
   *
   * @property timeout
   * @type {Timer}
   */


  /**
   * Keeps track of additional dialogs to render for "more info" links
   *
   * @property dialogs
   * @type {Array}
   */


  _createClass(Flash, [{
    key: 'componentWillReceiveProps',


    /**
     * Resets the dialog open states if flash is opened/closed.
     *
     * @method componentWillReceiveProps
     * @return(Void)
     */
    value: function componentWillReceiveProps(prevProps) {
      if (prevProps.open != this.props.open) {
        this.setState({ dialogs: {} });
      }
    }

    /**
     * Conditionally triggers close action after flash displayed.
     *
     * @method componentDidUpdate
     * @return(Void)
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      // reset dialogs to render
      this.dialogs = [];

      if (prevProps.open != this.props.open) {
        this.startTimeout();
      }
    }

    /**
     * Starts the timer to auto dismiss flash messages.
     *
     * @method startTimeout
     * @return(Void)
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
      var flashHTML = /*istanbul ignore next*/void 0,
          sliderHTML = /*istanbul ignore next*/void 0;

      if (this.props.open) {
        flashHTML = this.flashHTML;
        sliderHTML = this.sliderHTML;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/null,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: this.classes },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
              /*istanbul ignore next*/{
                transitionName: 'carbon-flash__slider',
                transitionEnterTimeout: 600,
                transitionLeaveTimeout: 600 },
              sliderHTML,
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
                /*istanbul ignore next*/{
                  transitionName: 'carbon-flash__content',
                  transitionEnterTimeout: 800,
                  transitionLeaveTimeout: 500 },
                flashHTML
              )
            )
          ),
          this.dialogs
        )
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
      var icon = /*istanbul ignore next*/void 0;

      switch (this.props.as) {
        case 'success':
          icon = 'tick';
          break;
        case 'error':
          icon = 'warning';
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

      if ( /*istanbul ignore next*/(0, _lodash.isObject)(message) && message.description) {
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
      contents.push( /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'carbon-flash__icon', type: this.iconType, key: 'icon' }));

      // add message content
      contents.push( /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'div',
        /*istanbul ignore next*/{ className: 'carbon-flash__message', key: 'message' },
        this.formatDescription(this.description)
      ));

      // if auto-dismiss is not enabled, add a close icon
      if (!this.props.timeout) {
        contents.push( /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'carbon-flash__close-icon', onClick: this.props.onDismiss, key: 'close' },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'close' })
        ));
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'carbon-flash__content' },
          contents
        )
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
      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'div', /*istanbul ignore next*/{ className: 'carbon-flash__slider', key: 'slider' })
      );
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('carbon-flash', this.props.className, /*istanbul ignore next*/'carbon-flash--' + this.props.as)
      );
    }
  }]);

  return Flash;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Flash.propTypes = {

  /**
   * A custom close event handler
   *
   * @property onDismiss
   * @type {Function}
   */
  onDismiss: /*istanbul ignore next*/_react2.default.PropTypes.func.isRequired,

  /**
   * Sets the open state of the flash.
   *
   * @property open
   * @type {Boolean}
   * @default false
   */
  open: /*istanbul ignore next*/_react2.default.PropTypes.bool.isRequired,

  /**
   * Type of notification.
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'success'
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Contents of message.
   *
   * @property message
   * @type {String|Object|Array}
   */
  message: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.string, /*istanbul ignore next*/_react2.default.PropTypes.object, /*istanbul ignore next*/_react2.default.PropTypes.array]).isRequired,

  /**
   * Time for flash to remain on screen
   *
   * @property timeout
   * @type {Number} in milliseconds
   */
  timeout: /*istanbul ignore next*/_react2.default.PropTypes.number
};
/*istanbul ignore next*/Flash.defaultProps = {
  as: 'success'
};
/*istanbul ignore next*/exports.default = Flash;