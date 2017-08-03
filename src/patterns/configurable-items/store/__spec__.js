import Constants from './../constants';
import ImmutableHelper from './../../../utils/helpers/immutable';
import Store from './store';

const setValue = (key, value) => {
  if (Array.isArray(key)) {
    Store.data = Store.data.setIn(key, value);
  } else {
    Store.data = Store.data.set(key, value);
  }
};

describe('Store', () => {
  afterEach(() => {
    Store.reset();
  });

  describe('TOGGLE_CONFIGURABLE_ITEMS_DIALOG', () => {
    it('toggles the open boolean', () => {
      expect(Store.data.get('open')).toEqual(false);
      Store[Constants.TOGGLE_CONFIGURABLE_ITEMS_DIALOG]();
      expect(Store.data.get('open')).toEqual(true);
    });
  });

  describe('REORDER_CONFIGURABLE_ITEMS', () => {
    beforeEach(() => {
      setValue(
        'items_data',
        ImmutableHelper.parseJSON([
          { id: 'foo', name: 'Foo', locked: true, enabled: true },
          { id: 'bar', name: 'Bar', locked: false, enabled: true },
          { id: 'baz', name: 'Baz', locked: false, enabled: false }
        ])
      );
    });

    it('moves the drag item to the hover location', () => {
      Store[Constants.REORDER_CONFIGURABLE_ITEMS]({
        dragIndex: 0,
        hoverIndex: 1
      });
      expect(Store.data.get('items_data')).toEqual(
        ImmutableHelper.parseJSON([
          { id: 'bar', name: 'Bar', locked: false, enabled: true },
          { id: 'foo', name: 'Foo', locked: true, enabled: true },
          { id: 'baz', name: 'Baz', locked: false, enabled: false }
        ])
      );
    });
  });

  describe('UPDATE_CONFIGURABLE_ITEM', () => {
    beforeEach(() => {
      setValue(
        'items_data',
        ImmutableHelper.parseJSON([
          { id: 'foo', name: 'Foo', locked: true, enabled: true },
          { id: 'bar', name: 'Bar', locked: false, enabled: true },
          { id: 'baz', name: 'Baz', locked: false, enabled: false }
        ])
      );
    });

    it('toggles the enabled boolean for the rowIndex specified', () => {
      Store[Constants.UPDATE_CONFIGURABLE_ITEM]({
        rowIndex: 0
      });
      expect(
        Store.data.get('items_data').toJS()
      ).toEqual(
        [
          { id: 'foo', name: 'Foo', locked: true, enabled: false },
          { id: 'bar', name: 'Bar', locked: false, enabled: true },
          { id: 'baz', name: 'Baz', locked: false, enabled: false }
        ]
      );
    });
  });

  describe('UPDATE_CONFIGURABLE_ITEMS_DATA', () => {
    beforeEach(() => {
      setValue(
        'items_data',
        ImmutableHelper.parseJSON([
          { id: 'foo', name: 'Foo', locked: true, enabled: true },
          { id: 'bar', name: 'Bar', locked: false, enabled: true },
          { id: 'baz', name: 'Baz', locked: false, enabled: false }
        ])
      );
    });

    it('overwrites the items_data', () => {
      Store[Constants.UPDATE_CONFIGURABLE_ITEMS_DATA]({
        data: 'new data goes here'
      });
      expect(Store.data.get('items_data')).toEqual('new data goes here');
    });
  });
});
