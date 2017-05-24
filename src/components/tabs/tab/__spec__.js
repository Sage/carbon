import React from 'react';
import TestUtils from 'react-dom/test-utils';
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
    it('it sets isWarning to false', () => {
      expect(instance.state.isWarning).toBeFalsy();
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

  describe('setWarning', () => {
    it('calls the parent tab context with the new state', () => {
      let spy = jasmine.createSpy('spy');
      instance.context = { tabs: { changeWarning: spy } };
      instance.setWarning(true)

      expect(spy).toHaveBeenCalledWith(instance.props.id, true);
    });

    it('sets its own warning state', () => {
      instance.context = { tabs: { changeWarning: function(a,b){} } };
      spyOn(instance, 'setState');
      instance.setWarning(true)

      expect(instance.setState).toHaveBeenCalledWith({isWarning: true});
    });
  });

  describe('mainClasses', () => {
    it('returns the base className of carbon-tab', () => {
      expect(instance.mainClasses).toEqual('carbon-tab');
    });

    it('returns any additional added classes', () => {
      instance = TestUtils.renderIntoDocument(
        <Tab title='Tab Title 1' className='foo' tabId='uniqueid1' id='uniqueid1'>
          <Textbox name='foo'/>
          <Textbox name='bar'/>
        </Tab>);
      expect(instance.mainClasses).toEqual('carbon-tab foo');
    });
  });

  describe('render', () => {
    it('renders a surrounding parent div', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.className).toEqual('carbon-tab');
    });

    it('renders all children passed to is', () => {
      let inputs = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input');
      expect(inputs.length).toEqual(2);
    });
  });
});
