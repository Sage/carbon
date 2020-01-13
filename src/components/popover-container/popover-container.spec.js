import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  PopoverContainerIcon,
  PopoverContainerContentStyle,
  PopoverContainerCloseIcon
} from './popover-container.style';
import PopoverContainer from './popover-container.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

describe('PopoverContainer', () => {
  jest.useFakeTimers();
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<PopoverContainer
      title='Popover Container Settings'
      iconType='settings'
    />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it('should render correct', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should open the popover container on click', () => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onAction();
    });

    wrapper.update();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(true);
  });

  it.each([
    ['enter', 13, true],
    ['space', 32, true]
  ])('should open the popover container if %s clicked', (keyname, keycode, expected) => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onAction({ which: keycode });
    });

    wrapper.update();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(expected);
  });

  it('should close the popover popover container if close Icon clicked', () => {
    act(() => {
      wrapper = mount(<PopoverContainer
        title='Popover Container Settings'
        iconType='settings'
      />);

      wrapper.find(PopoverContainerIcon).props().onAction();
    });

    wrapper.update();

    act(() => {
      wrapper.find(PopoverContainerCloseIcon).props().onAction();
      jest.runAllTimers();
    });

    wrapper.update();
    expect(wrapper.find(PopoverContainerContentStyle).exists()).toBe(false);
    jest.clearAllTimers();
  });
});

describe('PopoverContainerContentStyle', () => {
  it('should render to the left if position is set to `left`', () => {
    const wrapper = mount(<PopoverContainerContentStyle position='left' />);
    assertStyleMatch({
      right: '0'
    }, wrapper);
  });

  it('should render to the right by default', () => {
    const wrapper = mount(<PopoverContainerContentStyle />);
    assertStyleMatch({
      left: '0'
    }, wrapper);
  });

  it('should render correct style of animation state', () => {
    const wrapper = mount(<PopoverContainerContentStyle animationState='entered' />);

    assertStyleMatch({
      opacity: '1',
      transform: 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.25,0.25,0,1.5)'
    }, wrapper);
  });
});
