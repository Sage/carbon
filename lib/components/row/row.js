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

var /*istanbul ignore next*/_lodash = require('lodash');

/*istanbul ignore next*/
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 *   import Row from 'carbon/lib/components/row';
 *
 * To render the Row:
 *
 *   <Row />
 *
 * @class Row
 * @constructor
 */

var Row = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Row)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.buildColumns = function () {
      if (! /*istanbul ignore next*/_this.props.children) {
        return null;
      }

      var columns = [],
          children = /*istanbul ignore next*/_this.props.children.constructor === Array ? /*istanbul ignore next*/(0, _lodash.compact)( /*istanbul ignore next*/_this.props.children) : /*istanbul ignore next*/_this.props.children;

      if (children.constructor === Array && children.length) {
        children.forEach(function (child, index) {
          columns.push( /*istanbul ignore next*/_this.buildColumn(child, index));
        });
      } else if (children.constructor !== Array) {
        columns.push( /*istanbul ignore next*/_this.buildColumn(children, 0));
      }

      return columns;
    }, _this.buildColumn = function (child, key) {
      /*istanbul ignore next*/
      var _classNames;

      var columnClass = /*istanbul ignore next*/(0, _classnames2.default)("ui-row__column", child.props.columnClasses, /*istanbul ignore next*/(_classNames = {}, _defineProperty(_classNames, 'ui-row__column--offset-' + child.props.columnOffset, child.props.columnOffset), _defineProperty(_classNames, 'ui-row__column--span-' + child.props.columnSpan, child.props.columnSpan), _defineProperty(_classNames, 'ui-row__column--align-' + child.props.columnAlign, child.props.columnAlign), _classNames));

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ key: key, className: columnClass },
          child
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Builds row columns from the children object fields
   *
   * @method buildColumns
   * @return {Array} array of built columns
   */


  /**
   * Builds each column field with appropriate classes
   *
   * @method buildColumn
   * @param {Object} child child component
   * @param {Object} key index of child
   * @return {Object} JSX of build column
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.buildColumns()
        )
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
      var columns = 1;

      if (this.props.columns) {
        columns = this.props.columns;
      } else if (this.props.children && this.props.children.constructor === Array) {
        columns = /*istanbul ignore next*/(0, _lodash.compact)(this.props.children).length;
      }

      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-row', this.props.className, /*istanbul ignore next*/'ui-row--columns-' + columns)
      );
    }
  }]);

  return Row;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Row.propTypes = {
  /**
   * The elements to be rendered in the row
   *
   * @property children
   * @type {Object | Array}
   */
  children: /*istanbul ignore next*/_react2.default.PropTypes.oneOfType([/*istanbul ignore next*/_react2.default.PropTypes.array, /*istanbul ignore next*/_react2.default.PropTypes.object])
};
/*istanbul ignore next*/exports.default = Row;