import Dispatcher from './../../dispatcher';
import BrowserConstants from './../../constants/browser';

/**
 * Actions for the Browser.
 */
const BrowserActions = {
  /**
   * Dispatches the event for when the window is resize.
   *
   * @method windowResize
   * @param {Number} width
   * @return {Void}
   */
  windowResize: (width) => {
    Dispatcher.dispatch({
      actionType: BrowserConstants.WINDOW_RESIZE,
      width: width
    });
  }
};

export default BrowserActions;
