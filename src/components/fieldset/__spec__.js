import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/test';
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

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Fieldset data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'fieldset', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Fieldset legend='test' />);

      elementsTagTest(wrapper, [
        'legend'
      ]);
    });
  });
});
