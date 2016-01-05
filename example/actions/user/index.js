import Dispatcher from './../../dispatcher';
import UserConstants from './../../constants/user';

let UserActions = {
  userValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
    });
  },

  userDialogClosed: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_DIALOG_CLOSED
    });
  },

  userDialogOpened: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_DIALOG_OPENED
    });
  },

  userAlertClosed: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_ALERT_CLOSED
    });
  },

  userAlertOpened: (ev, props) => {
    Dispatcher.dispatch({
      actionType: UserConstants.USER_ALERT_OPENED
    });
  }
};

export default UserActions;
