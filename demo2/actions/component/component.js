// Carbon
import Dispatcher from './../../dispatcher';

// Flux
import ComponentConstants from '../../constants/component';
import ComponentStore from '../../stores/component';

const ComponentActions = {
  updateDefinition: (prop, name, arrayPos, ev) => {
    Dispatcher.dispatch({
      actionType: ComponentConstants.UPDATE_DEFINITION,
      arrayPos,
      name,
      prop,
      value: ev.target.value
    });
  }
};

export default ComponentActions;
