import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import Fieldset from './fieldset';
import Textbox from './../textbox';

describe('Fieldset', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(<Fieldset><Textbox /></Fieldset>);
  });

  it('renders its children', () => {
    let child = TestUtils.findRenderedComponentWithType(instance, Textbox);
    expect(child).toBeDefined();
  });

  it('applies any props to the fieldset', () => {
    instance = TestUtils.renderIntoDocument(<Fieldset id="foo"><Textbox /></Fieldset>);
    let child = TestUtils.findRenderedDOMComponentWithTag(instance, 'fieldset');
    expect(child.id).toEqual('foo');
  });

  describe('if a legend is supplied', () => {
    it('renders its legend', () => {
      instance = TestUtils.renderIntoDocument(<Fieldset legend="foo"><Textbox /></Fieldset>);
      let child = TestUtils.findRenderedDOMComponentWithTag(instance, 'legend');
      expect(child).toBeDefined();
    });
  });
});
