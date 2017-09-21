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

var _tableCell = require('./../table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

var _tableHeader = require('./../table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _checkbox = require('./../../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _guid = require('./../../../utils/helpers/guid');

var _guid2 = _interopRequireDefault(_guid);

var _withDrop = require('./../../drag-and-drop/with-drop');

var _withDrop2 = _interopRequireDefault(_withDrop);

var _draggableTableCell = require('./../draggable-table-cell');

var _draggableTableCell2 = _interopRequireDefault(_draggableTableCell);

var _ether = require('../../../utils/ether');

var _tags = require('../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TableRow, [{
    key: 'componentWillMount',


    /**
     * @method componentWillMount
     * @return {Void}
     */
    value: function componentWillMount() {
      if (this.context.dragDropManager) {
        if (this.props.as !== 'header' && this.props.index === undefined) {
          throw new Error('You need to provide an index for rows that are draggable');
        }
      }

      if (this.requiresUniqueID && !this.props.uniqueID) {
        throw new Error('A TableRow which is selectable or highlightable should provide a uniqueID.');
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
     * @method componentWillReceiveProps
     * @return {Void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.uniqueID !== nextProps.uniqueID) {
        // if unique id has changed, check if the table has the new id as selected or not
        this.context.checkSelection(nextProps.uniqueID, this);
      }

      if (this.props.selected !== nextProps.selected) {
        // if developer is controlling selected state - set it
        this.setState({ selected: nextProps.selected });
      }

      if (this.props.highlighted !== nextProps.highlighted) {
        // if developer is controlling highlighted state - set it
        this.setState({ highlighted: nextProps.highlighted });
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
      var _this2 = this;

      var content = [this.props.children];

      if (this.shouldHaveMultiSelectColumn) {
        content.unshift(this.multiSelectCell);
      }

      return this.renderDraggableRow(_react2.default.createElement(
        'tr',
        _extends({}, this.rowProps, (0, _tags2.default)('table-row', this.props), {
          ref: function ref(node) {
            _this2._row = node;
          }
        }),
        this.renderDraggableCell(),
        content
      ));
    }
  }, {
    key: 'mainClasses',


    /**
     * Classes to be applied to the table row component
     *
     * @method mainClasses Main Class getter
     */
    get: function get() {
      var isDragIndexMatch = this.context.dragAndDropActiveIndex === this.props.index;
      return (0, _classnames2.default)('carbon-table-row', this.props.className, {
        'carbon-table-row--clickable': this.props.onClick || this.props.highlightable || this.context.highlightable,
        'carbon-table-row--selected': this.state.selected,
        'carbon-table-row--highlighted': this.state.highlighted && !this.state.selected,
        'carbon-table-row--dragged': this.draggingIsOccurring() && isDragIndexMatch,
        'carbon-table-row--dragging': this.draggingIsOccurring()
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
      return this.props.as === 'header';
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

      return _react2.default.createElement(cell, {
        key: 'select', className: 'carbon-table-cell--select'
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

      return _react2.default.createElement(_checkbox2.default, {
        onClick: function onClick(ev) {
          return ev.stopPropagation();
        },
        onChange: action,
        checked: this.state.selected
      });
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

    /**
     * Determines if dragging is occurring within the current draggable context.
     *
     * @method draggingIsOccurring
     * @return {Boolean}
     */


    /**
     * Returns a draggable cell if required.
     *
     * @method renderDraggableCell
     * @return {Object} JSX
     */


    /**
     * Returns the row wrapped in draggable functionality if required.
     *
     * @method renderDraggableRow
     * @param {Object} JSX
     * @return {Object} JSX
     */

  }]);

  return TableRow;
}(_react2.default.Component);

TableRow.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * A custom class name for the component.
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Allows developers to specify a callback after the row is clicked.
   *
   * @property onClick
   * @type {Function}
   */
  onClick: _propTypes2.default.func,

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
  onSelect: _propTypes2.default.func,

  /**
   * Used if this row is within a draggable context
   *
   * @property index
   * @type {Number}
   */
  index: _propTypes2.default.number,

  /**
   * Optional to associate the drag and drag context.
   *
   * @property dragAndDropIdentifier
   * @type {String}
   */
  dragAndDropIdentifier: _propTypes2.default.string
};
TableRow.safeProps = ['onClick'];
TableRow.contextTypes = {
  attachToTable: _propTypes2.default.func, // attach the row to the table
  detachFromTable: _propTypes2.default.func, // detach the row from the table
  checkSelection: _propTypes2.default.func, // a function to check if the row is currently selected
  highlightRow: _propTypes2.default.func, // highlights the row
  selectAll: _propTypes2.default.func, // a callback function for when all visible rows are selected
  highlightable: _propTypes2.default.bool, // table can enable all rows to be highlightable
  selectable: _propTypes2.default.bool, // table can enable all rows to be multi-selectable
  selectRow: _propTypes2.default.func, // a callback function for when a row is selected
  dragDropManager: _propTypes2.default.object, // the React DND DragDropManager
  dragAndDropActiveIndex: _propTypes2.default.number // tracks the currently active index
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

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
    selected: false };

  this.onSelectAll = function () {
    _this3.context.selectAll(_this3);
  };

  this.onRowClick = function () {
    if (_this3.props.onHighlight) {
      // trigger onHighlight callback if defined
      _this3.props.onHighlight(_this3.props.uniqueID, !_this3.state.highlighted, _this3);
    } else {
      // trigger highlightRow method on the table
      _this3.context.highlightRow(_this3.props.uniqueID, _this3);
    }
    // trigger any custom onClick event the developer may have set
    if (_this3.props.onClick) {
      var _props;

      (_props = _this3.props).onClick.apply(_props, arguments);
    }
  };

  this.onSelect = function (ev) {
    if (_this3.props.onSelect) {
      // trigger onSelect callback if defined
      _this3.props.onSelect(_this3.props.uniqueID, ev.target.value, _this3);
    } else {
      // trigger selectRow method on the table
      _this3.context.selectRow(_this3.props.uniqueID, _this3, !_this3.state.selected);
    }
  };

  this.draggingIsOccurring = function () {
    return typeof _this3.context.dragAndDropActiveIndex === 'number';
  };

  this.renderDraggableCell = function () {
    if (!_this3.context.dragDropManager || _this3.isHeader) {
      return null;
    }

    return _react2.default.createElement(_draggableTableCell2.default, {
      identifier: _this3.props.dragAndDropIdentifier,
      draggableNode: function draggableNode() {
        return _this3._row;
      }
    });
  };

  this.renderDraggableRow = function (row) {
    if (!_this3.context.dragDropManager || _this3.isHeader) {
      return row;
    }

    return _react2.default.createElement(
      _withDrop2.default,
      {
        identifier: _this3.props.dragAndDropIdentifier,
        index: _this3.props.index
      },
      row
    );
  };
};

exports.default = TableRow;