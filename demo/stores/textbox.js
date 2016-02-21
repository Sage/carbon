import Dispatcher from './../dispatcher';
import TextboxConstants from './../constants/textbox';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';

let data = ImmutableHelper.parseJSON({
  /**
   * @property label
   * @type {String}
   */
  label: "Example Component",

  /**
   * @property labelInline
   * @type {Boolean}
   */
  labelInline: false,

  /**
   * @property labelWidth
   * @type {String}
   */
  labelWidth: ""
});

class TextboxStore extends Store {
  /**
   * @method TEXTBOX_VALUE_UPDATED
   */
  [TextboxConstants.TEXTBOX_VALUE_UPDATED](action) {
    this.data = this.data.set(action.key, action.value);
  }
}

export default new TextboxStore('textboxStore', data, Dispatcher);
