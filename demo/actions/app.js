import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';

let AppActions = {
  /**
   * @method appValueUpdated
   */
  appValueUpdated: (component, key, ev, props) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_VALUE_UPDATED,
      value: ev.target.value,
      key: key,
      component: component
    });
  }
};

export default AppActions;
