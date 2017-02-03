// Carbon
import Dispatcher from './../../dispatcher';

// Flux
import ComponentConstants from '../../constants/component';

const ComponentActions = {
  updateDefinition: (name, prop, ev) => {
    Dispatcher.dispatch({
      actionType: ComponentConstants.UPDATE_DEFINITION,
      name,
      prop,
      value: ev.target.value
    });
  },

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
