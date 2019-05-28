import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import TabsHeader from './tabs-header.component';
import StyledTabsHeader from './tabs-header.style';
import classicTheme from '../../../style/themes/classic';
import TabTitle from '../tab-title/tab-title.component';
import baseTheme from '../../../style/themes/base';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

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

  it('has the role of a role prop value', () => {
    wrapper = render({ role: 'tablist' });
    expect(wrapper.props().role).toEqual('tablist');
  });

  describe('when position prop is set to left', () => {
    it('applies proper styles', () => {
      wrapper = renderStyles({ position: 'left' });
      assertStyleMatch(
        {
          flexDirection: 'column',
          boxShadow: `inset -2px 0px 0px 0px ${baseTheme.disabled.background}`,
          width: '20%',
          margin: '0 10px 0'
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when align prop is set to right', () => {
    it('applies proper styles', () => {
      wrapper = renderStyles({ align: 'right' });

      assertStyleMatch(
        {
          justifyContent: 'flex-end',
          textAlign: 'right'
        },
        wrapper.toJSON()
      );
    });
  });

  describe('when in classic style', () => {
    it('renders as expected', () => {
      wrapper = renderStyles({ theme: classicTheme });
      assertStyleMatch(
        {
          boxShadow: 'inset 0px -2px 0px 0px #ccd6da'
        },
        wrapper.toJSON()
      );
    });
  });
});
