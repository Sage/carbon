'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Column = exports.Row = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _column = require('./column');

var _column2 = _interopRequireDefault(_column);

require('./row.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A row widget.
 *
 * This is a standalone row widget used for layout; for table rows use the table-row widget.
 *
 * == How to use a Row in a component:
 *
 * In your file
 *
 *   import { Row, Column } from 'carbon-react/lib/components/row';
 *
 * To render the Row:
 *
 *   <Row>
 *     <Column>Column1</Column>
 *     <Column>Column2</Column>
 *   </Row>
 *
 * A Rows child must be of type Column
 *
 * @class Row
 * @constructor
 */
var Row = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Row.__proto__ || Object.getPrototypeOf(Row)).call.apply(_ref, [this].concat(args))), _this), _this.buildColumns = function () {
      return _react2.default.Children.toArray(_this.props.children).map(function (child) {
        return _react2.default.cloneElement(child, {
          columnClasses: _this.props.columnClasses,
          columnDivide: _this.props.columnDivide
        }, child.props.children);
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Builds row columns from the children object fields
   *
   * @method buildColumns
   * @return {Array} array of built columns
   */


  _createClass(Row, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.mainClasses },
        this.buildColumns()
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      var columns = this.props.columns || _react2.default.Children.toArray(this.props.children).length;

      return (0, _classnames2.default)('carbon-row', 'carbon-row--gutter-' + this.props.gutter, this.props.className, 'carbon-row--columns-' + columns);
    }
  }]);

  return Row;
}(_react2.default.Component);

Row.propTypes = {

  /**
   * The elements to be rendered in the row
   *
   * @property children
   * @type {Object | Array}
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Pass a custom value for the gutter
   * (extra-small, small, medium, large or extra-large)
   *
   * @property gutter
   * @type {String}
   */
  gutter: _propTypes2.default.string,

  /**
   * Show a divide between columns
   *
   * @property columnDivide
   * @type {String}
   */
  columnDivide: _propTypes2.default.bool,

  /**
   * Manually define number of columns
   *
   * @property columns
   * @type {String}
   */
  columns: _propTypes2.default.string,

  /**
   * class to apply to each child column
   *
   * @property columnClasses
   * @type {String}
   */
  columnClasses: _propTypes2.default.string
};
Row.defaultProps = {
  gutter: 'medium'
};
exports.default = Row;
exports.Row = Row;
exports.Column = _column2.default;