import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Immutable from 'immutable';
import { Tabs, Tab } from './tabs';
import Textbox from './../textbox';

describe('Tabs', () => {
  let instance;
  let instanceWithNull = TestUtils.renderIntoDocument(
    <Tabs renderHiddenTabs={ false }>
      { null }
      <Tab title='Tab Title 1' tabId='uniqueid1'>
        <Textbox name='foo'/>
        <Textbox name='bar'/>
      </Tab>
    </Tabs>
  );

  let instanceOneChild = TestUtils.renderIntoDocument(
    <Tabs renderHiddenTabs={ false }>
      <Tab title='Tab Title 1' tabId='uniqueid1'>
        <Textbox name='foo'/>
        <Textbox name='bar'/>
      </Tab>
    </Tabs>
  );

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tabs>
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
    it('sets tabValidity to a empty immutable map', () => {
      expect(instance.state.tabValidity).toEqual(Immutable.Map());
    });
  });

  describe('componentWillMount', () => {
    describe('initial selected tab', () => {
      describe('when passed as props', () => {
        it('it uses the prop as the initialSelectedId', () => {
          instance = TestUtils.renderIntoDocument(
            <Tabs initialTabId='uniqueid2'>
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

      describe('when there is only one tab', () => {
        it('uses the first tab', () => {
          expect(instanceOneChild.state.selectedTabId).toEqual('uniqueid1');
        });
      });

      describe('when passed a null child', () => {
        it('ignores the null child', () => {
          expect(instanceWithNull.state.selectedTabId).toEqual('uniqueid1');
        });
      });
    });
  });

  describe('changeValidity', () => {
    beforeEach(() => {
      instance.setState({ tabValidity: Immutable.fromJS({ 'foo': true })});
      spyOn(instance, 'setState').and.callThrough();
      instance.changeValidity('foo', false);
    });

    it('sets the validity state for the given tab', () => {
      expect(instance.setState).toHaveBeenCalledWith({ tabValidity: instance.state.tabValidity.set('foo', false) });
      expect(instance.state.tabValidity.toJS()).toEqual({ 'foo': false });
    });
  });

  describe('handleTabClick', () => {
    it('sets the state to teh currently selected tabId', () => {
      spyOn(instance, 'handleTabClick');
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];

      expect(secondTab.classList[1]).toBeFalsy();

      TestUtils.Simulate.click(secondTab);

      expect(secondTab.classList[1]).toEqual('ui-tabs__headers__header--selected');
    });
  });

  describe('mainClasses', () => {
    it('returns the main class for the component', () => {
      expect(instance.mainClasses).toEqual('ui-tabs');
    });

    describe('when passing custom classNames', () => {
      it('adds it to the classList', () => {
        instance = TestUtils.renderIntoDocument(
          <Tabs className='1tab' initialTabId='uniqueid2'>
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
        expect(secondTab.className).toEqual('ui-tabs__headers__header ui-tabs__headers__header--selected');
      });
    });

    describe('when tab is inValid', () => {
      it('adds a error class to the header', () => {
        instance.setState({ tabValidity: Immutable.fromJS({ 'uniqueid2': false })});
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
        expect(secondTab.className).toEqual('ui-tabs__headers__header ui-tabs__headers__header--error');
      });
    });
  });

  describe('tabHeaders', () => {
    it('renders unordered list of headers', () => {
      expect(instance.tabHeaders.type).toBe('ul');
    });

    it('renders a list item for each tab passed to the tabs', () => {
      expect(instance.tabHeaders.props.children.length).toEqual(2);
    });

    it('adds a data-tabid to each list item', () => {
      expect(instance.tabHeaders.props.children[0].props['data-tabid']).toEqual('uniqueid1');
    });

    describe('when passed a null child', () => {
      it('ignores the null child', () => {
        let headers = TestUtils.scryRenderedDOMComponentsWithClass(instanceWithNull, 'ui-tabs__headers__header')
        expect(headers.length).toEqual(1);
      });
    });

    describe('when there is only one child', () => {
      it('renders a single header', () => {
        let headers = TestUtils.scryRenderedDOMComponentsWithClass(instanceOneChild, 'ui-tabs__headers__header')
        expect(headers.length).toEqual(1);
      });
    });

    describe('when a align prop is passed', () => {
      it('adds a aligned class', () => {
        let instance = TestUtils.renderIntoDocument(
          <Tabs align='right'>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>
        );

        let headers = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul')
        expect(headers.className).toEqual('ui-tabs__headers ui-tabs__headers--align-right');
      });
    });

    describe('when a position prop is passed', () => {
      it('adds a position class', () => {
        let instance = TestUtils.renderIntoDocument(
          <Tabs position='left'>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>
        );

        let headers = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul')
        expect(headers.className).toEqual('ui-tabs__headers ui-tabs__headers--position-left');
      });
    });
  });

  describe('visibleTab', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Tabs renderHiddenTabs={ false }>
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

    it('returns the currently visible tab', () => {
      let tab = instance.visibleTab;
      expect(tab.props.title).toEqual('Tab Title 1');
      expect(tab.props.tabId).toEqual('uniqueid1');
    });

    it('adds a class of selected to the tab', () => {
      expect(instance.visibleTab.props.className).toEqual('ui-tab--selected');
    });
  });

  describe('tabs', () => {
    describe('when renderHiddenTabs is set to true', () => {
      it('returns an array of all child components', () => {
        expect(instance.tabs.length).toEqual(2);
      });

      it('adds a selected class to the visible tab', () => {
        expect(instance.tabs[0].props.className).toEqual('ui-tab--selected');
      });

      it('adds a hidden class to all other tabs', () => {
        expect(instance.tabs[1].props.className).toEqual('hidden');
      });

      describe('when passed a null child', () => {
        it('ignores the null child', () => {
          let tabs = TestUtils.scryRenderedDOMComponentsWithClass(instanceWithNull, 'ui-tab')
          expect(tabs.length).toEqual(1);
        });
      });
    });

    describe('when renderHiddenTabs is set to false', () => {
      it('returns a single child tab component', () => {
        instance = TestUtils.renderIntoDocument(
          <Tabs renderHiddenTabs={ false }>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='foo'/>
              <Textbox name='bar'/>
            </Tab>
            <Tab title='Tab Title 2' tabId='uniqueid2'>
              <Textbox name='baz'/>
              <Textbox name='bax'/>
            </Tab>
          </Tabs>);

        expect(typeof instance.tabs).toEqual('object');
      });
    });

    describe('when there is one child', () => {
      it('renders the only child', () => {
        let tabs = TestUtils.scryRenderedDOMComponentsWithClass(instanceOneChild, 'ui-tab')
        expect(tabs.length).toEqual(1);
      });
    });
  });

  describe('render', () => {
    it('creates a parent div for the component', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.className).toEqual('ui-tabs');
    });

    it('renders the tab headers', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      let items = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
      expect(list.className).toEqual('ui-tabs__headers ui-tabs__headers--align-left');
      expect(items.length).toEqual(2);
    });
  });
});
