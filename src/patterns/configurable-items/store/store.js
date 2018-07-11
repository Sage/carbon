import { Dispatcher } from './../../../utils/flux';
import Store from './../../../utils/flux/store';
import ImmutableHelper from './../../../utils/helpers/immutable';
import ConfigurableItemsConstants from './../constants';

const data = ImmutableHelper.parseJSON({
  open: false,
  items_data: []
});

class ConfigurableItemsStore extends Store {
  [ConfigurableItemsConstants.TOGGLE_CONFIGURABLE_ITEMS_DIALOG]() {
    this.data = this.data.set('open', !this.data.get('open'));
  }

  [ConfigurableItemsConstants.REORDER_CONFIGURABLE_ITEMS](action) {
    const itemsData = this.data.get('items_data').toArray();
    const { dragIndex, hoverIndex } = action;
    const dragItem = itemsData.splice(dragIndex, 1)[0];
    itemsData.splice(hoverIndex, 0, dragItem);
    this.data = this.data.set('items_data', ImmutableHelper.parseJSON(itemsData));
  }

  [ConfigurableItemsConstants.UPDATE_CONFIGURABLE_ITEM](action) {
    const itemsData = this.data.get('items_data');
    const updatedData = itemsData.update(
      action.rowIndex,
      (item) => { return item.set('enabled', !item.get('enabled')); }
    );
    this.data = this.data.set('items_data', updatedData);
  }

  [ConfigurableItemsConstants.UPDATE_CONFIGURABLE_ITEMS_DATA](action) {
    this.data = this.data.set('items_data', action.data);
  }
}

export default new ConfigurableItemsStore(
  'configurableItemsStore',
  data,
  Dispatcher
);
