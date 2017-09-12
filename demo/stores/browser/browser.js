import Dispatcher from './../../dispatcher';
import Store from 'utils/flux/store';
import Browser from 'utils/helpers/browser';
import BrowserActions from './../../actions/browser';
import BrowserConstants from './../../constants/browser';
import ImmutableHelper from 'utils/helpers/immutable';
import { merge } from 'lodash';

let browserData = merge({}, global.BROWSER_DATA, {
  width: Browser.getWindow().innerWidth
});

let data = ImmutableHelper.parseJSON(browserData);

class BrowserStore extends Store {

  /**
   * @method constructor
   * @return {Void}
   */
  constructor(...args) {
    super(...args);

    let _window = Browser.getWindow();

    // add event listener for window resize
    _window.addEventListener("resize", () => {
      BrowserActions.windowResize(_window.innerWidth);
    }, true);
  }

  /**
   * Triggers when the window is resized
   *
   * @method WINDOW_RESIZE
   * @return {Void}
   */
  [BrowserConstants.WINDOW_RESIZE](action) {
    this.data = this.data.set('width', String(action.width));
  }
}

export default new BrowserStore('browserStore', data);
