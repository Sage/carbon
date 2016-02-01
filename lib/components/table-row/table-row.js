'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _utilsHelpersImmutable = require('./../../utils/helpers/immutable');

var _utilsHelpersImmutable2 = _interopRequireDefault(_utilsHelpersImmutable);

/**
 * A table row widget for use in an input grid. This is virtually a subcomponent of InputGrid.
 * Using it outside of InputGrid would require extending TableRow.
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

    this.shouldComponentUpdate = function (nextProps) {
      if (nextProps.forceUpdate) {
        return true;
      }

      if (nextProps.gutterFields) {
        return true;
      }

      return nextProps.data !== _this.props.data;
    };

    this.buildRow = function () {
      var row = [];

      row.push(_this.buildRowActionCell());

      // Builds fields for row
      for (var key in _this.props.fields) {
        var field = _this.props.fields[key];
        row.push(_this.buildRowField(key, field));
      }

      return row;
    };

    this.buildRowActionCell = function () {
      // If row is not a placeholder or gutterfield add delete button.
      if (!_this.props.placeholder && !_this.props.gutterFields) {
        return _this.buildRowDeleteButton();
      } else {
        var tdClass = "ui-table-row__td ui-table-row__td--actions";
        if (_this.props.gutterFields) {
          tdClass += " ui-table-row__td--gutter";
        }

        return _react2['default'].createElement('td', { key: _this.props.row_id + 'actions', className: tdClass });
      }
    };

    this.buildRowField = function (key, field) {
      if (_this.props.gutterFields) {
        return _this.buildRowGutterField(key, field);
      } else {
        // Uses buildCell to build cell with appropriate values
        return _this.buildCell(field);
      }
    };

    this.buildRowDeleteButton = function () {
      return _react2['default'].createElement(
        'td',
        { key: _this.props.row_id + 'actions', className: 'ui-table-row__td ui-table-row__td--actions' },
        _react2['default'].createElement(
          'button',
          { type: 'button', className: 'ui-table-row__delete', id: _this.props.row_id, onClick: _this.deleteMethod },
          _react2['default'].createElement(_icon2['default'], { type: 'delete', className: 'ui-table-row__delete-icon' })
        )
      );
    };

    this.buildRowGutterField = function (key, field) {
      var name = _utilsHelpersImmutable2['default'].parseName(field.props.name, 'last');
      var gutterField = _this.props.gutterFields[name];
      return _react2['default'].createElement(
        'td',
        { hidden: field.props.hidden, key: key + "gutter", className: 'ui-table-row__td ui-table-row__td--gutter' },
        gutterField
      );
    };

    this.deleteMethod = function (ev) {
      ev.preventDefault();
      _this.props.deleteRowHandler(ev, _this.props);
    };

    this.buildCell = function (field) {
      if (!field.props.name.match("{ROWID}")) {
        throw new Error("Inputs used in a grid should supply a {ROWID} placeholder within the input's name, which will be replaced on render with a unique row id.");
      }

      var rowID = _this.props.row_id,
          fieldProps = {
        label: false,
        key: rowID,
        name: field.props.name.replace("{ROWID}", rowID),
        row_id: rowID,
        namespace: _this.props.name,
        onChange: _this.props.updateRowHandler
      };

      var name = _utilsHelpersImmutable2['default'].parseName(field.props.name, 'last');
      var value = _this.props.data ? _this.props.data.get(name) : null;
      if (value != null) {
        fieldProps.value = value;
      }

      if (_this.props.placeholder) {
        fieldProps._placeholder = true;
      }

      var fieldHTML = _react2['default'].cloneElement(field, fieldProps);

      return _react2['default'].createElement(
        'td',
        { hidden: field.props.hidden, key: rowID + field.props.name, className: 'ui-table-row__td' },
        fieldHTML
      );
    };
  }

  _createClass(TableRow, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      var mainClasses = "ui-table-row";

      if (this.props.gutterFields) {
        mainClasses += " ui-table-row--gutter";
      }

      return _react2['default'].createElement(
        'tr',
        { className: mainClasses },
        this.buildRow()
      );
    }
  }]);

  return TableRow;
})(_react2['default'].Component);

exports['default'] = TableRow;
module.exports = exports['default'];

/**
 * Only renders component if data has changed, or if the row has
 * forceUpdate set to true or is a gutter row
 *
 * @method shouldComponentUpdate
 * @param {Object} nextProps new props passed to the component
 * @return {Boolean} true if the component should update
 */

/**
 * Builds row including buttons, classnames & optional gutterfields.
 *
 * @method buildRow
 * @return {Object} JSX of the built row
 */

/**
 * Builds initial row action cell
 *
 * @method buildActionCell
 * @return {Object} JSX of action cell
 */

/**
 * Builds a table field
 *
 * @method buildRowField
 * @param {String} key row key
 * @param {Object} field react component
 * @return {Object} JSX of build field
 */

/**
 * Builds and returns delete button cell
 *
 * @method buildRowDeleteButton
 * @return {Object} JSX table cell with delete button
 */

/**
 * Builds and returns a gutter field cell
 *
 * @method addGutterField
 * @param {String} key row key
 * @param {Object} field react component
 * @return {Object} JSX of gutterfield
 */

/**
 * Calls delete row handler
 *
 * @method buildRpw
 * @param {Object} ev event to trigger delete action
 * @return {void}
 */

/**
 * Build each cell with appropriate values and attributes.
 *
 * @method buildCell
 * @param {Object} field react component
 * @param {String | Number | Boolean} value value to give to field
 * @return {Object} JSX of build cell
 */