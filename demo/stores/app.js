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
  collapsible_pod: {
    title: 'Hello World!'
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
  rainbow: {
    data: [{
      y: "50",
      name: "First Bit",
      label: "bit 1!",
      tooltip: "more info about the first bit"
    }, {
      y: "50",
      name: "Second Bit",
      label: "bit 2!",
      tooltip: "more info about the second bit"
    }],
    title: "A Rainbow Chart"
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
