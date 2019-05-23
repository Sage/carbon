import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { Tabs, Tab } from './tabs.component';
import Textbox from '../textbox';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Browser from '../../utils/helpers/browser';
import TabsHeader from './tabs-header/tabs-header.component';
import StyledTabs from './tabs.style';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import TabTitle from './tab-title/tab-title.component';

function render(props) {
  return shallow(
    <Tabs { ...props }>
      <Tab title='Tab Title 1' tabId='uniqueid1'>
        TabContent
      </Tab>
      <Tab title='Tab Title 2' tabId='uniqueid2'>
        TabContent
      </Tab>
      <Tab title='Tab Title 3' tabId='uniqueid3'>
        TabContent
      </Tab>
    </Tabs>
  );
}

function renderStyles(props) {
  return TestRenderer.create(<StyledTabs { ...props } />);
}

describe('Tabs', () => {
  let instance;
  const instanceWithNull = TestUtils.renderIntoDocument(
    <Tabs renderHiddenTabs={ false }>
      {null}
      <Tab title='Tab Title 1' tabId='uniqueid1'>
        <Textbox name='foo' />
        <Textbox name='bar' />
      </Tab>
    </Tabs>
  );

  const instanceOneChild = TestUtils.renderIntoDocument(
    <Tabs renderHiddenTabs={ false }>
      <Tab title='Tab Title 1' tabId='uniqueid1'>
        <Textbox name='foo' />
        <Textbox name='bar' />
      </Tab>
    </Tabs>
  );

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Tabs>
        <Tab
          title='Tab Title 1' tabId='uniqueid1'
          className='class1' headerClassName='headerClass1'
        >
          <Textbox name='foo' />
          <Textbox name='bar' />
        </Tab>
        <Tab
          title='Tab Title 2' tabId='uniqueid2'
          className='class2' headerClassName='headerClass2'
        >
          <Textbox name='baz' />
          <Textbox name='bax' />
        </Tab>
        <Tab
          title='Tab Title 3'
          tabId='uniqueid3'
          className='class3 class4'
          headerClassName='headerClass3 headerClass4'
        >
          <Textbox name='bar' />
          <Textbox name='bap' />
        </Tab>
      </Tabs>
    );
    instance._window = {
      history: {
        replaceState: () => {}
      },
      location: ''
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
                <Textbox name='foo' />
                <Textbox name='bar' />
              </Tab>
              <Tab title='Tab Title 2' tabId='uniqueid2'>
                <Textbox name='baz' />
                <Textbox name='bax' />
              </Tab>
            </Tabs>
          );
          instance._window = { location: '#uniqueid1' };

          expect(instance.state.selectedTabId).toEqual('uniqueid2');
        });
      });

      describe('detects a hash', () => {
        beforeEach(() => {
          instance = TestUtils.renderIntoDocument(
            <Tabs>
              <Tab title='Tab Title 1' tabId='uniqueid1'>
                <Textbox name='foo' />
                <Textbox name='bar' />
              </Tab>
              <Tab title='Tab Title 2' tabId='uniqueid2'>
                <Textbox name='baz' />
                <Textbox name='bax' />
              </Tab>
            </Tabs>
          );
        });

        it('matches the hash so uses the tab', () => {
          instance._window = { location: { hash: '#uniqueid2' } };
          instance.componentWillMount();
          expect(instance.state.selectedTabId).toEqual('uniqueid2');
        });

        it('does not match the hash so uses first tab', () => {
          instance._window = { location: { hash: '#foo' } };
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
    let tabs, unique1Tab, unique2Tab;
    beforeEach(() => {
      spyOn(Browser, 'getWindow').and.returnValue({
        history: {
          replaceState: () => {}
        },
        location: ''
      });
      class DummyComponent extends React.Component {
        state = {
          selectedTabId: 'uniqueid2',
          align: 'left'
        };

        render() {
          return (
            <Tabs { ...this.state }>
              <Tab title='Tab Title 1' tabId='uniqueid1'>
                <Textbox name='foo' />
                <Textbox name='bar' />
              </Tab>
              <Tab title='Tab Title 2' tabId='uniqueid2'>
                <Textbox name='baz' />
                <Textbox name='bax' />
              </Tab>
            </Tabs>
          );
        }
      }

      const TestParent = React.createFactory(DummyComponent);
      instance = TestUtils.renderIntoDocument(TestParent());
      tabs = TestUtils.scryRenderedComponentsWithType(instance, Tab);
      unique1Tab = tabs[0];
      unique2Tab = tabs[1];
      expect(unique1Tab.props.isTabSelected).toEqual(false);
      expect(unique2Tab.props.isTabSelected).toEqual(true);
    });

    describe('without noTabChange function', () => {
      it('changes tab to current prop', () => {
        instance.setState({
          selectedTabId: 'uniqueid1'
        });
        expect(unique2Tab.props.isTabSelected).toEqual(false);
        expect(unique1Tab.props.isTabSelected).toEqual(true);
      });

      it('change in other tab', () => {
        instance.setState({
          align: 'right'
        });
        expect(unique1Tab.props.isTabSelected).toEqual(false);
        expect(unique2Tab.props.isTabSelected).not.toEqual(false);
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
          selectedTabId: 'uniqueid1'
        });
        expect(onClick).toHaveBeenCalledWith('uniqueid1');
      });
    });

    describe('when tab already clicked to new prop', () => {
      it('does not change tab', () => {
        tabs = TestUtils.findRenderedComponentWithType(instance, Tabs);
        spyOn(tabs, 'updateVisibleTab').and.callThrough();
        const tabHeaders = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
        TestUtils.Simulate.click(tabHeaders[0], { target: { dataset: { tabid: 'uniqueid1' } } });
        expect(tabs.updateVisibleTab).toHaveBeenCalled();

        tabs.updateVisibleTab.calls.reset();

        instance.setState({
          selectedTabId: 'uniqueid1'
        });
        expect(tabs.updateVisibleTab).not.toHaveBeenCalled();
      });
    });
  });

  describe('changeValidity', () => {
    beforeEach(() => {
      instance.setState({ tabValidity: Immutable.fromJS({ foo: true }) });
      spyOn(instance, 'setState').and.callThrough();
      instance.changeValidity('foo', false);
    });

    it('sets the validity state for the given tab', () => {
      expect(instance.state.tabValidity.toJS()).toEqual({ foo: false });
    });
  });

  describe('changeWarning', () => {
    beforeEach(() => {
      instance.setState({ tabWarning: Immutable.fromJS({ foo: false }) });
      spyOn(instance, 'setState').and.callThrough();
      instance.changeWarning('foo', true);
    });

    it('sets the warning state for the given tab', () => {
      expect(instance.state.tabWarning.toJS()).toEqual({ foo: true });
    });
  });

  describe('tabValidity', () => {
    describe('when tab has a warning', () => {
      it('adds a warning class to the header', () => {
        const wrapper = render();
        wrapper.setState({ tabWarning: Immutable.fromJS({ uniqueid2: true }) });
        const secondTab = wrapper.find({ id: 'uniqueid2-tab' });
        expect(secondTab.props().tabHasWarning).toEqual(true);
      });

      describe('when tab has an error as well', () => {
        it('does not add a warning class', () => {
          const wrapper = render();
          wrapper.setState({
            tabWarning: Immutable.fromJS({ uniqueid2: true }),
            tabValidity: Immutable.fromJS({ uniqueid2: false })
          });
          const secondTab = wrapper.find({ id: 'uniqueid2-tab' });
          expect(secondTab.props().tabHasWarning).toEqual(false);
        });
      });
    });
  });

  describe('handleTabClick', () => {
    it('sets the state to the currently selected tabId', () => {
      spyOn(instance, 'handleTabClick');
      const secondTab = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li')[1];
      expect(secondTab.attributes['aria-selected'].value).toEqual('false');
      TestUtils.Simulate.click(secondTab, { target: { dataset: { tabid: 'uniqueid2' } } });
      expect(secondTab.attributes['aria-selected'].value).toEqual('true');
    });

    it('sets the location', () => {
      const replaceSpy = jasmine.createSpy('replaceState');
      instance._window = {
        history: {
          replaceState: replaceSpy
        },
        location: {
          origin: 'foo',
          pathname: 'bar'
        }
      };
      instance.handleTabClick({ target: { dataset: { tabid: 'foo' } } });
      expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#foo');
    });

    describe('when a onTabChange prop is passed', () => {
      it('calls the prop', () => {
        const clickSpy = jasmine.createSpy('tabClick');

        instance = TestUtils.renderIntoDocument(
          <Tabs onTabChange={ clickSpy }>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <Textbox name='foo' />
              <Textbox name='bar' />
            </Tab>
          </Tabs>
        );

        instance._window = {
          history: {
            replaceState: () => {}
          },
          location: ''
        };

        instance.handleTabClick({ target: { dataset: { tabid: 'foo' } } });
        expect(clickSpy).toHaveBeenCalledWith('foo');
      });
    });
  });

  describe('when passing custom className as a prop', () => {
    it('adds it to the classList', () => {
      const wrapper = render({ className: 'class' });
      expect(wrapper.exists('.class')).toEqual(true);
    });
  });

  describe('when passing a position prop set to left', () => {
    it('applies proper styling', () => {
      const wrapper = renderStyles({ position: 'left' });
      assertStyleMatch(
        {
          display: 'flex',
          width: '100%',
          marginTop: '0'
        },
        wrapper.toJSON()
      );
    });
  });

  describe('visibleTab', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Tabs renderHiddenTabs={ false }>
          <Tab title='Tab Title 1' tabId='uniqueid1'>
            <Textbox name='foo' />
            <Textbox name='bar' />
          </Tab>
          <Tab title='Tab Title 2' tabId='uniqueid2'>
            <Textbox name='baz' />
            <Textbox name='bax' />
          </Tab>
        </Tabs>
      );
    });

    it('returns the currently visible tab', () => {
      const tab = instance.visibleTab;
      expect(tab.props.title).toEqual('Tab Title 1');
      expect(tab.props.tabId).toEqual('uniqueid1');
    });

    it('sets isTabSelected to true', () => {
      expect(instance.visibleTab.props.isTabSelected).toEqual(true);
    });
  });

  describe('tabs', () => {
    describe('when renderHiddenTabs is set to true', () => {
      it('returns an array of all child components', () => {
        expect(instance.tabs.length).toEqual(3);
      });

      it('adds a selected prop equal true to the visible tab', () => {
        expect(instance.tabs[0].props.isTabSelected).toEqual(true);
      });

      it('does not add selected prop equal true to all other tabs', () => {
        expect(instance.tabs[1].props.isTabSelected).toEqual(false);
      });

      describe('when passed a null child', () => {
        it('ignores the null child', () => {
          const wrapper = shallow(
            <Tabs>
              <Tab title='title-1' tabId='tabId-1' />
              <Tab title='title-2' tabId='tabId-2' />
              {null}
            </Tabs>
          );

          expect(wrapper.find(Tab)).toHaveLength(2);
          expect(wrapper.children()).toHaveLength(3);
        });
      });
    });

    describe('when renderHiddenTabs is set to false', () => {
      it('returns a single child tab component', () => {
        const wrapper = render({ renderHiddenTabs: false });
        expect(wrapper.find(Tab)).toHaveLength(1);
        expect(wrapper.children()).toHaveLength(2);
      });
    });

    describe('when there is one child', () => {
      it('renders the only child', () => {
        const wrapper = shallow(
          <Tabs renderHiddenTabs={ false }>
            <Tab title='title' tabId='tabId-1' />
          </Tabs>
        );
        expect(wrapper.find(Tab)).toHaveLength(1);
        expect(wrapper.children()).toHaveLength(2);
      });
    });
  });

  describe('when rendered', () => {
    it('renders its children and tabsHeader', () => {
      const wrapper = render();
      expect(wrapper.children()).toHaveLength(4);
      expect(wrapper.children().find(Tab)).toHaveLength(3);
      expect(wrapper.children().find(TabsHeader)).toHaveLength(1);
    });
  });

  describe("handleTabClick() tab trigger isn't going to happen on any keypress", () => {
    it("doesn't trigger", () => {
      const ev = {
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

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(
        <Tabs data-element='bar' data-role='baz'>
          <Tab tabId='1' title='Test' />
        </Tabs>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'tabs', 'bar', 'baz');
      });
    });
  });

  describe('Keyboard navigation', () => {
    let wrapper, replaceSpy;

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
        it('focuses on the next right tab and loops back round to the first tab', () => {
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .instance()
            .focus();
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {} });
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2');
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {} });
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3');
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab3');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowRight', which: 39, stopPropagation: () => {} });
          expect(replaceSpy.mock.calls.length).toEqual(3);
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1');
        });
      });

      describe('when pressing the left arrow', () => {
        it('focuses on the next left tab and loops back round to the last tab', () => {
          wrapper.setState({ selectedTabId: 'tab3' });
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .instance()
            .focus();
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {} });
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {} });
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab1');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowLeft', which: 37, stopPropagation: () => {} });
          expect(replaceSpy.mock.calls.length).toEqual(3);
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3');
        });
      });

      describe('when pressing the up key', () => {
        it('doesnt do anything', () => {
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'UpArrow', which: 38, stopPropagation: () => {} });
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });

      describe('when pressing the down key', () => {
        it('doesnt do anything', () => {
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'DownArrow', which: 40, stopPropagation: () => {} });
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
        it('focuses on the next below tab and loops back round to the top tab', () => {
          wrapper.setState({ selectedTabId: 'tab1' });
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .instance()
            .focus();
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {} });
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2');
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {} });
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3');
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab3');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowDown', which: 40, stopPropagation: () => {} });
          expect(replaceSpy.mock.calls.length).toEqual(3);
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab1');
        });
      });

      describe('when pressing the up arrow', () => {
        it('focuses on the next above tab and loops back round to the bottom tab', () => {
          wrapper.setState({ selectedTabId: 'tab3' });
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .instance()
            .focus();
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {} });
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab2');
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab2');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {} });
          expect(replaceSpy).toHaveBeenCalledWith(null, 'change-tab', 'foobar#tab1');
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'ArrowUp', which: 38, stopPropagation: () => {} });
          expect(replaceSpy.mock.calls.length).toEqual(3);
          expect(Browser.getActiveElement().getAttribute('data-tabid')).toEqual('tab3');
        });
      });

      describe('when pressing the left key', () => {
        it('doesnt do anything', () => {
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'LeftArrow', which: 37, stopPropagation: () => {} });
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });

      describe('when pressing the right key', () => {
        it('doesnt do anything', () => {
          wrapper
            .find(TabTitle)
            .find({ isTabSelected: true })
            .find('li')
            .simulate('keyDown', { key: 'RightArrow', which: 39, stopPropagation: () => {} });
          expect(replaceSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
