// Carbon
import Dispatcher from '../../dispatcher';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';

// Flux
import DemoActions from '../../actions/demo';
import DemoConstants from '../../constants/demo';

let data = ImmutableHelper.parseJSON({
  menuOpen: false
});

class DemoStore extends Store {
  [DemoConstants.TOGGLE_MENU]() {
    this.data = this.data.set('menuOpen', !this.data.get('menuOpen'));
  }
}

export default new DemoStore('appStore', data);
