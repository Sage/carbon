import React from 'react';
import TestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Tab from './tab.component';
import StyledTab from './tab.style';
import Textbox from '../../textbox';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

function render(props) {
  return shallow(
    <Tab
      title='Tab Title 1' tabId='uniqueid1'
      { ...props }
    >
      <p>TabContent 1</p>
      <p>TabContent 2</p>
    </Tab>
  );
}

function renderStyles(props) {
  return TestRenderer.create(
    <StyledTab
      title='Tab Title 1'
      dataTabId='uniqueid1'
      { ...props }
    />
  );
}

describe('Tab', () => {
  let wrapper;
  it('has display property equals to none', () => {
    wrapper = renderStyles();
    assertStyleMatch(
      {
        display: 'none'
      },
      wrapper.toJSON()
    );
  });

  it('renders its children correctly', () => {
    expect(render().children()).toHaveLength(2);
  });

  it('contains custom className if passed as a prop', () => {
    wrapper = render({ className: 'class' });
    expect(wrapper.find('.class').exists()).toEqual(true);
  });

  it('has a default role if not set', () => {
    wrapper = render();
    expect(wrapper.find("[role='tabpanel']").exists()).toEqual(true);
  });

  it('has a custom role if provided', () => {
    wrapper = render({ role: 'anotherRole' });
    expect(wrapper.find("[role='anotherRole']").exists()).toEqual(true);
  });

  it('sets the aria-labelledby based on ariaLabelledBy prop', () => {
    wrapper = render({ ariaLabelledby: 'ariaLabelledby' });
    expect(wrapper.find("[aria-labelledby='ariaLabelledby']").exists()).toEqual(true);
  });

  describe('when a tab is selected', () => {
    it('applies display block property', () => {
      wrapper = renderStyles({
        isTabSelected: true
      });

      assertStyleMatch(
        {
          display: 'block'
        },
        wrapper.toJSON()
      );
    });

    describe('when position prop is set to left and the tab is selected', () => {
      it('applies width of 80%', () => {
        wrapper = renderStyles({
          isTabSelected: true,
          position: 'left'
        });
        assertStyleMatch(
          {
            width: '80%'
          },
          wrapper.toJSON()
        );
      });
    });
  });

  describe('Tab validation', () => {
    let instance;

    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Tab
          title='Tab Title 1' tabId='uniqueid1'
          id='uniqueid1'
        >
          <Textbox name='foo' />
          <Textbox name='bar' />
        </Tab>
      );
    });

    describe('setValidity', () => {
      it('calls the parent tab context with the new state', () => {
        const spy = jasmine.createSpy('spy');
        instance.context = { tabs: { changeValidity: spy } };
        instance.setValidity(false);

        expect(spy).toHaveBeenCalledWith(instance.props.id, false);
      });
    });

    describe('setWarning', () => {
      it('calls the parent tab context with the new state', () => {
        const spy = jasmine.createSpy('spy');
        instance.context = { tabs: { changeWarning: spy } };
        instance.setWarning(true);

        expect(spy).toHaveBeenCalledWith(instance.props.id, true);
      });
    });
  });
});
