/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_icon = require('./../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_tooltipDecorator = require('./../../utils/decorators/tooltip-decorator');

/*istanbul ignore next*/
var _tooltipDecorator2 = _interopRequireDefault(_tooltipDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Help widget.
 *
 * == How to use a Help in a component:
 *
 * In your file
 *
 *   import Help from 'carbon/lib/components/help';
 *
 * To render a help component:
 *
 *   <Help>{ this.props.helpMessage }</Help>
 *
 *  You can also pass additional props of tooltipPosition and tooltipAlign.
 *
 * @class Help
 * @constructor
 * @decorators {TooltipDecorator}
 */
var Help = /*istanbul ignore next*/(0, _tooltipDecorator2.default)( /*istanbul ignore next*/(_temp = _class = function (_React$Component) {
  _inherits(Help, _React$Component);

  function Help() {
    _classCallCheck(this, Help);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Help).apply(this, arguments));
  }

  _createClass(Help, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'a',
          /*istanbul ignore next*/{ className: this.mainClasses, href: this.props.href },
          /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{
            type: 'help',
            tooltipMessage: this.props.children,
            tooltipPosition: this.props.tooltipPosition,
            tooltipAlign: this.props.tooltipAlign
          })
        )
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Return component classes
     *
     * @method mainClasses
     * @return {String} classes
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-help', { 'ui-help__href': this.props.href }, this.props.className)
      );
    }
  }]);

  return Help;
}( /*istanbul ignore next*/_react2.default.Component), _class.propTypes = {
  /**
   * Message to display in tooltip
   *
   * @property children
   * @type {String}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Position of tooltip relative to target
   *
   * @property tooltipPosition
   * @type {String} Options: { top, bottom, right, left }
   * @default top
   */
  tooltipPosition: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Aligment of pointer
   *
   * @property tooltipAlign
   * @type {String} Options: { top, bottom, right, left, center }
   * @default center
   */
  tooltipAlign: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * A path for the anchor
   *
   * @property href
   * @type {String}
   */
  href: /*istanbul ignore next*/_react2.default.PropTypes.string
}, _class.defaultProps = {
  tooltipPosition: 'top',
  tooltipAlign: 'center'
}, _temp));

/*istanbul ignore next*/exports.default = Help;