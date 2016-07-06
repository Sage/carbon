/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_button = require('./../button');

/*istanbul ignore next*/
var _button2 = _interopRequireDefault(_button);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Banner widget.
 *
 * == How to use a Banner in a component:
 *
 * In your file:
 *
 *   import Banner from 'carbon/lib/components/banner';
 *
 * To render the Banner:
 *
 *   <Banner
 *      title="This is a title"
 *      message="This is my message."
 *      buttonAction={ this.handleButtonClick } />
 *
 * Additionally you can pass optional props to the Banner component
 *
 *   as: Customizes the appearence of the banner changing the colour
 *       (see the 'iconColorSets' for possible values).
 *
 *   buttonText: allows you to customize the button text.
 *
 * @class Banner
 * @constructor
 */

var Banner = function (_React$Component) {
  _inherits(Banner, _React$Component);

  function Banner() {
    _classCallCheck(this, Banner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Banner).apply(this, arguments));
  }

  _createClass(Banner, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: 'ui-banner__content' },
            /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ className: 'ui-banner__icon', type: this.props.as }),
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'div',
              /*istanbul ignore next*/{ className: 'ui-banner__info' },
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'div',
                /*istanbul ignore next*/{ className: 'ui-banner__title' },
                this.props.title
              ),
              /*istanbul ignore next*/_react2.default.createElement(
                /*istanbul ignore next*/'div',
                /*istanbul ignore next*/{ className: 'ui-banner__message' },
                this.props.message
              )
            ),
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_button2.default,
              /*istanbul ignore next*/{ onClick: this.props.buttonAction, className: this.buttonClasses },
              this.props.buttonText
            )
          )
        )
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Classes for the banner
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-banner', /*istanbul ignore next*/'ui-banner--' + this.props.as, this.props.className)
      );
    }

    /**
     * Classes for the button action
     *
     * @method buttonClasses
     * @return {String} classNames for button
     */

  }, {
    key: 'buttonClasses',
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-banner__action', /*istanbul ignore next*/'ui-banner__action--' + this.props.as)
      );
    }
  }]);

  return Banner;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Banner.propTypes = {

  /**
   * Customizes the appearance through icon and colour
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'info'
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Title to be displayed.
   *
   * @property title
   * @type {String}
   */
  title: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * Message to be displayed.
   *
   * @property message
   * @type {String}
   */
  message: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired,

  /**
   * Text to display on button.
   *
   * @property buttonText
   * @type {String}
   * @default 'Got it!'
   */
  buttonText: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * The action to trigger on click.
   *
   * @property buttonAction
   * @type {func}
   */
  buttonAction: /*istanbul ignore next*/_react2.default.PropTypes.func.isRequired
};
/*istanbul ignore next*/Banner.defaultProps = {
  as: 'info',
  buttonText: 'Got it!'
};
/*istanbul ignore next*/exports.default = Banner;