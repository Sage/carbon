import Browser from '../browser';
import React from 'react';
import ScrollableParent from './scrollable-parent';

describe('ScrollableParent', () => {
  describe('searchForScrollableParent', () => {
    const scrollableElementStyle = { overflow: 'scroll' };
    const windowParams = { getComputedStyle: () => (scrollableElementStyle) };
    const emptyWindowParams = { getComputedStyle: () => ({}) };
    const windowMock = jest.fn()
    Browser.getWindow = windowMock;

    it('returns null when not provided with an element', () => {
      expect(ScrollableParent.searchForScrollableParent()).toBeNull();
    });

    it('returns the element provided if the element is itself scrollable', () => {
      windowMock.mockReturnValueOnce(windowParams);
      const scrollableElement = <div style={ scrollableElementStyle } >Scolly</div>
      expect(ScrollableParent.searchForScrollableParent(scrollableElement)).toEqual(scrollableElement);
    });

    it('returns the first scrollable parent of the element provided if the element itself is not scrollable', () => {
      windowMock.mockReturnValueOnce(emptyWindowParams)
        .mockReturnValueOnce(emptyWindowParams)
        .mockReturnValueOnce(windowParams);
      const elementsStub = { parentElement: {parentElement: 'Scrollando'} } 
      expect(ScrollableParent.searchForScrollableParent(elementsStub)).toEqual('Scrollando');
    });
  });
});
