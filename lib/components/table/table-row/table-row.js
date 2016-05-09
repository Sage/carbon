'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tableCell = require('./../table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

var _tableHeader = require('./../table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _checkbox = require('./../../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _utilsHelpersGuid = require('./../../../utils/helpers/guid');

var _utilsHelpersGuid2 = _interopRequireDefault(_utilsHelpersGuid);

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

var TableRow = (function (_React$Component) {
  _inherits(TableRow, _React$Component);

  function TableRow() {
    var _this = this;

    _classCallCheck(this, TableRow);

    _get(Object.getPrototypeOf(TableRow.prototype), 'constructor', this).apply(this, arguments);

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
      _this.context.selectAll(_this);
    };

    this.onRowClick = function () {
      if (_this.props.onHighlight) {
        // trigger onHighlight callback if defined
        _this.props.onHighlight(_this.props.uniqueID, !_this.state.highlighted, _this);
      } else {
        // trigger highlightRow method on the table
        _this.context.highlightRow(_this.props.uniqueID, _this);
      }

      // trigger any custom onClick event the developer may have set
      if (_this.props.onClick) {
        var _props;

        (_props = _this.props).onClick.apply(_props, arguments);
      }
    };

    this.onSelect = function (ev) {
      if (_this.props.onSelect) {
        // trigger onSelect callback if defined
        _this.props.onSelect(_this.props.uniqueID, ev.target.value, _this);
      } else {
        // trigger selectRow method on the table
        _this.context.selectRow(_this.props.uniqueID, _this, !_this.state.selected);
      }
    };
  }

  _createClass(TableRow, [{
    key: 'componentWillMount',

    /**
     * @method componentWillMount
     * @return {Void}
     */
    value: function componentWillMount() {
      if ((this.props.selectable || this.props.highlightable || this.context.selectable || this.context.highlightable) && !this.props.uniqueID) {
        throw new Error("A TableRow which is selectable or highlightable should provide a uniqueID.");
      }

      if (this.context.attachToTable && this.props.uniqueID && !this.props.selectAll) {
        // generate row id
        this.rowID = (0, _utilsHelpersGuid2['default'])();
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
  }, {
    key: 'render',

    /**
     * Renders the component
     *
     * @method render
     */
    value: function render() {
      var content = [this.props.children];

      if (this.props.selectAll || this.context.selectable || this.props.selectable) {
        // if multi-seletable, add the checkbox cell
        content.unshift(this.multiSelectCell);
      }

      return _react2['default'].createElement(
        'tr',
        this.rowProps,
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
      return (0, _classnames2['default'])('ui-table-row', this.props.className, {
        'ui-table-row--clickable': this.props.onClick || this.props.highlightable || this.context.highlightable,
        'ui-table-row--selected': this.state.selected || this.state.highlighted
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
      var cell = this.isHeader ? _tableHeader2['default'] : _tableCell2['default'];

      return _react2['default'].createElement(cell, {
        key: "select", className: "ui-table-cell--select"
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
      var action = this.props.selectAll ? this.onSelectAll : this.onSelect;

      return _react2['default'].createElement(_checkbox2['default'], { onChange: action, checked: this.state.selected });
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Enables multi-selectable table rows.
       *
       * @property selectable
       * @type {Boolean}
       */
      selectable: _react2['default'].PropTypes.bool,

      /**
       * Enables highlightable table rows.
       *
       * @property highlightable
       * @type {Boolean}
       */
      highlightable: _react2['default'].PropTypes.bool,

      /**
       * Allows developers to manually control selected state for the row.
       *
       * @property selected
       * @type {Boolean}
       */
      selected: _react2['default'].PropTypes.bool,

      /**
       * Allows developers to manually control highlighted state for the row.
       *
       * @property highlighted
       * @type {Boolean}
       */
      highlighted: _react2['default'].PropTypes.bool,

      /**
       * Define a unique ID so the table can track the row (useful for highlightable or selectable rows).
       *
       * @property uniqueID
       * @type {String}
       */
      uniqueID: _react2['default'].PropTypes.string
    },

    /**
     * Sort handler passed from table context
     *
     * @property onSort
     * @type {Function}
     */
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      attachToTable: _react2['default'].PropTypes.func, // attach the row to the table
      detachFromTable: _react2['default'].PropTypes.func, // detach the row from the table
      checkSelection: _react2['default'].PropTypes.func, // a function to check if the row is currently selected
      highlightRow: _react2['default'].PropTypes.func, // highlights the row
      selectAll: _react2['default'].PropTypes.func, // a callback function for when all visible rows are selected
      highlightable: _react2['default'].PropTypes.bool, // table can enable all rows to be highlightable
      selectable: _react2['default'].PropTypes.bool, // table can enable all rows to be multi-selectable
      selectRow: _react2['default'].PropTypes.func // a callback function for when a row is selected
    },
    enumerable: true
  }]);

  return TableRow;
})(_react2['default'].Component);

exports['default'] = TableRow;
module.exports = exports['default'];

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