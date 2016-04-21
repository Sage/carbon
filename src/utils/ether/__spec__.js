import Ether from './ether.js';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Pod from 'components/pod';

describe('Ether', () => {
  let element;

  beforeEach(() => {
    element = TestUtils.renderIntoDocument(
      <Pod className='ether-test'/>
    );
  });

  describe('styleElement', () => {
    it('sets the attribute style to the passed in value', () => {
      let domInstance = TestUtils.findRenderedDOMComponentWithClass(element, 'ether-test');
      expect(domInstance.style.left).toEqual('');
      Ether.styleElement(domInstance, 'left', '10px');
      expect(domInstance.style.left).toEqual('10px');
    });
  });

  describe('pixelValue', () => {
    it('returns a string value with px appended', () => {
      expect(Ether.pixelValue(20)).toEqual('20px');
    });
  });

  describe('percentValue', () => {
    it('returns a string value with % appended', () => {
      expect(Ether.percentValue(20)).toEqual('20%');
    });
  });
});
