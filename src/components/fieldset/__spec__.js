import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Fieldset from './fieldset';
import Textbox from './../textbox';

fdescribe('Fieldset', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Fieldset><Textbox /></Fieldset>);
  });

  it('renders its children', () => {
    let child = TestUtils.findRenderedComponentWithType(instance, Textbox);
    expect(child).toBeDefined();
  });

  describe('if a legend is supplied', () => {
    it('renders its legend', () => {
      instance = TestUtils.renderIntoDocument(<Fieldset legend="foo"><Textbox /></Fieldset>);
      let child = TestUtils.findRenderedDOMComponentWithTag(instance, 'legend');
      expect(child).toBeDefined();
    });
  });
});
