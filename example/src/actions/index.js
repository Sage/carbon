import Dispatcher from '../dispatcher';
import Constants from '../constants';

let Actions = {
  updateValue: (ev, props) => {
    // this should dispatch the constant we defined, as well as any data the store
    // should be aware of from the event that occurred (eg the input's value)
    Dispatcher.dispatch({

      actionType: Constants.UPDATE_VALUE,
      value: ev.target.value
    });
  }
};

export default Actions;
