import React from 'react';
import { mount, shallow } from 'enzyme';
import TabsHeader from './tabs-header.component';
import StyledTabsHeader from './tabs-header.style';
import TabTitle from '../tab-title/tab-title.component';
import baseTheme from '../../../../style/themes/base';
import { assertStyleMatch } from '../../../../__spec_helper__/test-utils';

function render(props) {
  return shallow(
    <TabsHeader { ...props }>
      <TabTitle title='title-1' tabId='tabId-1' />
      <TabTitle title='title-2' tabId='tabId-2' />
    </TabsHeader>
  );
}

function renderStyles(props) {
  return mount(<StyledTabsHeader { ...props } />);
}

describe('TabsHeader', () => {
  it('renders as expected', () => {
    assertStyleMatch({
      display: 'flex',
      boxShadow: `inset 0px -2px 0px 0px ${baseTheme.tab.background}`,
      cursor: 'pointer',
      listStyle: 'none',
      margin: '0 0 10px',
      padding: '0'
    }, renderStyles());
  });

  it('renders children correctly', () => {
    expect(render().children()).toHaveLength(2);
  });

  it('renders children correctly', () => {
    expect(render().children()).toHaveLength(2);
  });

  it('has the role of a role prop value', () => {
    expect(render({ role: 'tablist' }).props().role).toEqual('tablist');
  });

  describe('when position prop is set to left', () => {
    it('applies proper styles', () => {
      assertStyleMatch(
        {
          flexDirection: 'column',
          boxShadow: `inset -2px 0px 0px 0px ${baseTheme.tab.background}`,
          width: '20%',
          margin: '0 10px 0'
        },
        renderStyles({ position: 'left' })
      );
    });

    it('applies proper styles when noRightBorder true', () => {
      assertStyleMatch(
        {
          boxShadow: 'none'
        },
        renderStyles({ position: 'left', noRightBorder: true })
      );
    });
  });

  describe('when align prop is set to right', () => {
    it('applies proper styles', () => {
      assertStyleMatch(
        {
          justifyContent: 'flex-end',
          textAlign: 'right'
        },
        renderStyles({ align: 'right' })
      );
    });

    it('applies proper styles when positioned left', () => {
      assertStyleMatch(
        {
          justifyContent: 'flex-start'
        },
        renderStyles({ position: 'left', align: 'right' })
      );
    });
  });

  describe('when extendedLine is false', () => {
    it('applies proper styles', () => {
      assertStyleMatch(
        {
          width: 'fit-content'
        },
        renderStyles({ extendedLine: false })
      );
    });
  });

  describe('when alternateStyling is true', () => {
    it('applies proper styles', () => {
      assertStyleMatch(
        {
          boxShadow: `inset 0px -1px 0px 0px ${baseTheme.tab.background}`
        },
        renderStyles({ alternateStyling: true })
      );
    });

    it('applies proper styles when position left', () => {
      assertStyleMatch(
        {
          boxShadow: `inset -1px 0px 0px 0px ${baseTheme.tab.background}`
        },
        renderStyles({ alternateStyling: true, position: 'left' })
      );
    });
  });

  describe('custom target styling', () => {
    assertStyleMatch({
      width: '100%',
      margin: 'auto'
    }, renderStyles({ hasCustomTarget: true, position: 'left' }));
  });
});
