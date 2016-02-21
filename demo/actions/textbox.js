import Dispatcher from './../dispatcher';
import TextboxConstants from './../constants/textbox';

let TextboxActions = {
  /**
   * @method textboxValueUpdated
   */
  textboxValueUpdated: (key, ev, props) => {
    Dispatcher.dispatch({
      actionType: TextboxConstants.TEXTBOX_VALUE_UPDATED,
      value: ev.target.value,
      key: key
    });
  }
};

export default TextboxActions;
