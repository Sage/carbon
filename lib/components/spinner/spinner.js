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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Spinner widget.
 *
 * == How to use a Spinner in a component:
 *
 * In your file
 *
 *   import Spinner from 'carbon/lib/components/spinner';
 *
 * To render the Spinner:
 *
 *   <Spinner />
 *
 * You can pass a 'size' property to adjust the size of the spinner
 *    The default is lmed
 *    options: small, smed, lmed, large
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Spinner
 * @constructor
 */

var Spinner = function (_React$Component) {
  _inherits(Spinner, _React$Component);

  function Spinner() {
    _classCallCheck(this, Spinner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Spinner).apply(this, arguments));
  }

  _createClass(Spinner, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/'div', /*istanbul ignore next*/{ className: this.spinnerClasses })
      );
    }
  }, {
    key: 'spinnerClasses',


    /**
     * Returns classes for the spinner.
     *
     * @method spinnerClasses
     * @return {String} spinner className
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-spinner', 'ui-spinner--' + this.props.as, 'ui-spinner--' + this.props.size, this.props.className)
      );
    }
  }]);

  return Spinner;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Spinner.propTypes = {

  /**
   * Sets the theme for the component.
   * (see the 'iconColorSets' for possible values)
   *
   * @property as
   * @type {String}
   * @default info
   */
  as: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Size of the spinner
   * Options: small, smed, lmed, large
   *
   * @property size
   * @type {String}
   */
  size: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/Spinner.defaultProps = {
  as: 'info',
  size: 'medium'
};
/*istanbul ignore next*/exports.default = Spinner;