'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2, _initialiseProps;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tableCell = require('./../table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

var _tableHeader = require('./../table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _checkbox = require('./../../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _guid = require('./../../../utils/helpers/guid');

var _guid2 = _interopRequireDefault(_guid);

var _ether = require('../../../utils/ether');

var _tags = require('../../../utils/helpers/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  TableRow: {
    displayName: 'TableRow'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/table/table-row/table-row.js',
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
 * A TableRow widget.
 *
 * == How to use a TableRow in a component:
 *
 * See documentation for Table component.
 *
 * If you add an onClick event to a Table Row, will display the cursor as a pointer
 * when hovering over the row.
 *
 * @class TableRow
 * @constructor
 */
var TableRow = _wrapComponent('TableRow')((_temp2 = _class = function (_React$Component) {
  _inherits(TableRow, _React$Component);

  function TableRow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */


  _createClass(TableRow, [{
    key: 'componentWillMount',


    /**
     * @method componentWillMount
     * @return {Void}
     */
    value: function componentWillMount() {
      if (this.requiresUniqueID && !this.props.uniqueID) {
        throw new Error("A TableRow which is selectable or highlightable should provide a uniqueID.");
      }

      if (this.context.attachToTable && this.props.uniqueID && !this.props.selectAll && !this.isHeader) {
        // generate row id
        this.rowID = (0, _guid2.default)();
        // only attach to the table if we have a unique id
        this.context.attachToTable(this.rowID, this);
        // also check if row is already selected/highlighted
        this.context.checkSelection(this.props.uniqueID, this);
      }

      if (this.props.selected) {
        // if developer is controlling selected state - set it
        this.setState({ selected: true });
      }

      if (this.props.highlighted) {
        // if developer is controlling highlighted state - set it
        this.setState({ highlighted: true });
      }
    }

    /**
     * @method componentWillUnmount
     * @return {Void}
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context.detachFromTable) {
        this.context.detachFromTable(this.rowID);
      }
    }

    /**
     * @method componentWillReceiveProps
     * @return {Void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.uniqueID != nextProps.uniqueID) {
        // if unique id has changed, check if the table has the new id as selected or not
        this.context.checkSelection(nextProps.uniqueID, this);
      }

      if (this.props.selected != nextProps.selected) {
        // if developer is controlling selected state - set it
        this.setState({ selected: nextProps.selected });
      }

      if (this.props.highlighted != nextProps.highlighted) {
        // if developer is controlling highlighted state - set it
        this.setState({ highlighted: nextProps.highlighted });
      }
    }

    /**
     * Call the selectAll callback.
     *
     * @method onSelectAll
     * @return {Void}
     */


    /**
     * Call the selectRow callback and call any custom event the developer may have set.
     *
     * @method onRowClick
     * @return {Void}
     */


    /**
     * Call the selectRow callback.
     *
     * @method onSelect
     * @return {Void}
     */

  }, {
    key: 'render',


    /**
     * Renders the component
     *
     * @method render
     */
    value: function render() {
      var content = [this.props.children];

      if (this.shouldHaveMultiSelectColumn) {
        content.unshift(this.multiSelectCell);
      }

      return _react3.default.createElement(
        'tr',
        _extends({}, this.rowProps, (0, _tags.tagComponent)('table-row', this.props)),
        content
      );
    }
  }, {
    key: 'mainClasses',


    /**
     * Classes to be applied to the table row component
     *
     * @method mainClasses Main Class getter
     */
    get: function get() {
      return (0, _classnames2.default)('carbon-table-row', this.props.className, {
        'carbon-table-row--clickable': this.props.onClick || this.props.highlightable || this.context.highlightable,
        'carbon-table-row--selected': this.state.selected,
        'carbon-table-row--highlighted': this.state.highlighted && !this.state.selected
      });
    }

    /**
     * Sets additional props to the row.
     *
     * @method rowProps
     * @return {Object}
     */

  }, {
    key: 'rowProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      props.className = this.mainClasses;

      if (this.context.highlightable || this.props.highlightable) {
        props.onClick = this.onRowClick;
      }

      return props;
    }

    /**
     * Determines if the developer has flagged this row as a header.
     *
     * @method isHeader
     * @return {Boolean}
     */

  }, {
    key: 'isHeader',
    get: function get() {
      return this.props.as === "header";
    }

    /**
     * Determines what kind of cell to render for the checkbox.
     *
     * @method multiSelectCell
     * @return {Object} JSX
     */

  }, {
    key: 'multiSelectCell',
    get: function get() {
      // renders a TableHeader if row is flagged as a header.
      var cell = this.isHeader ? _tableHeader2.default : _tableCell2.default;

      return _react3.default.createElement(cell, {
        key: "select", className: "carbon-table-cell--select"
      }, this.multiSelect);
    }

    /**
     * Returns the checkbox for the select action.
     *
     * @method multiSelect
     * @return {Object} JSX
     */

  }, {
    key: 'multiSelect',
    get: function get() {
      if (this.props.hideMultiSelect) {
        return null;
      }

      // determines which action to use (multi-select or select-all)
      var action = this.props.selectAll || this.isHeader ? this.onSelectAll : this.onSelect;

      return _react3.default.createElement(_checkbox2.default, { onClick: function onClick(ev) {
          return ev.stopPropagation();
        }, onChange: action, checked: this.state.selected });
    }

    /**
     * Determines if the row should have a multi select column.
     *
     * @method shouldHaveMultiSelectColumn
     * @return {Boolean}
     */

  }, {
    key: 'shouldHaveMultiSelectColumn',
    get: function get() {
      // if component specifically disables selectable, don't put the cell in
      if (this.props.selectable !== false) {
        // if multi-seletable, add the checkbox cell
        if (this.props.selectAll || this.context.selectable || this.props.selectable) {
          return true;
        }
      }

      return false;
    }

    /**
     * Determines if the row requires a unique ID.
     *
     * @method requiresUniqueID
     * @return {Boolean}
     */

  }, {
    key: 'requiresUniqueID',
    get: function get() {
      var highlightable = this.props.highlightable !== false && (this.props.highlightable || this.context.highlightable),
          selectable = this.props.selectable !== false && (this.props.selectable || this.context.selectable);

      return highlightable || selectable;
    }
  }]);

  return TableRow;
}(_react3.default.Component), _class.propTypes = {
  /**
   * Enables multi-selectable table rows.
   *
   * @property selectable
   * @type {Boolean}
   */
  selectable: _propTypes2.default.bool,

  /**
   * Enables highlightable table rows.
   *
   * @property highlightable
   * @type {Boolean}
   */
  highlightable: _propTypes2.default.bool,

  /**
   * Allows developers to manually control selected state for the row.
   *
   * @property selected
   * @type {Boolean}
   */
  selected: _propTypes2.default.bool,

  /**
   * Allows developers to manually control highlighted state for the row.
   *
   * @property highlighted
   * @type {Boolean}
   */
  highlighted: _propTypes2.default.bool,

  /**
   * Define a unique ID so the table can track the row (useful for highlightable or selectable rows).
   *
   * @property uniqueID
   * @type {String}
   */
  uniqueID: _propTypes2.default.string,

  /**
   * What the row should be displayed as, set to 'header' to display as header
   *
   * @property as
   * @type {String}
   */
  as: _propTypes2.default.string,

  /**
   * Whether to hide the multiSelect
   *
   * @property hideMultiSelect
   * @type {Boolean}
   */
  hideMultiSelect: _propTypes2.default.bool,

  /**
   * Whether to select all
   *
   * @property selectAll
   * @type {Boolean}
   */
  selectAll: _propTypes2.default.bool,

  /**
   * Callback for when a row is highlighted
   * @property onHighlight
   * @type {Function}
   */
  onHighlight: _propTypes2.default.func,

  /**
   * Callback for when a row is selected
   * @property onSelect
   * @type {Function}
   */
  onSelect: _propTypes2.default.func
}, _class.contextTypes = {
  attachToTable: _propTypes2.default.func, // attach the row to the table
  detachFromTable: _propTypes2.default.func, // detach the row from the table
  checkSelection: _propTypes2.default.func, // a function to check if the row is currently selected
  highlightRow: _propTypes2.default.func, // highlights the row
  selectAll: _propTypes2.default.func, // a callback function for when all visible rows are selected
  highlightable: _propTypes2.default.bool, // table can enable all rows to be highlightable
  selectable: _propTypes2.default.bool, // table can enable all rows to be multi-selectable
  selectRow: _propTypes2.default.func // a callback function for when a row is selected
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.state = {
    /**
     * Internal state to track if the row is currently highlighted.
     *
     * @property highlighted
     * @type {Boolean}
     * @default false
     */
    highlighted: false,

    /**
     * Internal state to track if the row is currently selected.
     *
     * @property selected
     * @type {Boolean}
     * @default false
     */
    selected: false
  };

  this.onSelectAll = function () {
    _this2.context.selectAll(_this2);
  };

  this.onRowClick = function () {
    if (_this2.props.onHighlight) {
      // trigger onHighlight callback if defined
      _this2.props.onHighlight(_this2.props.uniqueID, !_this2.state.highlighted, _this2);
    } else {
      // trigger highlightRow method on the table
      _this2.context.highlightRow(_this2.props.uniqueID, _this2);
    }

    // trigger any custom onClick event the developer may have set
    if (_this2.props.onClick) {
      var _props;

      (_props = _this2.props).onClick.apply(_props, arguments);
    }
  };

  this.onSelect = function (ev) {
    if (_this2.props.onSelect) {
      // trigger onSelect callback if defined
      _this2.props.onSelect(_this2.props.uniqueID, ev.target.value, _this2);
    } else {
      // trigger selectRow method on the table
      _this2.context.selectRow(_this2.props.uniqueID, _this2, !_this2.state.selected);
    }
  };
}, _temp2));

exports.default = TableRow;