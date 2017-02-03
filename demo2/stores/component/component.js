// Carbon
import Dispatcher from '../../dispatcher';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';

// Flux
import ComponentActions from './../../actions/component';
import ComponentConstants from './../../constants/component';

import definitions from './../../definitions';

let data = ImmutableHelper.parseJSON(definitions);

class ComponentStore extends Store {
  [ComponentConstants.UPDATE_DEFINITION](data) {
    this.data = this.data.setIn([data.name, 'propValues', data.prop], data.value);
  }
}

export default new ComponentStore('componentStore', data, Dispatcher);
