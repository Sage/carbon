import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import SidebarHeader from './sidebar-header.component';
import SidebarHeaderStyle from './sidebar-header.style';
import Textbox from '../../textbox/textbox';
import baseTheme from '../../../style/themes/base';
import classicTheme from '../../../style/themes/classic';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';

describe('Sidebar Header', () => {
  const wrapper = shallow(
    <SidebarHeader>
      <Textbox />
    </SidebarHeader>
  );

  describe('render', () => {
    it('should render child', () => {
      expect(wrapper.find(Textbox)).toBeTruthy();
    });
  });
});

describe('SidebarHeaderStyle', () => {
  it('should render base sidebar header', () => {
    const wrapper = mount(<SidebarHeaderStyle />);
    assertStyleMatch({
      backgroundColor: baseTheme.colors.white,
      boxShadow: `inset 0 -1px 0 0 ${baseTheme.disabled.border}`,
      boxSizing: 'content-box',
      position: 'relative',
      padding: '27px 32px 32px 32px',
      top: '-27px',
      marginLeft: '-32px',
      width: '100%',
      color: baseTheme.text.color
    }, wrapper.find('div'));
  });

  describe('when classic theme is provided to the component', () => {
    const wrapper = mount(<SidebarHeaderStyle theme={ classicTheme } />);
    it('should render correct style', () => {
      assertStyleMatch({
        backgroundColor: baseTheme.colors.white,
        boxShadow: 'none',
        boxSizing: 'content-box',
        position: 'relative',
        padding: '20px',
        top: '-20px',
        marginLeft: '-20px',
        width: '100%',
        color: 'rgba(0,0,0,.85)',
        borderBottom: 'solid 4px #e4e9ec',
        fontSize: '14px',
        fontWeight: 'normal'
      }, wrapper.find('div'));
    });
  });
});
