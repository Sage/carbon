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

var /*istanbul ignore next*/_tableCell = require('./../table-cell');

/*istanbul ignore next*/
var _tableCell2 = _interopRequireDefault(_tableCell);

var /*istanbul ignore next*/_tableHeader = require('./../table-header');

/*istanbul ignore next*/
var _tableHeader2 = _interopRequireDefault(_tableHeader);

var /*istanbul ignore next*/_checkbox = require('./../../checkbox');

/*istanbul ignore next*/
var _checkbox2 = _interopRequireDefault(_checkbox);

var /*istanbul ignore next*/_guid = require('./../../../utils/helpers/guid');

/*istanbul ignore next*/
var _guid2 = _interopRequireDefault(_guid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var TableRow = function (_React$Component) {
  _inherits(TableRow, _React$Component);

  function TableRow() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TableRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableRow)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
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

      if (this.context.attachToTable && this.props.uniqueID && !this.props.selectAll) {
        // generate row id
        this.rowID = /*istanbul ignore next*/(0, _guid2.default)();
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

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'tr',
          this.rowProps,
          content
        )
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-table-row', this.props.className, {
          'ui-table-row--clickable': this.props.onClick || this.props.highlightable || this.context.highlightable,
          'ui-table-row--selected': this.state.selected || this.state.highlighted
        })
      );
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
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(this.props, []);

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
      var cell = this.isHeader ? /*istanbul ignore next*/_tableHeader2.default : _tableCell2.default;

      return (/*istanbul ignore next*/_react2.default.createElement(cell, {
          key: "select", className: "ui-table-cell--select"
        }, this.multiSelect)
      );
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
      var action = this.props.selectAll ? this.onSelectAll : this.onSelect;

      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_checkbox2.default, /*istanbul ignore next*/{ onClick: function /*istanbul ignore next*/onClick(ev) /*istanbul ignore next*/{
            return ev.stopPropagation();
          }, onChange: action, checked: this.state.selected })
      );
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
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/TableRow.propTypes = {
  /**
   * Enables multi-selectable table rows.
   *
   * @property selectable
   * @type {Boolean}
   */
  selectable: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Enables highlightable table rows.
   *
   * @property highlightable
   * @type {Boolean}
   */
  highlightable: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Allows developers to manually control selected state for the row.
   *
   * @property selected
   * @type {Boolean}
   */
  selected: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Allows developers to manually control highlighted state for the row.
   *
   * @property highlighted
   * @type {Boolean}
   */
  highlighted: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Define a unique ID so the table can track the row (useful for highlightable or selectable rows).
   *
   * @property uniqueID
   * @type {String}
   */
  uniqueID: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/TableRow.contextTypes = {
  attachToTable: /*istanbul ignore next*/_react2.default.PropTypes.func, // attach the row to the table
  detachFromTable: /*istanbul ignore next*/_react2.default.PropTypes.func, // detach the row from the table
  checkSelection: /*istanbul ignore next*/_react2.default.PropTypes.func, // a function to check if the row is currently selected
  highlightRow: /*istanbul ignore next*/_react2.default.PropTypes.func, // highlights the row
  selectAll: /*istanbul ignore next*/_react2.default.PropTypes.func, // a callback function for when all visible rows are selected
  highlightable: /*istanbul ignore next*/_react2.default.PropTypes.bool, // table can enable all rows to be highlightable
  selectable: /*istanbul ignore next*/_react2.default.PropTypes.bool, // table can enable all rows to be multi-selectable
  selectRow: /*istanbul ignore next*/_react2.default.PropTypes.func // a callback function for when a row is selected
};
/*istanbul ignore next*/
var _initialiseProps = function _initialiseProps() {
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
    /*istanbul ignore next*/_this2.context.selectAll( /*istanbul ignore next*/_this2);
  };

  this.onRowClick = function () {
    if ( /*istanbul ignore next*/_this2.props.onHighlight) {
      // trigger onHighlight callback if defined
      /*istanbul ignore next*/_this2.props.onHighlight( /*istanbul ignore next*/_this2.props.uniqueID, ! /*istanbul ignore next*/_this2.state.highlighted, /*istanbul ignore next*/_this2);
    } else {
      // trigger highlightRow method on the table
      /*istanbul ignore next*/_this2.context.highlightRow( /*istanbul ignore next*/_this2.props.uniqueID, /*istanbul ignore next*/_this2);
    }

    // trigger any custom onClick event the developer may have set
    if ( /*istanbul ignore next*/_this2.props.onClick) {
      /*istanbul ignore next*/
      var _props;

      /*istanbul ignore next*/(_props = /*istanbul ignore next*/_this2.props).onClick. /*istanbul ignore next*/apply( /*istanbul ignore next*/_props, /*istanbul ignore next*/arguments);
    }
  };

  this.onSelect = function (ev) {
    if ( /*istanbul ignore next*/_this2.props.onSelect) {
      // trigger onSelect callback if defined
      /*istanbul ignore next*/_this2.props.onSelect( /*istanbul ignore next*/_this2.props.uniqueID, ev.target.value, /*istanbul ignore next*/_this2);
    } else {
      // trigger selectRow method on the table
      /*istanbul ignore next*/_this2.context.selectRow( /*istanbul ignore next*/_this2.props.uniqueID, /*istanbul ignore next*/_this2, ! /*istanbul ignore next*/_this2.state.selected);
    }
  };
};

/*istanbul ignore next*/exports.default = TableRow;