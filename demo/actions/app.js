import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';

let AppActions = {
  /**
   * @method appValueUpdated
   */
  appValueUpdated: (component, key, ev) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_VALUE_UPDATED,
      value: ev.target.value,
      key: key,
      component: component
    });
  },

  /**
   * @method appDeleteRow
   */
  appDeleteRow: (key, ev) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_DELETE_ROW,
      key: key
    });
  }
};

export default AppActions;
