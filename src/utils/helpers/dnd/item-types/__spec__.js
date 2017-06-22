import ItemTypes from './item-types';

describe('ItemTypes', () => {
  describe('getItemType', () => {
    describe('with identifier', () => {
      it('returns the identifier', () => {
        expect(ItemTypes.getItemType({ identifier: 'foo' })).toEqual('foo');
      });
    });

    describe('without identifier', () => {
      it('returns the default', () => {
        expect(ItemTypes.getItemType({})).toEqual('defaultDragAndDropIdentifier');
      });
    });
  });
});
