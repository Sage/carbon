/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Tabs, Tab } from './tabs.component';
import { TabContext } from './tab/index';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs/tags-specs';
import StyledTabs from './tabs.style';
import { assertStyleMatch, simulate } from '../../../__spec_helper__/test-utils';
import TabTitle from './tab-title/tab-title.component';

function render(props) {
  return mount(
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
  return mount(<StyledTabs { ...props } />);
}

const TabChildren = ({
  id, error, warning, text
}) => {
  const context = useContext(TabContext);

  useEffect(() => {
    context.setError(id, !!error);
    context.setWarning(id, !!warning);
  }, [id, context, error, warning]);

  return (
    <div style={ { height: '28px', width: '50px', backgroundColor: 'pink' } }>
      {text}
    </div>
  );
};

const MockWrapper = ({ errors = {}, warnings = {} }) => {
  return (
    <Tabs>
      <Tab title='Tab Title 1' tabId='uniqueid1'>
        <TabChildren
          error={ errors.one } warning={ warnings.one }
          id='foo'
        />
        <TabChildren
          error={ errors.two } warning={ warnings.two }
          id='bar'
        />
      </Tab>
      <Tab title='Tab Title 2' tabId='uniqueid2'>
        <TabChildren
          error={ errors.three } warning={ warnings.three }
          id='baz'
        />
        <TabChildren
          error={ errors.four } warning={ warnings.four }
          id='bax'
        />
      </Tab>
    </Tabs>
  );
};

describe('Tabs', () => {
  describe('when passing custom className as a prop', () => {
    it('adds it to the classList', () => {
      const wrapper = render({ className: 'class' });
      expect(wrapper.exists('.class')).toEqual(true);
    });
  });

  describe('When position is "left"', () => {
    it('applies proper styling', () => {
      const wrapper = renderStyles({ position: 'left' });
      assertStyleMatch(
        {
          display: 'flex',
          width: '100%',
          marginTop: '0'
        },
        wrapper
      );
    });
  });

  describe('When "selectedTabId" is passed a valid "tabId"', () => {
    it('displays the specified Tab', () => {
      const wrapper = render({ selectedTabId: 'uniqueid2' });
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
    });
  });

  describe('When renderHiddenTabs', () => {
    describe('is false', () => {
      it('renders only the currently visible tab', () => {
        const tab = mount(
          <Tabs renderHiddenTabs={ false }>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <div name='foo' />
              <div name='bar' />
            </Tab>
            <Tab title='Tab Title 2' tabId='uniqueid2'>
              <div name='baz' />
              <div name='bax' />
            </Tab>
            <Tab title='Tab Title 3' tabId='uniqueid3'>
              <div name='baz' />
              <div name='bax' />
            </Tab>
          </Tabs>
        ).find(Tab);

        expect(tab).toHaveLength(1);
        expect(tab.props().isTabSelected).toEqual(true);
        expect(tab.props().title).toEqual('Tab Title 1');
        expect(tab.props().tabId).toEqual('uniqueid1');
      });
    });

    describe('is true', () => {
      it('returns an array of all Tab components with the first selected', () => {
        const tabs = mount(
          <Tabs renderHiddenTabs>
            <Tab title='Tab Title 1' tabId='uniqueid1'>
              <div name='foo' />
              <div name='bar' />
            </Tab>
            <Tab title='Tab Title 2' tabId='uniqueid2'>
              <div name='baz' />
              <div name='bax' />
            </Tab>
            <Tab title='Tab Title 3' tabId='uniqueid3'>
              <div name='baz' />
              <div name='bax' />
            </Tab>
          </Tabs>
        ).find(Tab);

        expect(tabs).toHaveLength(3);
        expect(tabs.at(0).props().isTabSelected).toEqual(true);
        expect(tabs.at(1).props().isTabSelected).toEqual(false);
        expect(tabs.at(2).props().isTabSelected).toEqual(false);
      });
    });
  });

  describe('When a TabTitle has click event', () => {
    it('does nothing if triggered by keydown', () => {
      const wrapper = render();
      act(() => {
        wrapper.find(TabTitle).at(1).props().onClick({ type: 'keydown', target: { dataset: { tabid: 'uniqueid2' } } });
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(false);
    });

    it('updates to make the associated Tab visible', () => {
      const wrapper = render({ setLocation: false });
      act(() => {
        wrapper.find(TabTitle).at(1).props().onClick({ type: 'click', target: { dataset: { tabid: 'uniqueid2' } } });
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(1).props().isTabSelected).toEqual(true);
    });

    it('calls the "onTabChange" callback if one is passed', () => {
      const onTabChange = jest.fn();
      const wrapper = render({ onTabChange });
      act(() => {
        wrapper.find(TabTitle).at(1).props().onClick({ type: 'click', target: { dataset: { tabid: 'uniqueid2' } } });
      });
      wrapper.update();
      expect(onTabChange).toHaveBeenCalledWith('uniqueid2');
    });
  });

  describe('When a TabTitle has a keydown event', () => {
    describe('and the component has position "top" (default)', () => {
      it.each([0, 1, 2])('updates to make the associated Tab visible when the right key is pressed', (index) => {
        const wrapper = render();
        act(() => {
          simulate.keydown.pressRightArrow(wrapper.find(TabTitle).at(index));
        });
        wrapper.update();
        const newIndex = index === 2 ? 0 : index + 1;
        expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(true);
      });

      it.each([0, 2, 1])('updates to make the associated Tab visible when the left key is pressed', (index) => {
        const wrapper = render();
        act(() => {
          simulate.keydown.pressLeftArrow(wrapper.find(TabTitle).at(index));
        });
        wrapper.update();
        const newIndex = index === 0 ? 2 : index - 1;
        expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(true);
      });
    });

    describe('and the component has position "left"', () => {
      it.each([0, 1, 2])('updates to make the associated Tab visible when the down key is pressed', (index) => {
        const wrapper = render({ position: 'left' });
        act(() => {
          simulate.keydown.pressDownArrow(wrapper.find(TabTitle).at(index));
        });
        wrapper.update();
        const newIndex = index === 2 ? 0 : index + 1;
        expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(true);
      });

      it.each([0, 2, 1])('updates to make the associated Tab visible when the up key is pressed', (index) => {
        const wrapper = render({ position: 'left' });
        act(() => {
          simulate.keydown.pressUpArrow(wrapper.find(TabTitle).at(index));
        });
        wrapper.update();
        const newIndex = index === 0 ? 2 : index - 1;
        expect(wrapper.find(Tab).at(newIndex).props().isTabSelected).toEqual(true);
      });
    });

    it.each([0, 1, 2])('does nothing if key is not an arrow key', (index) => {
      const wrapper = render();
      act(() => {
        simulate.keydown.pressD(wrapper.find(TabTitle).at(index));
      });
      wrapper.update();
      expect(wrapper.find(Tab).at(0).props().isTabSelected).toEqual(true);
    });
  });

  describe('With one Tab', () => {
    it('renders as the visible tab', () => {
      const tab = mount(
        <Tabs renderHiddenTabs={ false }>
          <Tab title='Tab Title 1' tabId='uniqueid1'>
            <div />
          </Tab>
        </Tabs>
      ).find(Tab);

      expect(tab.props().isTabSelected).toEqual(true);
      expect(tab.props().title).toEqual('Tab Title 1');
      expect(tab.props().tabId).toEqual('uniqueid1');
    });
  });

  describe('Validation', () => {
    const updateProps = (wrapper, props) => {
      wrapper.setProps({
        errors: { ...wrapper.props().errors, ...props.errors },
        warnings: { ...wrapper.props().warnings, ...props.warnings }
      });
      wrapper.update();
    };

    describe('When a Tab child has an error', () => {
      it('sets "tabHasError" to false when a Tab has no errors', () => {
        const tabTitle = mount(
          <MockWrapper />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasError).toEqual(false);
        expect(tabTitle.at(1).props().tabHasError).toEqual(false);
      });

      it('sets "tabHasError" to true when a Tab has errors', () => {
        const tabTitle = mount(
          <MockWrapper errors={ { one: true } } />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasError).toEqual(true);
        expect(tabTitle.at(1).props().tabHasError).toEqual(false);
      });

      it('sets "tabHasError" to true for any Tab that has an error', () => {
        const tabTitle = mount(
          <MockWrapper errors={ { one: true, three: true } } />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasError).toEqual(true);
        expect(tabTitle.at(1).props().tabHasError).toEqual(true);
      });

      it('maintains "tabHasError" status when Tab children update', () => {
        const wrapper = mount(
          <MockWrapper errors={ { one: true, three: true } } />
        );
        updateProps(wrapper, { errors: { two: true, three: false } });
        let tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().tabHasError).toEqual(true);
        expect(tabTitle.at(1).props().tabHasError).toEqual(false);
        updateProps(wrapper, { errors: { one: false, two: false } });
        tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().tabHasError).toEqual(false);
      });
    });

    describe('When a Tab child has an error and a warning', () => {
      it('sets "tabHasWarning" to false when a Tab has no warnings', () => {
        const tabTitle = mount(
          <MockWrapper />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasWarning).toEqual(false);
        expect(tabTitle.at(1).props().tabHasWarning).toEqual(false);
      });

      it('does not set "tabHasWarning" when "tabHasError" is true', () => {
        const tabTitle = mount(
          <MockWrapper errors={ { one: true } } warnings={ { one: true } } />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasError).toEqual(true);
        expect(tabTitle.at(0).props().tabHasWarning).toEqual(false);
      });
    });

    describe('When a Tab child has a warning and no errors', () => {
      it('sets "tabHasWarning" is true and "tabHasError" is falsy', () => {
        const tabTitle = mount(
          <MockWrapper warnings={ { one: true } } />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasWarning).toEqual(true);
        expect(tabTitle.at(1).props().tabHasWarning).toEqual(false);
      });

      it('sets "tabHasWarning" for each Tab that has warning and "tabHasError" is falsy', () => {
        const tabTitle = mount(
          <MockWrapper warnings={ { one: true, three: true } } />
        ).find(TabTitle);

        expect(tabTitle.at(0).props().tabHasWarning).toEqual(true);
        expect(tabTitle.at(1).props().tabHasWarning).toEqual(true);
      });

      it('maintains "tabHasWarning" status when Tab children update', () => {
        const wrapper = mount(
          <MockWrapper warnings={ { one: true, three: true } } />
        );
        updateProps(wrapper, { warnings: { two: true, three: false } });
        let tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().tabHasWarning).toEqual(true);
        expect(tabTitle.at(1).props().tabHasWarning).toEqual(false);
        updateProps(wrapper, { warnings: { one: false, two: false } });
        tabTitle = wrapper.find(TabTitle);
        expect(tabTitle.at(0).props().tabHasWarning).toEqual(false);
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(
        <Tabs data-element='bar' data-role='baz'>
          <Tab tabId='1' title='Test' />
        </Tabs>
      ).find(StyledTabs);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'tabs', 'bar', 'baz');
      });
    });
  });
});
