import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { act } from 'react-dom/test-utils';
import Badge from './badge.component';
import Button from '../button';
import { baseTheme } from '../../style/themes';
import { StyledCrossIcon, StyledButton } from './badge.style';

const renderComponent = (props = {}) => (
  <ThemeProvider theme={ baseTheme }>
    <Badge { ...props }>
      <Button buttonType='primary'>Button</Button>
    </Badge>
  </ThemeProvider>
);

const BADGE = '[data-element="badge-component"]';
const BADGE_CONTENT = '[data-element="main-text"]';

describe('Badge', () => {
  it('should render correct', () => {
    const wrapper = mount(renderComponent({ counter: 1 }));

    expect(wrapper.find(BADGE).exists()).toBe(true);
  });

  describe('when got number between 1 and 99', () => {
    const wrapper = mount(renderComponent({ counter: 50 }));

    it('should render delivered number', () => {
      expect(wrapper.find(BADGE).find(BADGE_CONTENT).text()).toEqual('50');
    });
  });

  describe('when got number higher than 99', () => {
    const wrapper = mount(renderComponent({ counter: 101 }));

    it('should render number `99`', () => {
      expect(wrapper.find(BADGE).find(BADGE_CONTENT).text()).toEqual('99');
    });
  });

  describe('when got number `0`', () => {
    const wrapper = mount(renderComponent({ counter: 0 }));

    it('should not render badge', () => {
      expect(wrapper.find(BADGE).exists()).toBe(false);
    });
  });

  it('should render cross icon if `mouseEnter`', () => {
    const wrapper = mount(renderComponent({ counter: 1 }));

    act(() => {
      wrapper.find(StyledButton).props().onMouseEnter();
    });

    wrapper.update();

    expect(wrapper.find(StyledCrossIcon).exists()).toBe(true);
  });

  it('should render correct number if `mouseLeave`', () => {
    const wrapper = mount(renderComponent({ counter: 1 }));

    act(() => {
      wrapper.find(StyledButton).props().onMouseEnter();
    });

    wrapper.update();

    expect(wrapper.find(StyledCrossIcon).exists()).toBe(true);

    act(() => {
      wrapper.find(StyledButton).props().onMouseLeave();
    });

    wrapper.update();

    expect(wrapper.find(StyledCrossIcon).exists()).toBe(false);
  });
});
