import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Pod from './index';
import Button from './../button';

describe('Pod', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Pod>
        <Button />
        <Button />
        <Button />
      </Pod>
    );
  });

  describe('render', () => {
    it('renders a parent div with a pod CSS class', () => {
      let podNode = TestUtils.findRenderedDOMComponentWithTag(instance, 'div')
      expect(podNode.className).toEqual('ui-pod');
    });

    it('renders all children passed to it', () => {
      let buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
      expect(buttons.length).toEqual(3);
    });
  });
});
