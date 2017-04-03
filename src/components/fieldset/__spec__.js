import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Fieldset from './fieldset';
import Textbox from './../textbox';
import { shallow } from 'enzyme';

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
      let wrapper = shallow(<Fieldset element='bar' role='baz' />);

      it('include correct component, element and role data tags', () => {
        window.RootTagTest.run(wrapper, 'fieldset', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Fieldset legend='test' />);

      window.ElementsTagTest.run(wrapper, [
        'legend'
      ]);
    });
  });
});
