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
 * @class Filter
 * @constructor
 */

var Filter = function (_React$Component) {
  _inherits(Filter, _React$Component);

  function Filter() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Filter)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleSubmit = function (ev) {
      ev.preventDefault();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Handles the submission of the form.
   *
   * @method handleSubmit
   * @param {Object}
   */


  _createClass(Filter, [{
    key: 'render',


    /**
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'form',
          /*istanbul ignore next*/{ className: this.classes, onSubmit: this.handleSubmit },
          this.props.children
        )
      );
    }
  }, {
    key: 'classes',


    /**
     * Returns the classes for the filter.
     *
     * @method classes
     * @return {String}
     */
    get: function get() {
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-filter', this.props.className, /*istanbul ignore next*/'ui-filter--align-' + this.props.align)
      );
    }
  }]);

  return Filter;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Filter.propTypes = {
  /**
   * Aligns the children in the filter.
   *
   * @property align
   * @type {String}
   * @default left
   */
  align: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/Filter.defaultProps = {
  align: 'left'
};
/*istanbul ignore next*/exports.default = Filter;