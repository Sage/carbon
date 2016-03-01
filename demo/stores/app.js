import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';
import Immutable from 'immutable';
import FormInputHelper from './../helpers/form-input-helper';

let data = ImmutableHelper.parseJSON({
  button: {
    text: "Action"
  },
  flash: {
    as: "warning",
    open: true,
    text: "Sample flash notification."
  },
  link: {
    text: "Sample Link"
  },
  message: {
    as: "warning",
    text: "Sample message."
  },
  row: {
    columnData: [{}, {}, {}, {}]
  },
  split_button: {
    text: "Main Action"
  },
  toast: {
    as: "warning",
    open: true,
    text: "Sample toast notification."
  }
});

class AppStore extends Store {
  /**
   * @method APP_VALUE_UPDATED
   */
  [AppConstants.APP_VALUE_UPDATED](action) {
    let arr = [action.component].concat(action.key);
    this.data = this.data.setIn(arr, action.value);
  }

  /**
   * @method APP_DELETE_ROW
   */
  [AppConstants.APP_DELETE_ROW](action) {
    this.data = this.data.deleteIn(action.key);
  }
}

export default new AppStore('appStore', data, Dispatcher);
