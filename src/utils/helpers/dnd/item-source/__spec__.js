import ItemSourceHelper from './';

describe('ItemSourceHelper', () => {
  describe('onBeginDrag', () => {
    it('returns an object with index set to props.index', () => {
      let props = {
        index: 2
      };

      let result = ItemSourceHelper.onBeginDrag(props);
      expect(result.index).toEqual(props.index);
    });
  });

});
