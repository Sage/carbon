import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import TabsHeader from './tabs-header.component';
import StyledTabsHeader from './tabs-header.style';
import classicTheme from '../../../style/themes/classic';
import TabTitle from '../tab-title/tab-title.component';

function render(props) {
  return shallow(
    <TabsHeader { ...props }>
      <TabTitle title='title-1' tabId='tabId-1' />
      <TabTitle title='title-2' tabId='tabId-2' />
    </TabsHeader>
  );
}

function renderStyles(props) {
  return TestRenderer.create(<StyledTabsHeader { ...props } />);
}

describe('TabsHeader', () => {
  let wrapper;
  it('renders as expected', () => {
    wrapper = renderStyles();
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it('renders children correctly', () => {
    wrapper = render();
    expect(wrapper.children()).toHaveLength(2);
  });

  it('has the role of tablist', () => {
    wrapper = render();
    expect(wrapper.find("[role='tablist']").exists()).toEqual(true);
  });

  describe('when position prop is set to left', () => {
    it('applies proper styles', () => {
      wrapper = renderStyles({ position: 'left' });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('when align prop is set to right', () => {
    it('applies proper styles', () => {
      wrapper = renderStyles({ align: 'right' });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('when in classic style', () => {
    it('renders as expected', () => {
      wrapper = renderStyles({ theme: classicTheme });
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});
