// Carbon
import Dispatcher from '../../dispatcher';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';

// Flux
import ComponentActions from '../../actions/component';
import ComponentConstants from '../../constants/component';

let data = ImmutableHelper.parseJSON({
  definition: false
});

class ComponentStore extends Store {
  [ComponentConstants.INITIALISE_DEFINITION](data) {
    this.data = this.data.set('definition', ImmutableHelper.parseJSON(data.definition));
  }

  [ComponentConstants.UPDATE_DEFINITION](data) {
    this.data = this.data.setIn(['definition', 'demoProps', data.prop], data.value);
  }
}

export default new ComponentStore('componentStore', data, Dispatcher);
