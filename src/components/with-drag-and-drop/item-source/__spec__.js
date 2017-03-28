import React from 'react';
import ItemSource from './item-source';
import Browser from '../../../utils/helpers/browser';

describe('ItemSource', () => {
  let itemSource;

  beforeEach(() => {
    itemSource = ItemSource;
  });

  describe('beginDrag', () => {
    it('is a function', () => {
      expect(typeof itemSource.beginDrag).toEqual('function');
    });

    it('returns the props.index', () => {
      const props = {
        index: 2
      };

      let result = itemSource.beginDrag(props);
      expect(result.index).toEqual(props.index);
    });
  });

  describe('canDrag', () => {

    it('is a function', () => {
      expect(typeof itemSource.canDrag).toEqual('function');
    })

    it ('returns true if the activeElement has a list view icon', () => {
      let elem = document.createElement('div');
      elem.setAttribute('icon', 'list_view');

      spyOn(Browser, 'getActiveElement').and.returnValue(elem);

      expect(itemSource.canDrag()).toEqual(true);
    });

  });
});
