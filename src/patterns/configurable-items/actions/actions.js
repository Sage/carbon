import { Dispatcher } from '../../../utils/flux';
import Constants from '../constants';

const ConfigurableItemsActions = {
  toggleDialogOpen: () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_CONFIGURABLE_ITEMS_DIALOG
    });
  },
  reorderItems: (dragIndex, hoverIndex) => {
    Dispatcher.dispatch({
      actionType: Constants.REORDER_CONFIGURABLE_ITEMS,
      dragIndex,
      hoverIndex
    });
  },
  updateData: (data) => {
    Dispatcher.dispatch({
      actionType: Constants.UPDATE_CONFIGURABLE_ITEMS_DATA,
      data
    });
  },
  updateItem: (rowIndex) => {
    Dispatcher.dispatch({
      actionType: Constants.UPDATE_CONFIGURABLE_ITEM,
      rowIndex
    });
  }
};

export default ConfigurableItemsActions;
