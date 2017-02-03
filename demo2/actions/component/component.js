import Dispatcher from './../../dispatcher';
import ComponentConstants from '../../constants/component';

const ComponentActions = {
  /**
   * Updates the prop values loaded from the definition.
   */
  updateDefinition: (name, prop, ev) => {
    Dispatcher.dispatch({
      actionType: ComponentConstants.UPDATE_DEFINITION,
      name,
      prop,
      value: ev.target.value
    });
  },

  /**
   * Updates the prop values loaded from the definition via the preview.
   * This uses window object as the code is evaluated from a string.
   */
  updateDefinitionFromDemo: (ev) => {
    let scope = ev.target.getAttribute('data-binding').split(","),
        name = scope[0],
        prop = scope[1];

    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_DEFINITION,
      name,
      prop,
      value: ev.target.value
    });
  }
};

export default ComponentActions;
