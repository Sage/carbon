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

  updateDefinition: (prop, name, arrayPos, ev) => {
    Dispatcher.dispatch({
      actionType: ComponentConstants.UPDATE_DEFINITION,
      arrayPos: arrayPos,
      name: name,
      prop: prop,
      value: ev.target.value
    });
  }
};

export default ComponentActions;
