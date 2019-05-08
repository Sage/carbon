import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import TabsHeader from './tabs-header.component';
import StyledTabsHeader from './tabs-header.style';
import classicTheme from '../../../style/themes/classic';
import TabHeader from '../tab-header/tab-header.component';

function render(props) {
  return shallow(
    <TabsHeader { ...props }>
      <TabHeader title='title-1' tabId='tabId-1' />
      <TabHeader title='title-1' tabId='tabId-1' />
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
    expect(wrapper).toMatchSnapshot();
  });

  it('renders children correctly if passed', () => {
    wrapper = render();
    expect(wrapper.children()).toHaveLength(2);
  });

  describe('when position prop is set to left', () => {
    it('applies proper styles', () => {
      wrapper = renderStyles({ position: 'left ' });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in classic style', () => {
    it('renders as expected', () => {
      wrapper = renderStyles({ theme: classicTheme });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
