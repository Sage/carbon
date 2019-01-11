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

var _icon = require('../icon/icon');

var _icon2 = _interopRequireDefault(_icon);

var _ether = require('../../utils/ether');

var _tags = require('../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

require('./pill.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* A Pill widget.
*
* == How to use a Pill in a component:
*
* In your file:
*
*   import Pill from 'carbon-react/lib/components/pill'
*
* To render the Pill:
*
*   <Pill as='warning'>My warning text</Pill>
*
* Additionally you can pass optional props to the Pill component
*
*   as: Customizes the appearence of the pill changing the colour.
*       (see the 'iconColorSets' for possible values).
*
* @class Pill
* @constructor
*/
var Pill = function (_React$Component) {
  _inherits(Pill, _React$Component);

  function Pill() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pill);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pill.__proto__ || Object.getPrototypeOf(Pill)).call.apply(_ref, [this].concat(args))), _this), _this.mainClasses = function () {
      return (0, _classnames2.default)('carbon-pill', _this.props.className, 'carbon-pill--' + _this.props.as + (_this.props.fill ? '--fill' : '--empty'), { 'carbon-pill--link': _this.props.onClick });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pill, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2.default.createElement(
        'span',
        _extends({}, (0, _ether.validProps)(this), {
          className: this.mainClasses()
        }, (0, _tags2.default)('pill', this.props)),
        this.props.children,
        this.closeIcon
      );
    }
  }, {
    key: 'closeIcon',
    get: function get() {
      if (this.props.onDelete) {
        return _react2.default.createElement(_icon2.default, {
          className: 'carbon-pill__delete-icon',
          'data-element': 'close',
          onClick: this.props.onDelete,
          type: 'close',
          tabIndex: '0',
          onBlur: this.onCloseIconBlur,
          bgSize: 'small'
        });
      }
      return null;
    }
  }]);

  return Pill;
}(_react2.default.Component);

Pill.propTypes = {

  /**
   * Customizes the appearance through colour
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'info'
   */
  as: _propTypes2.default.string,

  /**
   * The text to display on the Pill
   *
   * @property children
   * @type {String}
   */
  children: _propTypes2.default.string.isRequired,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Fills the pill with colour when true
   *
   * @property type
   * @type {Boolean}
   * @default false
   */
  fill: _propTypes2.default.bool,

  /**
   * Callback for when the pill is clicked
   *
   * @property onClick
   * @type {Function}
   */
  onClick: _propTypes2.default.func,

  /**
   * Callback for when the icon in pill is clicked to delete it
   * If defined a 'close' icon is rendered in the component
   *
   * @property onDelete
   * @type {Function}
   */
  onDelete: _propTypes2.default.func
};
Pill.defaultProps = {
  as: 'default',
  className: '',
  fill: false,
  onClick: null,
  onDelete: null
};
Pill.safeProps = ['onClick'];
exports.default = Pill;