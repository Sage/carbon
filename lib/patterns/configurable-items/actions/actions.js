'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flux = require('./../../../utils/flux');

var _constants = require('./../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigurableItemsActions = {
  toggleDialogOpen: function toggleDialogOpen() {
    _flux.Dispatcher.dispatch({
      actionType: _constants2.default.TOGGLE_CONFIGURABLE_ITEMS_DIALOG
    });
  },
  reorderItems: function reorderItems(dragIndex, hoverIndex) {
    _flux.Dispatcher.dispatch({
      actionType: _constants2.default.REORDER_CONFIGURABLE_ITEMS,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex
    });
  },
  updateData: function updateData(data) {
    _flux.Dispatcher.dispatch({
      actionType: _constants2.default.UPDATE_CONFIGURABLE_ITEMS_DATA,
      data: data
    });
  },
  updateItem: function updateItem(rowIndex) {
    _flux.Dispatcher.dispatch({
      actionType: _constants2.default.UPDATE_CONFIGURABLE_ITEM,
      rowIndex: rowIndex
    });
  }
};

exports.default = ConfigurableItemsActions;