// item-source.js
import Browser from '../../../utils/helpers/browser';

const ItemSource = {
  canDrag(props) { // eslint-disable-line no-unused-vars
    return Browser.getActiveElement().getAttribute('icon') === "list_view";
  },

  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

export default ItemSource;
