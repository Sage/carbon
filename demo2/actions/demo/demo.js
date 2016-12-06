// Carbon
import Dispatcher from './../../dispatcher';

// Flux
import DemoConstants from '../../constants/demo';
import DemoStore from '../../stores/demo';

const DemoActions = {
  toggleMenu: () => {
    Dispatcher.dispatch({ actionType: DemoConstants.TOGGLE_MENU });
  }
};

export default DemoActions;
