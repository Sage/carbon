// Carbon
import Dispatcher from './../../dispatcher';

// Flux
import ComponentConstants from '../../constants/component';
import ComponentStore from '../../stores/component';

const ComponentActions = {
  initialiseDefinition: (definition) => {
    Dispatcher.dispatch({
      actionType: ComponentConstants.INITIALISE_DEFINITION,
      definition: definition
    });
  },

  updateDefinition: (prop, ev) => {
    Dispatcher.dispatch({
      actionType: ComponentConstants.UPDATE_DEFINITION,
      prop: prop,
      value: ev.target.value
    });
  }
};

export default ComponentActions;
