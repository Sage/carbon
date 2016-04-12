import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Tile from './tile';

describe('Tile', () => {
  let instance;

  describe('render', () => {
    it('renders div with a class of ui-tile', () => {
      instance = TestUtils.renderIntoDocument(<Tile>foo</Tile>);
      let podNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]
      expect(podNode.className).toEqual('ui-tile');
    });

    it('renders div with custom class', () => {
      instance = TestUtils.renderIntoDocument(<Tile className="foo">foo</Tile>);
      let podNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]
      expect(podNode.className).toEqual('ui-tile foo');
    });

    it('renders its children', () => {
      instance = TestUtils.renderIntoDocument(<Tile>foo</Tile>);
      let podNode = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]
      expect(podNode.textContent).toEqual('foo');
    });
  });
});
