/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
*   import Pill from 'carbon/lib/components/pill'
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
    _classCallCheck(this, Pill);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Pill).apply(this, arguments));
  }

  _createClass(Pill, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var className = _props.className;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['className']);

      className = /*istanbul ignore next*/(0, _classnames2.default)('ui-pill', className, 'ui-pill--' + this.props.as + (this.props.fill ? '--fill' : '--empty'));

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'span',
          /*istanbul ignore next*/_extends({}, props, { className: className }),
          this.props.children
        )
      );
    }
  }]);

  return Pill;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Pill.propTypes = {

  /**
   * Customizes the appearance through colour
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default 'info'
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  fill: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * The text to display on the Pill
   *
   * @property children
   * @type {String}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.string.isRequired
};
/*istanbul ignore next*/Pill.defaultProps = {
  as: 'info',
  fill: false
};
/*istanbul ignore next*/exports.default = Pill;