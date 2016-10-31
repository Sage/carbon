import Dispatcher from './../../dispatcher';
import Store from 'utils/flux/store';
import AppActions from './../../actions/app';
import AppConstants from './../../constants/app';
import ImmutableHelper from 'utils/helpers/immutable';

let data = ImmutableHelper.parseJSON({
  menuOpen: false
});

class AppStore extends Store {
  [AppConstants.TOGGLE_MENU]() {
    this.data = this.data.set('menuOpen', !this.data.get('menuOpen'));
  }
}

export default new AppStore('appStore', data, Dispatcher);
