import Dispatcher from './../../dispatcher';
import ComponentConstants from '../../constants/component';

const ComponentActions = {
  /**
   * Updates the prop values loaded from the definition.
   * Use window in this action as it is evaluated code.
   */
  updateDefinition: (name, prop, ev) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_DEFINITION,
      name,
      prop,
      value: ev.target.value
    });
  }
};

export default ComponentActions;
