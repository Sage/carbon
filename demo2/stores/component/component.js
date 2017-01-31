// Carbon
import Dispatcher from '../../dispatcher';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';

// Flux
import ComponentActions from '../../actions/component';
import ComponentConstants from '../../constants/component';

import definitions from '../../definitions';

let data = ImmutableHelper.parseJSON(definitions);

class ComponentStore extends Store {
  [ComponentConstants.UPDATE_DEFINITION](data) {
    let location = [data.name, 'demoProps', data.prop];
    if (data.arrayPos >= 0) {
      location.push(data.arrayPos);
    }
    this.data = this.data.setIn(location, data.value);
  }
}

export default new ComponentStore('componentStore', data, Dispatcher);
