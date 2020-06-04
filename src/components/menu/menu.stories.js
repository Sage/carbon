import React from 'react';
import { Link as RouterLink } from 'react-router';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import OptionsHelper from '../../utils/helpers/options-helper';
import { Menu, MenuItem, SubmenuBlock } from './menu';

export default {
  component: Menu,
  title: 'Test/Menu',
  parameters: {
    info: { disable: true }
  }
};

export const Basic = () => {
  const as = select('as', OptionsHelper.themesBinary, Menu.defaultProps.as);
  const handleOnClick = (e) => {
    action('onClick')(e);
  };

  return (
    <Menu
      as={ as }
    >
      <MenuItem onClick={ handleOnClick }>
        Item One
      </MenuItem>
      <MenuItem submenu='Item Two'>
        <SubmenuBlock>
          <MenuItem href='#'>Sub Menu Item One</MenuItem>
          <MenuItem href='#'>Sub Menu Item Two</MenuItem>
        </SubmenuBlock>
      </MenuItem>
      <MenuItem submenu='Item Two'>
        <MenuItem href='#'>Sub Menu Item One</MenuItem>
        <SubmenuBlock>
          <MenuItem icon='settings' href='#'>Sub Menu Item Two</MenuItem>
          <MenuItem href='#'>Sub Menu Item Three</MenuItem>
          <MenuItem divide href='#'>Sub Menu Item Four</MenuItem>
        </SubmenuBlock>
      </MenuItem>
    </Menu>
  );
};

Basic.story = {
  name: 'basic'
};

export const Visual = () => {
  const handleOnClick = (e) => {
    action('onClick')(e);
  };
  return (
    <>
      <Menu
        as='primary'
      >
        <MenuItem icon='settings'>
          Item with icon settings
        </MenuItem>
        <MenuItem
          to='#'
          routerLink={ RouterLink }
        >
          Item with `to`
        </MenuItem>
        <MenuItem
          submenuDirection='left'
          submenu='Item submenu direction left'
        >
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem>
          Item One
        </MenuItem>
        <MenuItem
          submenu='Selected Submenu'
        >
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem divide href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem
          selected
          submenu='Selected Submenu'
        >
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem onClick={ handleOnClick }>
          Item with onClick callback
        </MenuItem>
        <MenuItem to='#'>
          Item with `to`
        </MenuItem>
      </Menu>
      <hr style={ { marginTop: '100px' } } />
      <Menu>
        <MenuItem submenu='Item Two'>
          <MenuItem href='#'>Sub Menu Item One</MenuItem>
          <SubmenuBlock>
            <MenuItem
              icon='settings'
              href='#'
            >
              Sub Menu Item Two
            </MenuItem>
            <MenuItem href='#'>Sub Menu Item Three</MenuItem>
            <MenuItem
              divide
              href='#'
            >
              Sub Menu Item Four
            </MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem
          to='#'
          routerLink={ RouterLink }
          target='_blank'
        >
          Item with `to`
        </MenuItem>
        <MenuItem submenu='Item Two'>
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
      </Menu>
      <hr style={ { marginTop: '200px' } } />
      <Menu
        as='secondary'
      >
        <MenuItem submenu='Item One'>
          <SubmenuBlock>
            <MenuItem href='#'>Sub Menu Item One</MenuItem>
            <MenuItem href='#'>Sub Menu Item Two</MenuItem>
          </SubmenuBlock>
        </MenuItem>
        <MenuItem>
          Item Two
        </MenuItem>
        <MenuItem submenu='Item Three'>
          <MenuItem href='#'>Sub Menu Item Three</MenuItem>
          <SubmenuBlock>
            <MenuItem
              icon='settings'
              href='#'
            >
              Sub Menu Item Three
            </MenuItem>
            <MenuItem href='#'>Sub Menu Item Three</MenuItem>
            <MenuItem
              divide
              href='#'
            >
              Sub Menu Item Four
            </MenuItem>
          </SubmenuBlock>
        </MenuItem>
      </Menu>
    </>
  );
};

Visual.story = {
  name: 'visual'
};
