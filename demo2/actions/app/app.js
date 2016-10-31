import Dispatcher from './../../dispatcher';
import AppConstants from './../../constants/app';
import AppStore from './../../stores/app';

/**
 * Actions for the App.
 */
const AppActions = {
  toggleMenu: () => {
    Dispatcher.dispatch({ actionType: AppConstants.TOGGLE_MENU });
  }
};

export default AppActions;
