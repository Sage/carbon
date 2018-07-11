import { Dispatcher } from './../../../utils/flux';
import Constants from './../constants';
import Actions from './actions.js';

describe('ConfigurableItemsPatternActions', () => {
  beforeEach(() => {
    spyOn(Dispatcher, 'dispatch');
  });

  describe('toggleDialogOpen', () => {
    it('dispatches TOGGLE_CONFIGURABLE_ITEMS_DIALOG', () => {
      Actions.toggleDialogOpen();

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.TOGGLE_CONFIGURABLE_ITEMS_DIALOG
      });
    });
  });

  describe('reorderItems', () => {
    it('dispatches REORDER_CONFIGURABLE_ITEMS', () => {
      Actions.reorderItems(1, 0);

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.REORDER_CONFIGURABLE_ITEMS,
        dragIndex: 1,
        hoverIndex: 0
      });
    });
  });

  describe('updateData', () => {
    it('dispatches UPDATE_CONFIGURABLE_ITEMS_DATA with the data', () => {
      const data = { foo: 'bar' };
      Actions.updateData(data);

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.UPDATE_CONFIGURABLE_ITEMS_DATA,
        data
      });
    });
  });

  describe('updateItem', () => {
    it('dispatches UPDATE_CONFIGURABLE_ITEM', () => {
      Actions.updateItem(1);

      expect(Dispatcher.dispatch).toHaveBeenCalledWith({
        actionType: Constants.UPDATE_CONFIGURABLE_ITEM,
        rowIndex: 1
      });
    });
  });
});
