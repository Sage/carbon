import React from 'react';
import { shallow, mount } from 'enzyme';
import { MenuItem } from '..';
import Link from '../../link';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import { baseTheme } from '../../../style/themes';

describe('MenuItem', () => {
  let wrapper;

  it('should render children correctly', () => {
    wrapper = shallow(
      <MenuItem>
        Item One
      </MenuItem>
    );

    expect(wrapper.text()).toContain('Item One');
  });

  it('should render additional `carbon-menu-item--has-link` if specify props exsists', () => {
    wrapper = shallow(
      <MenuItem href='#'>
        Item One
      </MenuItem>
    );

    expect(wrapper.props().className).toBe('carbon-menu-item--has-link');
  });

  describe('props.submenu', () => {
    it('should render `div` if prop submenu exists', () => {
      wrapper = mount(
        <MenuItem submenu='Item submenu title'>
          <MenuItem>Submenu Item One</MenuItem>
        </MenuItem>
      );

      expect(wrapper.find('[as="div"]').first().exists()).toBe(true);
    });

    it('should render `Link` component if props submenu does not exist', () => {
      wrapper = mount(
        <MenuItem>
          Item One
        </MenuItem>
      );

      expect(wrapper.find(Link).exists()).toBe(true);
    });

    it('should render nested `<MenuItem />` with `submenuDirection="right"` as default if prop submenu exists', () => {
      wrapper = shallow(
        <MenuItem submenu='submenu'>
          <MenuItem>Item one</MenuItem>
        </MenuItem>
      );

      expect(wrapper.find(MenuItem).at(1).props().submenuDirection).toBe('right');
    });

    describe('`menuType=primary`', () => {
      it('should render correct styles', () => {
        wrapper = mount(
          <MenuItem menuType='primary'>
            Item one
          </MenuItem>
        );

        assertStyleMatch({
          backgroundColor: baseTheme.colors.white,
          color: baseTheme.colors.slate
        }, wrapper);
      });

      it('should render correct styles if is `selected`', () => {
        wrapper = mount(
          <MenuItem menuType='primary' selected>
            Item one
          </MenuItem>
        );

        assertStyleMatch({
          left: '10px',
          right: '10px',
          backgroundColor: '#00DC00',
          height: '3px'
        }, wrapper, { modifier: '&:after' });
      });

      it('should render correct styles if has `divide` prop', () => {
        wrapper = mount(
          <MenuItem menuType='primary' divide>
            Item one
          </MenuItem>
        );

        assertStyleMatch({
          height: '1px',
          left: '15px',
          right: '15px',
          top: '0',
          position: 'absolute',
          backgroundColor: '#CCD6DB'
        }, wrapper, { modifier: '&:before' });
      });

      it('should render correct styles if `hasSubmenu`', () => {
        wrapper = mount(
          <MenuItem menuType='primary' submenu='submenu'>
            <MenuItem>
              Item one
            </MenuItem>
          </MenuItem>
        );

        assertStyleMatch({
          width: '0',
          height: '0',
          borderTop: `5px solid ${baseTheme.colors.slate}`,
          borderRight: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '4px solid transparent'
        }, wrapper, { modifier: ':before' });
      });
    });

    describe('`menuType="secondary`', () => {
      it('should render correct styles', () => {
        wrapper = mount(
          <MenuItem menuType='secondary'>
            Item one
          </MenuItem>
        );

        assertStyleMatch({
          backgroundColor: baseTheme.colors.slate,
          color: baseTheme.colors.white
        }, wrapper);
      });

      it('should render correct styles if `hasSubmenu`', () => {
        wrapper = mount(
          <MenuItem menuType='secondary' submenu='submenu'>
            <MenuItem>
              Item one
            </MenuItem>
          </MenuItem>
        );

        assertStyleMatch({
          width: '0',
          height: '0',
          borderTop: `5px solid ${baseTheme.colors.white}`,
          borderRight: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '4px solid transparent'
        }, wrapper, { modifier: ':before' });
      });


      it('should render correct styles if has `divide` prop', () => {
        wrapper = mount(
          <MenuItem menuType='secondary' divide>
            Item one
          </MenuItem>
        );

        assertStyleMatch({
          height: '1px',
          left: '15px',
          right: '15px',
          top: '0',
          position: 'absolute',
          backgroundColor: '#335C6D'
        }, wrapper, { modifier: '&:before' });
      });
    });
  });
});
