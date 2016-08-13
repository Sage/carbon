/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 * @class Flash
 * @constructor
 */

var Flash = function (_React$Component) {
  _inherits(Flash, _React$Component);

  function Flash() {
    _classCallCheck(this, Flash);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Flash).apply(this, arguments));
  }

  _createClass(Flash, [{
    key: 'componentDidUpdate',


    /**
     *  Conditionally triggers close action after flash displayed.
     *
     * @method componentDidUpdate
     * @return(Void)
     */
    value: function componentDidUpdate(prevProps) {
      /*istanbul ignore next*/
      var _this2 = this;

      if (this.props.timeout && this.props.open === true) {
        if (prevProps.open != this.props.open) {
          setTimeout(function () {
            /*istanbul ignore next*/_this2.props.onDismiss();
          }, this.props.timeout);
        }
      }
    }

    /**
     * Returns the icon to display depending on type
     *
     * @method iconType
     * @return {String}
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var flashHTML = /*istanbul ignore next*/void 0,
          sliderHTML = /*istanbul ignore next*/void 0,
          mainClasses = /*istanbul ignore next*/void 0;

      mainClasses = /*istanbul ignore next*/(0, _classnames2.default)('ui-flash', this.props.className, /*istanbul ignore next*/'ui-flash--' + this.props.as);

      if (this.props.open) {
        flashHTML = this.flashHTML;
        sliderHTML = this.sliderHTML;
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: mainClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
            /*istanbul ignore next*/{
              transitionName: 'ui-flash__slider',
              transitionEnterTimeout: 600,
              transitionLeaveTimeout: 600 },
            sliderHTML,
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
              /*istanbul ignore next*/{
                transitionName: 'ui-flash__content',
                transitionEnterTimeout: 800,
                transitionLeaveTimeout: 500 },
              flashHTML
            )
          )
        )
      );
    }
  }, {
    key: 'iconType',
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
     * Returns the computed HTML for the flash.
     *
     * @method flashHTML
     * @return {Object} JSX for flash
     */

  }, {
    key: 'flashHTML',
    get: function get() {
      var contents = [];

      contents.push( /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-flash__icon', type: this.iconType, key: 'icon' }));

      contents.push( /*istanbul ignore next*/_react2.default.createElement(
        /*istanbul ignore next*/'div',
        /*istanbul ignore next*/{ className: 'ui-flash__message', key: 'message' },
        this.props.message
      ));

      if (!this.props.timeout) {
        contents.push( /*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-flash__close-icon', onClick: this.props.onDismiss, key: 'close' },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: 'close' })
        ));
      }

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: 'ui-flash__content' },
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
      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'div', /*istanbul ignore next*/{ className: 'ui-flash__slider', key: 'slider' })
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
   * @type {String}
   */
  message: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

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