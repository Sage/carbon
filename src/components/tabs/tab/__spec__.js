import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Tab from './tab';
import Textbox from './../../textbox';

describe('Tab', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tab title='Tab Title 1' tabId='uniqueid1' id='uniqueid1'>
        <Textbox name='foo'/>
        <Textbox name='bar'/>
      </Tab>);
  });

  describe('initialize', () => {
    it('it sets isValid to true', () => {
      expect(instance.state.isValid).toBeTruthy();
    });
  });

  describe('setValidity', () => {
    it('calls the parent tab context with the new state', () => {
      let spy = jasmine.createSpy('spy');
      instance.context = { tabs: { changeValidity: spy } };
      instance.setValidity(false)

      expect(spy).toHaveBeenCalledWith(instance.props.id, false);
    });

    it('sets its own valid state', () => {
      instance.context = { tabs: { changeValidity: function(a,b){} } };
      spyOn(instance, 'setState');
      instance.setValidity(false)

      expect(instance.setState).toHaveBeenCalledWith({isValid: false});
    });
  });

  describe('mainClasses', () => {
    it('returns the base className of ui-tab', () => {
      expect(instance.mainClasses).toEqual('ui-tab ');
    });

    it('returns any additional added classes', () => {
      instance = TestUtils.renderIntoDocument(
        <Tab title='Tab Title 1' className='foo' tabId='uniqueid1' id='uniqueid1'>
          <Textbox name='foo'/>
          <Textbox name='bar'/>
        </Tab>);
      expect(instance.mainClasses).toEqual('ui-tab foo');
    });

    it('adds an error class when the tab has a error', () => {
      instance.setState({ isValid: false });
      expect(instance.mainClasses).toEqual('ui-tab  ui-tab--errors');
    });
  });

  describe('render', () => {
    it('renders a surrounding parent div', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.className).toEqual('ui-tab ');
    });
    
    it('renders all children passed to is', () => {
      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
      expect(inputs.length).toEqual(2);
    });
  });
});
