'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Column = exports.Row = undefined;

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _column = require('./column');

var _column2 = _interopRequireDefault(_column);

var _logger = require('./../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  Row: {
    displayName: 'Row'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/row/row.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var Row = _wrapComponent('Row')((_temp2 = _class = function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Row.__proto__ || Object.getPrototypeOf(Row)).call.apply(_ref, [this].concat(args))), _this), _this.buildColumns = function () {
      if (!_this.props.children) {
        return null;
      }

      var columns = [],
          children = _this.props.children.constructor === Array ? (0, _lodash.compact)(_this.props.children) : _this.props.children;

      if (children.constructor === Array && children.length || _immutable2.default.Iterable.isIterable(children)) {
        children.forEach(function (child, index) {
          columns.push(_this.buildColumn(child, index));
        });
      } else if (children.constructor !== Array) {
        columns.push(_this.buildColumn(children, 0));
      }

      return columns;
    }, _this.buildColumn = function (child, key) {
      var _classNames;

      /**
       * This functionality is maintaining the deprecated behaviour
       * where Row can have any immediate children. As of React 16 this
       * will break and therefore we have added a column component to deal
       * with the complications and maintain functionality.
       *
       * Removing the deprecated behaviour in Carbon v2 we can likely
       * remove the buildColumns and buildColumn function and just render the Row's
       * children which will include the columns
       *
       * TODO: CarbonV2
       */
      var columnClasses = (0, _classnames2.default)("carbon-row__column", child.props.columnClasses, (_classNames = {}, _defineProperty(_classNames, 'carbon-row__column--offset-' + child.props.columnOffset, child.props.columnOffset), _defineProperty(_classNames, 'carbon-row__column--span-' + child.props.columnSpan, child.props.columnSpan), _defineProperty(_classNames, 'carbon-row__column--align-' + child.props.columnAlign, child.props.columnAlign), _defineProperty(_classNames, "carbon-row__column--column-divide", _this.props.columnDivide), _classNames));

      if (child.type && child.type.isColumn) {
        columnClasses = (0, _classnames2.default)(columnClasses, child.props.className);
        return _react3.default.cloneElement(child, { className: columnClasses, key: key }, child.props.children);
      } else {
        _logger2.default.deprecate('Row Component should only have an immediate child of type Column');

        return _react3.default.createElement(
          'div',
          { key: key, className: columnClasses },
          child
        );
      }
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
      return _react3.default.createElement(
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
      var columns = 1;

      if (this.props.columns) {
        columns = this.props.columns;
      } else if (this.props.children && this.props.children.constructor === Array) {
        columns = (0, _lodash.compact)(this.props.children).length;
      } else if (_immutable2.default.Iterable.isIterable(this.props.children)) {
        columns = this.props.children.size;
      }

      return (0, _classnames2.default)('carbon-row', 'carbon-row--gutter-' + this.props.gutter, this.props.className, 'carbon-row--columns-' + columns);
    }
  }]);

  return Row;
}(_react3.default.Component), _class.propTypes = {

  /**
   * The elements to be rendered in the row
   *
   * @property children
   * @type {Object | Array}
   */
  children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),

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
  columns: _propTypes2.default.string
}, _class.defaultProps = {
  gutter: "medium"
}, _temp2));

exports.default = Row;
exports.Row = Row;
exports.Column = _column2.default;