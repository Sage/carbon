'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withDrag = require('./../../drag-and-drop/with-drag');

var _withDrag2 = _interopRequireDefault(_withDrag);

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tableCell = require('./../table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconHTML = _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_icon2.default, {
    className: 'draggable-table-cell__icon',
    type: 'drag_vertical'
  })
);

/**
 * Creates a draggable table cell using WithDrag.
 *
 * @constructor
 */
var DraggableTableCell = function DraggableTableCell(props) {
  var icon = _react2.default.createElement(
    _withDrag2.default,
    {
      identifier: props.identifier,
      draggableNode: props.draggableNode
    },
    iconHTML
  );

  return _react2.default.createElement(
    _tableCell2.default,
    { className: 'draggable-table-cell' },
    icon
  );
};

DraggableTableCell.propTypes = {
  identifier: _propTypes2.default.string, // used to associate WithDrags and WithDrops
  draggableNode: _propTypes2.default.func // A function that returns the dom node used as the ghost layer when dragging
};

exports.default = DraggableTableCell;