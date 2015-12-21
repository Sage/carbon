import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Tabs from './tabs';
import Tab from './../tab';
import Textbox from './../textbox';

fdescribe('Tabs', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tabs name='Tab Comp'>
        <Tab title='Tab Title 1' tabId='uniqueid1'>
          <Textbox name='foo'/>
          <Textbox name='bar'/>
        </Tab>
        <Tab title='Tab Title 2' tabId='uniqueid2'>
          <Textbox name='baz'/>
          <Textbox name='bax'/>
        </Tab>
      </Tabs>);
  });

  describe('initialize', () => {
    it('sets tabValidity to a empty object', () => {
      expect(instance.state.tabValidity).toEqual({});
    });
  });

  describe('componentWillMount', () => {
    describe('initial selected tab', () => {
      describe('when passed as props', () => {
        it('it uses the prop as the initialSelectedId', () => {
          instance = TestUtils.renderIntoDocument(
            <Tabs name='Tab Comp' initialTabId='uniqueid2'>
              <Tab title='Tab Title 1' tabId='uniqueid1'>
                <Textbox name='foo'/>
                <Textbox name='bar'/>
              </Tab>
              <Tab title='Tab Title 2' tabId='uniqueid2'>
                <Textbox name='baz'/>
                <Textbox name='bax'/>
              </Tab>
            </Tabs>);

          expect(instance.state.selectedTabId).toEqual('uniqueid2');
        });
      });

      describe('when not passed as props', () => {
        it('it defaults to the first child', () => {
          expect(instance.state.selectedTabId).toEqual('uniqueid1');
        });
      });
    });
  });

  describe('changeValidity', () => {
    beforeEach(() => {
      instance.setState({ tabValidity: { 'foo': true } });
      spyOn(instance, 'setState');
      instance.changeValidity('foo', false);
    });

    it('sets the validity state for the given tab', () => {
      expect(instance.setState).toHaveBeenCalledWith({ tabValidity: { 'foo': false } });
      expect(instance.state).toEqual({ tabValidity: { 'foo': false }, selectedTabId: 'uniqueid1' });
    });
  });

  describe('handleTabClick', () => {
    it('sets the state to teh currently selected tabId', () => {
      spyOn(instance, 'handleTabClick');
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];

      expect(secondTab.classList[1]).toBeFalsy();

      TestUtils.Simulate.click(secondTab);

      expect(secondTab.classList[1]).toEqual('selected');
    });
  });

  describe('mainClasses', () => {
    it('returns the main class for the component', () => {
      expect(instance.mainClasses).toEqual('ui-tabs ');
    });

    describe('when passing custom classNames', () => {
      it('adds it to the classList', () => {
        instance = TestUtils.renderIntoDocument(
          <Tabs className='1tab' name='Tab Comp' initialTabId='uniqueid2'>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='foo'/>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>);

        expect(instance.mainClasses).toEqual('ui-tabs 1tab');
      });
    });
  });

  describe('tabHeaderClasses', () => {
    it('adds a ui-tabs__header class to the tab', () => {
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.className).toEqual('ui-tabs__headers__header'); 
    });

    describe('when tab is selected tab', () => {
      it('adds a selected class to the header', () => {
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[0];
        expect(secondTab.className).toEqual('ui-tabs__headers__header selected'); 
      });
    });

    describe('when tab is inValid', () => {
      it('adds a error class to the header', () => {
        instance.setState({ tabValidity: { 'uniqueid2': false } });
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
        expect(secondTab.className).toEqual('ui-tabs__headers__header ui-tabs__headers__header--error'); 
      });
    });
  });

  describe('tabHeaders', () => {
     
  });

  describe('visibleTab', () => {
    
  });
  describe('tabs', () => {
    
  });
  describe('render', () => {
    
  });
});
