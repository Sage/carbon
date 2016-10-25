import Dispatcher from './../../dispatcher';
import Store from 'utils/flux/store';
import AppActions from './../../actions/app';
import AppConstants from './../../constants/app';
import ImmutableHelper from 'utils/helpers/immutable';

let data = ImmutableHelper.parseJSON({});

class AppStore extends Store { }

export default new BrowserStore('appStore', data, Dispatcher);
