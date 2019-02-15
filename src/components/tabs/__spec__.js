import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Immutable from 'immutable';
import { Tabs, Tab } from './tabs';
import Textbox from './../textbox';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Browser from '../../utils/helpers/browser';

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
        <Tab title='Tab Title 1' tabId='uniqueid1' className='class1' headerClassName='headerClass1'>
          <Textbox name='foo'/>
          <Textbox name='bar'/>
        </Tab>
        <Tab title='Tab Title 2' tabId='uniqueid2' className='class2' headerClassName='headerClass2'>
          <Textbox name='baz'/>
          <Textbox name='bax'/>
        </Tab>
        <Tab title='Tab Title 3' tabId='uniqueid3' className='class3 class4' headerClassName='headerClass3 headerClass4'>
          <Textbox name='bar'/>
          <Textbox name='bap'/>
        </Tab>
      </Tabs>
    );
    instance._window = {
      history: {
        replaceState: () => {}
      },
      location: ""
    };
  });

  describe('initialize', () => {
    it('sets tabValidity to a empty immutable map', () => {
      expect(instance.state.tabValidity).toEqual(Immutable.Map());
    });
    it('sets tabWarning to a empty immutable map', () => {
      expect(instance.state.tabWarning).toEqual(Immutable.Map());
    });
  });

  describe('componentWillMount', () => {
    describe('initial selected tab', () => {
      describe('when passed as props', () => {
        it('uses the prop as selectedTabId and takes precendent over hash', () => {
          instance = TestUtils.renderIntoDocument(
            <Tabs selectedTabId='uniqueid2'>
              <Tab title='Tab Title 1' tabId='uniqueid1'>
                <Textbox name='foo'/>
                <Textbox name='bar'/>
              </Tab>
              <Tab title='Tab Title 2' tabId='uniqueid2'>
                <Textbox name='baz'/>
                <Textbox name='bax'/>
              </Tab>
            </Tabs>
          );
          instance._window = { location: "#uniqueid1" };

          expect(instance.state.selectedTabId).toEqual('uniqueid2');
        });
      });

      describe('detects a hash', () => {
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
            </Tabs>
          );
        });

        it('matches the hash so uses the tab', () => {
          instance._window = { location: { hash: "#uniqueid2" }};
          instance.componentWillMount();
          expect(instance.state.selectedTabId).toEqual('uniqueid2');
        });

        it('does not match the hash so uses first tab', () => {
          instance._window = { location: { hash: "#foo" }};
          instance.componentWillMount();
          expect(instance.state.selectedTabId).toEqual('uniqueid1');
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




  describe('Change in tab prop', () => {
    let instance, tabs, unique1Tab, unique2Tab;
    beforeEach(() => {
      spyOn(Browser, 'getWindow').and.returnValue({
        history: {
          replaceState: () => {}
        },
        location: ""
      });
      class DummyComponent extends React.Component {
        state = {
          selectedTabId: "uniqueid2", align: 'left'
        }

        render() {
          return (
            <Tabs { ...this.state }>
              <Tab title='Tab Title 1' tabId='uniqueid1'>
                <Textbox name='foo'/>
                <Textbox name='bar'/>
              </Tab>
              <Tab title='Tab Title 2' tabId='uniqueid2'>
                <Textbox name='baz'/>
                <Textbox name='bax'/>
              </Tab>
            </Tabs>
          );
        }
      };

      let TestParent = React.createFactory(DummyComponent);
      instance = TestUtils.renderIntoDocument(TestParent());
      tabs = TestUtils.scryRenderedComponentsWithType(instance, Tab);
      unique1Tab = tabs[0];
      unique2Tab = tabs[1];
      expect(unique1Tab.props.className).toEqual('hidden');
      expect(unique2Tab.props.className).not.toEqual('hidden');
    });

    describe('without noTabChange function', () => {
      it('changes tab to current prop', () => {
        instance.setState({
          selectedTabId: "uniqueid1"
        });
        expect(unique2Tab.props.className).toEqual('hidden');
        expect(unique1Tab.props.className).not.toEqual('hidden');
      });

      it('change in other tab', () => {
        instance.setState({
          align: 'right'
        });
        expect(unique1Tab.props.className).toEqual('hidden');
        expect(unique2Tab.props.className).not.toEqual('hidden');
      });
    });

    describe('with onTabChange function', () => {
      let onClick;
      beforeEach(() => {
        onClick = jasmine.createSpy('tab change');
        instance.setState({
          onTabChange: onClick
        });
      });

      it('calls onTabChange function', () => {
        instance.setState({
          selectedTabId: "uniqueid1"
        });
        expect(onClick).toHaveBeenCalledWith('uniqueid1');
      });
    });

    describe('when tab already clicked to new prop', () => {
      it('does not change tab', () => {
        let tabs = TestUtils.findRenderedComponentWithType(instance, Tabs);
        spyOn(tabs, 'updateVisibleTab').and.callThrough();
        let tabHeaders = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-tabs__headers__header')
        TestUtils.Simulate.click(tabHeaders[0], { target: { dataset: { tabid: 'uniqueid1' } } });
        expect(tabs.updateVisibleTab).toHaveBeenCalled();

        tabs.updateVisibleTab.calls.reset();

        instance.setState({
          selectedTabId: "uniqueid1"
        });
        expect(tabs.updateVisibleTab).not.toHaveBeenCalled();
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
      expect(instance.state.tabValidity.toJS()).toEqual({ 'foo': false });
    });
  });

  describe('changeWarning', () => {
    beforeEach(() => {
      instance.setState({ tabWarning: Immutable.fromJS({ 'foo': false })});
      spyOn(instance, 'setState').and.callThrough();
      instance.changeWarning('foo', true);
    });

    it('sets the warning state for the given tab', () => {
      expect(instance.state.tabWarning.toJS()).toEqual({ 'foo': true });
    });
  });

  describe('handleTabClick', () => {
    it('sets the state to the currently selected tabId', () => {
      spyOn(instance, 'handleTabClick');
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];

      expect(secondTab.classList.contains('carbon-tabs__headers__header--selected')).toBeFalsy();

      TestUtils.Simulate.click(secondTab, { target: { dataset: { tabid: 'uniqueid2' } } });


      expect(secondTab.classList.contains('carbon-tabs__headers__header--selected')).toBeTruthy();
    });

    describe('when a changeUrl prop is passed', () => {
      it('doesn\'t set the location', () => {
        let replaceSpy = jasmine.createSpy('replaceState');
        instance._window = {
          history: {
            replaceState: replaceSpy
          },
          location: {
            origin: 'foo',
            pathname: 'bar'
          }
        };
        instance.handleTabClick({ target: { dataset: { tabid: 'foo' }}});
        expect(replaceSpy).not.toHaveBeenCalled();
      });
  
      it('sets the location', () => {
        let clickSpy = jasmine.createSpy('replaceState');
        let instance = TestUtils.renderIntoDocument(
          <Tabs onTabChange={ clickSpy } changeUrl >
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='foo'/>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>
        );
        instance._window = {
          history: {
            replaceState: clickSpy
          },
          location: {
            origin: 'foo',
            pathname: 'bar'
          }
        };
        instance.handleTabClick({ target: { dataset: { tabid: 'foo' }}});
        expect(clickSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#foo');
      });
    });

    describe('when a onTabChange prop is passed', () => {
      it('calls the prop', () => {
        let clickSpy = jasmine.createSpy('tabClick');

        let instance = TestUtils.renderIntoDocument(
          <Tabs onTabChange={ clickSpy } >
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='foo'/>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>
        );

        instance._window = {
          history: {
            replaceState: () => {}
          },
          location: ''
        };

        instance.handleTabClick({ target: { dataset: { tabid: 'foo' }}});
        expect(clickSpy).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the main class for the component', () => {
      expect(instance.mainClasses).toEqual('carbon-tabs carbon-tabs__position-top');
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

        expect(instance.mainClasses).toEqual('carbon-tabs carbon-tabs__position-top 1tab');
      });
    });

    describe('when passing a position prop', () => {
      it('adds it to the classList', () => {
        instance = TestUtils.renderIntoDocument(
          <Tabs position='left'>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='foo'/>
              <Textbox name='bar'/>
            </Tab>
          </Tabs>);

        expect(instance.mainClasses).toEqual('carbon-tabs carbon-tabs__position-left');
      });
    });
  });

  describe('tabsHeaderClasses', () => {
    it('adds a carbon-tabs__headers class to the tab', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      expect(list.classList.contains('carbon-tabs__headers')).toEqual(true);
    });

    it('adds the align className included in the props to the tab', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      expect(list.classList.contains('carbon-tabs__headers--align-left')).toEqual(true);
    });

    it('adds the position className included in the props to the tab', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      expect(list.classList.contains('carbon-tabs__headers')).toEqual(true);
    });
  });

  describe('tabHeaderClasses', () => {
    it('adds a carbon-tabs__header class to the tab', () => {
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.classList.contains('carbon-tabs__headers__header')).toBeTruthy();
    });

    it('adds the className included in the props to the tab', () => {
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.classList.contains('headerClass2')).toBeTruthy();
    });

    it('adds the className included in the props as an array to the tab', () => {
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[2];
      expect(secondTab.classList.contains('headerClass3')).toBeTruthy();
      expect(secondTab.classList.contains('headerClass4')).toBeTruthy();
    });

    it('does not add a selected class to the header', () => {
      let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.classList.contains('carbon-tabs__headers__header--selected')).toBeFalsy();
    });

    describe('when tab is selected tab', () => {
      it('adds a selected class to the header', () => {
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[0];
        expect(secondTab.classList.contains('carbon-tabs__headers__header--selected')).toBeTruthy();
      });
    });

    describe('when tab is inValid', () => {
      it('adds a error class to the header', () => {
        instance.setState({ tabValidity: Immutable.fromJS({ 'uniqueid2': false })});
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
        expect(secondTab.className).toEqual('carbon-tabs__headers__header headerClass2 carbon-tabs__headers__header--error');
      });
    });

    describe('when tab has a warning', () => {
      it('adds a warning class to the header', () => {
        instance.setState({ tabWarning: Immutable.fromJS({ 'uniqueid2': true })});
        let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
        expect(secondTab.className).toEqual('carbon-tabs__headers__header headerClass2 carbon-tabs__headers__header--warning');
      });

      describe('when tab has an error as well', () => {
        it('does not add a warning class', () => {
          instance.setState({ tabWarning: Immutable.fromJS({ 'uniqueid2': true }), tabValidity: Immutable.fromJS({ 'uniqueid2': false }) });
          let secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
          expect(secondTab.classList.contains('carbon-tabs__headers__header--warning')).toBeFalsy();
        });
      });
    });
  });

  describe('tabHeaders', () => {
    it('renders unordered list of headers', () => {
      expect(instance.tabHeaders.type).toBe('ul');
    });

    it('has the role of tablist', () => {
      expect(instance.tabHeaders.props.role).toEqual('tablist');
    });

    it('renders a list item for each tab passed to the tabs', () => {
      expect(instance.tabHeaders.props.children.length).toEqual(3);
    });

    it('adds a data-tabid to each list item', () => {
      expect(instance.tabHeaders.props.children[0].props['data-tabid']).toEqual('uniqueid1');
    });

    it('adds a role of tab to each list item', () => {
      expect(instance.tabHeaders.props.children[0].props.role).toEqual('tab');
    });

    it('sets aria-selected to true for the selected tab', () => {
      expect(instance.tabHeaders.props.children[0].props['aria-selected']).toBeTruthy();
      expect(instance.tabHeaders.props.children[1].props['aria-selected']).toBeFalsy();
      expect(instance.tabHeaders.props.children[2].props['aria-selected']).toBeFalsy();
    });

    describe('when passed a null child', () => {
      it('ignores the null child', () => {
        let headers = TestUtils.scryRenderedDOMComponentsWithClass(instanceWithNull, 'carbon-tabs__headers__header')
        expect(headers.length).toEqual(1);
      });
    });

    describe('when there is only one child', () => {
      it('renders a single header', () => {
        let headers = TestUtils.scryRenderedDOMComponentsWithClass(instanceOneChild, 'carbon-tabs__headers__header')
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
        expect(headers.className).toEqual('carbon-tabs__headers carbon-tabs__headers--align-right carbon-tabs__headers');
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
      expect(instance.visibleTab.props.className).toEqual('carbon-tab--selected');
    });
  });

  describe('tabs', () => {
    describe('when renderHiddenTabs is set to true', () => {
      it('returns an array of all child components', () => {
        expect(instance.tabs.length).toEqual(3);
      });

      it('adds a selected class to the visible tab', () => {
        expect(instance.tabs[0].props.className).toEqual('carbon-tab--selected');
      });

      it('adds a hidden class to all other tabs', () => {
        expect(instance.tabs[1].props.className).toEqual('hidden');
      });

      describe('when passed a null child', () => {
        it('ignores the null child', () => {
          let tabs = TestUtils.scryRenderedDOMComponentsWithClass(instanceWithNull, 'carbon-tab')
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
        let tabs = TestUtils.scryRenderedDOMComponentsWithClass(instanceOneChild, 'carbon-tab')
        expect(tabs.length).toEqual(1);
      });
    });
  });

  describe('render', () => {
    it('creates a parent div for the component', () => {
      let div = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(div.className).toEqual('carbon-tabs carbon-tabs__position-top');
    });

    it('renders the tab headers', () => {
      let list = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
      let items = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
      expect(list.className).toEqual('carbon-tabs__headers carbon-tabs__headers--align-left carbon-tabs__headers');
      expect(items.length).toEqual(3);
    });
  });

  describe("handleTabClick() tab trigger isn't going to happen on any keypress", () => {
    it("doesn't trigger", () => {
      let ev = {
        which: 1,
        type: 'keydown',
        target: {
          dataset: {}
        }
      };
      spyOn(instance, 'updateVisibleTab');
      instance.handleTabClick(ev);
      expect(instance.updateVisibleTab).not.toHaveBeenCalled();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Tabs data-element='bar' data-role='baz'><Tab tabId='1' title='Test' /></Tabs>);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'tabs', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Tabs><Tab tabId='2' title='Test' /></Tabs>);

      elementsTagTest(wrapper, [
        'select-tab'
      ]);
    });
  });

  describe('Keyboard navigation', () => {
    let wrapper, replaceSpy

    describe('when the orientation is horizontal', () => {
      beforeEach(() => {
        wrapper = mount(
          <Tabs>
            <Tab tabId='tab1' title='Test 1' />
            <Tab tabId='tab2' title='Test 2' />
            <Tab tabId='tab3' title='Test 3' />
          </Tabs>
        );
        replaceSpy = jest.fn();
        wrapper.instance()._window = {
          history: {
            replaceState: replaceSpy
          },
          location: {
            origin: 'foo',
            pathname: 'bar'
          }
        };
      });

      describe('when pressing the right arrow', () => {
        describe('when a changeUrl prop is true', () => {
          it('focuses on the next right tab and loops back round to the first tab', () => {
            wrapper.setState({ selectedTabId: "tab1" });
            wrapper.setProps({ changeUrl: true });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab3');
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(3);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
          });
        });

        describe('when a changeUrl prop is false', () => {
          it('focuses on the next right tab and loops back round to the first tab', () => {
            wrapper.setState({ selectedTabId: "tab1" });
            wrapper.setProps({ changeUrl: false });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            expect(replaceSpy).not.toHaveBeenCalled();
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            expect(replaceSpy).not.toHaveBeenCalled();
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(0);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
          });
        });
      });

      describe('when pressing the left arrow', () => {
        describe('when a changeUrl prop is true', () => {
          it('focuses on the next left tab and loops back round to the last tab', () => {
            wrapper.setState({ selectedTabId: "tab3" });
            wrapper.setProps({ changeUrl: true });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {}}
            );
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {}}
            );
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab1');
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(3);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
          });
        });

        describe('when a changeUrl prop is false', () => {
          it('focuses on the next left tab and loops back round to the last tab', () => {
            wrapper.setState({ selectedTabId: "tab3" });
            wrapper.setProps({ changeUrl: false });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {}}
            );
            expect(replaceSpy).not.toHaveBeenCalled();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {}}
            );
            expect(replaceSpy).not.toHaveBeenCalled();
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(0);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
          });
        });
      });

      describe('when pressing the up key', () => {
        it('doesnt do anything', () => {
          wrapper.find('.carbon-tabs__headers__header--selected').simulate(
            'keyDown', { key: 'UpArrow', which: 38, stopPropagation: () => {}}
          );
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });

      describe('when pressing the down key', () => {
        it('doesnt do anything', () => {
          wrapper.find('.carbon-tabs__headers__header--selected').simulate(
            'keyDown', { key: 'DownArrow', which: 40, stopPropagation: () => {}}
          );
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the orientation is vertical', () => {
      beforeEach(() => {
        wrapper = mount(
          <Tabs position='left'>
            <Tab tabId='tab1' title='Test 1' />
            <Tab tabId='tab2' title='Test 2' />
            <Tab tabId='tab3' title='Test 3' />
          </Tabs>
        );
        replaceSpy = jest.fn();
        wrapper.instance()._window = {
          history: {
            replaceState: replaceSpy
          },
          location: {
            origin: 'foo',
            pathname: 'bar'
          }
        };
      });

      describe('when pressing the down arrow', () => {
        describe('when a changeUrl prop is true', () => {
          it('focuses on the next below tab and loops back round to the top tab', () => {
            wrapper.setState({ selectedTabId: "tab1" });
            wrapper.setProps({ changeUrl: true });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab3');
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(3);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
          });
        });

        describe('when a changeUrl prop is false', () => {
          it('focuses on the next below tab and loops back round to the top tab', () => {
            wrapper.setState({ selectedTabId: "tab1" });
            wrapper.setProps({ changeUrl: false });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            expect(replaceSpy).not.toHaveBeenCalled();
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {}}
            );
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            expect(replaceSpy).not.toHaveBeenCalled();
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(0);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1')
          });
        });
      });

      describe('when pressing the up arrow', () => {
        describe('when a changeUrl prop is true', () => {
          it('focuses on the next above tab and loops back round to the bottom tab', () => {
            wrapper.setState({ selectedTabId: "tab3" });
            wrapper.setProps({ changeUrl: true });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {}}
            );
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {}}
            );
            expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab1');
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(3);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
          });
        });

        describe('when a changeUrl prop is false', () => {
          it('focuses on the next above tab and loops back round to the bottom tab', () => {
            wrapper.setState({ selectedTabId: "tab3" });
            wrapper.setProps({ changeUrl: false });
            wrapper.find('.carbon-tabs__headers__header--selected').instance().focus();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {}}
            );
            expect(replaceSpy).not.toHaveBeenCalled();
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2')
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {}}
            );
            expect(replaceSpy).not.toHaveBeenCalled();
            wrapper.find('.carbon-tabs__headers__header--selected').simulate(
              'keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {}}
            );
            expect(replaceSpy.mock.calls.length).toEqual(0);
            expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3')
          });
        });
      });

      describe('when pressing the left key', () => {
        it('doesnt do anything', () => {
          wrapper.find('.carbon-tabs__headers__header--selected').simulate(
            'keyDown', { key: 'LeftArrow', which: 37, stopPropagation: () => {}}
          );
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });

      describe('when pressing the right key', () => {
        it('doesnt do anything', () => {
          wrapper.find('.carbon-tabs__headers__header--selected').simulate(
            'keyDown', { key: 'RightArrow', which: 39, stopPropagation: () => {}}
          );
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
