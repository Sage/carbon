import React from 'react';
import { shallow, mount } from 'enzyme';
import SubmenuBlock from './submenu-block.component';
import MenuItem from '../menu-item';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import { baseTheme } from '../../../style/themes';
import { StyledSubmenuItem, StyledSubmenu } from './submenu.style';

describe('SubmenuBlock', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SubmenuBlock>
        <MenuItem>Item Submenu One</MenuItem>
      </SubmenuBlock>
    );
  });

  it('should render children correctly', () => {
    expect(wrapper.find(MenuItem).exists()).toBe(true);
  });

  it('should have `data-component` to be `submenu-block`', () => {
    expect(wrapper.prop('data-component')).toBe('submenu-block');
  });

  it('should render correct styles if `menuType="primary"`', () => {
    wrapper = mount(
      <StyledSubmenu menuType='primary'>
        <MenuItem>Item Submenu One</MenuItem>
      </StyledSubmenu>
    );

    assertStyleMatch({
      backgroundColor: baseTheme.colors.white
    }, wrapper, { modifier: `> *:not(${StyledSubmenuItem})` });
  });

  it('should render correct styles if `menuType="secondary"`', () => {
    wrapper = mount(
      <StyledSubmenu menuType='secondary'>
        <MenuItem>Item Submenu One</MenuItem>
      </StyledSubmenu>
    );

    assertStyleMatch({
      backgroundColor: '#1B1D21'
    }, wrapper, { modifier: `> *:not(${StyledSubmenuItem})` });
  });

  it('should render correct styles if `submenuDirection="left"`', () => {
    wrapper = mount(
      <StyledSubmenu submenuDirection='left'>
        <MenuItem>Item Submenu One</MenuItem>
      </StyledSubmenu>
    );

    assertStyleMatch({
      right: '0'
    }, wrapper);
  });
});
